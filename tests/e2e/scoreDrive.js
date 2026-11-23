// Drives one practice set through the real exam UI, aiming at a score band.
// Coupled items (cloze word banks, matching pools) are answered correctly so one
// wrong tap cannot steal the answer of a later blank. Intentional misses go on
// independent questions (MCQ, editing, comprehension).
const { nudge } = require("./helpers");

function norm(s) {
  return String(s || "").toLowerCase().replace(/[_\s]+/g, " ").replace(/[^\p{L}\p{N} ]+/gu, "").replace(/\s+/g, " ").trim();
}

function bandCount(n, minPct, maxPct) {
  const mid = (minPct + maxPct) / 2;
  let best = null;
  for (let c = 0; c <= n; c++) {
    const p = n ? Math.floor((100 * c) / n) : 0;
    if (p < minPct || p > maxPct) continue;
    if (!best || Math.abs(p - mid) < Math.abs(best.p - mid)) best = { c, p };
  }
  return best || { c: n, p: n ? Math.floor((100 * n) / n) : 0 };
}

function planWrongs(items, minPct, maxPct) {
  const gradable = items.filter((i) => i.gradable);
  const independent = gradable.filter((i) => !i.coupled);
  const goal = bandCount(gradable.length, minPct, maxPct);
  const wrongN = Math.max(0, gradable.length - goal.c);
  const pool = independent.length ? independent : gradable;
  const wrong = new Set();
  const n = Math.min(wrongN, pool.length);
  for (let i = 0; i < n; i++) wrong.add(pool[Math.floor(((i + 0.5) * pool.length) / n)].id);
  return { wrong, expectPct: goal.p, gradable: gradable.length, independent: independent.length };
}

function needle(stem) {
  const n = norm(stem);
  return n.length > 28 ? n.slice(0, 28) : n;
}

