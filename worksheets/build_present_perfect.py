# -*- coding: utf-8 -*-
# Generator for the "Future" worksheets (will / be going to), 3 levels,
# matching the exact T. Wad Refae notebook design system.
import os

OUT = "/home/user/palbook-live/public/worksheets"
LINK = '<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Patrick+Hand&family=Aref+Ruqaa:wght@400;700&family=Marhey:wght@500;700&display=swap" rel="stylesheet">'

CSS = r'''
  :root{
    --paper:#ffffff; --outer:#e8e2d2;
    --rule:#cfe0f2; --margin:#f0a8a4;
    --blue:#1e4e9c; --blue-d:#173e7e; --red:#c22b1c;
    --hl-y:#fff3a1; --hl-p:#ffd9e0; --hl-g:#d8f3c9;
    --grey:#6d6a63;
  }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:var(--outer)}
  body{font-family:'Aref Ruqaa',serif;color:#222;direction:rtl}

  .page{
    position:relative;width:210mm;height:297mm;margin:12px auto;background:var(--paper);
    background-image:repeating-linear-gradient(to bottom,transparent 0 32px,var(--rule) 32px 33px);
    box-shadow:0 6px 22px rgba(0,0,0,.18);overflow:hidden;padding:13mm 13mm 9mm 19mm;
  }
  .page::before{content:"";position:absolute;top:0;bottom:0;right:13mm;width:2px;background:var(--margin)}
  .holes{position:absolute;left:5mm;top:0;bottom:0;width:8mm;display:flex;flex-direction:column;justify-content:space-around;align-items:center;padding:22px 0}
  .holes span{width:11px;height:11px;border-radius:50%;background:var(--outer);box-shadow:inset 0 0 0 2px #d8d1bf}
  .washi{position:absolute;top:4mm;left:50%;transform:translateX(-50%) rotate(-2deg);width:140px;height:22px;background:repeating-linear-gradient(45deg,#bcd7c4 0 10px,#a9c9b3 10px 20px);opacity:.85;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,.12)}

  .content{position:relative;z-index:2;height:100%;display:flex;flex-direction:column}

  .lesson-head{text-align:center;margin-top:4px}
  h1{font-family:'Caveat',cursive;color:var(--blue);font-size:42px;margin:2px 0 1px;text-align:center;direction:ltr;line-height:1.05}
  .subtitle{font-family:'Marhey',cursive;text-align:center;color:var(--red);font-size:14px;margin:0 0 2px}
  .squiggle{display:block;margin:0 auto 5px;width:280px;height:11px}
  .levelline{font-family:'Caveat',cursive;color:var(--red);font-weight:700;font-size:23px;direction:ltr;margin:1px 0 4px;text-align:center}
  .namedate{display:flex;justify-content:center;gap:46px;direction:ltr;font-family:'Patrick Hand',cursive;font-size:15px;color:#333;
    border-top:1px dashed #cbb8b5;border-bottom:1px dashed #cbb8b5;padding:5px 0;margin:0 0 3px}

  .ptitle{font-family:'Caveat',cursive;color:var(--blue);font-size:30px;text-align:center;direction:ltr;margin:4px 0 1px}

  .section,.q{position:relative;margin:7px 0;break-inside:avoid;page-break-inside:avoid}
  .sec-head{display:flex;align-items:center;gap:9px;margin-bottom:4px;direction:ltr;text-align:left}
  .badge{flex:none;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
    font-family:'Caveat',cursive;font-weight:700;font-size:18px;color:#fff;box-shadow:0 2px 4px rgba(0,0,0,.2)}
  .badge.red{background:var(--red)} .badge.blue{background:var(--blue)}
  .sec-title{font-family:'Marhey',cursive;font-size:17px;color:var(--blue-d)}

  .box{background:#fff;border:2px solid var(--blue);padding:8px 12px;margin:5px 0;break-inside:avoid;
    border-radius:255px 15px 225px 15px/15px 225px 15px 255px}
  .box.soft{border-color:#c9b9a0;border-style:solid}
  .formula{font-family:'Patrick Hand',cursive;direction:ltr;text-align:center;font-size:17px;color:var(--red);
    border:2px dashed var(--red);padding:5px 10px;border-radius:15px 225px 15px 255px/255px 15px 225px 15px;background:#fff;margin-top:5px}
  .def{font-size:14.5px;line-height:1.65;color:#333;margin:0}
  .def .en-fact{margin-top:2px}

  .hl-y{background:var(--hl-y);padding:0 3px;border-radius:4px}
  .hl-p{background:var(--hl-p);padding:0 3px;border-radius:4px}
  .hl-g{background:var(--hl-g);padding:0 3px;border-radius:4px}
  .en{direction:ltr;text-align:left;font-family:'Patrick Hand',cursive}
  .ing{color:var(--red);font-weight:700}
  .en-fact{display:block;direction:ltr;text-align:left;font-family:'Patrick Hand',cursive;color:var(--blue-d);font-size:12px;line-height:1.35}

  ul.facts{list-style:none;margin:4px 0;padding:0}
  ul.facts li{position:relative;padding:2px 20px 3px 0;font-size:13px;line-height:1.45}
  ul.facts li::before{content:"\2605";position:absolute;right:0;color:var(--red);font-size:12px;top:4px}

  table{width:100%;border-collapse:collapse;margin:6px 0;font-size:12px;background:#fff}
  th,td{border:2px solid var(--blue);padding:4px 6px;text-align:center}
  th{background:#eaf1fb;font-family:'Marhey',cursive;color:var(--blue-d)}
  td .en{display:inline-block}

  .examples{display:flex;flex-direction:column;gap:6px;margin-top:5px}
  .ex{position:relative;border:2px dashed var(--blue);border-radius:14px;padding:10px 12px 6px;background:#fff;break-inside:avoid}
  .ex .tag{position:absolute;top:-12px;right:14px;background:var(--red);color:#fff;font-family:'Marhey',cursive;
    font-size:11px;padding:2px 10px;border-radius:10px;box-shadow:0 2px 3px rgba(0,0,0,.2)}
  .ex .flow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;direction:ltr}
  .ex .base{font-family:'Patrick Hand',cursive;font-size:14px;color:#555}
  .ex .arrow{color:var(--red);font-size:19px}
  .ex .after{font-family:'Patrick Hand',cursive;font-size:15px;color:var(--blue)}

  .sticky{background:var(--hl-y);width:84%;margin:7px auto 2px;padding:9px 16px;transform:rotate(-1.5deg);
    box-shadow:2px 4px 8px rgba(0,0,0,.18);border-radius:4px 4px 10px 4px}
  .sticky .lbl{font-family:'Marhey',cursive;color:var(--red);font-size:14px;margin-bottom:3px}
  .sticky .txt{font-size:14px;line-height:1.75}

  .q-instr{margin-bottom:4px;direction:ltr;text-align:left}
  .q-instr .en-line{display:block;font-family:'Patrick Hand',cursive;color:var(--blue-d);font-size:13.5px;line-height:1.4}
  .q-instr .ar-line{display:block;direction:rtl;text-align:left;font-size:13.5px;line-height:1.45;color:#333;margin-top:1px}
  .q-instr .en{display:inline}
  ol.enlist{direction:ltr;text-align:left;font-family:'Patrick Hand',cursive;font-size:15px;line-height:1.95;padding-left:24px;margin:4px 0}
  ol.enlist li{margin-bottom:1px}
  .choices{direction:ltr;text-align:left;font-family:'Patrick Hand',cursive;font-size:14px}
  .choices .opt{display:inline-block;margin-right:15px}
  .blank{display:inline-block;min-width:82px;border-bottom:2px dotted var(--blue);margin:0 4px}
  .wordbank{border:2px dashed var(--red);border-radius:12px;padding:6px 12px;margin:6px 0;background:#fff;
    direction:ltr;text-align:center;font-family:'Patrick Hand',cursive;font-size:14px;color:var(--blue-d)}
  .wordbank b{font-family:'Marhey',cursive;color:var(--red);font-size:11px;display:block;margin-bottom:2px;direction:rtl}
  .match{display:flex;gap:20px;direction:ltr;font-family:'Patrick Hand',cursive;font-size:15px}
  .match .col{flex:1}
  .match .col .row{padding:5px 0;border-bottom:1px dotted #bbb;display:flex;justify-content:space-between}
  .writeline{border-bottom:2px dotted var(--blue);height:21px;margin:7px 0}
  .para{border:2px solid #c9b9a0;border-radius:12px;padding:11px 14px;background:#fff;direction:ltr;text-align:left;
    font-family:'Patrick Hand',cursive;font-size:15px;line-height:2.0;color:#333}

  .answerkey{border:3px double var(--red);border-radius:14px;padding:14px 18px;margin-top:8px;background:#fffdf5;break-inside:avoid}
  .answerkey .ak-title{font-family:'Marhey',cursive;color:var(--red);font-size:19px;margin-bottom:10px;text-align:center}
  .ak-row{direction:ltr;text-align:left;margin-bottom:9px;font-size:14px;line-height:1.9;color:#333}
  .ak-row .n{font-family:'Marhey',cursive;color:var(--blue);font-size:13px;direction:rtl;display:inline-block;margin-left:6px}
  .ak-row .v{font-family:'Patrick Hand',cursive}

  .foot{margin-top:auto;border-top:2px dashed #cbb8b5;padding-top:5px;display:flex;justify-content:space-between;align-items:center;
    direction:ltr;font-family:'Marhey',cursive;font-size:11px;color:var(--grey)}
  .foot .nm{font-family:'Caveat',cursive;color:var(--grey);font-size:18px}
  .foot .lic{flex:1;text-align:center;font-size:9px;padding:0 8px;white-space:nowrap;color:var(--grey)}
  .foot .lic a{color:inherit;text-decoration:none}

  @media print{
    html,body{background:#fff}
    .page{margin:0;box-shadow:none;page-break-after:always}
    .page:last-child{page-break-after:auto}
  }
  @page{size:A4;margin:0}
'''

