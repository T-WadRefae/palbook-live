# -*- coding: utf-8 -*-
# Generator for the "Past Simple" worksheets (3 levels), matching the exact
# T. Wad Refae notebook design system used by the existing worksheets.
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
  .page.tight .section,.page.tight .q{margin:5px 0}
  .page.tight .writeline{margin:4px 0;height:19px}

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

def page(inner, cls=''):
    holes = '<div class="holes">' + '<span></span>' * 5 + '</div>'
    return '<div class="page%s">\n<div class="washi"></div>\n' % ((' ' + cls) if cls else '') + holes + '\n<div class="content">\n' + inner + '\n</div>\n</div>\n'

def lesson_head(subtitle, level):
    return ('<div class="lesson-head">\n<h1>Past Simple</h1>\n'
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
# LEVEL 1 — Foundation: regular verbs + past routines
# =========================================================================
s = lesson_head('أحداث انتهت في الماضي — Finished Past Actions', 'Level 1 — Foundation')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">الماضي البسيط نستخدمه لـ<span class="hl-y">حدثٍ وقع وانتهى في الماضي</span>.'
    '<span class="en-fact">We use the past simple for an action that happened and finished in the past.</span></p>'
    '<div class="formula">Regular verbs: Subject + verb + <span class="ing">ed</span> &nbsp;(play → played)</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('الصيغة <span class="hl-y">واحدة لكل الفاعلين</span> (verb+ed).', 'Same form for every subject: I / he / we / they played.')
    + fact('تهجئة <span class="ing">-ed</span>: الأصل+ed · بعد e نضيف d · ساكن+y→ied · الفعل القصير نضاعف آخر حرف.', 'Spelling: +ed; +d after e; consonant+y→ied; double the final consonant.')
    + fact('كلمات دالّة على الماضي.', 'Signal words: yesterday, last week, ... ago, in 2015.')
    + '</ul>'
    '<table><tr><th>Base</th><th>Past</th><th>Rule</th></tr>'
    '<tr><td class="en">play</td><td class="en">played</td><td class="en">+ ed</td></tr>'
    '<tr><td class="en">live</td><td class="en">lived</td><td class="en">+ d (ends in e)</td></tr>'
    '<tr><td class="en">study</td><td class="en">studied</td><td class="en">y → ied</td></tr>'
    '<tr><td class="en">stop</td><td class="en">stopped</td><td class="en">double</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">١) خذ/ي الفعل &nbsp; ٢) أضِف/ي <span class="ing">ed</span> حسب قاعدة التهجئة &nbsp; ٣) أضِف/ي كلمة ماضي (<span class="en">yesterday</span>).'
    '<span class="en-fact">1) Take the verb &nbsp; 2) Add -ed by the spelling rule &nbsp; 3) Add a past time word.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">الأصل ← الماضي</span><div class="flow"><span class="base">I play.</span><span class="arrow">→</span><span class="after">I <b>played</b> football yesterday.</span></div></div>'
    '<div class="ex"><span class="tag">الأصل ← الماضي</span><div class="flow"><span class="base">She watches.</span><span class="arrow">→</span><span class="after">She <b>watched</b> TV last night.</span></div></div>'
    '<div class="ex"><span class="tag">الأصل ← الماضي</span><div class="flow"><span class="base">They walk.</span><span class="arrow">→</span><span class="after">They <b>walked</b> to school.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">الماضي البسيط = فعل + <span class="en"><b>ed</b></span> ← حدث انتهى في الماضي (<span class="en">yesterday / ago</span>).</div></div>')

