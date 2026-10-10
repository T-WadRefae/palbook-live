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
    return ('<div class="lesson-head">\n<h1>Conditionals</h1>\n'
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
# TYPE 0 — Zero Conditional (general truths / facts)
# =========================================================================
s = lesson_head('الحقائق العامة — Zero Conditional', 'Type 0 — Zero Conditional')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">الشرطية الصفرية للحقائق <span class="hl-y">العامة والعلمية</span> التي تحدث دائمًا (نتيجة مؤكدة).'
    '<span class="en-fact">The zero conditional is for general truths &amp; facts that are always true.</span></p>'
    '<div class="formula">If + present simple , present simple</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="hl-g">كلا الجزأين</span> مضارع بسيط.', 'Both clauses use the present simple.')
    + fact('النتيجة <span class="hl-y">مؤكدة دائمًا</span> (حقيقة، وليست احتمالًا).', 'The result is always true — a fact, not a possibility.')
    + fact('يمكن استبدال <span class="en">If</span> بـ <span class="en">When</span> (نفس المعنى).', 'You can replace "If" with "When" — same meaning.')
    + '</ul>'
    '<table><tr><th>If-clause</th><th>Main clause</th></tr>'
    '<tr><td class="en">If you heat ice,</td><td class="en">it melts.</td></tr>'
    '<tr><td class="en">If it rains,</td><td class="en">the ground gets wet.</td></tr>'
    '<tr><td class="en">If you mix blue and yellow,</td><td class="en">you get green.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">استخدم/ي <span class="hl-p">المضارع البسيط في الجزأين</span>، والنتيجة حقيقة دائمة.'
    '<span class="en-fact">Use the present simple in both parts; the result is always true.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">حقيقة علمية</span><div class="flow"><span class="after">If you heat water to 100°C, it <b>boils</b>.</span></div></div>'
    '<div class="ex"><span class="tag">طبيعة</span><div class="flow"><span class="after">Plants <b>die</b> if they don\'t get water.</span></div></div>'
    '<div class="ex"><span class="tag">يومي</span><div class="flow"><span class="after">If the sun <b>sets</b>, it gets dark.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">Zero = <span class="en">If + present simple , present simple</span> ← حقيقة دائمة.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the correct present-simple verb.', 'اختر/ي فعل المضارع البسيط الصحيح.',
    '<ol class="enlist">'
    '<li>If you heat ice, it ____. <span class="choices">( melt / melts )</span></li>'
    '<li>If you ____ fire, it burns you. <span class="choices">( touch / touches )</span></li>'
    '<li>Water ____ if the temperature drops to 0°C. <span class="choices">( freeze / freezes )</span></li>'
    '<li>If plants don\'t get water, they ____. <span class="choices">( die / dies )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>If you mix blue and yellow, you ____ green. <span class="choices"><span class="opt">a) get</span><span class="opt">b) will get</span><span class="opt">c) got</span></span></li>'
    '<li>Ice melts if you ____ it. <span class="choices"><span class="opt">a) heat</span><span class="opt">b) will heat</span><span class="opt">c) heated</span></span></li>'
    '<li>If the sun ____, it gets dark. <span class="choices"><span class="opt">a) sets</span><span class="opt">b) will set</span><span class="opt">c) set</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Fill in with the present simple from the word bank.', 'أكمِل/ي بالمضارع البسيط من بنك الكلمات.',
    '<div class="wordbank"><b>بنك الكلمات · Word bank</b> melts &nbsp;·&nbsp; boils &nbsp;·&nbsp; opens &nbsp;·&nbsp; grow</div>'
    '<ol class="enlist">'
    '<li>If you heat ice, it <span class="blank"></span>.</li>'
    '<li>Water <span class="blank"></span> at 100°C if you heat it.</li>'
    '<li>If you press this button, the door <span class="blank"></span>.</li>'
    '<li>If you plant seeds and water them, they <span class="blank"></span>.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each if-clause with its result — write the letter.', 'صِل/ي جملة الشرط بنتيجتها — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) If you heat ice,</span><span>____</span></div>'
    '<div class="row"><span>2) If it rains,</span><span>____</span></div>'
    '<div class="row"><span>3) If you mix red and white,</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) the ground gets wet.</span></div>'
    '<div class="row"><span>b) you get pink.</span></div>'
    '<div class="row"><span>c) it melts.</span></div></div></div>')