SQ_R = '<svg class="squiggle" viewBox="0 0 280 11"><path d="M2 6 Q 16 0 30 6 T 58 6 T 86 6 T 114 6 T 142 6 T 170 6 T 198 6 T 226 6 T 254 6 T 278 6" fill="none" stroke="#c22b1c" stroke-width="2.5" stroke-linecap="round"/></svg>'
SQ_B = SQ_R.replace('#c22b1c', '#1e4e9c')

def head(title):
    return '<meta charset="utf-8">\n<title>' + title + '</title>\n' + LINK + '\n<style>' + CSS + '</style>\n'

def page(inner):
    holes = '<div class="holes">' + '<span></span>' * 5 + '</div>'
    return '<div class="page">\n<div class="washi"></div>\n' + holes + '\n<div class="content">\n' + inner + '\n</div>\n</div>\n'

def lesson_head(subtitle, level):
    return ('<div class="lesson-head">\n<h1>Present Perfect</h1>\n'
            '<p class="subtitle">' + subtitle + '</p>\n' + SQ_R + '\n'
            '<p class="levelline">' + level + '</p>\n'
            '<div class="namedate"><span>Name: ______________</span><span>Date: ______________</span></div>\n</div>\n')

def ptitle(txt, color=None):
    st = ' style="color:%s"' % color if color else ''
    sq = SQ_R if color == 'var(--red)' else SQ_B
    return '<div class="ptitle"%s>%s</div>\n%s\n' % (st, txt, sq)

