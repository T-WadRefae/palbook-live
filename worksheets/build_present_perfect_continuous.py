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
    return ('<div class="lesson-head">\n<h1>Present Perfect Continuous</h1>\n'
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
# LEVEL 1 — Foundation: form (have/has + been + V-ing) & use
# =========================================================================
s = lesson_head('أفعال بدأت واستمرت — Present Perfect Continuous', 'Level 1 — Foundation')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">المضارع التام المستمر لحدث <span class="hl-y">بدأ في الماضي ولا يزال مستمرًا الآن</span> (أو توقّف حديثًا وله أثر الآن).'
    '<span class="en-fact">An action that started in the past and is still going now (or stopped recently with a result).</span></p>'
    '<div class="formula">have / has + been + verb-<span class="ing">ing</span></div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">I/You/We/They have been</span> · <span class="en">He/She/It has been</span> + <span class="en">V-ing</span>.', 'Choose have/has + been + the -ing verb.')
    + fact('نستخدمه للتركيز على <span class="hl-g">استمرار الحدث ومدّته</span>.', 'It focuses on the activity and how long it has lasted.')
    + fact('النفي: <span class="en">haven\'t/hasn\'t been</span> · السؤال: <span class="en">Have/Has + subject + been + V-ing?</span>', 'Negative: haven\'t/hasn\'t been. Question: Have/Has + subject + been + V-ing?')
    + '</ul>'
    '<table><tr><th>Subject</th><th>(+)</th><th>(−)</th><th>(?)</th></tr>'
    '<tr><td class="en">I/You/We/They</td><td class="en">have been working</td><td class="en">haven\'t been working</td><td class="en">Have you been working?</td></tr>'
    '<tr><td class="en">He/She/It</td><td class="en">has been working</td><td class="en">hasn\'t been working</td><td class="en">Has he been working?</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">١) <span class="hl-p en">have / has</span> حسب الفاعل &nbsp; ٢) <span class="en">been</span> (ثابتة) &nbsp; ٣) الفعل + <span class="ing">ing</span>.'
    '<span class="en-fact">1) have/has for the subject &nbsp; 2) been (always) &nbsp; 3) verb + ing.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">مستمر الآن</span><div class="flow"><span class="after">I <b>have been studying</b> for two hours.</span></div></div>'
    '<div class="ex"><span class="tag">طوال اليوم</span><div class="flow"><span class="after">It <b>has been raining</b> all day.</span></div></div>'
    '<div class="ex"><span class="tag">منذ الصباح</span><div class="flow"><span class="after">They <b>have been playing</b> since morning.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">المضارع التام المستمر = <span class="en"><b>have/has + been + V-ing</b></span> ← حدث بدأ واستمرّ حتى الآن.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose have or has.', 'اختر/ي have أو has.',
    '<ol class="enlist">'
    '<li>I ____ been reading. <span class="choices">( have / has )</span></li>'
    '<li>She ____ been cooking. <span class="choices">( have / has )</span></li>'
    '<li>They ____ been playing. <span class="choices">( have / has )</span></li>'
    '<li>He ____ been working. <span class="choices">( have / has )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct form.', 'اختر/ي الصيغة الصحيحة.',
    '<ol class="enlist">'
    '<li>I have been ____ TV. <span class="choices"><span class="opt">a) watch</span><span class="opt">b) watched</span><span class="opt">c) watching</span></span></li>'
    '<li>She has ____ working hard. <span class="choices"><span class="opt">a) be</span><span class="opt">b) been</span><span class="opt">c) being</span></span></li>'
    '<li>We have been ____ for an hour. <span class="choices"><span class="opt">a) wait</span><span class="opt">b) waiting</span><span class="opt">c) waited</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with have/has been + the -ing verb.', 'أكمِل/ي بـ have/has been + الفعل + ing.',
    '<ol class="enlist">'
    '<li>I __________ (study) for two hours.</li>'
    '<li>She __________ (clean) the house.</li>'
    '<li>The children __________ (play) outside.</li>'
    '<li>We __________ (wait) for the bus.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each question with its answer — write the letter.', 'صِل/ي كل سؤال بجوابه — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) How long have you been waiting?</span><span>____</span></div>'
    '<div class="row"><span>2) Why are you tired?</span><span>____</span></div>'
    '<div class="row"><span>3) Why is the ground wet?</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) Because I have been running.</span></div>'
    '<div class="row"><span>b) For an hour.</span></div>'
    '<div class="row"><span>c) It has been raining.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Rewrite in the negative (−).', 'أعِد/ي الكتابة بالنفي (−).',
    '<ol class="enlist">'
    '<li>I have been working. → ' + wl('52%') + '</li>'
    '<li>She has been sleeping. → ' + wl('52%') + '</li>'
    '<li>They have been talking. → ' + wl('52%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I has been reading. → ' + wl('52%') + '</li>'
    '<li>She have been cooking. → ' + wl('52%') + '</li>'
    '<li>They have been play. → ' + wl('52%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Put each verb into the present perfect continuous.', 'ضع/ي الفعل في المضارع التام المستمر.',
    '<div class="para">It has been a long morning. My father (1) __________ (work) in the field since dawn. '
    'My mother (2) __________ (bake) bread. My sister and I (3) __________ (help) her. '
    'We (4) __________ (not / rest) at all, but we are happy.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 sentences about what you have been doing lately.', 'اكتب/ي ٣ جمل عمّا تفعله مؤخرًا.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'have · has · have · has'),
    ('تمرين ٢:', 'c) watching · b) been · b) waiting'),
    ('تمرين ٣:', 'have been studying · has been cleaning · have been playing · have been waiting'),
    ('تمرين ٤:', '1 → b · 2 → a · 3 → c'),
    ('تمرين ٥:', 'I haven\'t been working. · She hasn\'t been sleeping. · They haven\'t been talking.'),
    ('تمرين ٦:', 'I have been reading. · She has been cooking. · They have been playing.'),
    ('تمرين ٧:', '1 has been working · 2 has been baking · 3 have been helping · 4 haven\'t been resting'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (have/has been + V-ing).'),
])
docs['present-perfect-continuous-1'] = head('Present Perfect Continuous — Level 1 | T. Wad Refae') + \
    page(s + foot(True, 'Present Perfect Continuous · Level 1 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Present Perfect Continuous · Level 1 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Present Perfect Continuous · Level 1 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Present Perfect Continuous · Level 1 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 2 — for/since, How long, duration
# =========================================================================
s = lesson_head('for / since / How long — Duration', 'Level 2 — Duration')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نستخدمه للتركيز على <span class="hl-y">مدّة النشاط المستمر</span>: <span class="en">for</span> + مدة، <span class="en">since</span> + بداية، والسؤال <span class="en">How long…?</span>'
    '<span class="en-fact">Focus on the duration of an ongoing activity: for + period, since + point, How long…?</span></p>'
    '<div class="formula">How long + have/has + subject + been + V-ing?</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">for</span> + مدة (for three hours) · <span class="en">since</span> + نقطة بداية (since 8 o\'clock).', 'for + a period; since + a starting point.')
    + fact('السؤال عن المدّة: <span class="en">How long have you been + V-ing?</span>', 'Ask about duration: How long have you been …ing?')
    + fact('استخدامان: <span class="hl-g">مستمر حتى الآن</span>، أو <span class="hl-p">توقّف حديثًا وأثره ظاهر</span>.', 'Two uses: still continuing now, or stopped recently with a visible result.')
    + '</ul>'
    '<table><tr><th>for + period</th><th>since + point</th></tr>'
    '<tr><td class="en">for two hours</td><td class="en">since 8 o\'clock</td></tr>'
    '<tr><td class="en">for a week</td><td class="en">since Monday</td></tr>'
    '<tr><td class="en">I have been reading for an hour.</td><td class="en">… since 5 pm.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def"><span class="en">for</span> لطول المدة · <span class="en">since</span> لنقطة البداية · والسؤال يبدأ بـ <span class="hl-p en">How long</span>.'
    '<span class="en-fact">for = length of time; since = starting point; questions start with How long.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">for</span><div class="flow"><span class="after">We <b>have been living</b> here <b>for</b> ten years.</span></div></div>'
    '<div class="ex"><span class="tag">since</span><div class="flow"><span class="after">She <b>has been studying</b> <b>since</b> 4 o\'clock.</span></div></div>'
    '<div class="ex"><span class="tag">أثر ظاهر</span><div class="flow"><span class="after">You\'re out of breath! Have you <b>been running</b>?</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">for</span>+مدة · <span class="en">since</span>+بداية · <span class="en">How long have you been …ing?</span></div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose for or since.', 'اختر/ي for أو since.',
    '<ol class="enlist">'
    '<li>I have been waiting ____ an hour. <span class="choices">( for / since )</span></li>'
    '<li>She has been working ____ 9 o\'clock. <span class="choices">( for / since )</span></li>'
    '<li>They have been playing ____ two hours. <span class="choices">( for / since )</span></li>'
    '<li>He has been studying ____ this morning. <span class="choices">( for / since )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>____ have you been learning English? <span class="choices"><span class="opt">a) How long</span><span class="opt">b) How many</span><span class="opt">c) How much</span></span></li>'
    '<li>We have been friends ____ 2015. <span class="choices"><span class="opt">a) since</span><span class="opt">b) for</span><span class="opt">c) from</span></span></li>'
    '<li>It has been snowing ____ three days. <span class="choices"><span class="opt">a) for</span><span class="opt">b) since</span><span class="opt">c) at</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Fill in with for or since.', 'أكمِل/ي بـ for أو since.',
    '<ol class="enlist">'
    '<li>I have been reading __________ two hours.</li>'
    '<li>She has been teaching here __________ 2019.</li>'
    '<li>They have been building the house __________ last spring.</li>'
    '<li>We have been waiting __________ a long time.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each question with its answer — write the letter.', 'صِل/ي كل سؤال بجوابه — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) How long have you been here?</span><span>____</span></div>'
    '<div class="row"><span>2) Why are your hands dirty?</span><span>____</span></div>'
    '<div class="row"><span>3) Since when has it been raining?</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) I have been gardening.</span></div>'
    '<div class="row"><span>b) Since this morning.</span></div>'
    '<div class="row"><span>c) For twenty minutes.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Make a "How long…?" question.', 'كوّن/ي سؤالاً بـ "How long…?".',
    '<ol class="enlist">'
    '<li>She has been sleeping. → ' + wl('54%') + '</li>'
    '<li>They have been working here. → ' + wl('54%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I have been studying since two hours. → ' + wl('50%') + '</li>'
    '<li>She has been working for 8 o\'clock. → ' + wl('50%') + '</li>'
    '<li>How long you have been waiting? → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete with the present perfect continuous and for/since.', 'أكمِل/ي بالمضارع التام المستمر و for/since.',
    '<div class="para">My uncle is a farmer. He (1) __________ (grow) olives (2) __________ more than thirty years. '
    'This season, the family (3) __________ (pick) olives (4) __________ last week. '
    'My cousins are tired because they (5) __________ (carry) heavy baskets all day.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write a "How long…?" question and answer it with for and since.', 'اكتب/ي سؤالاً بـ "How long…?" وأجِب/ي عنه بـ for و since.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'for · since · for · since'),
    ('تمرين ٢:', 'a) How long · a) since · a) for'),
    ('تمرين ٣:', 'for · since · since · for'),
    ('تمرين ٤:', '1 → c · 2 → a · 3 → b'),
    ('تمرين ٥:', 'How long has she been sleeping? · How long have they been working here?'),
    ('تمرين ٦:', 'I have been studying for two hours. · She has been working since 8 o\'clock. · How long have you been waiting?'),
    ('تمرين ٧:', '1 has been growing · 2 for · 3 has been picking · 4 since · 5 have been carrying'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (How long + for/since).'),
])
docs['present-perfect-continuous-2'] = head('Present Perfect Continuous — Level 2 | T. Wad Refae') + \
    page(s + foot(True, 'Present Perfect Continuous · Level 2 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Present Perfect Continuous · Level 2 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Present Perfect Continuous · Level 2 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Present Perfect Continuous · Level 2 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 3 — Continuous vs Present Perfect Simple (+ stative verbs)
# =========================================================================
s = lesson_head('المستمر مقابل التام البسيط — Continuous vs Simple', 'Level 3 — vs Perfect Simple')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نختار حسب التركيز: المستمر يركّز على <span class="hl-y">النشاط ومدّته</span> (how long)؛ والتام البسيط على <span class="hl-g">النتيجة/الكمية</span> (how many/how much).'
    '<span class="en-fact">Continuous = the activity &amp; its duration; simple = the result / quantity.</span></p>'
    '<div class="formula">have been + V-ing (activity) &nbsp;|&nbsp; have + V3 (result)</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">PPC</span>: النشاط/المدة — قد لا يكون مكتملًا (<span class="en">I have been reading this book</span>).', 'PPC: the activity/duration — maybe not finished (I have been reading this book).')
    + fact('<span class="en">PP Simple</span>: النتيجة/العدد (<span class="en">I have read three books</span>).', 'PP simple: the result/number (I have read three books).')
    + fact('الأفعال <span class="hl-p">الساكنة</span> (<span class="en">know, like, be, have</span>) ← بسيط فقط، لا مستمر.', 'Stative verbs (know, like, be) use the simple, not the continuous.')
    + '</ul>'
    '<table><tr><th>Present Perfect Continuous</th><th>Present Perfect Simple</th></tr>'
    '<tr><td class="en">I have been reading this book.</td><td class="en">I have read three books.</td></tr>'
    '<tr><td class="en">How long have you been working?</td><td class="en">How much have you done?</td></tr>'
    '<tr><td class="en">She has been cooking.</td><td class="en">She has cooked dinner.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">تركيز على <span class="hl-p">كم المدة / النشاط</span>؟ ← مستمر. تركيز على <span class="hl-g">النتيجة / العدد</span>؟ ← بسيط.'
    '<span class="en-fact">Focus on how long / the activity? → continuous. On the result / how many? → simple.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">نشاط</span><div class="flow"><span class="after">I <b>have been painting</b> the house. (activity)</span></div></div>'
    '<div class="ex"><span class="tag">نتيجة</span><div class="flow"><span class="after">I <b>have painted</b> three rooms. (result)</span></div></div>'
    '<div class="ex"><span class="tag">فعل ساكن</span><div class="flow"><span class="base en">I have been knowing ✗</span><span class="arrow">→</span><span class="after">I <b>have known</b> him for years ✓</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">النشاط/المدة → <span class="en">have been + V-ing</span> · النتيجة/العدد → <span class="en">have + V3</span> · الساكن → بسيط.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Continuous (activity) or simple (result)? Choose.', 'مستمر (نشاط) أم بسيط (نتيجة)؟ اختر/ي.',
    '<ol class="enlist">'
    '<li>I ____ this book; I\'m on page 50. <span class="choices">( have been reading / have read )</span></li>'
    '<li>I ____ three books this month. <span class="choices">( have been reading / have read )</span></li>'
    '<li>She ____ all morning; she\'s very tired. <span class="choices">( has been working / has worked )</span></li>'
    '<li>He ____ his homework. It\'s finished. <span class="choices">( has been doing / has done )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct form.', 'اختر/ي الصيغة الصحيحة.',
    '<ol class="enlist">'
    '<li>How many emails ____ you ____? <span class="choices"><span class="opt">a) have / written</span><span class="opt">b) have / been writing</span></span></li>'
    '<li>How long ____ you ____ here? <span class="choices"><span class="opt">a) have / been waiting</span><span class="opt">b) have / waited</span></span></li>'
    '<li>I ____ Sami since we were children. <span class="choices"><span class="opt">a) have known</span><span class="opt">b) have been knowing</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Use the continuous or the simple (watch stative verbs!).', 'استخدم/ي المستمر أو البسيط (انتبِه/ي للأفعال الساكنة!).',
    '<ol class="enlist">'
    '<li>We __________ (wait) for an hour. (activity)</li>'
    '<li>She __________ (make) five cakes today. (result)</li>'
    '<li>They __________ (have) this car since 2020. (stative)</li>'
    '<li>It __________ (rain) all day. (activity)</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each sentence with its focus — write the letter.', 'صِل/ي الجملة بتركيزها — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) I have cleaned the kitchen.</span><span>____</span></div>'
    '<div class="row"><span>2) I have been cleaning all day.</span><span>____</span></div>'
    '<div class="row"><span>3) I have washed ten plates.</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) duration / activity</span></div>'
    '<div class="row"><span>b) result (done)</span></div>'
    '<div class="row"><span>c) number / quantity</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Choose and complete with the right form.', 'اختر/ي وأكمِل/ي بالصيغة الصحيحة.',
    '<ol class="enlist">'
    '<li>(how long) You / learn English → ' + wl('52%') + '</li>'
    '<li>(how many) She / read books this year → ' + wl('52%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I have been knowing him for years. → ' + wl('50%') + '</li>'
    '<li>She has been making three cakes. → ' + wl('50%') + '</li>'
    '<li>How long have you written emails? → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Use the continuous or the simple for each verb.', 'استخدم/ي المستمر أو البسيط لكل فعل.',
    '<div class="para">My sister loves baking. She (1) __________ (bake) since this morning, and she (2) __________ (make) '
    'twenty cookies so far! I (3) __________ (help) her all day, so my hands are covered in flour. '
    'We (4) __________ (know) this recipe for years — it is our grandmother\'s.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write one continuous sentence (activity) and one simple sentence (result).', 'اكتب/ي جملة مستمرة (نشاط) وجملة بسيطة (نتيجة).',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'have been reading · have read · has been working · has done'),
    ('تمرين ٢:', 'a) have / written · a) have / been waiting · a) have known'),
    ('تمرين ٣:', 'have been waiting · has made · have had · has been raining'),
    ('تمرين ٤:', '1 → b · 2 → a · 3 → c'),
    ('تمرين ٥:', 'How long have you been learning English? · How many books has she read this year?'),
    ('تمرين ٦:', 'I have known him for years. · She has made three cakes. · How long have you been writing emails?'),
    ('تمرين ٧:', '1 has been baking · 2 has made · 3 have been helping · 4 have known'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (مستمر: نشاط · بسيط: نتيجة).'),
])
docs['present-perfect-continuous-3'] = head('Present Perfect Continuous — Level 3 | T. Wad Refae') + \
    page(s + foot(True, 'Present Perfect Continuous · Level 3 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Present Perfect Continuous · Level 3 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Present Perfect Continuous · Level 3 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Present Perfect Continuous · Level 3 · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