e1 = q('1', 'Recognize · تعرّف', 'Circle the correct past verb.', 'ضع/ي دائرة حول فعل الماضي الصحيح.',
    '<ol class="enlist">'
    '<li>Yesterday I ____ football. <span class="choices">( play / played )</span></li>'
    '<li>She ____ to music last night. <span class="choices">( listen / listened )</span></li>'
    '<li>They ____ in Jaffa last year. <span class="choices">( live / lived )</span></li>'
    '<li>We ____ our lessons. <span class="choices">( study / studied )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct past form.', 'اختر/ي صيغة الماضي الصحيحة.',
    '<ol class="enlist">'
    '<li>He ____ the door. <span class="choices"><span class="opt">a) open</span><span class="opt">b) opened</span><span class="opt">c) opens</span></span></li>'
    '<li>My mother ____ bread. <span class="choices"><span class="opt">a) bake</span><span class="opt">b) bakes</span><span class="opt">c) baked</span></span></li>'
    '<li>The boys ____ home. <span class="choices"><span class="opt">a) walked</span><span class="opt">b) walk</span><span class="opt">c) walking</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Fill in with the past (-ed) form from the word bank.', 'أكمِل/ي بصيغة الماضي (-ed) من بنك الكلمات.',
    '<div class="wordbank"><b>بنك الكلمات · Word bank</b> cook &nbsp;·&nbsp; play &nbsp;·&nbsp; watch &nbsp;·&nbsp; help</div>'
    '<ol class="enlist">'
    '<li>Yesterday my sister <span class="blank"></span> maqluba.</li>'
    '<li>We <span class="blank"></span> football in the yard.</li>'
    '<li>They <span class="blank"></span> a film last night.</li>'
    '<li>I <span class="blank"></span> my father on the farm.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each base verb with its past form — write the letter.', 'صِل/ي الفعل بماضيه — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) study</span><span>____</span></div>'
    '<div class="row"><span>2) stop</span><span>____</span></div>'
    '<div class="row"><span>3) live</span><span>____</span></div>'
    '<div class="row"><span>4) play</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) played</span></div>'
    '<div class="row"><span>b) studied</span></div>'
    '<div class="row"><span>c) lived</span></div>'
    '<div class="row"><span>d) stopped</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', "Rewrite in the past (add 'yesterday').", 'حوّل/ي الجملة للماضي (أضِف/ي <span class="en">yesterday</span>).',
    '<ol class="enlist">'
    '<li>I watch TV. → ' + wl('54%') + '</li>'
    '<li>She plays with her cat. → ' + wl('52%') + '</li>'
    '<li>We clean the house. → ' + wl('54%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>Yesterday he play football. → ' + wl('50%') + '</li>'
    '<li>She studyed all night. → ' + wl('50%') + '</li>'
    '<li>They stoped at the shop. → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Put each verb in brackets into the past simple.', 'ضع/ي الفعل بين القوسين في الماضي البسيط.',
    '<div class="para">Last Friday, my family (1) __________ (travel) to the village. We (2) __________ (help) my grandfather. '
    'He (3) __________ (plant) an olive tree. My mother (4) __________ (cook) a big lunch. '
    'In the evening, we (5) __________ (walk) home happily.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 sentences about what you did yesterday.', 'اكتب/ي ٣ جمل عمّا فعلته أمس.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'played · listened · lived · studied'),
    ('تمرين ٢:', 'b) opened · c) baked · a) walked'),
    ('تمرين ٣:', 'cooked · played · watched · helped'),
    ('تمرين ٤:', '1 → b · 2 → d · 3 → c · 4 → a'),
    ('تمرين ٥:', 'I watched TV yesterday. · She played with her cat yesterday. · We cleaned the house yesterday.'),
    ('تمرين ٦:', 'he played football. · She studied all night. · They stopped at the shop.'),
    ('تمرين ٧:', '1 travelled · 2 helped · 3 planted · 4 cooked · 5 walked'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (أفعال ماضية منتظمة -ed).'),
])
docs['past-simple-1'] = head('Past Simple — Level 1 | T. Wad Refae') + \
    page(s + foot(True, 'Past Simple · Level 1 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Simple · Level 1 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Simple · Level 1 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Simple · Level 1 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 2 — Irregular verbs
# =========================================================================
s = lesson_head('الأفعال الشاذة في الماضي — Irregular Past Verbs', 'Level 2 — Irregular Verbs')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">كثير من الأفعال الشائعة <span class="hl-y">شاذة</span> — لا تأخذ ed، ولها صيغة ماضي خاصة تُحفظ.'
    '<span class="en-fact">Many common verbs are irregular — they do not take -ed; they have a special past form.</span></p>'
    '<div class="formula">go → <b>went</b> &nbsp;·&nbsp; eat → <b>ate</b> &nbsp;·&nbsp; see → <b>saw</b></div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('أفعال شاذة شائعة <span class="hl-y">تُحفظ</span>.', 'Common irregulars: go→went, have→had, make→made, come→came, take→took.')
    + fact('صيغة الماضي <span class="hl-g">واحدة لكل الفاعلين</span>.', 'The past form is the same for every subject: I / he / they went.')
    + fact('نفس كلمات الماضي.', 'Same past signal words: yesterday, last night, ... ago.')
    + '</ul>'
    '<table><tr><th>Base</th><th>Past</th><th>Base</th><th>Past</th></tr>'
    '<tr><td class="en">go</td><td class="en">went</td><td class="en">see</td><td class="en">saw</td></tr>'
    '<tr><td class="en">eat</td><td class="en">ate</td><td class="en">have</td><td class="en">had</td></tr>'
    '<tr><td class="en">come</td><td class="en">came</td><td class="en">take</td><td class="en">took</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">اسأل/ي: هل الفعل <span class="hl-p">شاذ</span>؟ إن نعم استخدم/ي صيغته الخاصة (مش <span class="en">ed</span>).'
    '<span class="en-fact">Ask: is the verb irregular? If yes, use its special form (not -ed).</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">الأصل ← الماضي</span><div class="flow"><span class="base">We go.</span><span class="arrow">→</span><span class="after">We <b>went</b> to Jerusalem last Friday.</span></div></div>'
    '<div class="ex"><span class="tag">الأصل ← الماضي</span><div class="flow"><span class="base">She eats.</span><span class="arrow">→</span><span class="after">She <b>ate</b> maqluba at noon.</span></div></div>'
    '<div class="ex"><span class="tag">الأصل ← الماضي</span><div class="flow"><span class="base">I see.</span><span class="arrow">→</span><span class="after">I <b>saw</b> my grandfather yesterday.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">الأفعال الشاذة لها صيغة ماضي خاصة تُحفظ: <span class="en">go→went, eat→ate, see→saw</span> — بدون <span class="en">ed</span>.</div></div>')

e1 = q('1', 'Recognize · تعرّف', 'Regular or irregular verb?', 'صنّف/ي الفعل: منتظم أم شاذ؟',
    '<ol class="enlist">'
    '<li>go <span class="choices">( regular / irregular )</span></li>'
    '<li>play <span class="choices">( regular / irregular )</span></li>'
    '<li>eat <span class="choices">( regular / irregular )</span></li>'
    '<li>watch <span class="choices">( regular / irregular )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct past form.', 'اختر/ي صيغة الماضي الصحيحة.',
    '<ol class="enlist">'
    '<li>Yesterday we ____ to the market. <span class="choices"><span class="opt">a) goed</span><span class="opt">b) went</span><span class="opt">c) goes</span></span></li>'
    '<li>She ____ a sandwich. <span class="choices"><span class="opt">a) eated</span><span class="opt">b) eat</span><span class="opt">c) ate</span></span></li>'
    '<li>I ____ my friends. <span class="choices"><span class="opt">a) saw</span><span class="opt">b) seed</span><span class="opt">c) see</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Fill in with the irregular past from the word bank.', 'أكمِل/ي بصيغة الماضي الشاذة من بنك الكلمات.',
    '<div class="wordbank"><b>بنك الكلمات · Word bank</b> went &nbsp;·&nbsp; had &nbsp;·&nbsp; made &nbsp;·&nbsp; came</div>'
    '<ol class="enlist">'
    '<li>Last week I <span class="blank"></span> to Nablus.</li>'
    '<li>My mother <span class="blank"></span> a cake.</li>'
    '<li>We <span class="blank"></span> a great time.</li>'
    '<li>My cousins <span class="blank"></span> to visit us.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each base verb with its irregular past — write the letter.', 'صِل/ي الفعل بماضيه الشاذ — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) take</span><span>____</span></div>'
    '<div class="row"><span>2) write</span><span>____</span></div>'
    '<div class="row"><span>3) drink</span><span>____</span></div>'
    '<div class="row"><span>4) come</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) wrote</span></div>'
    '<div class="row"><span>b) came</span></div>'
    '<div class="row"><span>c) took</span></div>'
    '<div class="row"><span>d) drank</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Rewrite in the past (irregular verbs).', 'حوّل/ي للماضي (أفعال شاذة).',
    '<ol class="enlist">'
    '<li>I eat breakfast. → ' + wl('54%') + '</li>'
    '<li>They go to school. → ' + wl('54%') + '</li>'
    '<li>She writes a letter. → ' + wl('52%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>Yesterday she goed home. → ' + wl('50%') + '</li>'
    '<li>We eated knafeh. → ' + wl('50%') + '</li>'
    '<li>He taked my pen. → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Put each verb into the past simple (irregular).', 'ضع/ي الفعل في الماضي البسيط (شاذ).',
    '<div class="para">Last summer, my family (1) __________ (go) to Haifa. We (2) __________ (see) the sea. '
    'My father (3) __________ (buy) fresh fish. My mother (4) __________ (make) a picnic. '
    'We (5) __________ (have) a wonderful day.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 sentences about a past trip using irregular verbs.', 'اكتب/ي ٣ جمل عن رحلة في الماضي باستخدام أفعال شاذة.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'irregular · regular · irregular · regular'),
    ('تمرين ٢:', 'b) went · c) ate · a) saw'),
    ('تمرين ٣:', 'went · made · had · came'),
    ('تمرين ٤:', '1 → c · 2 → a · 3 → d · 4 → b'),
    ('تمرين ٥:', 'I ate breakfast. · They went to school. · She wrote a letter.'),
    ('تمرين ٦:', 'she went home. · We ate knafeh. · He took my pen.'),
    ('تمرين ٧:', '1 went · 2 saw · 3 bought · 4 made · 5 had'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (أفعال شاذة في الماضي).'),
])
docs['past-simple-2'] = head('Past Simple — Level 2 | T. Wad Refae') + \
    page(s + foot(True, 'Past Simple · Level 2 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Simple · Level 2 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Simple · Level 2 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Simple · Level 2 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 3 — Negatives, questions & storytelling
# =========================================================================
s = lesson_head('النفي والسؤال والسرد — Negatives, Questions & Storytelling', 'Level 3 — Negatives & Questions')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">في <span class="hl-g">النفي والسؤال</span> نستخدم <span class="en">did / didn\'t</span> + الفعل المجرد (بدون ed، والشاذ يرجع لأصله).'
    '<span class="en-fact">For negatives &amp; questions we use did / didn\'t + the base verb (no -ed; irregulars go back to base).</span></p>'
    '<div class="formula">(−) didn\'t + verb &nbsp;|&nbsp; (?) Did + subject + verb? &nbsp;|&nbsp; be: was / were</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('النفي: <span class="en">didn\'t + base</span> (She didn\'t go).', 'Negative: didn\'t + base verb.')
    + fact('السؤال: <span class="en">Did + subject + base?</span>', 'Question: Did + subject + base? → Yes, I did / No, I didn\'t.')
    + fact('فعل الكون في الماضي.', 'Past of "be": was (I/he/she/it) · were (you/we/they).')
    + '</ul>'
    '<table><tr><th>(+)</th><th>(−)</th><th>(?)</th></tr>'
    '<tr><td class="en">played</td><td class="en">didn\'t play</td><td class="en">Did you play?</td></tr>'
    '<tr><td class="en">went</td><td class="en">didn\'t go</td><td class="en">Did they go?</td></tr>'
    '<tr><td class="en">was / were</td><td class="en">wasn\'t / weren\'t</td><td class="en">Was it ...?</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">في السؤال والنفي الفعل يرجع <span class="hl-p">مجرّدًا دائمًا</span> — <span class="en">did</span> وحدها تحمل زمن الماضي.'
    '<span class="en-fact">In questions &amp; negatives the main verb is always the base; "did" already shows the past.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">+ / − / ?</span><div class="flow"><span class="after">They <b>played</b>. → They <b>didn\'t play</b>. → <b>Did</b> they <b>play</b>?</span></div></div>'
    '<div class="ex"><span class="tag">سؤال wh-</span><div class="flow"><span class="after"><b>What did</b> you <b>eat</b> yesterday?</span></div></div>'
    '<div class="ex"><span class="tag">was / were</span><div class="flow"><span class="after">The streets <b>were</b> busy and the weather <b>was</b> nice.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">✦ تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">النفي/السؤال بـ <span class="en"><b>did / didn\'t</b></span> + فعل مجرّد؛ وفعل الكون ماضيه <span class="en"><b>was / were</b></span>.</div></div>')

e1 = q('1', 'Recognize · تعرّف', 'Choose the correct word.', 'اختر/ي الكلمة الصحيحة.',
    '<ol class="enlist">'
    '<li>They ____ go to school yesterday. <span class="choices">( don\'t / didn\'t )</span></li>'
    '<li>____ you see the match? <span class="choices">( Do / Did )</span></li>'
    '<li>The weather ____ cold. <span class="choices">( was / were )</span></li>'
    '<li>The children ____ happy. <span class="choices">( was / were )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>She ____ eat meat yesterday. <span class="choices"><span class="opt">a) didn\'t</span><span class="opt">b) doesn\'t</span><span class="opt">c) wasn\'t</span></span></li>'
    '<li>____ they visit Jerusalem? <span class="choices"><span class="opt">a) Did</span><span class="opt">b) Was</span><span class="opt">c) Do</span></span></li>'
    '<li>We ____ at home last night. <span class="choices"><span class="opt">a) was</span><span class="opt">b) were</span><span class="opt">c) did</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with didn\'t, Did, was or were.', 'أكمِل/ي بـ didn\'t أو Did أو was أو were.',
    '<ol class="enlist">'
    '<li>I <span class="blank"></span> finish my homework. <span class="choices">(−)</span></li>'
    '<li><span class="blank"></span> your father work yesterday?</li>'
    '<li>The market <span class="blank"></span> very busy.</li>'
    '<li>My friends <span class="blank"></span> at the party.</li></ol>')
e4 = q('4', 'Build Questions · تكوين أسئلة', 'Make a past question for the given answer.', 'كوّن/ي سؤالاً في الماضي يناسب الجواب.',
    '<ol class="enlist">'
    '<li>' + wl('62%') + ' &nbsp;(I went to Nablus.)</li>'
    '<li>' + wl('62%') + ' &nbsp;(They ate maqluba.)</li></ol>')
e5 = q('5', 'Transform · تحويل', 'Rewrite as negative (−) and question (?).', 'أعِد/ي الكتابة نفيًا (−) ثم سؤالًا (?).',
    '<ol class="enlist">'
    '<li>He played football. <br>− ' + wl('60%') + '<br>? ' + wl('60%') + '</li>'
    '<li>They went home. <br>− ' + wl('60%') + '<br>? ' + wl('60%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>Did you went to school? → ' + wl('50%') + '</li>'
    '<li>She didn\'t ate breakfast. → ' + wl('50%') + '</li>'
    '<li>The streets was crowded. → ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Complete the story: past simple (or was / were).', 'أكمِل/ي القصة بالماضي البسيط (أو was / were).',
    '<div class="para">Last Eid, the village (1) __________ (be) full of joy. We (2) __________ (wake) up early '
    'and (3) __________ (wear) new clothes. My grandmother (4) __________ (make) cookies, but we '
    '(5) __________ (not / forget) to share them with the neighbours.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write a short story (3–4 sentences) about a past day. Use did/didn\'t and was/were.', 'اكتب/ي قصة قصيرة (٣–٤ جمل) عن يوم مضى، مستخدمًا did/didn\'t و was/were.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', "didn't · Did · was · were"),
    ('تمرين ٢:', "a) didn't · a) Did · b) were"),
    ('تمرين ٣:', "didn't · Did · was · were"),
    ('تمرين ٤:', 'Where did you go? · What did they eat? (تُقبل صيغ مناسبة)'),
    ('تمرين ٥:', "He didn't play football. / Did he play football? &nbsp;|&nbsp; They didn't go home. / Did they go home?"),
    ('تمرين ٦:', 'Did you go to school? · She didn\'t eat breakfast. · The streets were crowded.'),
    ('تمرين ٧:', "1 was · 2 woke · 3 wore · 4 made · 5 didn't forget"),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (قصة بالماضي مع did/didn\'t و was/were).'),
])
docs['past-simple-3'] = head('Past Simple — Level 3 | T. Wad Refae') + \
    page(s + foot(True, 'Past Simple · Level 3 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Simple · Level 3 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Simple · Level 3 · صفحة ٣ من ٤'), 'tight') + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Simple · Level 3 · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