e5 = q('5', 'Join · اربط', 'Join the two facts into a zero conditional.', 'اربط/ي الحقيقتين في جملة شرطية صفرية.',
    '<ol class="enlist">'
    '<li>you don\'t sleep / you feel tired → ' + wl('52%') + '</li>'
    '<li>you heat butter / it melts → ' + wl('52%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>If you will heat ice, it melts. → ' + wl('50%') + '</li>'
    '<li>If you drop a glass, it will breaks. → ' + wl('50%') + '</li>'
    '<li>Water boils if you will heat it. → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Put each verb into the present simple.', 'ضع/ي الفعل في المضارع البسيط.',
    '<div class="para">Nature follows simple rules. If the sun (1) __________ (shine), the olives (2) __________ (grow) well. '
    'If it (3) __________ (not / rain), the farmers (4) __________ (water) the trees. '
    'And if you (5) __________ (press) olives, you get fresh oil.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 zero conditionals about nature or daily habits.', 'اكتب/ي ٣ جمل شرطية صفرية عن الطبيعة أو العادات اليومية.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'melts · touch · freezes · die'),
    ('تمرين ٢:', 'a) get · a) heat · a) sets'),
    ('تمرين ٣:', 'melts · boils · opens · grow'),
    ('تمرين ٤:', '1 → c · 2 → a · 3 → b'),
    ('تمرين ٥:', 'If you don\'t sleep, you feel tired. · If you heat butter, it melts.'),
    ('تمرين ٦:', 'If you heat ice, it melts. · it breaks. · if you heat it.'),
    ('تمرين ٧:', '1 shines · 2 grow · 3 doesn\'t rain · 4 water · 5 press'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (حقائق: If + present, present).'),
])
docs['conditionals-0'] = head('Conditionals — Zero (Type 0) | T. Wad Refae') + \
    page(s + foot(True, 'Conditionals · Type 0 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Conditionals · Type 0 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Conditionals · Type 0 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Conditionals · Type 0 · صفحة ٤ من ٤'))

# =========================================================================
# TYPE 1 — First Conditional (real future)
# =========================================================================
s = lesson_head('المستقبل الممكن — First Conditional', 'Type 1 — First Conditional')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">الشرطية الأولى لموقف <span class="hl-y">واقعي ممكن الحدوث في المستقبل</span>.'
    '<span class="en-fact">The first conditional is for a real, possible situation in the future.</span></p>'
    '<div class="formula">If + present simple , will + verb</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('جزء <span class="en">If</span>: مضارع بسيط (<span class="hl-p">ليس will</span>).', 'The if-clause uses the present simple (not will).')
    + fact('النتيجة: <span class="en">will + فعل مجرد</span>.', 'The result uses will + base verb.')
    + fact('للوعود والتحذيرات والخطط الواقعية.', 'Used for promises, warnings and real plans.')
    + '</ul>'
    '<table><tr><th>If-clause (present)</th><th>Main clause (will)</th></tr>'
    '<tr><td class="en">If it rains tomorrow,</td><td class="en">we will stay home.</td></tr>'
    '<tr><td class="en">If you study,</td><td class="en">you will pass.</td></tr>'
    '<tr><td class="en">If I see him,</td><td class="en">I will tell him.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">جزء <span class="en">If</span> مضارع بسيط، والنتيجة <span class="hl-p">will</span> — لا نضع <span class="en">will</span> بعد <span class="en">If</span>.'
    '<span class="en-fact">If-clause = present simple; result = will. Never put "will" after "if".</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">تحذير</span><div class="flow"><span class="after">If you run, you <b>will fall</b>.</span></div></div>'
    '<div class="ex"><span class="tag">خطة</span><div class="flow"><span class="after">If the weather is nice, we <b>will go</b> to Jaffa.</span></div></div>'
    '<div class="ex"><span class="tag">وعد</span><div class="flow"><span class="after">If you help me, I <b>will help</b> you.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">First = <span class="en">If + present simple , will + verb</span> ← مستقبل ممكن.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the correct verb.', 'اختر/ي الفعل الصحيح.',
    '<ol class="enlist">'
    '<li>If it rains tomorrow, we ____ home. <span class="choices">( stay / will stay )</span></li>'
    '<li>If you ____ hard, you will pass. <span class="choices">( study / will study )</span></li>'
    '<li>I will call you if I ____ time. <span class="choices">( have / will have )</span></li>'
    '<li>If she comes, I ____ her. <span class="choices">( tell / will tell )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>If you heat the water, it ____ boil. <span class="choices"><span class="opt">a) will</span><span class="opt">b) is</span><span class="opt">c) does</span></span></li>'
    '<li>We will play outside if it ____ sunny. <span class="choices"><span class="opt">a) is</span><span class="opt">b) will be</span><span class="opt">c) was</span></span></li>'
    '<li>If I ____ my homework, I will watch TV. <span class="choices"><span class="opt">a) finish</span><span class="opt">b) will finish</span><span class="opt">c) finished</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Use the present simple in the if-clause and "will" in the result.', 'استخدم/ي المضارع في جملة الشرط و will في النتيجة.',
    '<ol class="enlist">'
    '<li>If it __________ (rain), we __________ (stay) home.</li>'
    '<li>If you __________ (help) me, I __________ (be) grateful.</li>'
    '<li>If they __________ (win), they __________ (celebrate).</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each if-clause with its result — write the letter.', 'صِل/ي جملة الشرط بنتيجتها — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) If you study hard,</span><span>____</span></div>'
    '<div class="row"><span>2) If it is cold,</span><span>____</span></div>'
    '<div class="row"><span>3) If we leave now,</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) we will catch the bus.</span></div>'
    '<div class="row"><span>b) you will pass.</span></div>'
    '<div class="row"><span>c) I will wear a coat.</span></div></div></div>')
