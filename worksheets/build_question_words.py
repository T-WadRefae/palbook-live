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
    return ('<div class="lesson-head">\n<h1>Wh- Questions</h1>\n'
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
# LEVEL 1 — the wh- words and what they ask
# =========================================================================
s = lesson_head('أدوات الاستفهام — Wh- Question Words', 'Level 1 — Foundation')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">أدوات الاستفهام (<span class="en">wh-</span>) نسأل بها عن <span class="hl-y">معلومات</span>: شخص، شيء، مكان، زمان، سبب، أو طريقة.'
    '<span class="en-fact">Wh- words ask for information: a person, thing, place, time, reason or way.</span></p>'
    '<div class="formula">Wh- + is/are + ...? &nbsp;|&nbsp; Wh- + do/does + subject + verb?</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">Who</span> = شخص · <span class="en">What</span> = شيء · <span class="en">Where</span> = مكان.', 'Who = person · What = thing · Where = place.')
    + fact('<span class="en">When</span> = زمان · <span class="en">Why</span> = سبب · <span class="en">How</span> = طريقة.', 'When = time · Why = reason · How = way / manner.')
    + fact('نجيب عن <span class="en">Why</span> بـ <span class="en">Because…</span>', 'Answer "Why?" with "Because…".')
    + '</ul>'
    '<table><tr><th>Wh-</th><th>يسأل عن</th><th>Example answer</th></tr>'
    '<tr><td class="en">Who</td><td>شخص</td><td class="en">My father.</td></tr>'
    '<tr><td class="en">What</td><td>شيء</td><td class="en">A book.</td></tr>'
    '<tr><td class="en">Where</td><td>مكان</td><td class="en">In Jaffa.</td></tr>'
    '<tr><td class="en">When</td><td>زمان</td><td class="en">On Friday.</td></tr>'
    '<tr><td class="en">Why</td><td>سبب</td><td class="en">Because it\'s Eid.</td></tr>'
    '<tr><td class="en">How</td><td>طريقة</td><td class="en">By bus.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">اختر/ي الأداة حسب نوع المعلومة المطلوبة، ثم أكمل/ي السؤال.'
    '<span class="en-fact">Pick the wh- word for the information you want, then finish the question.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">شخص · who</span><div class="flow"><span class="after"><b>Who</b> is your teacher?</span></div></div>'
    '<div class="ex"><span class="tag">مكان · where</span><div class="flow"><span class="after"><b>Where</b> do you live?</span></div></div>'
    '<div class="ex"><span class="tag">سبب · why</span><div class="flow"><span class="after"><b>Why</b> are you happy? — Because it\'s Eid.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">Who</span>(شخص) <span class="en">What</span>(شيء) <span class="en">Where</span>(مكان) <span class="en">When</span>(زمان) <span class="en">Why</span>(سبب) <span class="en">How</span>(طريقة).</div></div>')

e1 = q('1', 'Recognize · تعرّف', 'Choose the correct wh- word.', 'اختر/ي أداة الاستفهام الصحيحة.',
    '<ol class="enlist">'
    '<li>____ is your name? <span class="choices">( What / Where )</span></li>'
    '<li>____ do you live? <span class="choices">( When / Where )</span></li>'
    '<li>____ are you sad? <span class="choices">( Why / Who )</span></li>'
    '<li>____ is your best friend? <span class="choices">( Who / What )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the wh- word that fits the answer.', 'اختر/ي الأداة التي تناسب الجواب.',
    '<ol class="enlist">'
    '<li>____ do you go to school? — At 7 o\'clock. <span class="choices"><span class="opt">a) When</span><span class="opt">b) Where</span><span class="opt">c) Who</span></span></li>'
    '<li>____ do you go to school? — By bus. <span class="choices"><span class="opt">a) How</span><span class="opt">b) Why</span><span class="opt">c) What</span></span></li>'
    '<li>____ is this? — It\'s a kite. <span class="choices"><span class="opt">a) What</span><span class="opt">b) Who</span><span class="opt">c) Where</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Fill in with a wh- word from the word bank.', 'أكمِل/ي بأداة استفهام من بنك الكلمات.',
    '<div class="wordbank"><b>بنك الكلمات · Word bank</b> Who &nbsp;·&nbsp; What &nbsp;·&nbsp; Where &nbsp;·&nbsp; When</div>'
    '<ol class="enlist">'
    '<li>____ is your birthday? — In May.</li>'
    '<li>____ do you play with? — My brother.</li>'
    '<li>____ do you keep your books? — In my bag.</li>'
    '<li>____ do you eat for breakfast? — Hummus.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each question with its answer — write the letter.', 'صِل/ي كل سؤال بجوابه — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) Where is Jaffa?</span><span>____</span></div>'
    '<div class="row"><span>2) Who is she?</span><span>____</span></div>'
    '<div class="row"><span>3) Why are you late?</span><span>____</span></div>'
    '<div class="row"><span>4) When is lunch?</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) At 1 o\'clock.</span></div>'
    '<div class="row"><span>b) My sister.</span></div>'
    '<div class="row"><span>c) On the coast.</span></div>'
    '<div class="row"><span>d) Because of the traffic.</span></div></div></div>')
