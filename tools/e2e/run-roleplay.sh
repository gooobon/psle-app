#!/usr/bin/env bash
# Role-play across several Singapore days. Local Supabase only.
# Refuses the production project. Does not send email or WhatsApp.
# Usage (from the repo root): bash tools/e2e/run-roleplay.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
ROOT="$(pwd)"
STATE="$ROOT/tests/e2e/.state"
mkdir -p "$STATE" "$ROOT/docs/e2e-2026-11-19" "$ROOT/tests/e2e/fixtures"
ALERT_LOG="$STATE/alerts.jsonl"
: > "$ALERT_LOG"

if printenv | grep -q 'zehnulwvysvnsshunxzr'; then
  echo "Refusing to run: an environment variable contains the production Supabase project ref." >&2
  exit 1
fi

if ! command -v supabase >/dev/null || ! command -v docker >/dev/null; then
  echo "supabase CLI and Docker are required." >&2
  exit 1
fi

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

echo "Starting local Supabase..."
supabase start --exclude studio,edge-runtime,logflare,vector,imgproxy,realtime,storage-api,postgres-meta,supavisor --yes >/tmp/e2e-supabase-start.log
echo "Resetting the local database..."
supabase db reset --yes >>/tmp/e2e-supabase-start.log
supabase status -o env > "$STATE/supabase.env"
if grep -q 'zehnulwvysvnsshunxzr' "$STATE/supabase.env"; then
  echo "Refusing to run: supabase status points at production." >&2
  exit 1
fi
set -a
# shellcheck disable=SC1090
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

echo "Building the answer key for the scored sets..."
npx --yes tsx tools/e2e/answer-key.mjs

DB_CONTAINER="$(sudo docker ps --format '{{.Names}}' | grep 'supabase_db' | head -1)"
if [[ -z "$DB_CONTAINER" ]]; then
  echo "Could not find the local Supabase database container." >&2
  exit 1
fi
echo "Installing the local day-shift on record_activity ($DB_CONTAINER)..."
sudo docker exec -i "$DB_CONTAINER" psql -U postgres -v ON_ERROR_STOP=1 < "$ROOT/tools/e2e/e2e-clock.sql"
echo 0 > "$STATE/day-shift.txt"

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

restore_clock() {
  if [[ -f /tmp/e2e-clock-original ]]; then
    sudo date -u -s "$(tr -d '[:space:]' < /tmp/e2e-clock-original)" || true
    rm -f /tmp/e2e-clock-original
  fi
}

cleanup() {
  restore_clock
  stop_next
}
trap cleanup EXIT

stop_next
echo "Starting Next.js with feature flags on (alerts stay off)..."
env \
  NEXT_PUBLIC_SUPABASE_URL="$API_URL" \
  NEXT_PUBLIC_SUPABASE_ANON_KEY="$ANON_KEY" \
  SUPABASE_SERVICE_ROLE_KEY="$SERVICE_ROLE_KEY" \
  NEXT_PUBLIC_SERVER_AUTH=true \
  NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED=true \
  NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED=true \
  NEXT_PUBLIC_REWARDS_ENABLED=true \
  NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED=true \
  EMAIL_ALERTS_ENABLED= \
  WHATSAPP_ENABLED= \
  CRON_SECRET=e2e-cron-secret \
  ALERT_DRY_RUN_LOG="$ALERT_LOG" \
  E2E_DAY_SHIFT_FILE="$STATE/day-shift.txt" \
  NODE_OPTIONS="--require ${ROOT}/tools/e2e/day-shift.cjs" \
  npx next dev -H 127.0.0.1 -p 3000 >"$STATE/next-roleplay.log" 2>&1 &
echo $! > "$STATE/next.pid"
for _ in $(seq 1 90); do
  if curl -sf -o /dev/null "http://127.0.0.1:3000"; then
    break
  fi
  sleep 2
done
if ! curl -sf -o /dev/null "http://127.0.0.1:3000"; then
  echo "Next.js did not become ready." >&2
  tail -40 "$STATE/next-roleplay.log" >&2
  exit 1
fi

E2E_API_URL="$API_URL" E2E_SERVICE_ROLE="$SERVICE_ROLE_KEY" \
  E2E_DB_CONTAINER="$DB_CONTAINER" E2E_DAY_SHIFT_FILE="$STATE/day-shift.txt" \
  ALERT_DRY_RUN_LOG="$ALERT_LOG" CRON_SECRET=e2e-cron-secret \
  npx playwright test --grep @roleplay
echo "Role-play finished. Steps: $STATE/roleplay-steps.json"