e5 = q('5', 'Join · اربط', 'Join into a first conditional.', 'اربط/ي في جملة شرطية أولى.',
    '<ol class="enlist">'
    '<li>you / not hurry — you / miss the bus → ' + wl('50%') + '</li>'
    '<li>it / be sunny — we / go to the beach → ' + wl('50%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>If it will rain, we will stay home. → ' + wl('50%') + '</li>'
    '<li>If you will study, you will pass. → ' + wl('50%') + '</li>'
    '<li>If I see her, I tell her. → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete with the first conditional.', 'أكمِل/ي بالشرطية الأولى.',
    '<div class="para">Tomorrow is the school trip. If the weather (1) __________ (be) nice, we (2) __________ (visit) the old city. '
    'If we (3) __________ (leave) early, we (4) __________ (have) more time. '
    'And if everyone (5) __________ (bring) food, we (6) __________ (share) a big picnic!</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 first conditionals (a promise, a plan, a warning).', 'اكتب/ي ٣ جمل شرطية أولى (وعد، خطة، تحذير).',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'will stay · study · have · will tell'),
    ('تمرين ٢:', 'a) will · a) is · a) finish'),
    ('تمرين ٣:', 'rains / will stay · help / will be · win / will celebrate'),
    ('تمرين ٤:', '1 → b · 2 → c · 3 → a'),
    ('تمرين ٥:', 'If you don\'t hurry, you will miss the bus. · If it is sunny, we will go to the beach.'),
    ('تمرين ٦:', 'If it rains, ... · If you study, ... · I will tell her.'),
    ('تمرين ٧:', '1 is · 2 will visit · 3 leave · 4 will have · 5 brings · 6 will share'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (If + present, will + verb).'),
])
docs['conditionals-1'] = head('Conditionals — First (Type 1) | T. Wad Refae') + \
    page(s + foot(True, 'Conditionals · Type 1 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Conditionals · Type 1 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Conditionals · Type 1 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Conditionals · Type 1 · صفحة ٤ من ٤'))

