# -*- coding: utf-8 -*-
# Generator for the "Advice & Suggestions" worksheet (1 sheet),
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
  .subtitle{font-family:'Marhey',cursive;text-align:center;color:var(--red);font-size:15px;margin:0 0 2px}
  .squiggle{display:block;margin:0 auto 5px;width:280px;height:11px}
  .levelline{font-family:'Caveat',cursive;color:var(--red);font-weight:700;font-size:23px;direction:ltr;margin:1px 0 4px;text-align:center}
  .namedate{display:flex;justify-content:center;gap:46px;direction:ltr;font-family:'Patrick Hand',cursive;font-size:16px;color:#333;
    border-top:1px dashed #cbb8b5;border-bottom:1px dashed #cbb8b5;padding:5px 0;margin:0 0 3px}

  .ptitle{font-family:'Caveat',cursive;color:var(--blue);font-size:30px;text-align:center;direction:ltr;margin:4px 0 1px}

  .section,.q{position:relative;margin:6px 0;break-inside:avoid;page-break-inside:avoid}
  .sec-head{display:flex;align-items:center;gap:9px;margin-bottom:4px;direction:ltr;text-align:left}
  .badge{flex:none;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
    font-family:'Caveat',cursive;font-weight:700;font-size:18px;color:#fff;box-shadow:0 2px 4px rgba(0,0,0,.2)}
  .badge.red{background:var(--red)} .badge.blue{background:var(--blue)}
  .sec-title{font-family:'Marhey',cursive;font-size:18px;color:var(--blue-d)}

  .box{background:#fff;border:2px solid var(--blue);padding:8px 12px;margin:5px 0;break-inside:avoid;
    border-radius:255px 15px 225px 15px/15px 225px 15px 255px}
  .box.soft{border-color:#c9b9a0;border-style:solid}
  .formula{font-family:'Patrick Hand',cursive;direction:ltr;text-align:center;font-size:18px;color:var(--red);
    border:2px dashed var(--red);padding:5px 10px;border-radius:15px 225px 15px 255px/255px 15px 225px 15px;background:#fff;margin-top:5px}
  .def{font-size:15.5px;line-height:1.54;color:#333;margin:0}
  .def .en-fact{margin-top:2px}

  .hl-y{background:var(--hl-y);padding:0 3px;border-radius:4px}
  .hl-p{background:var(--hl-p);padding:0 3px;border-radius:4px}
  .hl-g{background:var(--hl-g);padding:0 3px;border-radius:4px}
  .en{direction:ltr;text-align:left;font-family:'Patrick Hand',cursive}
  .ing{color:var(--red);font-weight:700}
  .en-fact{display:block;direction:ltr;text-align:left;font-family:'Patrick Hand',cursive;color:var(--blue-d);font-size:13px;line-height:1.25}

  ul.facts{list-style:none;margin:4px 0;padding:0}
  ul.facts li{position:relative;padding:2px 20px 3px 0;font-size:14px;line-height:1.35}
  ul.facts li::before{content:"\2605";position:absolute;right:0;color:var(--red);font-size:13px;top:4px}

  table{width:100%;border-collapse:collapse;margin:6px 0;font-size:13px;background:#fff}
  th,td{border:2px solid var(--blue);padding:3px 6px;text-align:center}
  th{background:#eaf1fb;font-family:'Marhey',cursive;color:var(--blue-d)}
  td .en{display:inline-block}

  .examples{display:flex;flex-direction:column;gap:5px;margin-top:5px}
  .ex{position:relative;border:2px dashed var(--blue);border-radius:14px;padding:10px 12px 6px;background:#fff;break-inside:avoid}
  .ex .tag{position:absolute;top:-12px;right:14px;background:var(--red);color:#fff;font-family:'Marhey',cursive;
    font-size:12px;padding:2px 10px;border-radius:10px;box-shadow:0 2px 3px rgba(0,0,0,.2)}
  .ex .flow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;direction:ltr}
  .ex .base{font-family:'Patrick Hand',cursive;font-size:15px;color:#555}
  .ex .arrow{color:var(--red);font-size:19px}
  .ex .after{font-family:'Patrick Hand',cursive;font-size:16px;color:var(--blue)}

  .sticky{background:var(--hl-y);width:84%;margin:7px auto 2px;padding:9px 16px;transform:rotate(-1.5deg);
    box-shadow:2px 4px 8px rgba(0,0,0,.18);border-radius:4px 4px 10px 4px}
  .sticky .lbl{font-family:'Marhey',cursive;color:var(--red);font-size:15px;margin-bottom:3px}
  .sticky .txt{font-size:15px;line-height:1.63}

  .q-instr{margin-bottom:4px;direction:ltr;text-align:left}
  .q-instr .en-line{display:block;font-family:'Patrick Hand',cursive;color:var(--blue-d);font-size:14.5px;line-height:1.3}
  .q-instr .ar-line{display:block;direction:rtl;text-align:left;font-size:14.5px;line-height:1.35;color:#333;margin-top:1px}
  .q-instr .en{display:inline}
  ol.enlist{direction:ltr;text-align:left;font-family:'Patrick Hand',cursive;font-size:16px;line-height:1.83;padding-left:24px;margin:4px 0}
  ol.enlist li{margin-bottom:1px}
  .choices{direction:ltr;text-align:left;font-family:'Patrick Hand',cursive;font-size:15px}
  .choices .opt{display:inline-block;margin-right:15px}
  .blank{display:inline-block;min-width:82px;border-bottom:2px dotted var(--blue);margin:0 4px}
  .wordbank{border:2px dashed var(--red);border-radius:12px;padding:6px 12px;margin:6px 0;background:#fff;
    direction:ltr;text-align:center;font-family:'Patrick Hand',cursive;font-size:15px;color:var(--blue-d)}
  .wordbank b{font-family:'Marhey',cursive;color:var(--red);font-size:12px;display:block;margin-bottom:2px;direction:rtl}
  .match{display:flex;gap:20px;direction:ltr;font-family:'Patrick Hand',cursive;font-size:16px}
  .match .col{flex:1}
  .match .col .row{padding:5px 0;border-bottom:1px dotted #bbb;display:flex;justify-content:space-between}
  .writeline{border-bottom:2px dotted var(--blue);height:21px;margin:7px 0}
  .para{border:2px solid #c9b9a0;border-radius:12px;padding:11px 14px;background:#fff;direction:ltr;text-align:left;
    font-family:'Patrick Hand',cursive;font-size:16px;line-height:1.88;color:#333}

  .answerkey{border:3px double var(--red);border-radius:14px;padding:14px 18px;margin-top:8px;background:#fffdf5;break-inside:avoid}
  .answerkey .ak-title{font-family:'Marhey',cursive;color:var(--red);font-size:19px;margin-bottom:10px;text-align:center}
  .ak-row{direction:ltr;text-align:left;margin-bottom:9px;font-size:15px;line-height:1.77;color:#333}
  .ak-row .n{font-family:'Marhey',cursive;color:var(--blue);font-size:14px;direction:rtl;display:inline-block;margin-left:6px}
  .ak-row .v{font-family:'Patrick Hand',cursive}

  .foot{margin-top:auto;border-top:2px dashed #cbb8b5;padding-top:5px;display:flex;justify-content:space-between;align-items:center;
    direction:ltr;font-family:'Marhey',cursive;font-size:12px;color:var(--grey)}
  .foot .nm{font-family:'Caveat',cursive;color:var(--grey);font-size:18px}
  .foot .lic{flex:1;text-align:center;font-size:10px;padding:0 8px;white-space:nowrap;color:var(--grey)}
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
    return ('<div class="lesson-head">\n<h1>Advice &amp; Suggestions</h1>\n'
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
# SHEET — Advice (should / had better) & Suggestions (why don't you / what about / let's)
# =========================================================================
s = lesson_head('إعطاء النصيحة وتقديم الاقتراح — Advice & Suggestions', 'Giving Advice · Making Suggestions')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نُعطي <span class="hl-y">النصيحة (advice)</span> لنقول ما الأفضل أن يفعله شخص، ونُقدّم <span class="hl-g">الاقتراح (suggestion)</span> لنعرض فكرة بلطف.'
    '<span class="en-fact">Advice tells someone the best thing to do; a suggestion offers an idea.</span></p>'
    '<div class="formula">Advice: should / had better &nbsp;|&nbsp; Suggestion: Why don\'t you… / What about + <span class="ing">V-ing</span></div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('النصيحة: <span class="en">should / shouldn\'t + مصدر</span>؛ والأقوى (تحذير): <span class="en">had better (not) + مصدر</span>.', 'Advice: should/shouldn\'t + base; stronger (warning): had better (not) + base.')
    + fact('الاقتراح: <span class="en">Why don\'t you + مصدر?</span> · <span class="en">Let\'s + مصدر</span> · <span class="en">could</span>.', 'Suggestions: Why don\'t you + base? · Let\'s + base · could.')
    + fact('بعد <span class="en">What about / How about</span> نستخدم الفعل + <span class="ing">ing</span>.', 'After What about / How about, use verb + ing.')
    + '</ul>'
    '<table><tr><th>Function</th><th>Structure</th><th>Example</th></tr>'
    '<tr><td>Advice</td><td class="en">should / shouldn\'t + base</td><td class="en">You should drink water.</td></tr>'
    '<tr><td>Advice (strong)</td><td class="en">had better (not) + base</td><td class="en">You\'d better see a doctor.</td></tr>'
    '<tr><td>Suggestion</td><td class="en">Why don\'t you + base?</td><td class="en">Why don\'t you rest?</td></tr>'
    '<tr><td>Suggestion</td><td class="en">What about + V-ing?</td><td class="en">What about taking a walk?</td></tr>'
    '</table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">نصيحة؟ &rarr; <span class="hl-p en">should / had better</span> + مصدر. اقتراح؟ &rarr; <span class="hl-g en">Why don\'t you / Let\'s</span> + مصدر، أو <span class="en">What about</span> + <span class="ing">ing</span>.'
    '<span class="en-fact">Advice &rarr; should/had better + base. Suggestion &rarr; Why don\'t you/Let\'s + base, or What about + ing.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">نصيحة</span><div class="flow"><span class="after">You <b>should eat</b> more vegetables.</span></div></div>'
    '<div class="ex"><span class="tag">اقتراح</span><div class="flow"><span class="after"><b>What about joining</b> a sports club?</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">نصيحة &rarr; <span class="en">should / had better + base</span> · اقتراح &rarr; <span class="en">Why don\'t you / Let\'s + base · What about + V-ing</span>.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Advice or suggestion? Write A (advice) or S (suggestion).', 'نصيحة أم اقتراح؟ اكتب/ي A (نصيحة) أو S (اقتراح).',
    '<ol class="enlist">'
    '<li>You should see a doctor. <span class="choices">____</span></li>'
    '<li>Why don\'t we watch a film? <span class="choices">____</span></li>'
    '<li>You\'d better not touch it. <span class="choices">____</span></li>'
    '<li>What about playing chess? <span class="choices">____</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct form.', 'اختر/ي الصيغة الصحيحة.',
    '<ol class="enlist">'
    '<li>You should ____ more water. <span class="choices"><span class="opt">a) drink</span><span class="opt">b) drinking</span><span class="opt">c) to drink</span></span></li>'
    '<li>What about ____ to the park? <span class="choices"><span class="opt">a) go</span><span class="opt">b) going</span><span class="opt">c) goes</span></span></li>'
    '<li>You\'d better ____ late. <span class="choices"><span class="opt">a) not be</span><span class="opt">b) not being</span><span class="opt">c) be not</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with should or shouldn\'t.', 'أكمِل/ي بـ should أو shouldn\'t.',
    '<ol class="enlist">'
    '<li>You look tired. You __________ rest.</li>'
    '<li>It\'s raining. You __________ take an umbrella.</li>'
    '<li>Too much sugar is bad. You __________ eat a lot of it.</li>'
    '<li>The exam is tomorrow. You __________ study tonight.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each problem with the best reply — write the letter.', 'صِل/ي كل مشكلة بأفضل ردّ — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) I\'m very tired.</span><span>____</span></div>'
    '<div class="row"><span>2) I\'m bored.</span><span>____</span></div>'
    '<div class="row"><span>3) I have a bad headache.</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) You\'d better take some medicine.</span></div>'
    '<div class="row"><span>b) You should rest.</span></div>'
    '<div class="row"><span>c) Why don\'t you read a book?</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Make a suggestion using the words given.', 'كوّن/ي اقتراحًا باستخدام الكلمات المعطاة.',
    '<ol class="enlist">'
    '<li>(What about / visit) your grandmother &rarr; ' + wl('48%') + '</li>'
    '<li>(Why don\'t you / drink) some water &rarr; ' + wl('48%') + '</li>'
    '<li>(Let\'s / play) football &rarr; ' + wl('48%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>You should to see a doctor. &rarr; ' + wl('50%') + '</li>'
    '<li>What about go swimming? &rarr; ' + wl('50%') + '</li>'
    '<li>You\'d better not to stay up late. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'Advise or Suggest · نصيحة أم اقتراح؟', 'Read each situation. Write advice or a suggestion, as shown in brackets.', 'اقرأ/ي كل موقف. اكتب/ي نصيحة أو اقتراحًا كما هو مبيّن بين القوسين.',
    '<ol class="enlist">'
    '<li>You have a bad toothache. <b>(advice)</b> &rarr; ' + wl('42%') + '</li>'
    '<li>Your friend is bored at the weekend. <b>(suggestion)</b> &rarr; ' + wl('42%') + '</li>'
    '<li>Your brother watches TV all day. <b>(advice)</b> &rarr; ' + wl('42%') + '</li>'
    '<li>Your class wants to do something fun. <b>(suggestion)</b> &rarr; ' + wl('42%') + '</li>'
    '<li>You feel tired every morning. <b>(advice)</b> &rarr; ' + wl('42%') + '</li>'
    '<li>You and a friend don\'t know what to eat. <b>(suggestion)</b> &rarr; ' + wl('42%') + '</li></ol>')
key = akbox([
    ('تمرين ١:', '1 A · 2 S · 3 A · 4 S'),
    ('تمرين ٢:', 'a) drink · b) going · a) not be'),
    ('تمرين ٣:', 'should · should · shouldn\'t · should'),
    ('تمرين ٤:', '1 &rarr; b · 2 &rarr; c · 3 &rarr; a'),
    ('تمرين ٥:', 'What about visiting your grandmother? · Why don\'t you drink some water? · Let\'s play football.'),
    ('تمرين ٦:', 'You should see a doctor. · What about going swimming? · You\'d better not stay up late.'),
    ('تمرين ٧:', 'إجابات مقترحة: 1 You should see a dentist. · 2 Why don\'t you play a game? · 3 He shouldn\'t watch TV all day. · 4 Let\'s have a picnic. · 5 You\'d better sleep earlier. · 6 What about making sandwiches?'),
])
docs['advice-suggestions-1'] = head('Advice & Suggestions | T. Wad Refae') + \
    page(s + foot(True, 'Advice & Suggestions · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Advice & Suggestions · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + foot(False, 'Advice & Suggestions · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Advice & Suggestions · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