e5 = q('5', 'Complete · أكمل السؤال', 'Complete each question with a wh- word to fit the answer.', 'أكمِل/ي السؤال بأداة تناسب الجواب.',
    '<ol class="enlist">'
    '<li>____ do you live? — In Gaza.</li>'
    '<li>____ is your teacher? — Mr. Sami.</li>'
    '<li>____ do you go home? — At 2 pm.</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each question has one mistake. Correct it.', 'في كل سؤال خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>Where you live? → ' + wl('52%') + '</li>'
    '<li>What is you name? → ' + wl('52%') + '</li>'
    '<li>Who are your teacher? → ' + wl('52%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete the dialogue with wh- words.', 'أكمِل/ي الحوار بأدوات الاستفهام.',
    '<div class="para">A: (1) __________ is your name? &nbsp; B: My name is Lara.<br>'
    'A: (2) __________ do you live? &nbsp; B: In Ramallah.<br>'
    'A: (3) __________ old are you? &nbsp; B: I am eleven.<br>'
    'A: (4) __________ do you go to school? &nbsp; B: By bus.<br>'
    'A: (5) __________ is your favourite subject? &nbsp; B: English!</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 wh- questions to ask a new friend.', 'اكتب/ي ٣ أسئلة wh- لتسألها لصديق جديد.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'What · Where · Why · Who'),
    ('تمرين ٢:', 'a) When · a) How · a) What'),
    ('تمرين ٣:', 'When · Who · Where · What'),
    ('تمرين ٤:', '1 → c · 2 → b · 3 → d · 4 → a'),
    ('تمرين ٥:', 'Where · Who · When'),
    ('تمرين ٦:', 'Where do you live? · What is your name? · Who is your teacher?'),
    ('تمرين ٧:', '1 What · 2 Where · 3 How · 4 How · 5 What'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (أسئلة wh-).'),
])
docs['question-words-1'] = head('Wh- Questions — Level 1 | T. Wad Refae') + \
    page(s + foot(True, 'Wh- Questions · Level 1 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Wh- Questions · Level 1 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Wh- Questions · Level 1 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Wh- Questions · Level 1 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 2 — forming wh- questions across tenses
# =========================================================================
s = lesson_head('تكوين الأسئلة — Wh- Questions in Different Tenses', 'Level 2 — Forming Questions')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نكوّن سؤال <span class="en">wh-</span> بالترتيب: <span class="hl-y">الأداة + الفعل المساعد + الفاعل + الفعل</span>.'
    '<span class="en-fact">Form a wh- question: Wh- + auxiliary + subject + main verb?</span></p>'
    '<div class="formula">Wh- + (is/are · do/does · did · will/can) + subject + verb?</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('مع <span class="en">be</span>: <span class="en">What are you doing?</span>', 'With be: What are you doing? / Where is she?')
    + fact('المضارع: <span class="en">do/does</span> + فعل مجرد.', 'Present: Where do you live? / What does he want?')
    + fact('الماضي: <span class="en">did</span> + فعل مجرد.', 'Past: What did you eat? (base verb)')
    + fact('المستقبل/القدرة: <span class="en">will / can</span>.', 'Future / ability: When will you come? / What can you see?')
    + '</ul>'
    '<table><tr><th>Tense</th><th>Example question</th></tr>'
    '<tr><td class="en">Present (be)</td><td class="en">What are you doing?</td></tr>'
    '<tr><td class="en">Present (do)</td><td class="en">Where do you live?</td></tr>'
    '<tr><td class="en">Past (did)</td><td class="en">What did you eat?</td></tr>'
    '<tr><td class="en">Future (will)</td><td class="en">When will you travel?</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">رتّب/ي: <span class="hl-p">Wh- + مساعد + فاعل + فعل</span>.'
    '<span class="en-fact">Order: Wh- + auxiliary + subject + verb.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">ترتيب</span><div class="flow"><span class="base">what / you / are / doing</span><span class="arrow">→</span><span class="after"><b>What are you doing?</b></span></div></div>'
    '<div class="ex"><span class="tag">ترتيب</span><div class="flow"><span class="base">where / did / you / go</span><span class="arrow">→</span><span class="after"><b>Where did you go?</b></span></div></div>'
    '<div class="ex"><span class="tag">مستقبل</span><div class="flow"><span class="after"><b>When will</b> they <b>arrive</b>?</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">Wh- + auxiliary + subject + verb?</span> — بعد <span class="en">did</span> الفعل يبقى <span class="hl-y">مجرّدًا</span>.</div></div>')

e1 = q('1', 'Recognize · تعرّف', 'Choose the correct auxiliary.', 'اختر/ي الفعل المساعد الصحيح.',
    '<ol class="enlist">'
    '<li>What ____ you doing? <span class="choices">( are / do / did )</span></li>'
    '<li>Where ____ he live? <span class="choices">( do / does / is )</span></li>'
    '<li>What ____ you eat yesterday? <span class="choices">( do / did / are )</span></li>'
    '<li>When ____ you come tomorrow? <span class="choices">( will / did / do )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>What ____ she want? <span class="choices"><span class="opt">a) does</span><span class="opt">b) do</span><span class="opt">c) is</span></span></li>'
    '<li>Where ____ they yesterday? <span class="choices"><span class="opt">a) did</span><span class="opt">b) were</span><span class="opt">c) do</span></span></li>'
    '<li>What ____ you do next week? <span class="choices"><span class="opt">a) will</span><span class="opt">b) did</span><span class="opt">c) are</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with is, are, do, does, did or will.', 'أكمِل/ي بـ is / are / do / does / did / will.',
    '<ol class="enlist">'
    '<li>What __________ you reading now?</li>'
    '<li>Where __________ your father work?</li>'
    '<li>What time __________ the film start yesterday?</li>'
    '<li>When __________ we meet tomorrow?</li></ol>')
e4 = q('4', 'Build · ترتيب الكلمات', 'Put the words in order to make a question.', 'رتّب/ي الكلمات لتكوين سؤال.',
    '<ol class="enlist">'
    '<li>(you / where / did / go) → ' + wl('52%') + '</li>'
    '<li>(does / what / want / she) → ' + wl('52%') + '</li>'
    '<li>(will / when / arrive / they) → ' + wl('52%') + '</li></ol>')
e5 = q('5', 'Transform · تحويل', 'Make a wh- question for the bracketed part.', 'كوّن/ي سؤال wh- للجزء بين القوسين.',
    '<ol class="enlist">'
    '<li>You went to [the market]. → ' + wl('54%') + '</li>'
    '<li>She is reading [a book]. → ' + wl('54%') + '</li>'
    '<li>They will travel [tomorrow]. → ' + wl('54%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each question has one mistake. Correct it.', 'في كل سؤال خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>Where you did go? → ' + wl('52%') + '</li>'
    '<li>What she is doing? → ' + wl('52%') + '</li>'
    '<li>When will comes he? → ' + wl('52%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete the interview with the correct word.', 'أكمِل/ي المقابلة بالكلمة الصحيحة.',
    '<div class="para">Reporter: (1) __________ is your name? &nbsp; Sami: Sami Khalil.<br>'
    'Reporter: Where (2) __________ you live? &nbsp; Sami: In Hebron.<br>'
    'Reporter: What (3) __________ you do last weekend? &nbsp; Sami: I visited my uncle.<br>'
    'Reporter: What (4) __________ you do next summer? &nbsp; Sami: I will travel to Jaffa.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write a wh- question in the past, one in the present, and one in the future.', 'اكتب/ي سؤال wh- بالماضي، وآخر بالمضارع، وآخر بالمستقبل.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'are · does · did · will'),
    ('تمرين ٢:', 'a) does · b) were · a) will'),
    ('تمرين ٣:', 'are · does · did · will'),
    ('تمرين ٤:', 'Where did you go? · What does she want? · When will they arrive?'),
    ('تمرين ٥:', 'Where did you go? · What is she reading? · When will they travel?'),
    ('تمرين ٦:', 'Where did you go? · What is she doing? · When will he come?'),
    ('تمرين ٧:', '1 What · 2 do · 3 did · 4 will'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (ماضٍ / مضارع / مستقبل).'),
])
docs['question-words-2'] = head('Wh- Questions — Level 2 | T. Wad Refae') + \
    page(s + foot(True, 'Wh- Questions · Level 2 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Wh- Questions · Level 2 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Wh- Questions · Level 2 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Wh- Questions · Level 2 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 3 — How much/many, Which/Whose, subject vs object questions
# =========================================================================
s = lesson_head('أسئلة دقيقة — How much/many, Which, Whose & more', 'Level 3 — Advanced')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">عبارات استفهام أدق: <span class="en">How many/much, How old/long/often, What time, Which, Whose</span> — وفرق <span class="hl-g">سؤال الفاعل</span> عن <span class="hl-p">سؤال المفعول</span>.'
    '<span class="en-fact">More precise question phrases, and subject vs object questions.</span></p>'
    '<div class="formula">How many (countable) &nbsp;|&nbsp; How much (uncountable) &nbsp;|&nbsp; Whose · Which · What time</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">How many</span> + معدود · <span class="en">How much</span> + غير معدود.', 'How many + countable · How much + uncountable.')
    + fact('<span class="en">How old / long / often / far</span> · <span class="en">What time</span> · <span class="en">Which</span> (اختيار) · <span class="en">Whose</span> (ملكية).', 'How old/long/often/far, What time, Which (choice), Whose (ownership).')
    + fact('<span class="hl-g">سؤال الفاعل</span>: <span class="en">Who/What</span> فاعل — بدون <span class="en">do/did</span>.', 'Subject question: Who broke it? (no do/did). Object: Who did you see?')
    + '</ul>'
    '<table><tr><th>Phrase</th><th>Use</th><th>Example</th></tr>'
    '<tr><td class="en">How many</td><td>عدد</td><td class="en">How many brothers?</td></tr>'
    '<tr><td class="en">How much</td><td>كمية</td><td class="en">How much sugar?</td></tr>'
    '<tr><td class="en">How often</td><td>تكرار</td><td class="en">How often do you read?</td></tr>'
    '<tr><td class="en">Whose</td><td>ملكية</td><td class="en">Whose bag is this?</td></tr>'
    '<tr><td class="en">Which</td><td>اختيار</td><td class="en">Which colour?</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">إذا كان <span class="en">Who/What</span> هو <span class="hl-g">الفاعل</span> ← بدون <span class="en">do/did</span>. إذا كان <span class="hl-p">المفعول</span> ← بـ <span class="en">do/did</span>.'
    '<span class="en-fact">Who/What as the subject → no do/did. As the object → use do/did.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">فاعل · subject</span><div class="flow"><span class="after"><b>Who cooked</b> lunch?</span></div></div>'
    '<div class="ex"><span class="tag">مفعول · object</span><div class="flow"><span class="after"><b>Who did</b> you <b>call</b>?</span></div></div>'
    '<div class="ex"><span class="tag">كمية</span><div class="flow"><span class="after"><b>How much</b> does it cost?</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">How many</span>(معدود) · <span class="en">How much</span>(غير معدود) · سؤال الفاعل بدون <span class="en">do/did</span>.</div></div>')

e1 = q('1', 'Recognize · تعرّف', 'How many or How much?', 'How many أم How much؟',
    '<ol class="enlist">'
    '<li>____ students are there? <span class="choices">( many / much )</span></li>'
    '<li>____ money do you have? <span class="choices">( many / much )</span></li>'
    '<li>____ bread did you buy? <span class="choices">( many / much )</span></li>'
    '<li>____ apples are in the bag? <span class="choices">( many / much )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct question phrase.', 'اختر/ي عبارة الاستفهام الصحيحة.',
    '<ol class="enlist">'
    '<li>____ are you? — I\'m twelve. <span class="choices"><span class="opt">a) How old</span><span class="opt">b) How long</span><span class="opt">c) How far</span></span></li>'
    '<li>____ bag is this? — It\'s Sara\'s. <span class="choices"><span class="opt">a) Whose</span><span class="opt">b) Who</span><span class="opt">c) Which</span></span></li>'
    '<li>____ do you visit them? — Every week. <span class="choices"><span class="opt">a) How often</span><span class="opt">b) How many</span><span class="opt">c) What time</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with: How old / How often / Whose / Which / What time.', 'أكمِل/ي بالعبارة المناسبة.',
    '<ol class="enlist">'
    '<li>__________ does the bus leave? — At 7:00.</li>'
    '<li>__________ car is that? — My uncle\'s.</li>'
    '<li>__________ colour do you prefer, red or blue?</li>'
    '<li>__________ is this tree? — About 100 years.</li></ol>')
e4 = q('4', 'Subject or Object · فاعل أم مفعول', 'Make a question about the person or thing asked for.', 'كوّن/ي سؤالاً عن الشخص أو الشيء المطلوب.',
    '<ol class="enlist">'
    '<li>Someone broke the vase. (ask about the person) → ' + wl('46%') + '</li>'
    '<li>You saw someone. (ask about the person) → ' + wl('46%') + '</li>'
    '<li>Something made a noise. (ask about the thing) → ' + wl('46%') + '</li></ol>')
e5 = q('5', 'Build · تكوين سؤال', 'Write a question for the answer.', 'اكتب/ي سؤالاً يناسب الجواب.',
    '<ol class="enlist">'
    '<li>' + wl('60%') + ' — It costs 5 shekels.</li>'
    '<li>' + wl('60%') + ' — This is Sara\'s bag.</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each question has one mistake. Correct it.', 'في كل سؤال خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>How much books do you have? → ' + wl('50%') + '</li>'
    '<li>Who did break the window? → ' + wl('50%') + '</li>'
    '<li>How often you go? → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete the shopping dialogue.', 'أكمِل/ي حوار التسوّق.',
    '<div class="para">Seller: Welcome! (1) __________ can I help you?<br>'
    'Lara: (2) __________ much is this scarf?<br>'
    'Seller: It\'s 20 shekels. (3) __________ many do you want?<br>'
    'Lara: Two, please. (4) __________ colour is nicer, green or red?<br>'
    'Seller: The green one!</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 questions about your class using How many, How much and How often.', 'اكتب/ي ٣ أسئلة عن صفّك باستخدام How many و How much و How often.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'many · much · much · many'),
    ('تمرين ٢:', 'a) How old · a) Whose · a) How often'),
    ('تمرين ٣:', 'What time · Whose · Which · How old'),
    ('تمرين ٤:', 'Who broke the vase? · Who did you see? · What made a noise?'),
    ('تمرين ٥:', 'How much does it cost? · Whose bag is this?'),
    ('تمرين ٦:', 'How many books do you have? · Who broke the window? · How often do you go?'),
    ('تمرين ٧:', '1 How · 2 How · 3 How · 4 Which'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (How many / much / often).'),
])
docs['question-words-3'] = head('Wh- Questions — Level 3 | T. Wad Refae') + \
    page(s + foot(True, 'Wh- Questions · Level 3 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Wh- Questions · Level 3 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Wh- Questions · Level 3 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Wh- Questions · Level 3 · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
