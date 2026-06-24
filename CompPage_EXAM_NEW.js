function CompPage({ set, sectionLabel, marks, onPageDone }) {
  const questions = set.questions || [];
  const passage   = set.passage   || '';

  const [answers,   setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeQ,   setActiveQ]   = useState(null);
  const startRef = useRef(Date.now());

  // Exam typography tokens -- no emojis, no bright colors
  const EX = {
    border: '1.5px solid #1a1a1a',
    thin:   '1px solid #1a1a1a',
    font:   "'Times New Roman', Georgia, serif",
    sans:   'Arial, sans-serif',
    ink:    '#1a1a1a',
    correct:'#dfeede',
    wrong:  '#f5dede',
    sel:    '#e9e9e9',
    muted:  '#555',
    faint:  '#888',
  };

  // -------------------------------------------------
  // Format detection -- new 8-type schema takes priority
  // -------------------------------------------------
  function getFormat(q) {
    const f = q.format || '';
    const NEW_FORMATS = ['fill_blank','fill_word','mcq','ab_circle','true_false','sequence','tf_reason','open_sentence'];
    if (NEW_FORMATS.includes(f)) return f;
    // Legacy aliases from old schema
    if (f === 'truefalse')         return 'true_false';
    if (f === 'truefalse_reason')  return 'tf_reason';
    if (f === 'fill' || f === 'fill_short') return 'fill_blank';
    if (f === 'open' || f === 'open_multi') return 'open_sentence';
    // Infer from structure fields
    if (q.statements && q.statements.length) return 'true_false';
    if (q.abSentence || q.abChoices)         return 'ab_circle';
    if (q.sequenceItems && q.sequenceItems.length) return 'sequence';
    if (q.options && q.options.length >= 2)  return 'mcq';
    return 'open_sentence';
  }

  function norm(s) {
    return String(s || '').trim().toLowerCase().replace(/[.,!?'"]/g, '');
  }

  function isAutoGraded(q) {
    return ['mcq','ab_circle','true_false','sequence','fill_blank','fill_word'].includes(getFormat(q));
  }

  function isAnswered(q) {
    const f   = getFormat(q);
    const val = answers[q.id];
    if (f === 'true_false') {
      const stmts = q.statements || [];
      return stmts.length > 0 && stmts.every((_, si) => (val || [])[si] !== undefined);
    }
    if (f === 'sequence') {
      const items = q.sequenceItems || q.items || [];
      return items.length > 0 && items.every((_, i) => answers[q.id + '_seq_' + i] !== undefined);
    }
    if (f === 'tf_reason') {
      return val !== undefined && (answers[q.id + '_reason'] || '').trim().length > 0;
    }
    return val !== undefined && String(val).trim().length > 0;
  }

  const allAnswered = questions.length > 0 && questions.every(isAnswered);

  // -------------------------------------------------
  // Grading
  // -------------------------------------------------
  function correctIdxForMcq(q) {
    const opts = (q.options || []).map(o => typeof o === 'string' ? o : String(o.text || o));
    const a = q.answer;
    if (typeof a === 'number') return a;
    if (typeof a === 'string') {
      const li = a.toUpperCase().charCodeAt(0) - 65;
      if (li >= 0 && li < opts.length) return li;
      const n = parseInt(a, 10);
      if (!isNaN(n)) return n >= 1 ? n - 1 : n;
    }
    return 0;
  }

  function gradeQuestion(q) {
    const f   = getFormat(q);
    const val = answers[q.id];
    if (f === 'mcq')       return val === correctIdxForMcq(q);
    if (f === 'ab_circle') return norm(val) === norm(q.answer);
    if (f === 'true_false') {
      const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
      return correct.every((a, i) => norm((val || [])[i]) === norm(a));
    }
    if (f === 'sequence') {
      const items   = q.sequenceItems || q.items || [];
      const correct = Array.isArray(q.answer) ? q.answer : String(q.answer || '').split(',').map(Number);
      return items.every((_, i) => parseInt(answers[q.id + '_seq_' + i] || '0', 10) === correct[i]);
    }
    if (f === 'fill_blank' || f === 'fill_word') {
      const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
      return accept.some(a => norm(val) === norm(a));
    }
    if (f === 'tf_reason') return norm(val) === norm(q.answer);
    return false; // open_sentence -- not auto-graded
  }

  // -------------------------------------------------
  // Submit / Finish
  // -------------------------------------------------
  function handleSubmit() {
    if (submitted || !allAnswered) return;
    setSubmitted(true);
    setActiveQ(questions[0]?.id || null);
  }

  function handleFinish() {
    const t = Date.now() - startRef.current;
    const results = questions.map(q => ({
      id:          q.id,
      topic:       'Comprehension',
      sectionType: 'Comprehension',
      correct:     gradeQuestion(q),
      timeTaken:   Math.round(t / Math.max(questions.length, 1)),
    }));
    onPageDone(results);
    onPageDone(null, true);
  }

  // -------------------------------------------------
  // Passage with post-submit highlights
  // -------------------------------------------------
  function renderPassageText(aq) {
    if (!passage) return null;
    const evidence = aq?.solution?.evidence || null;
    const trap     = aq?.solution?.trap     || null;
    if (!evidence && !trap) {
      return <span style={{ whiteSpace: 'pre-line', lineHeight: 2.05 }}>{passage}</span>;
    }
    let segs = [{ text: passage, type: 'plain' }];
    function applyHl(segArr, target, type) {
      if (!target) return segArr;
      const out = [];
      segArr.forEach(seg => {
        if (seg.type !== 'plain') { out.push(seg); return; }
        const idx = seg.text.indexOf(target);
        if (idx === -1) { out.push(seg); return; }
        if (idx > 0) out.push({ text: seg.text.slice(0, idx), type: 'plain' });
        out.push({ text: target, type });
        const after = seg.text.slice(idx + target.length);
        if (after) out.push({ text: after, type: 'plain' });
      });
      return out;
    }
    segs = applyHl(segs, evidence, 'evidence');
    segs = applyHl(segs, trap,     'trap');
    return (
      <span style={{ whiteSpace: 'pre-line', lineHeight: 2.05 }}>
        {segs.map((seg, i) => {
          if (seg.type === 'plain')
            return <span key={i}>{seg.text}</span>;
          if (seg.type === 'evidence')
            return <span key={i} style={{ borderBottom: '2px solid #1a1a1a', fontWeight: 700 }}>{seg.text}</span>;
          return <span key={i} style={{ borderBottom: '1px dashed #999', fontStyle: 'italic' }}>{seg.text}</span>;
        })}
      </span>
    );
  }

  // -------------------------------------------------
  // Per-format input renderers (exam style)
  // -------------------------------------------------
  function renderInput(q) {
    const f   = getFormat(q);
    const val = answers[q.id];

    // -- FILL_BLANK --------------------------------
    if (f === 'fill_blank') {
      const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
      const ok  = submitted && accept.some(a => norm(val) === norm(a));
      const bad = submitted && !ok;
      return (
        <div style={{ marginTop: 10 }}>
          {!submitted ? (
            <input type="text" value={val || ''}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              style={{ border: 'none', borderBottom: EX.border, minWidth: 200,
                padding: '2px 6px', fontSize: 14, fontFamily: EX.font,
                outline: 'none', background: 'transparent' }} />
          ) : (
            <div>
              <span style={{ fontFamily: EX.font, fontSize: 14 }}>
                <u>{val || '(blank)'}</u>
              </span>
              <div style={{ fontFamily: EX.sans, fontSize: 12, fontWeight: 700,
                color: ok ? '#1a6b2e' : '#9b1c1c', marginTop: 6 }}>
                {ok ? 'CORRECT' : 'INCORRECT'}
              </div>
              {bad && q.answer && (
                <div style={{ marginTop: 4, border: EX.thin, padding: '6px 12px',
                  fontFamily: EX.font, fontSize: 14 }}>
                  {q.answer}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- FILL_WORD ---------------------------------
    if (f === 'fill_word') {
      const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
      const ok  = submitted && accept.some(a => norm(val) === norm(a));
      const bad = submitted && !ok;
      return (
        <div style={{ marginTop: 10 }}>
          {!submitted ? (
            <input type="text" value={val || ''}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              style={{ border: EX.border, width: '100%', maxWidth: 280,
                padding: '8px 12px', fontSize: 14, fontFamily: EX.font, outline: 'none' }} />
          ) : (
            <div>
              <div style={{ display: 'inline-block', border: EX.thin, padding: '5px 12px',
                fontFamily: EX.font, fontSize: 14, maxWidth: 280 }}>
                {val || '(blank)'}
              </div>
              <div style={{ fontFamily: EX.sans, fontSize: 12, fontWeight: 700,
                color: ok ? '#1a6b2e' : '#9b1c1c', marginTop: 6 }}>
                {ok ? 'CORRECT' : 'INCORRECT'}
              </div>
              {bad && q.answer && (
                <div style={{ marginTop: 4, border: EX.thin, padding: '6px 12px',
                  fontFamily: EX.font, fontSize: 14 }}>
                  {q.answer}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- MCQ ---------------------------------------
    if (f === 'mcq') {
      const opts   = (q.options || []).map(o => typeof o === 'string' ? o : String(o.text || o));
      const corr   = correctIdxForMcq(q);
      const chosen = val;
      return (
        <div style={{ marginTop: 10 }}>
          <table style={{ border: EX.border, borderCollapse: 'collapse', minWidth: 260, width: 'auto' }}>
            <tbody>
              {opts.map((opt, i) => {
                let bg = 'transparent';
                if (submitted) { if (i === corr) bg = EX.correct; else if (chosen === i) bg = EX.wrong; }
                else if (chosen === i) bg = EX.sel;
                return (
                  <tr key={i} style={{ background: bg }}
                    onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: i }))}>
                    <td style={{ border: EX.thin, padding: '7px 12px', width: 46, textAlign: 'center',
                      fontFamily: EX.sans, fontWeight: 700, fontSize: 13,
                      cursor: submitted ? 'default' : 'pointer' }}>
                      ({i + 1})
                    </td>
                    <td style={{ border: EX.thin, padding: '7px 14px', fontFamily: EX.font, fontSize: 14,
                      cursor: submitted ? 'default' : 'pointer' }}>
                      {opt}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ fontFamily: EX.sans, fontSize: 14, marginTop: 6 }}>
            Answer:{' '}
            <span style={{ display: 'inline-block', minWidth: 42, border: EX.thin,
              padding: '2px 10px', textAlign: 'center', fontWeight: 700 }}>
              {chosen !== undefined ? '(' + (chosen + 1) + ')' : '(  )'}
            </span>
          </div>
        </div>
      );
    }

    // -- AB_CIRCLE ---------------------------------
    if (f === 'ab_circle') {
      const sentence = q.abSentence || q.stem || '';
      const choices  = q.abChoices  || {};
      const chosen   = val;
      const matchArr = [...sentence.matchAll(/\(([AB])\)\s*(\S+)/g)];

      if (!matchArr.length) {
        // Fallback: show plain A / B buttons from abChoices
        return (
          <div style={{ marginTop: 10, border: EX.border, padding: '12px 16px', fontFamily: EX.font, fontSize: 14 }}>
            {['A', 'B'].map(lab => {
              let bg = 'transparent';
              if (submitted) { if (lab === q.answer) bg = EX.correct; else if (chosen === lab) bg = EX.wrong; }
              else if (chosen === lab) bg = EX.sel;
              return (
                <span key={lab}
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: lab }))}
                  style={{ fontWeight: 700, borderBottom: '2px solid #1a1a1a', padding: '0 2px',
                    background: bg, cursor: submitted ? 'default' : 'pointer',
                    userSelect: 'none', marginRight: 16 }}>
                  ({lab}) {choices[lab] || lab}
                </span>
              );
            })}
          </div>
        );
      }

      // Build sentence segments: plain text + interactive (A)/(B) word spans
      const parts = [];
      let pos = 0;
      for (const m of matchArr) {
        if (m.index > pos) parts.push({ type: 'text', text: sentence.slice(pos, m.index) });
        parts.push({ type: 'word', lab: m[1], word: m[2] });
        pos = m.index + m[0].length;
      }
      if (pos < sentence.length) parts.push({ type: 'text', text: sentence.slice(pos) });

      return (
        <div style={{ marginTop: 10, border: EX.border, padding: '12px 16px',
          fontSize: 14, lineHeight: 1.9, fontFamily: EX.font }}>
          {parts.map((part, pi) => {
            if (part.type === 'text') return <span key={pi}>{part.text}</span>;
            const lab = part.lab;
            let bg = 'transparent';
            if (submitted) { if (lab === q.answer) bg = EX.correct; else if (chosen === lab) bg = EX.wrong; }
            else if (chosen === lab) bg = EX.sel;
            return (
              <span key={pi}
                onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: lab }))}
                style={{ fontWeight: 700, borderBottom: '2px solid #1a1a1a', padding: '0 2px',
                  background: bg, cursor: submitted ? 'default' : 'pointer', userSelect: 'none' }}>
                {part.word}
                <span style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                  verticalAlign: 'super', color: EX.muted }}>({lab})</span>
              </span>
            );
          })}
        </div>
      );
    }

    // -- TRUE_FALSE --------------------------------
    if (f === 'true_false') {
      const stmts   = q.statements || [];
      const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
      return (
        <div style={{ marginTop: 10 }}>
          <table style={{ border: EX.border, borderCollapse: 'collapse', width: '100%', fontFamily: EX.font }}>
            <thead>
              <tr>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', width: 54 }}></th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', textAlign: 'left' }}>Statement</th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', width: 64, textAlign: 'center' }}>True</th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', width: 64, textAlign: 'center' }}>False</th>
              </tr>
            </thead>
            <tbody>
              {stmts.map((stmt, si) => {
                const lab    = String.fromCharCode(97 + si);
                const chosen = (val || [])[si];
                const corr   = correct[si];
                function tfCell(t) {
                  let bg = 'transparent';
                  if (submitted) { if (t === corr) bg = EX.correct; else if (chosen === t) bg = EX.wrong; }
                  else if (chosen === t) bg = EX.sel;
                  return (
                    <td key={t}
                      onClick={() => {
                        if (submitted) return;
                        const next = [...(answers[q.id] || [])];
                        next[si] = t;
                        setAnswers(a => ({ ...a, [q.id]: next }));
                      }}
                      style={{ border: EX.thin, padding: '9px 6px', textAlign: 'center',
                        cursor: submitted ? 'default' : 'pointer', background: bg, fontSize: 16 }}>
                      {chosen === t ? '\u2713' : (submitted && t === corr ? '\u2713' : '')}
                    </td>
                  );
                }
                return (
                  <tr key={si}>
                    <td style={{ border: EX.thin, padding: '9px 6px', textAlign: 'center',
                      fontWeight: 700, fontFamily: EX.sans, fontSize: 13 }}>({lab})</td>
                    <td style={{ border: EX.thin, padding: '9px 11px', fontSize: 13.5, verticalAlign: 'top' }}>
                      {stmt}
                    </td>
                    {tfCell('True')}
                    {tfCell('False')}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // -- SEQUENCE ----------------------------------
    if (f === 'sequence') {
      const items   = q.sequenceItems || q.items || [];
      const correct = Array.isArray(q.answer) ? q.answer : String(q.answer || '').split(',').map(Number);
      const maxN    = items.length;
      return (
        <div style={{ marginTop: 10 }}>
          <table style={{ border: EX.border, borderCollapse: 'collapse', width: '100%', fontFamily: EX.font }}>
            <tbody>
              {items.map((item, ii) => {
                const key    = q.id + '_seq_' + ii;
                const chosen = answers[key];
                const corr   = correct[ii];
                const ok     = submitted && chosen === corr;
                return (
                  <tr key={ii}>
                    <td style={{ border: EX.thin, padding: '10px 12px', width: 90, textAlign: 'center',
                      background: submitted ? (ok ? EX.correct : EX.wrong) : 'transparent' }}>
                      <span style={{ display: 'inline-flex', gap: 3 }}>
                        {Array.from({ length: maxN }, (_, n) => n + 1).map(n => (
                          <button key={n}
                            onClick={() => !submitted && setAnswers(a => ({ ...a, [key]: n }))}
                            style={{ width: 24, height: 24, border: EX.thin,
                              background: chosen === n ? '#1a1a1a' : '#fff',
                              color:      chosen === n ? '#fff'    : '#1a1a1a',
                              fontFamily: EX.sans, fontSize: 12,
                              cursor: submitted ? 'default' : 'pointer' }}>
                            {n}
                          </button>
                        ))}
                      </span>
                    </td>
                    <td style={{ border: EX.thin, padding: '10px 12px', fontSize: 13.5 }}>
                      {item}
                      {submitted && !ok && (
                        <span style={{ fontFamily: EX.sans, fontSize: 12, color: '#9b1c1c', marginLeft: 8 }}>
                          (should be {corr})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // -- TF_REASON ---------------------------------
    if (f === 'tf_reason') {
      const tfVal   = val;
      const reason  = answers[q.id + '_reason'] || '';
      const correct = typeof q.answer === 'object' ? q.answer?.verdict : q.answer;
      const modelAns = (q.acceptableAnswers && q.acceptableAnswers[0]) || q.solution?.evidence || '';
      return (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {['True', 'False'].map(opt => {
              let bg = '#fff';
              if (submitted) {
                if (norm(opt) === norm(correct)) bg = EX.correct;
                else if (norm(tfVal) === norm(opt)) bg = EX.wrong;
              } else if (tfVal === opt) bg = EX.sel;
              return (
                <button key={opt}
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: opt }))}
                  style={{ flex: 1, padding: '8px 0', border: EX.border, background: bg,
                    color: EX.ink, fontFamily: EX.sans, fontWeight: 700, fontSize: 14,
                    cursor: submitted ? 'default' : 'pointer' }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {!submitted ? (
            <textarea value={reason} rows={3}
              onChange={e => setAnswers(a => ({ ...a, [q.id + '_reason']: e.target.value }))}
              placeholder="Give a reason for your answer..."
              style={{ width: '100%', padding: '8px 12px', border: EX.border,
                fontFamily: EX.font, fontSize: 14, outline: 'none',
                resize: 'vertical', boxSizing: 'border-box' }} />
          ) : (
            <div>
              <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                Your reason
              </div>
              <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: 14, minHeight: 40 }}>
                {reason || '(no reason given)'}
              </div>
              {modelAns && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                    Model answer
                  </div>
                  <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: 14 }}>
                    {modelAns}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- OPEN_SENTENCE (default) -------------------
    const openVal  = val || '';
    const modelAns = typeof q.answer === 'string' ? q.answer : '';
    return (
      <div style={{ marginTop: 10 }}>
        {!submitted ? (
          <textarea value={openVal} rows={3}
            onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
            placeholder="Write your answer in a complete sentence..."
            style={{ width: '100%', padding: '8px 12px', border: EX.border,
              fontFamily: EX.font, fontSize: 14, outline: 'none',
              resize: 'vertical', boxSizing: 'border-box' }} />
        ) : (
          <div>
            <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
              Your answer
            </div>
            <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font,
              fontSize: 14, minHeight: 40, whiteSpace: 'pre-line' }}>
              {openVal || '(no answer given)'}
            </div>
            {modelAns && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                  Model answer
                </div>
                <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: 14 }}>
                  {modelAns}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------
  // Evidence box (post-submit, black-and-white exam style)
  // -------------------------------------------------
  function renderEvidenceBox(q) {
    if (!submitted) return null;
    const sol = q.solution || {};
    const tip            = sol.tip            || '';
    const evidence       = sol.evidence       || '';
    const trap           = sol.trap           || '';
    const trapExplanation= sol.trapExplanation|| '';
    const answerFormat   = sol.answerFormat   || '';
    const steps          = sol.steps          || [];
    if (!tip && !evidence && !trap && !answerFormat && !steps.length) return null;

    function exBox(label, content, clickable) {
      return (
        <div key={label}
          onClick={clickable ? () => setActiveQ(q.id) : undefined}
          style={{ border: '1px solid #bbb', padding: '9px 12px', fontSize: 13,
            marginBottom: 8, cursor: clickable ? 'pointer' : 'default', fontFamily: EX.font }}>
          <div style={{ fontFamily: EX.sans, fontWeight: 700, fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 4 }}>
            {label}
          </div>
          {content}
        </div>
      );
    }

    return (
      <div style={{ marginTop: 12, borderTop: '1px solid #ccc', paddingTop: 12 }}>
        {tip && exBox('Tip', <div>{tip}</div>)}
        {evidence && exBox('Where to find it',
          <div>
            <div style={{ borderLeft: '3px solid #1a1a1a', paddingLeft: 9, fontStyle: 'italic', marginBottom: 4 }}>
              "{evidence}"
            </div>
            <div style={{ fontFamily: EX.sans, fontSize: 11, color: EX.faint }}>
              Tap to highlight in the passage
            </div>
          </div>, true
        )}
        {trap && exBox('Trap to avoid',
          <div>"{trap}"{trapExplanation ? ' -- ' + trapExplanation : ''}</div>
        )}
        {answerFormat && exBox('Answer format', <div>{answerFormat}</div>)}
        {steps.length > 0 && (
          <div style={{ fontFamily: EX.font, fontSize: 13, paddingLeft: 4 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ marginBottom: 3 }}>{i + 1}. {step}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------
  // Layout
  // -------------------------------------------------
  const activeQuestion    = submitted ? (questions.find(q => q.id === activeQ) || null) : null;
  const autoGradedTotal   = questions.filter(isAutoGraded).length;
  const autoGradedScore   = submitted ? questions.filter(q => isAutoGraded(q) && gradeQuestion(q)).length : 0;
  const openTotal         = questions.filter(q => !isAutoGraded(q)).length;

  const passagePanel = (
    <div style={{ fontFamily: EX.font, fontSize: 15.5, lineHeight: 2.05, color: EX.ink }}>
      <div style={{ fontFamily: EX.sans, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 1, borderBottom: '1px solid #ccc', paddingBottom: 8, marginBottom: 14, color: '#333' }}>
        Read the Passage
      </div>
      {renderPassageText(activeQuestion)}
      {submitted && activeQuestion && (
        <div style={{ marginTop: 14, fontFamily: EX.sans, fontSize: 11, color: EX.faint,
          display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <span>
            <span style={{ borderBottom: '2px solid #1a1a1a', fontWeight: 700, marginRight: 4 }}>
              evidence
            </span>
            Evidence
          </span>
          <span>
            <span style={{ borderBottom: '1px dashed #999', fontStyle: 'italic', marginRight: 4 }}>
              trap
            </span>
            Trap to avoid
          </span>
        </div>
      )}
    </div>
  );

  const questionsPanel = (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12, fontFamily: EX.sans }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: EX.muted }}>
          {sectionLabel} ({marks} mark{marks !== 1 ? 's' : ''})
        </span>
        {submitted && (
          <span style={{ fontSize: 13, fontWeight: 800,
            color: autoGradedScore === autoGradedTotal ? '#1a6b2e' : '#9b1c1c' }}>
            {autoGradedScore}/{autoGradedTotal} correct
            {openTotal > 0 && ' + ' + openTotal + ' open'}
          </span>
        )}
      </div>

      {questions.map((q, qi) => {
        const f        = getFormat(q);
        const isActive = activeQ === q.id && submitted;
        const tagLabel = f.replace(/_/g, ' ').toUpperCase();
        return (
          <div key={q.id}
            onClick={() => submitted && setActiveQ(q.id)}
            style={{ background: '#fff',
              border: isActive ? '2px solid #1a1a1a' : EX.border,
              padding: '16px 18px', marginBottom: 16,
              cursor: submitted ? 'pointer' : 'default' }}>

            {/* Header: Q41. [1m]               FILL BLANK */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12,
              alignItems: 'baseline', fontFamily: EX.sans }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{q.questionNo || qi + 1}.</span>
              {q.marks && <span style={{ fontSize: 11, color: EX.faint }}>[{q.marks}m]</span>}
              <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700,
                letterSpacing: '.5px', textTransform: 'uppercase', color: EX.muted,
                border: '1px solid #aaa', padding: '2px 7px' }}>
                {tagLabel}
              </span>
            </div>

            {/* Stem */}
            <div style={{ fontSize: 14.5, lineHeight: 1.55, whiteSpace: 'pre-line',
              fontFamily: EX.font }}>
              {q.stem || q.question || ''}
            </div>

            {/* Format-specific input */}
            {renderInput(q)}

            {/* Explanation boxes (post-submit) */}
            {renderEvidenceBox(q)}
          </div>
        );
      })}

      {/* Submit / Next Section */}
      {!submitted ? (
        <button onClick={handleSubmit} disabled={!allAnswered}
          style={{ width: '100%', padding: '13px', fontFamily: EX.sans,
            background: allAnswered ? EX.ink : '#bbb',
            color: '#fff', border: 'none', fontSize: 14, fontWeight: 700,
            cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
          {allAnswered ? 'Submit Answers' : 'Answer all questions to submit'}
        </button>
      ) : (
        <button onClick={handleFinish}
          style={{ width: '100%', padding: '13px', fontFamily: EX.sans,
            background: EX.ink, color: '#fff', border: 'none',
            fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Next Section
        </button>
      )}
    </div>
  );

  if (typeof SplitViewLayout !== 'undefined') {
    return (
      <SplitViewLayout
        leftContent={passagePanel}
        rightContent={questionsPanel}
        leftLabel="Read the Passage"
        rightLabel="Questions"
        headerHeight={80}
      />
    );
  }

  return (
    <div style={{ padding: '0 0 80px' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #E2E8F0', marginBottom: 12 }}>
        {passagePanel}
      </div>
      <div style={{ padding: '0 16px' }}>{questionsPanel}</div>
    </div>
  );
}
