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
    return ('<div class="lesson-head">\n<h1>Future</h1>\n'
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
# LEVEL 1 — will (Foundation)
# =========================================================================
s = lesson_head('المستقبل بـ will — The Future with "will"', 'Level 1 — Foundation')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نستخدم <span class="en">will</span> للتعبير عن المستقبل: <span class="hl-y">تنبؤات ووعود وقرارات لحظية</span>.'
    '<span class="en-fact">We use "will" for the future: predictions, promises and instant decisions.</span></p>'
    '<div class="formula">(+) will + verb &nbsp;|&nbsp; (−) won\'t + verb &nbsp;|&nbsp; (?) Will + subject + verb?</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">will</span> + الفعل المجرد <span class="hl-y">لكل الفاعلين</span>.', 'will + base verb for every subject: I / he / they will go.')
    + fact('النفي: <span class="en">won\'t = will not</span>.', 'Negative: won\'t (= will not).')
    + fact('السؤال: <span class="en">Will + subject + verb?</span>', 'Question: Will + subject + verb? → Yes, I will / No, I won\'t.')
    + fact('كلمات دالّة على المستقبل.', 'Signal words: tomorrow, next week, soon, later, in 2030.')
    + '</ul>'
    '<table><tr><th>(+)</th><th>(−)</th><th>(?)</th></tr>'
    '<tr><td class="en">I will help</td><td class="en">I won\'t help</td><td class="en">Will you help?</td></tr>'
    '<tr><td class="en">She will come</td><td class="en">She won\'t come</td><td class="en">Will she come?</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def"><span class="en">will</span> نفس الشكل لكل الفاعلين — فقط <span class="hl-p en">will + فعل مجرد</span>.'
    '<span class="en-fact">"will" is the same for everyone — just will + base verb.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">تنبؤ · prediction</span><div class="flow"><span class="after">I think it <b>will rain</b> tomorrow.</span></div></div>'
    '<div class="ex"><span class="tag">عرض/قرار · offer</span><div class="flow"><span class="after">Don\'t worry — I<b>\'ll help</b> you!</span></div></div>'
    '<div class="ex"><span class="tag">وعد · promise</span><div class="flow"><span class="after">She <b>won\'t be</b> late again.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">المستقبل بـ <span class="en"><b>will</b></span> = will + فعل مجرد ← تنبؤ / وعد / قرار لحظي (<span class="en">tomorrow, soon</span>).</div></div>')