def sec(badge, num, title, body):
    return ('<div class="section">\n<div class="sec-head"><div class="badge %s">%s</div><div class="sec-title">%s</div></div>\n%s</div>\n'
            % (badge, num, title, body))

def q(num, title, instr_en, instr_ar, body):
    ins = '<p class="q-instr"><span class="en-line">%s</span><span class="ar-line">%s</span></p>\n' % (instr_en, instr_ar)
    return ('<div class="q">\n<div class="sec-head"><div class="badge blue">%s</div><div class="sec-title">%s</div></div>\n%s%s</div>\n'
            % (num, title, ins, body))

def foot(name, label):
    left = '<span class="nm">T. Wad Refae</span>' if name else '<span></span>'
    lic = '<span class="lic">© 2026 T. Wad Refae · <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a></span>'
    return '<div class="foot">%s%s<span>%s</span></div>\n' % (left, lic, label)

def wl(w):
    return '<span class="writeline" style="display:inline-block;width:%s"></span>' % w

def fact(ar, en):
    return '<li>%s<span class="en-fact">%s</span></li>' % (ar, en)

def akbox(rows):
    h = '<div class="answerkey"><div class="ak-title">\U0001f511 Answer Key · مفتاح الإجابات للمعلمة</div>'
    for n, v in rows:
        h += '<div class="ak-row"><span class="n">%s</span> <span class="v">%s</span></div>' % (n, v)
    return h + '</div>'

