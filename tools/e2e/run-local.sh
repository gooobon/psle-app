#!/usr/bin/env bash
# Isolated end-to-end run. Local Supabase only. Refuses the production project ref.
# Usage (from the repo root): bash tools/e2e/run-local.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
ROOT="$(pwd)"
STATE="$ROOT/tests/e2e/.state"
mkdir -p "$STATE" "$ROOT/docs/e2e-2026-11-19" "$ROOT/tests/e2e/fixtures"

if printenv | grep -q 'zehnulwvysvnsshunxzr'; then
  echo "Refusing to run: an environment variable contains the production Supabase project ref." >&2
  exit 1
fi

if ! command -v supabase >/dev/null || ! command -v docker >/dev/null; then
  echo "supabase CLI and Docker are required (supabase start)." >&2
  exit 1
fi

# Some hosts keep a legacy iptables FORWARD DROP that blocks container-to-container traffic
# while Docker itself writes nftables rules. Local Supabase cannot apply migrations until
# containers can reach Postgres. Only relax the legacy policy when a probe fails.
NET="e2eprobe$$"
sudo docker network create "$NET" >/dev/null
sudo docker run -d --name "e2epg$$" --network "$NET" -e POSTGRES_PASSWORD=postgres postgres:16 >/dev/null
sleep 2
if ! sudo docker run --rm --network "$NET" postgres:16 pg_isready -h "e2epg$$" -t 5 >/dev/null 2>&1; then
  echo "Container networking was blocked. Setting iptables-legacy FORWARD policy to ACCEPT for this machine."
  sudo iptables-legacy -P FORWARD ACCEPT
fi
sudo docker rm -f "e2epg$$" >/dev/null
sudo docker network rm "$NET" >/dev/null

echo "Starting local Supabase (studio, storage, realtime, analytics excluded)..."
supabase start --exclude studio,edge-runtime,logflare,vector,imgproxy,realtime,storage-api,postgres-meta,supavisor --yes >/tmp/e2e-supabase-start.log
echo "Resetting the local database so this run starts empty..."
supabase db reset --yes >>/tmp/e2e-supabase-start.log
supabase status -o env > "$STATE/supabase.env"
if grep -q 'zehnulwvysvnsshunxzr' "$STATE/supabase.env"; then
  echo "Refusing to run: supabase status points at production." >&2
  exit 1
fi
# shellcheck disable=SC1090
set -a
source "$STATE/supabase.env"
set +a
: "${API_URL:?}" "${ANON_KEY:?}" "${SERVICE_ROLE_KEY:?}"

echo "Waiting until the local API can read profiles..."
ready=0
for _ in $(seq 1 40); do
  code="$(curl -s -o /dev/null -w '%{http_code}' \
    -H "apikey: ${SERVICE_ROLE_KEY}" \
    -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
    "${API_URL}/rest/v1/profiles?select=id&limit=1" || true)"
  if [[ "$code" == "200" ]]; then ready=1; break; fi
  sleep 1
done
if [[ "$ready" != "1" ]]; then
  echo "Local API did not become ready (last HTTP ${code})." >&2
  exit 1
fi

echo "Building the similar-question fixture from the practice sets..."
npx --yes tsx tools/e2e/similar-fixture.mjs

stop_next() {
  if [[ -f "$STATE/next.pid" ]]; then
    local pid
    pid="$(cat "$STATE/next.pid")"
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
      wait "$pid" 2>/dev/null || true
    fi
    rm -f "$STATE/next.pid"
  fi
  pkill -f "next dev -H 127.0.0.1 -p 3000" >/dev/null 2>&1 || true
  sleep 1
}

start_next() {
  local mode="$1"
  stop_next
  local log="$STATE/next-${mode}.log"
  local flags=()
  # The current flow (landing -> sign up -> Add your child with a picture code -> child logs in with the picture code) needs ClewQuest on.
  # The "off" phase keeps ClewQuest off and seeds the demo users so the flag-off spec can log in.
  if [[ "$mode" == "off" ]]; then
    flags+=( NEXT_PUBLIC_SHOW_DEMO=true ) # server auth stays off: the spec checks /api/auth/me is 404
  fi
  if [[ "$mode" != "off" ]]; then
    flags+=(
      NEXT_PUBLIC_CLEWQUEST_ENABLED=true
      CLEWQUEST_PICTURE_PEPPER=e2e-local-pepper-0123456789
      NEXT_PUBLIC_SERVER_AUTH=true
      NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED=true
      NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED=true
      NEXT_PUBLIC_REWARDS_ENABLED=true
    )
  fi
  local node_opts=()
  if [[ "$mode" == "saturday" ]]; then
    node_opts+=(NODE_OPTIONS="--require ${ROOT}/tools/e2e/saturday-clock.cjs")
  fi
  # EMAIL_ALERTS_ENABLED and WHATSAPP_ENABLED stay unset, so alerts do not send.
  env \
    NEXT_PUBLIC_SUPABASE_URL="$API_URL" \
    NEXT_PUBLIC_SUPABASE_ANON_KEY="$ANON_KEY" \
    SUPABASE_SERVICE_ROLE_KEY="$SERVICE_ROLE_KEY" \
    EMAIL_ALERTS_ENABLED= \
    WHATSAPP_ENABLED= \
    "${flags[@]}" \
    "${node_opts[@]}" \
    npx next dev -H 127.0.0.1 -p 3000 >"$log" 2>&1 &
  echo $! > "$STATE/next.pid"
  echo "Waiting for Next.js ($mode)..."
  for _ in $(seq 1 90); do
    if curl -sf -o /dev/null "http://127.0.0.1:3000"; then
      return 0
    fi
    sleep 2
  done
  echo "Next.js did not become ready. Last log lines:" >&2
  tail -40 "$log" >&2
  exit 1
}

trap stop_next EXIT

start_next on
E2E_PHASE=main E2E_API_URL="$API_URL" E2E_SERVICE_ROLE="$SERVICE_ROLE_KEY" \
  npx playwright test --grep @main

start_next saturday
E2E_PHASE=saturday E2E_API_URL="$API_URL" E2E_SERVICE_ROLE="$SERVICE_ROLE_KEY" \
  npx playwright test --grep @saturday

start_next off
E2E_PHASE=off E2E_API_URL="$API_URL" E2E_SERVICE_ROLE="$SERVICE_ROLE_KEY" \
  npx playwright test --grep @off

echo "E2E phases finished. Scenario notes are in tests/e2e/.state/scenarios-*.json"
echo "Screenshots are in docs/e2e-2026-11-19/"