e1 = q('1', 'Recognize · تعرّف', 'Choose will or won\'t.', 'اختر/ي will أو won\'t.',
    '<ol class="enlist">'
    '<li>I promise I ____ tell anyone. <span class="choices">( will / won\'t )</span></li>'
    '<li>Maybe it ____ snow next week. <span class="choices">( will / won\'t )</span></li>'
    '<li>Don\'t worry, we ____ be late. <span class="choices">( will / won\'t )</span></li>'
    '<li>One day I ____ visit Jerusalem. <span class="choices">( will / won\'t )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>I ____ you later. <span class="choices"><span class="opt">a) will call</span><span class="opt">b) will calls</span><span class="opt">c) am call</span></span></li>'
    '<li>____ they come to the party? <span class="choices"><span class="opt">a) Will</span><span class="opt">b) Do</span><span class="opt">c) Are</span></span></li>'
    '<li>He ____ be at home tonight. <span class="choices"><span class="opt">a) won\'t</span><span class="opt">b) doesn\'t</span><span class="opt">c) isn\'t</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Fill in with will + a verb from the word bank.', 'أكمِل/ي بـ will + فعل من بنك الكلمات.',
    '<div class="wordbank"><b>بنك الكلمات · Word bank</b> win &nbsp;·&nbsp; rain &nbsp;·&nbsp; travel &nbsp;·&nbsp; help</div>'
    '<ol class="enlist">'
    '<li>I think our team <span class="blank"></span> the match.</li>'
    '<li>Take an umbrella — it <span class="blank"></span>.</li>'
    '<li>Next year we <span class="blank"></span> to Egypt.</li>'
    '<li>Don\'t worry, I <span class="blank"></span> you.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match the situation with the right offer — write the letter.', 'صِل/ي الموقف بعرض المساعدة المناسب — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) It\'s cold here.</span><span>____</span></div>'
    '<div class="row"><span>2) The bag is heavy.</span><span>____</span></div>'
    '<div class="row"><span>3) I\'m thirsty.</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) I\'ll carry it.</span></div>'
    '<div class="row"><span>b) I\'ll close the window.</span></div>'
    '<div class="row"><span>c) I\'ll bring you water.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Rewrite in the future with will (add "tomorrow").', 'حوّل/ي للمستقبل بـ will (أضِف/ي <span class="en">tomorrow</span>).',
    '<ol class="enlist">'
    '<li>I clean my room. → ' + wl('54%') + '</li>'
    '<li>She plays football. → ' + wl('54%') + '</li>'
    '<li>We study English. → ' + wl('54%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I will to help you. → ' + wl('52%') + '</li>'
    '<li>She will goes tomorrow. → ' + wl('52%') + '</li>'
    '<li>Will you comes with us? → ' + wl('52%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Put each verb into the future with will.', 'ضع/ي الفعل في المستقبل بـ will.',
    '<div class="para">In the future, our village (1) __________ (change) a lot. People (2) __________ (use) clean energy. '
    'Children (3) __________ (learn) with tablets. I think life (4) __________ (be) easier, but we '
    '(5) __________ (not / forget) our traditions.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 predictions about next year (use will).', 'اكتب/ي ٣ تنبؤات عن السنة القادمة (استخدم/ي will).',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', "won't · will · won't · will"),
    ('تمرين ٢:', 'a) will call · a) Will · a) won\'t'),
    ('تمرين ٣:', 'will win · will rain · will travel · will help'),
    ('تمرين ٤:', '1 → b · 2 → a · 3 → c'),
    ('تمرين ٥:', 'I will clean my room tomorrow. · She will play football tomorrow. · We will study English tomorrow.'),
    ('تمرين ٦:', 'I will help you. · She will go tomorrow. · Will you come with us?'),
    ('تمرين ٧:', "1 will change · 2 will use · 3 will learn · 4 will be · 5 won't forget"),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (تنبؤات بـ will).'),
])
docs['future-1'] = head('Future — Level 1 | T. Wad Refae') + \
    page(s + foot(True, 'Future · Level 1 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Future · Level 1 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Future · Level 1 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Future · Level 1 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 2 — be going to (plans & intentions)
# =========================================================================
s = lesson_head('خطط ونوايا بـ be going to — Plans with "be going to"', 'Level 2 — be going to')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نستخدم <span class="en">be going to</span> للخطط والنوايا <span class="hl-y">المقررة مسبقًا</span>، وللتنبؤ المبني على <span class="hl-g">دليل</span>.'
    '<span class="en-fact">We use "be going to" for decided plans/intentions, and predictions based on evidence.</span></p>'
    '<div class="formula">am / is / are + <b>going to</b> + verb</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">am/is/are</span> حسب الفاعل + <span class="en">going to</span> + فعل مجرد.', 'am (I) · is (he/she/it) · are (you/we/they) + going to + base.')
    + fact('النفي والسؤال نحرّك <span class="en">am/is/are</span>.', 'Negative: isn\'t/aren\'t going to. Question: Is/Are + subject + going to…?')
    + fact('التنبؤ <span class="hl-g">بدليل أمامنا</span>.', 'Evidence prediction: Look at the clouds — it\'s going to rain.')
    + fact('كلمات دالّة.', 'Signal words: tonight, tomorrow, this weekend, next week.')
    + '</ul>'
    '<table><tr><th>Subject</th><th>be going to</th><th>Example</th></tr>'
    '<tr><td class="en">I</td><td class="en">am going to</td><td class="en">I am going to study.</td></tr>'
    '<tr><td class="en">He / She / It</td><td class="en">is going to</td><td class="en">She is going to cook.</td></tr>'
    '<tr><td class="en">You / We / They</td><td class="en">are going to</td><td class="en">They are going to travel.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">خطة مقررة؟ أو <span class="hl-p">دليل أمامك</span>؟ ← استخدم/ي <span class="en">be going to</span>.'
    '<span class="en-fact">A decided plan, or evidence in front of you? ← use "be going to".</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">خطة · plan</span><div class="flow"><span class="after">We <b>are going to visit</b> Jerusalem next Friday.</span></div></div>'
    '<div class="ex"><span class="tag">دليل · evidence</span><div class="flow"><span class="after">Look! The glass <b>is going to fall</b>.</span></div></div>'
    '<div class="ex"><span class="tag">نفي · −</span><div class="flow"><span class="after">She <b>isn\'t going to study</b> tonight.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en"><b>be going to</b></span> = am/is/are + going to + فعل ← خطة مقررة أو تنبؤ بدليل.</div></div>')

e1 = q('1', 'Recognize · تعرّف', 'Choose am, is or are.', 'اختر/ي am أو is أو are.',
    '<ol class="enlist">'
    '<li>I ____ going to help. <span class="choices">( am / is / are )</span></li>'
    '<li>She ____ going to travel. <span class="choices">( am / is / are )</span></li>'
    '<li>They ____ going to play. <span class="choices">( am / is / are )</span></li>'
    '<li>We ____ going to study. <span class="choices">( am / is / are )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>Look at the sky! It ____ rain. <span class="choices"><span class="opt">a) is going to</span><span class="opt">b) are going to</span><span class="opt">c) am going to</span></span></li>'
    '<li>____ you going to visit your aunt? <span class="choices"><span class="opt">a) Are</span><span class="opt">b) Is</span><span class="opt">c) Do</span></span></li>'
    '<li>He ____ going to eat meat. <span class="choices"><span class="opt">a) isn\'t</span><span class="opt">b) aren\'t</span><span class="opt">c) doesn\'t</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with am/is/are going to + the verb.', 'أكمِل/ي بـ am/is/are going to + الفعل.',
    '<ol class="enlist">'
    '<li>I __________ (watch) a film tonight.</li>'
    '<li>My father __________ (buy) a new car.</li>'
    '<li>We __________ (clean) the house tomorrow.</li>'
    '<li>The students __________ (plant) trees.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each subject with the correct form — write the letter.', 'صِل/ي الفاعل بالصيغة الصحيحة — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) I</span><span>____</span></div>'
    '<div class="row"><span>2) The children</span><span>____</span></div>'
    '<div class="row"><span>3) My mother</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) is going to</span></div>'
    '<div class="row"><span>b) am going to</span></div>'
    '<div class="row"><span>c) are going to</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Rewrite as a plan with be going to.', 'حوّل/ي لخطة بـ be going to.',
    '<ol class="enlist">'
    '<li>I visit my grandmother. → ' + wl('52%') + '</li>'
    '<li>They play football. → ' + wl('54%') + '</li>'
    '<li>She studies tonight. → ' + wl('54%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I going to help. → ' + wl('52%') + '</li>'
    '<li>She is going to cooks. → ' + wl('52%') + '</li>'
    '<li>Are you going to travels? → ' + wl('52%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete with be going to.', 'أكمِل/ي بـ be going to.',
    '<div class="para">This weekend is going to be busy. On Friday, we (1) __________ (visit) my uncle. '
    'My sister (2) __________ (help) my mother in the kitchen. I (3) __________ (study) for my exam. '
    'On Saturday, my friends and I (4) __________ (play) football. It (5) __________ (be) a great weekend!</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 plans for your next weekend (be going to).', 'اكتب/ي ٣ خطط لعطلتك القادمة (be going to).',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'am · is · are · are'),
    ('تمرين ٢:', 'a) is going to · a) Are · a) isn\'t'),
    ('تمرين ٣:', 'am going to watch · is going to buy · are going to clean · are going to plant'),
    ('تمرين ٤:', '1 → b · 2 → c · 3 → a'),
    ('تمرين ٥:', 'I am going to visit my grandmother. · They are going to play football. · She is going to study tonight.'),
    ('تمرين ٦:', 'I am going to help. · She is going to cook. · Are you going to travel?'),
    ('تمرين ٧:', '1 are going to visit · 2 is going to help · 3 am going to study · 4 are going to play · 5 is going to be'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (خطط بـ be going to).'),
])
docs['future-2'] = head('Future — Level 2 | T. Wad Refae') + \
    page(s + foot(True, 'Future · Level 2 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Future · Level 2 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Future · Level 2 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Future · Level 2 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 3 — will vs be going to
# =========================================================================
s = lesson_head('will أم be going to؟ — Choosing the Future', 'Level 3 — will vs be going to')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نختار حسب المعنى: <span class="en">will</span> للقرار اللحظي والوعد والتنبؤ العام؛ <span class="en">be going to</span> للخطة المقررة والتنبؤ بدليل.'
    '<span class="en-fact">Choose by meaning: "will" for instant decisions, promises &amp; general predictions; "be going to" for decided plans &amp; evidence.</span></p>'
    '<div class="formula">will → decision / offer / promise &nbsp;|&nbsp; going to → plan / evidence</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">will</span>: قرار لحظي، عرض مساعدة، وعد، تنبؤ عام.', 'will: instant decision, offer, promise, general prediction.')
    + fact('<span class="en">be going to</span>: خطة/نية مقررة، تنبؤ بدليل.', 'be going to: a decided plan/intention, an evidence-based prediction.')
    + fact('أسئلة wh-.', 'Wh-: What will you do? / What are you going to do?')
    + '</ul>'
    '<table><tr><th>Situation</th><th>Future</th><th>Example</th></tr>'
    '<tr><td>قرار لحظي</td><td class="en">will</td><td class="en">I\'ll get it!</td></tr>'
    '<tr><td>خطة مقررة</td><td class="en">going to</td><td class="en">I\'m going to be a doctor.</td></tr>'
    '<tr><td>تنبؤ بدليل</td><td class="en">going to</td><td class="en">It\'s going to rain.</td></tr>'
    '<tr><td>وعد</td><td class="en">will</td><td class="en">I\'ll never forget you.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">اسأل/ي: قرار قررته <span class="hl-p">الآن</span>؟ → <span class="en">will</span>. خطة قررتها <span class="hl-g">قبل</span>؟ → <span class="en">going to</span>.'
    '<span class="en-fact">Ask: decided just now? → will. Decided before? → going to.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">قرار لحظي · will</span><div class="flow"><span class="after">"The phone is ringing." — "I<b>\'ll answer</b> it."</span></div></div>'
    '<div class="ex"><span class="tag">خطة · going to</span><div class="flow"><span class="after">I<b>\'m going to study</b> medicine.</span></div></div>'
    '<div class="ex"><span class="tag">دليل · going to</span><div class="flow"><span class="after">Look at those clouds! It<b>\'s going to rain</b>.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">قرار الآن / وعد / تنبؤ عام → <span class="en"><b>will</b></span> · خطة مقررة / تنبؤ بدليل → <span class="en"><b>be going to</b></span>.</div></div>')

e1 = q('1', 'Recognize · تعرّف', 'Choose will or be going to (by the situation).', 'اختر/ي will أو be going to (حسب الموقف).',
    '<ol class="enlist">'
    '<li>"I\'m thirsty." "I ____ get you water." <span class="choices">( will / am going to )</span></li>'
    '<li>I bought tickets — I ____ travel to Amman. <span class="choices">( will / am going to )</span></li>'
    '<li>Look at the clouds! It ____ rain. <span class="choices">( will / is going to )</span></li>'
    '<li>Maybe our team ____ win. <span class="choices">( will / is going to )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct future form.', 'اختر/ي صيغة المستقبل الصحيحة.',
    '<ol class="enlist">'
    '<li>"The bag is heavy." "OK, I ____ carry it." <span class="choices"><span class="opt">a) will</span><span class="opt">b) am going to</span><span class="opt">c) going to</span></span></li>'
    '<li>She already decided: she ____ study medicine. <span class="choices"><span class="opt">a) is going to</span><span class="opt">b) will</span><span class="opt">c) go to</span></span></li>'
    '<li>Watch out! You ____ drop the plates. <span class="choices"><span class="opt">a) are going to</span><span class="opt">b) will</span><span class="opt">c) go to</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with will or (be) going to.', 'أكمِل/ي بـ will أو (be) going to.',
    '<ol class="enlist">'
    '<li>Look! The baby __________ (cry).</li>'
    '<li>I promise I __________ (call) you tonight.</li>'
    '<li>They __________ (get married) next month; everything is ready.</li>'
    '<li>Don\'t worry, I __________ (open) the door for you.</li></ol>')
e4 = q('4', 'Build Questions · تكوين أسئلة', 'Make a future question for the given answer.', 'كوّن/ي سؤالاً في المستقبل يناسب الجواب.',
    '<ol class="enlist">'
    '<li>' + wl('62%') + ' &nbsp;(I\'m going to study tonight.)</li>'
    '<li>' + wl('62%') + ' &nbsp;(They will arrive at 6.)</li></ol>')
e5 = q('5', 'Transform · تحويل', 'Complete with the best future form (will / going to).', 'أكمِل/ي بأنسب صيغة مستقبل (will / going to).',
    '<ol class="enlist">'
    '<li>There\'s someone at the door. I ____ (open) it. → ' + wl('42%') + '</li>'
    '<li>She has a plan: she ____ (open) a shop. → ' + wl('42%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I will to help you. → ' + wl('52%') + '</li>'
    '<li>Look at the clouds! It will rain. → ' + wl('52%') + '</li>'
    '<li>We going to visit them. → ' + wl('52%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete with will or be going to.', 'أكمِل/ي بـ will أو be going to.',
    '<div class="para">Tomorrow is a big day. I (1) __________ (take) my final exam — I studied hard, so I think I '
    '(2) __________ (pass). After the exam, my friends and I (3) __________ (celebrate); we already booked a table. '
    'Look at the sky — it (4) __________ (be) sunny all day. I promise I (5) __________ (not / be) nervous!</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write about your future: one plan (going to), one prediction (will), one promise (will).', 'اكتب/ي عن مستقبلك: خطة (going to)، تنبؤ (will)، ووعد (will).',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'will · am going to · is going to · will'),
    ('تمرين ٢:', 'a) will · a) is going to · a) are going to'),
    ('تمرين ٣:', 'is going to cry · will call · are going to get married · will open'),
    ('تمرين ٤:', 'What are you going to do tonight? · When will they arrive? (تُقبل صيغ مناسبة)'),
    ('تمرين ٥:', 'I will open it. · She is going to open a shop.'),
    ('تمرين ٦:', 'I will help you. · it is going to rain. · We are going to visit them.'),
    ('تمرين ٧:', "1 am going to take · 2 will pass · 3 are going to celebrate · 4 is going to be · 5 won't be"),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (خطة + تنبؤ + وعد).'),
])
docs['future-3'] = head('Future — Level 3 | T. Wad Refae') + \
    page(s + foot(True, 'Future · Level 3 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Future · Level 3 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Future · Level 3 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Future · Level 3 · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