async function applyOne(page, items, wrong) {
  return page.evaluate(({ items, wrong, needles }) => {
    const text = (el) => (el && el.innerText ? el.innerText : el && el.textContent ? el.textContent : "").replace(/\s+/g, " ").trim();
    const visible = (el) => !!(el && (el.getClientRects().length || el.offsetParent));
    const body = document.body.innerText || "";
    if (/correct on first try|题首次答对|All done for today|Done for this week/.test(body)) return { did: false, why: "done" };
    const submit = [...document.querySelectorAll("button")].find((b) => /^(Submit|提交)/.test(text(b)) && visible(b));
    if (submit && !submit.disabled) return { did: false, why: "submit-ready" };
    if (/Not quite|再想想|Please complete the retry|请先完成上面的重做|Next Section|下一节|Next Page|下一页|Finish Section|完成本节/.test(body)) return { did: false, why: "advance" };

    const normJs = (s) => String(s || "").toLowerCase().replace(/[_\s]+/g, " ").replace(/[^\p{L}\p{N} ]+/gu, "").replace(/\s+/g, " ").trim();
    const locked = document.body.dataset.e2eSet || "";
    const pool = locked ? items.filter((it) => !it.setId || it.setId === locked) : items;
    const byNeedle = new Map();
    pool.forEach((it) => {
      const k = needles[items.indexOf(it)];
      if (k) byNeedle.set(k + "\n" + (it.setId || "") + "\n" + it.id, it);
    });
    function matchItem(raw) {
      const n = normJs(raw);
      if (n.length < 6) return null;
      let hit = null;
      for (const [key, it] of byNeedle) {
        const k = key.split("\n")[0];
        if (k && n.includes(k)) { if (!hit || k.length > hit.k.length) hit = { it, k }; }
      }
      return hit ? hit.it : null;
    }
    function lock(it) {
      if (it && it.setId && !document.body.dataset.e2eSet) document.body.dataset.e2eSet = it.setId;
    }
    function want(it) {
      if (!it) return null;
      if (wrong.includes(it.id)) return { ...it, miss: true };
      return { ...it, miss: false };
    }
    function altIndex(answer, n) {
      const a = Number(answer) || 0;
      return n <= 1 ? 0 : (a + 1) % n;
    }

    // MCQ blocks: a question number plus option rows "(1)".
    for (const div of document.querySelectorAll("div")) {
      const kids = [...div.children];
      if (kids.length < 2) continue;
      const num = kids[0].querySelector && kids[0].querySelector("span");
      if (!num || !/^\d+\.$/.test(text(num))) continue;
      const opts = kids.filter((k) => { const s = k.querySelector && k.querySelector(":scope > span"); return s && /^\(\d+\)$/.test(text(s)); });
      if (opts.length < 2) continue;
      if (getComputedStyle(opts[0]).cursor !== "pointer") continue;
      const chosen = opts.find((o) => getComputedStyle(o).backgroundColor === "rgb(219, 234, 254)");
      if (chosen) continue;
      const it = want(matchItem(text(kids[0])));
      if (!it || it.kind !== "mcq") continue;
      const idx = it.miss ? altIndex(it.answer, opts.length) : Number(it.answer) || 0;
      opts[Math.max(0, Math.min(opts.length - 1, idx))].click();
      lock(it);
      return { did: true, why: "mcq", id: it.id, miss: !!it.miss };
    }

    // Word-bank cloze: one tap fills the next empty blank.
    const bankButtons = [...document.querySelectorAll("button")].filter((b) => visible(b) && /^\([A-Z]\)\s+\S/.test(text(b)) && /Tap a word|点击词语/.test(body));
    if (bankButtons.length) {
      const filled = [...document.querySelectorAll("button")].filter((b) => /^Clear|清除/.test(text(b))).length;
      const pageNorm = normJs(body);
      const blanks = items.filter((it) => it.kind === "cloze" && it.passage && pageNorm.includes(normJs(it.passage).slice(0, 18)));
      blanks.sort((a, b) => a.blank - b.blank);
      const it = blanks[filled];
      if (it) {
        const planned = want(it);
        let btn = bankButtons.find((b) => normJs(text(b)).includes(normJs(planned.answer)));
        if (planned.miss) btn = bankButtons.find((b) => !normJs(text(b)).includes(normJs(planned.answer))) || btn;
        if (btn) { btn.click(); return { did: true, why: "cloze", id: it.id, miss: !!planned.miss }; }
      }
    }

    // Vocab match: one row is one short block with a single question number and its own buttons.
    // Click each row once. A second click toggles the answer off.
    for (const div of document.querySelectorAll("div")) {
      if (div.dataset.e2eMatch) continue;
      const raw = text(div);
      if (raw.length < 8 || raw.length > 220) continue;
      const nums = raw.match(/\d+\./g);
      if (!nums || nums.length !== 1) continue;
      const buttons = [...div.querySelectorAll(":scope button")].filter((b) => /^\(\d+\)/.test(text(b)) && !b.disabled && visible(b));
      if (buttons.length < 2) continue;
      const it = want(matchItem(raw));
      if (!it || it.kind !== "match") continue;
      const chosen = buttons.find((b) => {
        const bg = getComputedStyle(b).backgroundColor;
        return bg === "rgb(219, 234, 254)" || bg === "rgb(29, 78, 216)";
      });
      if (chosen) { div.dataset.e2eMatch = "1"; continue; }
      const idx = it.miss ? altIndex(it.answer, buttons.length) : Number(it.answer) || 0;
      const btn = buttons.find((b) => text(b).startsWith("(" + (idx + 1) + ")"));
      if (!btn) continue;
      div.dataset.e2eMatch = "1";
      btn.click();
      return { did: true, why: "match", id: it.id, miss: !!it.miss };
    }

    // Comprehension / reading block that contains the stem.
    function boxFor(stem) {
      const n = normJs(stem).slice(0, 18);
      if (n.length < 4) return null;
      let best = null;
      for (const el of document.querySelectorAll("div")) {
        const t = normJs(el.innerText || "");
        if (!t.includes(n) || t.length > 1800) continue;
        if (!best || t.length < best.len) best = { el, len: t.length };
      }
      if (!best) return null;
      let el = best.el;
      while (el && el !== document.body) {
        const tables = el.querySelectorAll("table").length;
        const inputs = el.querySelectorAll("input, textarea").length;
        if ((tables === 1 || (inputs > 0 && tables === 0)) && normJs(el.innerText || "").includes(n)) return el;
        el = el.parentElement;
      }
      return best.el;
    }
    for (const it0 of pool) {
      if (!it0.stem || !/comp-/.test(it0.kind) || it0.kind === "comp-open") continue;
      if (document.body.dataset["e2eDone_" + it0.id]) continue;
      const box = boxFor(it0.stem);
      if (!box) continue;
      const it = want(it0);
      if (it.kind === "comp-mcq") {
        const tds = [...box.querySelectorAll("td")].filter((td) => /^\(\d+\)$/.test(text(td)) && getComputedStyle(td).cursor === "pointer");
        if (!tds.length) continue;
        const idx = it.miss ? altIndex(it.answer, tds.length) : Number(it.answer) || 0;
        const td = tds[idx];
        if (!td || td.dataset.e2eHit) continue;
        td.dataset.e2eHit = "1";
        document.body.dataset["e2eDone_" + it.id] = "1";
        td.click();
        lock(it);
        return { did: true, why: "comp-mcq", id: it.id, miss: !!it.miss };
      }
      if (it.kind === "comp-ab") {
        const spans = [...box.querySelectorAll("span")].filter((el) => /^\([AB]\)/.test(text(el)) && getComputedStyle(el).cursor === "pointer");
        if (!spans.length) continue;
        const letter = String(it.miss ? (String(it.answer).toUpperCase() === "A" ? "B" : "A") : it.answer).toUpperCase();
        const span = spans.find((el) => text(el).startsWith("(" + letter + ")"));
        if (!span || span.dataset.e2eHit) continue;
        span.dataset.e2eHit = "1";
        document.body.dataset["e2eDone_" + it.id] = "1";
        span.click();
        lock(it);
        return { did: true, why: "comp-ab", id: it.id, miss: !!it.miss };
      }
      if (it.kind === "comp-tf" && Array.isArray(it.answer)) {
        const rows = [...box.querySelectorAll("tbody tr")];
        if (!rows.length) continue;
        for (let i = 0; i < it.answer.length && i < rows.length; i++) {
          const cells = [...rows[i].querySelectorAll("td")];
          if (cells.length < 3) continue;
          const choice = it.miss ? (String(it.answer[i]) === "True" ? "False" : "True") : it.answer[i];
          const cell = choice === "False" ? cells[cells.length - 1] : cells[cells.length - 2];
          if (cell && !cell.dataset.e2eHit && text(cell) !== "✓") { cell.dataset.e2eHit = "1"; cell.click(); return { did: true, why: "comp-tf", id: it.id }; }
        }
      }
      if (it.kind === "comp-seq" && Array.isArray(it.answer)) {
        const rows = [...box.querySelectorAll("tbody tr")];
        for (let i = 0; i < rows.length && i < it.answer.length; i++) {
          const buttons = [...rows[i].querySelectorAll("button")];
          const n = it.miss ? ((Number(it.answer[i]) % buttons.length) + 1) : Number(it.answer[i]);
          const btn = buttons.find((b) => text(b) === String(n));
          if (btn && getComputedStyle(btn).backgroundColor !== "rgb(26, 26, 26)") {
            document.body.dataset["e2eDone_" + it.id] = "1";
            btn.click();
            lock(it);
            return { did: true, why: "comp-seq", id: it.id, miss: !!it.miss };
          }
        }
      }
      if (it.kind === "comp-fill") {
        const input = box.querySelector("input[type='text'], textarea");
        if (input && !String(input.value || "").trim() && !input.dataset.e2eFill) {
          input.dataset.e2eFill = it.miss ? "nope" : String(it.answer || "answer");
          return { did: true, why: "mark-fill", id: it.id };
        }
      }
    }

    // Editing and any other empty text box next to a known sentence.
    const inputs = [...document.querySelectorAll("input[type='text'], textarea")].filter((el) => visible(el) && !el.disabled && !String(el.value || "").trim() && !el.dataset.e2eFill);
    for (const input of inputs) {
      const host = input.closest("div");
      const blob = host ? text(host.parentElement || host) : "";
      const it = want(matchItem(blob));
      if (it && it.kind === "edit") {
        input.dataset.e2eFill = it.miss ? "wrongword" : String(it.answer || "");
        return { did: true, why: "mark-edit", id: it.id, miss: !!it.miss };
      }
    }
    return { did: false, why: "none" };
  }, {
    items,
    wrong: [...wrong],
    needles: items.map((it) => needle(it.stem || it.passage || "")),
  });
}

