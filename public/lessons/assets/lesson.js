/* =========================================================
   PalBook Live — Shared Lesson Framework (logic)
   Activates interactions from markup classes/data-attributes,
   so each lesson stays readable HTML. Created for T. Wad Refae.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Section navigation + progress ---------- */
  const sections = Array.from(document.querySelectorAll('.section'));
  const steps = Array.from(document.querySelectorAll('.stepper button'));
  const fill = document.querySelector('.progress-fill');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const counter = document.getElementById('navCounter');
  let current = 0;

  function show(i) {
    current = Math.max(0, Math.min(sections.length - 1, i));
    sections.forEach((s, idx) => s.classList.toggle('active', idx === current));
    steps.forEach((b, idx) => {
      b.classList.toggle('active', idx === current);
      b.classList.toggle('done', idx < current);
    });
    if (fill) fill.style.width = ((current + 1) / sections.length) * 100 + '%';
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.textContent = current === sections.length - 1 ? 'Finish ✓' : 'Next ›';
    if (counter) counter.textContent = (current + 1) + ' / ' + sections.length;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  steps.forEach((b, idx) => b.addEventListener('click', () => show(idx)));
  if (prevBtn) prevBtn.addEventListener('click', () => show(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => show(current + 1));

  /* ---------- MCQ (Choose) ---------- */
  // <div class="ex mcq"><p class="q">..</p>
  //   <div class="options"><button class="option" data-correct>..</button>...</div>
  //   <div class="feedback"></div></div>
  document.querySelectorAll('.mcq').forEach((ex) => {
    const opts = ex.querySelectorAll('.option');
    const fb = ex.querySelector('.feedback');
    opts.forEach((opt) => {
      opt.addEventListener('click', () => {
        const correct = opt.hasAttribute('data-correct');
        opts.forEach((o) => {
          o.disabled = true;
          if (o.hasAttribute('data-correct')) o.classList.add('correct');
        });
        if (!correct) opt.classList.add('wrong');
        if (fb) {
          fb.textContent = correct
            ? (opt.dataset.ok || 'Correct! 🎉')
            : (opt.dataset.no || 'Not quite — see the highlighted answer.');
          fb.className = 'feedback ' + (correct ? 'ok' : 'no');
        }
      });
    });
  });

  /* ---------- Fill in the blank ---------- */
  // <div class="ex fill"> ... <input data-answer="goes"> ...
  //   <button class="btn check-fill">Check</button><div class="feedback"></div></div>
  document.querySelectorAll('.fill').forEach((ex) => {
    const btn = ex.querySelector('.check-fill');
    const fb = ex.querySelector('.feedback');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const inputs = ex.querySelectorAll('input[data-answer]');
      let ok = 0;
      inputs.forEach((inp) => {
        const answers = inp.dataset.answer.split('|').map((a) => a.trim().toLowerCase());
        const val = inp.value.trim().toLowerCase();
        const good = answers.includes(val);
        inp.classList.toggle('correct', good);
        inp.classList.toggle('wrong', !good);
        if (good) ok++;
      });
      if (fb) {
        const all = ok === inputs.length;
        fb.textContent = all ? 'All correct! 🎉' : ok + ' / ' + inputs.length + ' correct — try the red ones again.';
        fb.className = 'feedback ' + (all ? 'ok' : 'no');
      }
    });
  });

  /* ---------- Match ---------- */
  // <div class="ex match-ex"><div class="match">
  //   <div class="col left">  <button class="item" data-key="a">..</button> ...
  //   <div class="col right"> <button class="item" data-key="a">..</button> ... (shuffled)
  // </div><div class="feedback"></div></div>
  document.querySelectorAll('.match-ex').forEach((ex) => {
    let selected = null;
    const fb = ex.querySelector('.feedback');
    const items = ex.querySelectorAll('.match .item');
    let done = 0;
    items.forEach((it) => {
      it.addEventListener('click', () => {
        if (it.classList.contains('matched')) return;
        const side = it.closest('.col').classList.contains('left') ? 'left' : 'right';
        if (!selected) {
          selected = it; it.classList.add('selected'); return;
        }
        if (selected === it) { it.classList.remove('selected'); selected = null; return; }
        const selSide = selected.closest('.col').classList.contains('left') ? 'left' : 'right';
        if (selSide === side) { // same column, switch selection
          selected.classList.remove('selected'); selected = it; it.classList.add('selected'); return;
        }
        if (selected.dataset.key === it.dataset.key) {
          selected.classList.remove('selected');
          selected.classList.add('matched'); it.classList.add('matched');
          selected = null; done++;
          if (done === items.length / 2 && fb) {
            fb.textContent = 'Great matching! 🎉'; fb.className = 'feedback ok';
          }
        } else {
          const a = selected, b = it;
          a.classList.add('wrong'); b.classList.add('wrong');
          setTimeout(() => { a.classList.remove('wrong', 'selected'); b.classList.remove('wrong'); }, 450);
          selected = null;
          if (fb) { fb.textContent = 'Not a pair — try again.'; fb.className = 'feedback no'; }
        }
      });
    });
  });

  /* ---------- Drag & Drop ---------- */
  // <div class="ex dragdrop">
  //   <div class="dd-pool"> <span class="dd-token" data-zone="z1">word</span> ...
  //   <div class="dd-zones"> <div class="dd-zone" data-zone="z1"><span class="label">..</span></div> ...
  //   <button class="btn check-dd">Check</button><div class="feedback"></div></div>
  document.querySelectorAll('.dragdrop').forEach((ex) => {
    let dragged = null;
    ex.querySelectorAll('.dd-token').forEach((tok) => {
      tok.setAttribute('draggable', 'true');
      tok.addEventListener('dragstart', () => { dragged = tok; tok.classList.add('dragging'); });
      tok.addEventListener('dragend', () => { dragged = null; tok.classList.remove('dragging'); });
    });
    ex.querySelectorAll('.dd-zone, .dd-pool').forEach((zone) => {
      zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('over'));
      zone.addEventListener('drop', (e) => {
        e.preventDefault(); zone.classList.remove('over');
        if (dragged) zone.appendChild(dragged);
      });
    });
    const btn = ex.querySelector('.check-dd');
    const fb = ex.querySelector('.feedback');
    if (btn) btn.addEventListener('click', () => {
      let ok = 0; const zones = ex.querySelectorAll('.dd-zone');
      zones.forEach((zone) => {
        const want = zone.dataset.zone;
        const toks = zone.querySelectorAll('.dd-token');
        const good = toks.length > 0 && Array.from(toks).every((t) => t.dataset.zone === want);
        zone.classList.toggle('correct', good);
        zone.classList.toggle('wrong', !good);
        if (good) ok++;
      });
      if (fb) {
        const all = ok === zones.length;
        fb.textContent = all ? 'Perfect! 🎉' : ok + ' / ' + zones.length + ' zones correct.';
        fb.className = 'feedback ' + (all ? 'ok' : 'no');
      }
    });
  });

  /* ---------- Assessment (auto-graded) ---------- */
  // <div class="assessment"> [.mcq-q and .fill-q items]
  //   <button class="btn submit-assess">Submit</button>
  //   <div class="result"><div class="score"></div><p class="msg"></p></div></div>
  document.querySelectorAll('.assessment').forEach((quiz) => {
    const submit = quiz.querySelector('.submit-assess');
    const result = quiz.querySelector('.result');
    if (!submit) return;
    submit.addEventListener('click', () => {
      let score = 0, total = 0;

      quiz.querySelectorAll('.mcq-q').forEach((q) => {
        total++;
        const opts = q.querySelectorAll('.option');
        const chosen = q.querySelector('.option.chosen');
        opts.forEach((o) => {
          o.disabled = true;
          if (o.hasAttribute('data-correct')) o.classList.add('correct');
        });
        const fb = q.querySelector('.feedback');
        if (chosen && chosen.hasAttribute('data-correct')) {
          score++; if (fb) { fb.textContent = 'Correct ✓'; fb.className = 'feedback ok'; }
        } else {
          if (chosen) chosen.classList.add('wrong');
          if (fb) { fb.textContent = chosen ? 'Incorrect ✗' : 'No answer — see correct.'; fb.className = 'feedback no'; }
        }
      });

      quiz.querySelectorAll('.fill-q').forEach((q) => {
        total++;
        const inp = q.querySelector('input[data-answer]');
        const fb = q.querySelector('.feedback');
        if (!inp) return;
        const answers = inp.dataset.answer.split('|').map((a) => a.trim().toLowerCase());
        const good = answers.includes(inp.value.trim().toLowerCase());
        inp.classList.toggle('correct', good);
        inp.classList.toggle('wrong', !good);
        inp.disabled = true;
        if (good) { score++; if (fb) { fb.textContent = 'Correct ✓'; fb.className = 'feedback ok'; } }
        else if (fb) { fb.textContent = 'Answer: ' + inp.dataset.answer.split('|')[0]; fb.className = 'feedback no'; }
      });

      submit.disabled = true;
      if (result) {
        const pct = total ? Math.round((score / total) * 100) : 0;
        result.querySelector('.score').textContent = score + ' / ' + total;
        const msg = result.querySelector('.msg');
        if (msg) {
          msg.textContent = pct >= 80 ? 'Excellent work! 🌟 ممتاز'
            : pct >= 50 ? 'Good job — review and try again. عمل جيد'
            : 'Keep practising — you can do it! واصل التدريب';
        }
        result.classList.add('show');
        result.scrollIntoView({ behavior: 'smooth' });
      }
    });
    // mark chosen MCQ option inside assessment
    quiz.querySelectorAll('.mcq-q .option').forEach((opt) => {
      opt.addEventListener('click', () => {
        opt.closest('.mcq-q').querySelectorAll('.option').forEach((o) => o.classList.remove('chosen'));
        opt.classList.add('chosen');
      });
    });
  });

  // chosen-state style (injected so markup stays clean)
  const style = document.createElement('style');
  style.textContent = '.option.chosen{border-color:var(--accent);background:var(--peach);}';
  document.head.appendChild(style);

  show(0);
})();