# =========================================================================
# TYPE 2 — Second Conditional (unreal present / imaginary)
# =========================================================================
s = lesson_head('الخيال والافتراض — Second Conditional', 'Type 2 — Second Conditional')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">الشرطية الثانية لموقف <span class="hl-y">خيالي أو غير واقعي</span> في الحاضر (أو غير محتمل).'
    '<span class="en-fact">The second conditional is for an unreal or imaginary situation in the present.</span></p>'
    '<div class="formula">If + past simple , would + verb</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('جزء <span class="en">If</span>: ماضٍ بسيط (لكنه يدل على <span class="hl-p">الحاضر الخيالي</span>).', 'The if-clause uses the past simple (but means the imaginary present).')
    + fact('النتيجة: <span class="en">would + فعل مجرد</span>.', 'The result uses would + base verb.')
    + fact('مع <span class="en">be</span> نستخدم <span class="en">were</span> لكل الفاعلين، خاصة للنصيحة: <span class="en">If I were you…</span>', 'Use "were" for all subjects; for advice: If I were you, I would…')
    + '</ul>'
    '<table><tr><th>If-clause (past)</th><th>Main clause (would)</th></tr>'
    '<tr><td class="en">If I were rich,</td><td class="en">I would travel the world.</td></tr>'
    '<tr><td class="en">If I had a car,</td><td class="en">I would drive to Jaffa.</td></tr>'
    '<tr><td class="en">If I were you,</td><td class="en">I would study harder.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">جزء <span class="en">If</span> ماضٍ بسيط، والنتيجة <span class="hl-p">would + فعل مجرد</span>. ومع <span class="en">be</span> نستخدم <span class="en">were</span>.'
    '<span class="en-fact">If-clause = past simple; result = would + base. With "be", use "were".</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">خيال</span><div class="flow"><span class="after">If I <b>had</b> wings, I <b>would fly</b>.</span></div></div>'
    '<div class="ex"><span class="tag">نصيحة</span><div class="flow"><span class="after">If I <b>were</b> you, I <b>would apologize</b>.</span></div></div>'
    '<div class="ex"><span class="tag">غير محتمل</span><div class="flow"><span class="after">If I <b>won</b> the prize, I <b>would help</b> my family.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">Second = <span class="en">If + past simple , would + verb</span> ← خيال/افتراض في الحاضر (<span class="en">If I were…</span>).</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the correct word.', 'اختر/ي الكلمة الصحيحة.',
    '<ol class="enlist">'
    '<li>If I ____ a bird, I would fly. <span class="choices">( am / were )</span></li>'
    '<li>If I had a million dollars, I ____ help the poor. <span class="choices">( will / would )</span></li>'
    '<li>If she studied more, she ____ pass. <span class="choices">( would / will )</span></li>'
    '<li>If I ____ you, I would apologize. <span class="choices">( was / were )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>If I had more time, I ____ read more books. <span class="choices"><span class="opt">a) would</span><span class="opt">b) will</span><span class="opt">c) do</span></span></li>'
    '<li>If she ____ taller, she would play basketball. <span class="choices"><span class="opt">a) were</span><span class="opt">b) is</span><span class="opt">c) will be</span></span></li>'
    '<li>We would travel if we ____ enough money. <span class="choices"><span class="opt">a) had</span><span class="opt">b) have</span><span class="opt">c) will have</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Use the past simple in the if-clause and "would" in the result.', 'استخدم/ي الماضي في جملة الشرط و would في النتيجة.',
    '<ol class="enlist">'
    '<li>If I __________ (be) a teacher, I __________ (help) every student.</li>'
    '<li>If we __________ (live) by the sea, we __________ (swim) every day.</li>'
    '<li>If he __________ (have) a bike, he __________ (ride) to school.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each if-clause with its result — write the letter.', 'صِل/ي جملة الشرط بنتيجتها — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) If I were rich,</span><span>____</span></div>'
    '<div class="row"><span>2) If I had wings,</span><span>____</span></div>'
    '<div class="row"><span>3) If I were you,</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) I would fly.</span></div>'
    '<div class="row"><span>b) I would not worry.</span></div>'
    '<div class="row"><span>c) I would build a school.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Make it imaginary (second conditional).', 'حوّل/يها إلى موقف خيالي (شرطية ثانية).',
    '<ol class="enlist">'
    '<li>I don\'t have a car, so I don\'t drive. → If I ' + wl('44%') + '</li>'
    '<li>She isn\'t free, so she doesn\'t travel. → If she ' + wl('44%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>If I would have money, I would help. → ' + wl('50%') + '</li>'
    '<li>If I was you, I would study. → ' + wl('50%') + '</li>'
    '<li>If she studied, she will pass. → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete with the second conditional.', 'أكمِل/ي بالشرطية الثانية.',
    '<div class="para">I often dream about the future. If I (1) __________ (be) the mayor of my town, I (2) __________ (build) '
    'more parks. If children (3) __________ (have) safe streets, they (4) __________ (play) outside every day. '
    'If I (5) __________ (can), I would plant a thousand olive trees.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 second conditionals starting with "If I were…".', 'اكتب/ي ٣ جمل شرطية ثانية تبدأ بـ "If I were…".',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'were · would · would · were'),
    ('تمرين ٢:', 'a) would · a) were · a) had'),
    ('تمرين ٣:', 'were / would help · lived / would swim · had / would ride'),
    ('تمرين ٤:', '1 → c · 2 → a · 3 → b'),
    ('تمرين ٥:', 'If I had a car, I would drive. · If she were free, she would travel.'),
    ('تمرين ٦:', 'If I had money, I would help. · If I were you, ... · she would pass.'),
    ('تمرين ٧:', '1 were · 2 would build · 3 had · 4 would play · 5 could'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (If I were…, I would…).'),
])
docs['conditionals-2'] = head('Conditionals — Second (Type 2) | T. Wad Refae') + \
    page(s + foot(True, 'Conditionals · Type 2 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Conditionals · Type 2 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Conditionals · Type 2 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Conditionals · Type 2 · صفحة ٤ من ٤'))