async function fillMarked(page) {
  const loc = page.locator("[data-e2e-fill]");
  const n = await loc.count();
  let filled = 0;
  for (let i = 0; i < n; i++) {
    const el = loc.nth(i);
    const value = await el.getAttribute("data-e2e-fill");
    await el.fill(value || "answer");
    await el.evaluate((node) => node.removeAttribute("data-e2e-fill"));
    filled++;
  }
  return filled;
}

function setsOf(setOrMap) {
  if (setOrMap && Array.isArray(setOrMap.items)) return [setOrMap];
  return Object.entries(setOrMap || {}).map(([setId, set]) => ({ ...set, setId }));
}

async function driveToScore(page, setOrMap, band, label, hooks) {
  let chosen = setsOf(setOrMap);
  if (chosen.length > 1) {
    await page.waitForFunction(() => /Submit|提交|Tap a word|Fill in all blanks|Write a suitable|填写/.test(document.body.innerText || ""), { timeout: 20000 }).catch(() => {});
    const pageText = norm(await page.locator("body").innerText().catch(() => ""));
    let best = chosen[0];
    let bestHits = -1;
    for (const set of chosen) {
      let hits = 0;
      for (const it of set.items || []) {
        const k = needle(it.stem || it.passage || "");
        if (k.length >= 14 && pageText.includes(k)) hits++;
      }
      if (hits > bestHits) { bestHits = hits; best = set; }
    }
    chosen = [best];
    console.log("[score] " + label + " locked " + (best.setId || "?") + " hits " + bestHits);
  }
  const items = [];
  const wrong = [];
  for (const set of chosen) {
    const plan = planWrongs(set.items, band.min, band.max);
    const setId = set.setId || "";
    items.push(...set.items.map((it) => ({ ...it, setId: it.setId || setId })));
    wrong.push(...plan.wrong);
  }
  const log = [];
  let tfRun = 0;
  for (let i = 0; i < 2500; i++) {
    const t = await page.locator("body").innerText().catch(() => "");
    if (t.includes("correct on first try") || t.includes("题首次答对") || t.includes("道题正确")) {
      return { log: log.slice(-30), steps: i };
    }
    const filled = await fillMarked(page);
    if (filled) { log.push("fill:" + filled); continue; }
    const step = await applyOne(page, items, wrong);
    if (step && !step.did && step.why === "advance" && hooks && hooks.onHint && !hooks.hinted) {
      const hintText = await page.locator("body").innerText().catch(() => "");
      if (/Not quite! Hint:|再想想/.test(hintText)) {
        hooks.hinted = true;
        await hooks.onHint(page, hintText);
      }
    }
    if (step && step.did) { log.push(step.why + ":" + (step.id || "")); continue; }
    const action = await nudge(page);
    if (action === "tf-btn") {
      tfRun++;
      const trues = page.locator("button", { hasText: /^True$/ });
      const tn = await trues.count();
      for (let t = 0; t < tn; t++) await trues.nth(t).click({ timeout: 1500 }).catch(() => {});
      const areas = page.locator("textarea");
      const an = await areas.count();
      for (let t = 0; t < an; t++) {
        const v = await areas.nth(t).inputValue().catch(() => "x");
        if (!String(v).trim()) await areas.nth(t).fill("the passage says so").catch(() => {});
      }
      if (tfRun > 6) {
        const sub = page.getByRole("button", { name: /^(Submit|Submit Answers|Next Page|Finish Section|Next Section)/ });
        if (await sub.count()) await sub.first().click({ timeout: 1500 }).catch(() => {});
      }
    } else tfRun = 0;
    log.push(action);
    if (action === "stuck") {
      const stuck = log.slice(-8).every((x) => x === "stuck" || x === "none");
      if (stuck && log.length > 12) break;
    }
    await page.waitForTimeout(30);
  }
  await page.screenshot({ path: "docs/e2e-2026-11-23/stuck-" + label + ".png", fullPage: true }).catch(() => {});
  const snippet = (await page.locator("body").innerText().catch(() => "")).slice(0, 400);
  throw new Error("Score driver timed out during " + label + " last=" + log.slice(-12).join(",") + "\n" + snippet);
}

module.exports = { driveToScore, planWrongs, norm };