OPEN = '<span style="direction:rtl;text-align:right;font-family:\'Aref Ruqaa\',serif">%s</span>'
docs = {}

# =========================================================================
# LEVEL 1 — Foundation: form (have/has + V3) & basic use
# =========================================================================
s = lesson_head('الماضي المتصل بالحاضر — The Present Perfect', 'Level 1 — Foundation')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">المضارع التام لحدثٍ وقع في الماضي وله <span class="hl-y">صلة أو نتيجة بالحاضر</span>، أو <span class="hl-g">خبرة في الحياة</span> (دون تحديد زمن).'
    '<span class="en-fact">For a past action connected to now (a result), or a life experience (no exact time).</span></p>'
    '<div class="formula">have / has + past participle (V3)</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">I/You/We/They + have</span> · <span class="en">He/She/It + has</span> + V3.', 'Choose have or has, then the past participle (V3).')
    + fact('V3: المنتظم <span class="en">+ed</span> (played) · الشاذ له شكل خاص (<span class="en">gone, seen, eaten, done, written</span>).', 'V3: regular +ed; irregular has a special form.')
    + fact('النفي: <span class="en">haven\'t / hasn\'t</span> · السؤال: <span class="en">Have / Has + subject + V3?</span>', 'Negative: haven\'t/hasn\'t. Question: Have/Has + subject + V3?')
    + '</ul>'
    '<table><tr><th>Subject</th><th>(+)</th><th>(−)</th><th>(?)</th></tr>'
    '<tr><td class="en">I/You/We/They</td><td class="en">have seen</td><td class="en">haven\'t seen</td><td class="en">Have you seen?</td></tr>'
    '<tr><td class="en">He/She/It</td><td class="en">has seen</td><td class="en">hasn\'t seen</td><td class="en">Has he seen?</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">١) اختر/ي <span class="hl-p en">have / has</span> حسب الفاعل &nbsp; ٢) أضِف/ي التصريف الثالث <span class="en">V3</span>.'
    '<span class="en-fact">1) Pick have / has for the subject &nbsp; 2) Add the past participle (V3).</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">نتيجة الآن</span><div class="flow"><span class="after">I <b>have cleaned</b> my room.</span></div></div>'
    '<div class="ex"><span class="tag">خبرة</span><div class="flow"><span class="after">We <b>have visited</b> Jaffa.</span></div></div>'
    '<div class="ex"><span class="tag">نتيجة الآن</span><div class="flow"><span class="after">He <b>has lost</b> his pen.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">المضارع التام = <span class="en"><b>have / has + V3</b></span> ← ماضٍ له صلة بالحاضر (خبرة أو نتيجة).</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose have or has.', 'اختر/ي have أو has.',
    '<ol class="enlist">'
    '<li>I ____ finished my work. <span class="choices">( have / has )</span></li>'
    '<li>She ____ eaten lunch. <span class="choices">( have / has )</span></li>'
    '<li>They ____ arrived. <span class="choices">( have / has )</span></li>'
    '<li>He ____ gone home. <span class="choices">( have / has )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct past participle (V3).', 'اختر/ي التصريف الثالث الصحيح.',
    '<ol class="enlist">'
    '<li>I have ____ my homework. <span class="choices"><span class="opt">a) do</span><span class="opt">b) did</span><span class="opt">c) done</span></span></li>'
    '<li>She has ____ to London. <span class="choices"><span class="opt">a) go</span><span class="opt">b) went</span><span class="opt">c) gone</span></span></li>'
    '<li>We have ____ the film. <span class="choices"><span class="opt">a) see</span><span class="opt">b) saw</span><span class="opt">c) seen</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with have/has + the past participle.', 'أكمِل/ي بـ have/has + التصريف الثالث.',
    '<ol class="enlist">'
    '<li>I __________ (finish) my homework.</li>'
    '<li>She __________ (write) a letter.</li>'
    '<li>The boys __________ (break) the window.</li>'
    '<li>We __________ (visit) Jaffa.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each base verb with its past participle (V3) — write the letter.', 'صِل/ي الفعل بتصريفه الثالث — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) go</span><span>____</span></div>'
    '<div class="row"><span>2) see</span><span>____</span></div>'
    '<div class="row"><span>3) eat</span><span>____</span></div>'
    '<div class="row"><span>4) write</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) seen</span></div>'
    '<div class="row"><span>b) written</span></div>'
    '<div class="row"><span>c) gone</span></div>'
    '<div class="row"><span>d) eaten</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Rewrite in the negative (−).', 'أعِد/ي الكتابة بالنفي (−).',
    '<ol class="enlist">'
    '<li>I have finished. → ' + wl('54%') + '</li>'
    '<li>She has eaten. → ' + wl('54%') + '</li>'
    '<li>They have arrived. → ' + wl('54%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I has finished. → ' + wl('52%') + '</li>'
    '<li>She have gone. → ' + wl('52%') + '</li>'
    '<li>He has went home. → ' + wl('52%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Put each verb into the present perfect.', 'ضع/ي الفعل في المضارع التام.',
    '<div class="para">It has been a busy morning. My mother (1) __________ (cook) lunch. My brother (2) __________ (clean) '
    'his room. I (3) __________ (finish) my homework. We (4) __________ (not / eat) yet, but the food smells great!</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 sentences about things you have done today.', 'اكتب/ي ٣ جمل عن أشياء فعلتها اليوم.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'have · has · have · has'),
    ('تمرين ٢:', 'c) done · c) gone · c) seen'),
    ('تمرين ٣:', 'have finished · has written · have broken · have visited'),
    ('تمرين ٤:', '1 → c · 2 → a · 3 → d · 4 → b'),
    ('تمرين ٥:', 'I haven\'t finished. · She hasn\'t eaten. · They haven\'t arrived.'),
    ('تمرين ٦:', 'I have finished. · She has gone. · He has gone home.'),
    ('تمرين ٧:', '1 has cooked · 2 has cleaned · 3 have finished · 4 haven\'t eaten'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (have/has + V3).'),
])
docs['present-perfect-1'] = head('Present Perfect — Level 1 | T. Wad Refae') + \
    page(s + foot(True, 'Present Perfect · Level 1 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Present Perfect · Level 1 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Present Perfect · Level 1 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Present Perfect · Level 1 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 2 — ever/never, already/yet/just, been vs gone
# =========================================================================
s = lesson_head('ever / never / already / yet / just', 'Level 2 — Adverbs & Signals')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نستخدم ظروفًا مع المضارع التام: <span class="hl-y">ever/never</span> (الخبرة) و<span class="hl-g">already/yet/just</span> (التوقيت) — وفرق <span class="en">been</span> عن <span class="en">gone</span>.'
    '<span class="en-fact">Adverbs with the present perfect, and been vs gone.</span></p>'
    '<div class="formula">Have you <b>ever</b>…? · never · already · not … yet · just</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">ever</span> في الأسئلة · <span class="en">never</span> في الإثبات بمعنى النفي.', 'ever in questions; never = not ever (in positive sentences).')
    + fact('<span class="en">already</span> (قبل المتوقع) · <span class="en">yet</span> (في النفي/السؤال، آخر الجملة) · <span class="en">just</span> (للتو).', 'already (sooner than expected); yet (neg/question, at the end); just (very recently).')
    + fact('<span class="en">been</span> = ذهب <span class="hl-p">ورجع</span> · <span class="en">gone</span> = ذهب <span class="hl-p">وما زال هناك</span>.', 'been = went and came back; gone = went and is still there.')
    + '</ul>'
    '<table><tr><th>Adverb</th><th>Use</th><th>Example</th></tr>'
    '<tr><td class="en">ever</td><td>سؤال</td><td class="en">Have you ever been to Gaza?</td></tr>'
    '<tr><td class="en">never</td><td>نفي</td><td class="en">I have never eaten sushi.</td></tr>'
    '<tr><td class="en">already</td><td>إثبات</td><td class="en">I have already done it.</td></tr>'
    '<tr><td class="en">yet</td><td>نفي/سؤال</td><td class="en">I haven\'t finished yet.</td></tr>'
    '<tr><td class="en">just</td><td>للتو</td><td class="en">She has just arrived.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">ضع/ي <span class="en">ever/never/already/just</span> بين <span class="hl-p">have/has والـV3</span>، و<span class="en">yet</span> في آخر الجملة.'
    '<span class="en-fact">Put ever/never/already/just between have/has and V3; put yet at the end.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">للتو · just</span><div class="flow"><span class="after">I <b>have just finished</b> my lunch.</span></div></div>'
    '<div class="ex"><span class="tag">خبرة · ever</span><div class="flow"><span class="after"><b>Have</b> you <b>ever ridden</b> a camel?</span></div></div>'
    '<div class="ex"><span class="tag">been / gone</span><div class="flow"><span class="after">He <b>has gone</b> to the market. (still there)</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">ever/never/already/just</span> بين have والـV3 · <span class="en">yet</span> بالآخر · <span class="en">been</span>=رجع، <span class="en">gone</span>=ما زال هناك.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the correct word.', 'اختر/ي الكلمة الصحيحة.',
    '<ol class="enlist">'
    '<li>Have you ____ been to Jaffa? <span class="choices">( ever / never )</span></li>'
    '<li>I have ____ seen snow. <span class="choices">( ever / never )</span></li>'
    '<li>She has ____ finished her work. <span class="choices">( already / yet )</span></li>'
    '<li>They haven\'t arrived ____. <span class="choices">( already / yet )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>We have ____ eaten; we\'re not hungry. <span class="choices"><span class="opt">a) already</span><span class="opt">b) yet</span><span class="opt">c) ever</span></span></li>'
    '<li>The train has ____ left — one minute ago! <span class="choices"><span class="opt">a) just</span><span class="opt">b) yet</span><span class="opt">c) never</span></span></li>'
    '<li>Has she finished ____? <span class="choices"><span class="opt">a) yet</span><span class="opt">b) already</span><span class="opt">c) just</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Fill in with ever, never, already, yet or just.', 'أكمِل/ي بـ ever / never / already / yet / just.',
    '<ol class="enlist">'
    '<li>I have __________ tried maqluba — it was my first time today!</li>'
    '<li>Have you __________ visited Jerusalem?</li>'
    '<li>Don\'t worry, I have __________ bought the bread.</li>'
    '<li>He hasn\'t called me __________.</li></ol>')
e4 = q('4', 'been or gone · been أم gone', 'Choose been or gone.', 'اختر/ي been أو gone.',
    '<ol class="enlist">'
    '<li>My father has ____ to work. (He\'s there now.) <span class="choices">( been / gone )</span></li>'
    '<li>I have ____ to Jerusalem twice. (and came back) <span class="choices">( been / gone )</span></li>'
    '<li>She isn\'t home; she has ____ to the shop. <span class="choices">( been / gone )</span></li>'
    '<li>Have you ever ____ to Haifa? <span class="choices">( been / gone )</span></li></ol>')
e5 = q('5', 'Transform · تحويل', 'Rewrite the sentence adding the word in brackets.', 'أعِد/ي الكتابة مع إضافة الكلمة بين القوسين.',
    '<ol class="enlist">'
    '<li>I have finished my homework. (just) → ' + wl('48%') + '</li>'
    '<li>She has cleaned her room. (already) → ' + wl('48%') + '</li>'
    '<li>They haven\'t eaten. (yet) → ' + wl('48%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I have yet finished my work. → ' + wl('50%') + '</li>'
    '<li>Have you ever gone to Egypt and come back? → ' + wl('50%') + '</li>'
    '<li>She has never been eat sushi. → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete with ever, never, already, yet or just.', 'أكمِل/ي بـ ever / never / already / yet / just.',
    '<div class="para">A: Have you (1) __________ been to the old city of Nablus? &nbsp; '
    'B: No, I have (2) __________ been there. &nbsp; A: Really? I have (3) __________ come back from it — it was amazing! &nbsp; '
    'B: Have you visited the soap factory (4) __________? &nbsp; A: Yes, I have (5) __________ seen it twice.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 2 "Have you ever…?" questions and one "I have never…" sentence.', 'اكتب/ي سؤالين بـ "Have you ever…?" وجملة بـ "I have never…".',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'ever · never · already · yet'),
    ('تمرين ٢:', 'a) already · a) just · a) yet'),
    ('تمرين ٣:', 'just · ever · already · yet'),
    ('تمرين ٤:', 'gone · been · gone · been'),
    ('تمرين ٥:', 'I have just finished my homework. · She has already cleaned her room. · They haven\'t eaten yet.'),
    ('تمرين ٦:', 'I have just/already finished my work. · Have you ever been to Egypt? · She has never eaten sushi.'),
    ('تمرين ٧:', '1 ever · 2 never · 3 just · 4 yet · 5 already'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (ever / never).'),
])
docs['present-perfect-2'] = head('Present Perfect — Level 2 | T. Wad Refae') + \
    page(s + foot(True, 'Present Perfect · Level 2 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Present Perfect · Level 2 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Present Perfect · Level 2 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Present Perfect · Level 2 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 3 — for/since + Present Perfect vs Past Simple
# =========================================================================
s = lesson_head('for / since وPresent Perfect مقابل Past Simple', 'Level 3 — for/since & vs Past')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def"><span class="hl-y">for / since</span> للمدة؛ والفرق بين المضارع التام (زمن غير محدّد، متصل بالحاضر) والماضي البسيط (<span class="hl-g">زمن ماضٍ محدّد منتهٍ</span>).'
    '<span class="en-fact">for / since for duration; present perfect (unfinished / no exact time) vs past simple (finished, specific past time).</span></p>'
    '<div class="formula">for + period &nbsp;|&nbsp; since + starting point</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">for</span> + مدة (for two years) · <span class="en">since</span> + نقطة بداية (since 2020).', 'for + a period; since + a starting point.')
    + fact('المضارع التام: لا وقت محدّد، أو مستمر حتى الآن.', 'Present perfect: no exact time, or still true now (I have lived here for 5 years).')
    + fact('الماضي البسيط: وقت ماضٍ محدّد منتهٍ (<span class="en">yesterday, ago, last…, in 2010</span>).', 'Past simple: a finished time (yesterday, ago, last week, in 2010).')
    + '</ul>'
    '<table><tr><th>Present Perfect</th><th>Past Simple</th></tr>'
    '<tr><td class="en">I have seen that film.</td><td class="en">I saw it yesterday.</td></tr>'
    '<tr><td class="en">She has lived here for 5 years.</td><td class="en">She lived there in 2010.</td></tr>'
    '<tr><td class="en">for / since / ever / yet</td><td class="en">yesterday / ago / last…</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">هل الوقت <span class="hl-p">محدّد ومنتهٍ</span>؟ ← Past Simple. غير محدّد أو متصل بالحاضر؟ ← Present Perfect.'
    '<span class="en-fact">Finished, specific time? → past simple. No exact time / still now? → present perfect.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">مدة · for/since</span><div class="flow"><span class="after">I <b>have known</b> him <b>for</b> ten years / <b>since</b> 2015.</span></div></div>'
    '<div class="ex"><span class="tag">متصل بالحاضر</span><div class="flow"><span class="after">We <b>have lived</b> in Nablus since 2018.</span></div></div>'
    '<div class="ex"><span class="tag">ماضٍ محدّد</span><div class="flow"><span class="after">I <b>visited</b> Jaffa <b>last summer</b>.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">for</span>+مدة · <span class="en">since</span>+بداية · وقت محدّد منتهٍ ← <span class="en">Past Simple</span>، وإلا ← <span class="en">Present Perfect</span>.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose for or since.', 'اختر/ي for أو since.',
    '<ol class="enlist">'
    '<li>I have known her ____ two hours. <span class="choices">( for / since )</span></li>'
    '<li>We have lived here ____ Monday. <span class="choices">( for / since )</span></li>'
    '<li>He has worked there ____ 2020. <span class="choices">( for / since )</span></li>'
    '<li>They have been friends ____ a long time. <span class="choices">( for / since )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Present perfect or past simple? Choose.', 'مضارع تام أم ماضٍ بسيط؟ اختر/ي.',
    '<ol class="enlist">'
    '<li>I ____ him yesterday. <span class="choices"><span class="opt">a) saw</span><span class="opt">b) have seen</span></span></li>'
    '<li>She ____ here since 2019. <span class="choices"><span class="opt">a) has lived</span><span class="opt">b) lived</span></span></li>'
    '<li>We ____ Jaffa last summer. <span class="choices"><span class="opt">a) visited</span><span class="opt">b) have visited</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Fill in with for or since.', 'أكمِل/ي بـ for أو since.',
    '<ol class="enlist">'
    '<li>I have studied English __________ five years.</li>'
    '<li>She has been ill __________ Saturday.</li>'
    '<li>We haven\'t seen them __________ a long time.</li>'
    '<li>He has had this car __________ 2021.</li></ol>')
e4 = q('4', 'Choose the tense · اختر الزمن', 'Put the verb in the present perfect or the past simple.', 'ضع/ي الفعل في المضارع التام أو الماضي البسيط.',
    '<ol class="enlist">'
    '<li>I __________ (live) in Gaza since 2015.</li>'
    '<li>We __________ (travel) to Amman last year.</li>'
    '<li>__________ you ever __________ (eat) knafeh?</li></ol>')
e5 = q('5', 'Transform · تحويل', 'Rewrite using the word in brackets.', 'أعِد/ي الكتابة مستخدمًا الكلمة بين القوسين.',
    '<ol class="enlist">'
    '<li>She started working here in 2019. (since) → She ' + wl('44%') + '</li>'
    '<li>I began learning English five years ago. (for) → I ' + wl('44%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I have seen him yesterday. → ' + wl('50%') + '</li>'
    '<li>She has lived here since five years. → ' + wl('50%') + '</li>'
    '<li>We have visited Jaffa last summer. → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Put each verb in the present perfect or the past simple.', 'ضع/ي كل فعل في المضارع التام أو الماضي البسيط.',
    '<div class="para">My family (1) __________ (live) in this house for twenty years. We (2) __________ (move) here when I was a baby. '
    'I (3) __________ (study) at the same school since 2018. Last month, we (4) __________ (visit) my grandparents in Hebron. '
    'I (5) __________ (not / see) them since then.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write one sentence with "for", one with "since", and one in the past simple.', 'اكتب/ي جملة بـ "for"، وأخرى بـ "since"، وثالثة بالماضي البسيط.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'for · since · since · for'),
    ('تمرين ٢:', 'a) saw · a) has lived · a) visited'),
    ('تمرين ٣:', 'for · since · for · since'),
    ('تمرين ٤:', 'have lived · travelled · Have … eaten'),
    ('تمرين ٥:', 'She has worked here since 2019. · I have learned English for five years.'),
    ('تمرين ٦:', 'I saw him yesterday. · She has lived here for five years. · We visited Jaffa last summer.'),
    ('تمرين ٧:', '1 have lived · 2 moved · 3 have studied · 4 visited · 5 haven\'t seen'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (for / since / past simple).'),
])
docs['present-perfect-3'] = head('Present Perfect — Level 3 | T. Wad Refae') + \
    page(s + foot(True, 'Present Perfect · Level 3 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Present Perfect · Level 3 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Present Perfect · Level 3 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Present Perfect · Level 3 · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