# =========================================================================
# TYPE 3 — Third Conditional (unreal past / regret)
# =========================================================================
s = lesson_head('الماضي والندم — Third Conditional', 'Type 3 — Third Conditional')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">الشرطية الثالثة لموقف <span class="hl-y">خيالي في الماضي</span> لم يحدث — غالبًا للندم أو تخيّل نتيجة مختلفة.'
    '<span class="en-fact">The third conditional is for an unreal past that did not happen — often regret.</span></p>'
    '<div class="formula">If + had + V3 , would have + V3</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('جزء <span class="en">If</span>: <span class="en">had + تصريف ثالث</span> (past perfect).', 'If-clause: had + past participle (past perfect).')
    + fact('النتيجة: <span class="en">would have + تصريف ثالث</span>.', 'Result: would have + past participle.')
    + fact('نستخدمها <span class="hl-p">للندم</span> أو لنتيجة مختلفة لو تغيّر الماضي.', 'Used for regret or a different past result.')
    + '</ul>'
    '<table><tr><th>If-clause (had + V3)</th><th>Main clause (would have + V3)</th></tr>'
    '<tr><td class="en">If I had studied,</td><td class="en">I would have passed.</td></tr>'
    '<tr><td class="en">If we had left early,</td><td class="en">we wouldn\'t have missed the bus.</td></tr>'
    '<tr><td class="en">If she had called,</td><td class="en">I would have helped.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">جزء <span class="en">If</span>: <span class="en">had + V3</span>؛ النتيجة: <span class="hl-p">would have + V3</span> — كل شيء في الماضي.'
    '<span class="en-fact">If-clause: had + V3; result: would have + V3 — all in the past.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">ندم</span><div class="flow"><span class="after">If I <b>had woken</b> up early, I <b>would have caught</b> the bus.</span></div></div>'
    '<div class="ex"><span class="tag">نتيجة مختلفة</span><div class="flow"><span class="after">If it <b>had rained</b>, the plants <b>would have grown</b>.</span></div></div>'
    '<div class="ex"><span class="tag">ندم</span><div class="flow"><span class="after">If you <b>had asked</b>, I <b>would have helped</b> you.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">Third = <span class="en">If + had + V3 , would have + V3</span> ← ماضٍ خيالي / ندم.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the correct form.', 'اختر/ي الصيغة الصحيحة.',
    '<ol class="enlist">'
    '<li>If I had studied, I ____ the exam. <span class="choices">( would pass / would have passed )</span></li>'
    '<li>If we ____ early, we wouldn\'t have missed the bus. <span class="choices">( left / had left )</span></li>'
    '<li>She would have helped if you ____ her. <span class="choices">( called / had called )</span></li>'
    '<li>If they had known, they ____. <span class="choices">( would come / would have come )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>If I had seen you, I ____ hello. <span class="choices"><span class="opt">a) would have said</span><span class="opt">b) would say</span><span class="opt">c) said</span></span></li>'
    '<li>If he ____ harder, he would have won. <span class="choices"><span class="opt">a) had trained</span><span class="opt">b) trained</span><span class="opt">c) trains</span></span></li>'
    '<li>We would have arrived on time if the car ____ down. <span class="choices"><span class="opt">a) hadn\'t broken</span><span class="opt">b) didn\'t break</span><span class="opt">c) doesn\'t break</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Use had + V3 in the if-clause and would have + V3 in the result.', 'استخدم/ي had + V3 في الشرط و would have + V3 في النتيجة.',
    '<ol class="enlist">'
    '<li>If I __________ (know), I __________ (tell) you.</li>'
    '<li>If they __________ (leave) earlier, they __________ (arrive) on time.</li>'
    '<li>If she __________ (study), she __________ (pass).</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each if-clause with its result — write the letter.', 'صِل/ي جملة الشرط بنتيجتها — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) If I had saved money,</span><span>____</span></div>'
    '<div class="row"><span>2) If you had asked,</span><span>____</span></div>'
    '<div class="row"><span>3) If it had rained,</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) I would have helped.</span></div>'
    '<div class="row"><span>b) the plants would have grown.</span></div>'
    '<div class="row"><span>c) I would have bought a bike.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Make a third conditional (regret) from the facts.', 'كوّن/ي شرطية ثالثة (ندم) من الحقائق.',
    '<ol class="enlist">'
    '<li>I didn\'t study, so I failed. → ' + wl('54%') + '</li>'
    '<li>We didn\'t hurry, so we missed the train. → ' + wl('52%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>If I had study, I would have passed. → ' + wl('50%') + '</li>'
    '<li>If you asked, I would have helped. → ' + wl('50%') + '</li>'
    '<li>If she had called, I would helped. → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete with the third conditional.', 'أكمِل/ي بالشرطية الثالثة.',
    '<div class="para">Yesterday was a hard day. If I (1) __________ (set) my alarm, I (2) __________ (not / miss) the bus. '
    'If I (3) __________ (take) my umbrella, I (4) __________ (not / get) wet. '
    'If my friend (5) __________ (call) me, I would have waited for her.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 third conditionals about things you regret.', 'اكتب/ي ٣ جمل شرطية ثالثة عن أشياء تندم/ين عليها.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'would have passed · had left · had called · would have come'),
    ('تمرين ٢:', 'a) would have said · a) had trained · a) hadn\'t broken'),
    ('تمرين ٣:', 'had known / would have told · had left / would have arrived · had studied / would have passed'),
    ('تمرين ٤:', '1 → c · 2 → a · 3 → b'),
    ('تمرين ٥:', 'If I had studied, I would have passed. · If we had hurried, we wouldn\'t have missed the train.'),
    ('تمرين ٦:', 'If I had studied, ... · If you had asked, ... · I would have helped.'),
    ('تمرين ٧:', '1 had set · 2 wouldn\'t have missed · 3 had taken · 4 wouldn\'t have got · 5 had called'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (If + had + V3, would have + V3).'),
])
docs['conditionals-3'] = head('Conditionals — Third (Type 3) | T. Wad Refae') + \
    page(s + foot(True, 'Conditionals · Type 3 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Conditionals · Type 3 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Conditionals · Type 3 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Conditionals · Type 3 · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
