#!/usr/bin/env bash
# Plain-practice go-live role-play. Local Supabase only. Refuses the production project.
# Does not send email or WhatsApp. Docs/harness only: no product code.
# Usage (from the repo root): bash tools/e2e/run-golive-2026-11-23.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
ROOT="$(pwd)"
STATE="$ROOT/tests/e2e/.state"
SHOTS="$ROOT/docs/e2e-2026-11-23"
mkdir -p "$STATE" "$SHOTS" "$ROOT/tests/e2e/fixtures"
rm -f "$STATE/golive-steps.json"
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

echo "Resetting the local database (applies every file in supabase/migrations, in order)..."
supabase db reset --yes > /tmp/e2e-supabase-reset.log
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
if [[ "$API_URL" != http://127.0.0.1:* && "$API_URL" != http://localhost:* ]]; then
  echo "Refusing to run: API_URL is not local ($API_URL)." >&2
  exit 1
fi

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

DB_CONTAINER="$(docker ps --format '{{.Names}}' | grep 'supabase_db' | head -1)"
if [[ -z "$DB_CONTAINER" ]]; then
  echo "Could not find the local Supabase database container." >&2
  exit 1
fi
echo "Installing the local day-shift ($DB_CONTAINER)..."
docker exec -i "$DB_CONTAINER" psql -U postgres -v ON_ERROR_STOP=1 < "$ROOT/tools/e2e/e2e-clock.sql"
echo 0 > "$STATE/day-shift.txt"

echo "Schema verify (local only)..."
docker exec -i "$DB_CONTAINER" psql -U postgres -v ON_ERROR_STOP=1 > "$STATE/schema-verify.txt" <<'SQL'
select 'profiles' as check, to_regclass('public.profiles')::text as result
union all select 'daily_activity', to_regclass('public.daily_activity')::text
union all select 'alert_log', to_regclass('public.alert_log')::text
union all select 'wrong_answers', to_regclass('public.wrong_answers')::text
union all select 'parent_homework', to_regclass('public.parent_homework')::text
union all select 'reward_credits', to_regclass('public.reward_credits')::text
union all select 'reward_rule_versions', to_regclass('public.reward_rule_versions')::text
union all select 'exam_attempts', to_regclass('public.exam_attempts')::text
union all select 'event_alert_log', to_regclass('public.event_alert_log')::text
union all select 'learning_trials', to_regclass('public.learning_trials')::text
union all select 'finalize_credits', (select proname from pg_proc where proname='finalize_credits' limit 1);
select column_name from information_schema.columns
 where table_name='exam_attempts' and column_name in ('auto_score','parent_pending','settled_at')
 order by 1;
select column_name from information_schema.columns
 where table_name='reward_credits' and column_name='status';
SQL

echo "Building the answer key and the (2 marks) probe..."
npx --yes tsx tools/e2e/answer-key.mjs
npx --yes tsx tools/e2e/marks-probe.mjs

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
  local phase="$1"
  stop_next
  local email_on="" recipients=""
  if [[ "$phase" == "alert" ]]; then
    email_on="true"
    recipients="mrs.tan.e2e@example.com"
  fi
  # WhatsApp stays unset. Resend key and from-address stay unset, so even with
  # EMAIL_ALERTS_ENABLED the send is skipped after the allow-list check.
  # CLEWQUEST and the learning dashboard stay unset.
  env \
    NEXT_PUBLIC_SUPABASE_URL="$API_URL" \
    NEXT_PUBLIC_SUPABASE_ANON_KEY="$ANON_KEY" \
    SUPABASE_SERVICE_ROLE_KEY="$SERVICE_ROLE_KEY" \
    NEXT_PUBLIC_SERVER_AUTH=true \
    NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED=true \
    NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED=true \
    NEXT_PUBLIC_REWARDS_ENABLED=true \
    NEXT_PUBLIC_MOCK_EXAMS_ENABLED=true \
    EMAIL_ALERTS_ENABLED="$email_on" \
    ALERT_TEST_RECIPIENTS="$recipients" \
    WHATSAPP_ENABLED= \
    RESEND_API_KEY= \
    ALERT_FROM_EMAIL= \
    CRON_SECRET=e2e-local-cron \
    APP_BASE_URL=http://127.0.0.1:3000 \
    ADMIN_PASSWORD=e2e-admin-local \
    ADMIN_SESSION_SECRET=e2e-admin-session-local \
    ALERT_DRY_RUN_LOG="$ALERT_LOG" \
    E2E_DAY_SHIFT_FILE="$STATE/day-shift.txt" \
    NODE_OPTIONS="--require ${ROOT}/tools/e2e/day-shift.cjs" \
    npx next dev -H 127.0.0.1 -p 3000 >"$STATE/next-${phase}.log" 2>&1 &
  echo $! > "$STATE/next.pid"
  echo "Waiting for Next.js ($phase)..."
  for _ in $(seq 1 90); do
    if curl -sf -o /dev/null "http://127.0.0.1:3000"; then
      return 0
    fi
    sleep 2
  done
  echo "Next.js did not become ready." >&2
  tail -40 "$STATE/next-${phase}.log" >&2
  exit 1
}

cleanup() { stop_next; }
trap cleanup EXIT

start_next main
set +e
E2E_API_URL="$API_URL" E2E_SERVICE_ROLE="$SERVICE_ROLE_KEY" E2E_ANON_KEY="$ANON_KEY" \
  E2E_DB_CONTAINER="$DB_CONTAINER" E2E_DAY_SHIFT_FILE="$STATE/day-shift.txt" \
  E2E_SHOTS_DIR="docs/e2e-2026-11-23" ALERT_DRY_RUN_LOG="$ALERT_LOG" \
  CRON_SECRET=e2e-local-cron \
  npx playwright test tests/e2e/golive-plain.spec.js --grep @golive
main_code=$?
set -e

start_next alert
set +e
E2E_API_URL="$API_URL" E2E_SERVICE_ROLE="$SERVICE_ROLE_KEY" E2E_ANON_KEY="$ANON_KEY" \
  E2E_DB_CONTAINER="$DB_CONTAINER" E2E_DAY_SHIFT_FILE="$STATE/day-shift.txt" \
  E2E_SHOTS_DIR="docs/e2e-2026-11-23" ALERT_DRY_RUN_LOG="$ALERT_LOG" \
  CRON_SECRET=e2e-local-cron E2E_PHASE=alert \
  npx playwright test tests/e2e/golive-plain.spec.js --grep @golive-alert
alert_code=$?
set -e

echo "main exit $main_code alert exit $alert_code"
echo "Steps: $STATE/golive-steps.json"
if [[ "$main_code" != "0" || "$alert_code" != "0" ]]; then
  exit 1
fi
