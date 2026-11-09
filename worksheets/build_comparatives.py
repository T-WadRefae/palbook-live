# -*- coding: utf-8 -*-
# Generator for the "Comparatives & Superlatives" worksheets (3 sheets),
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
    return ('<div class="lesson-head">\n<h1>Comparatives &amp; Superlatives</h1>\n'
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
# SHEET 1 — Adjectives: comparative & superlative (-er/-est, more/most)
# =========================================================================
s = lesson_head('مقارنة الصفات — Comparing with Adjectives', 'Level 1 — Adjectives')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نقارن بالصفات: المقارنة (<span class="hl-y">Comparative</span>) بين <span class="hl-p">اثنين</span> (+ <span class="en">than</span>)، والتفضيل (<span class="hl-g">Superlative</span>) للأفضل في مجموعة (<span class="en">the</span> + الصفة).'
    '<span class="en-fact">Comparative compares two (+ than); superlative is the best in a group (the + …).</span></p>'
    '<div class="formula">short: adj<span class="ing">-er / -est</span> &nbsp;|&nbsp; long: <span class="ing">more / most</span> + adj</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('صفة قصيرة (مقطع واحد): <span class="en">tall &rarr; taller &rarr; the tallest</span>. نستخدم <span class="en">than</span> مع المقارنة.', 'Short adjective: tall &rarr; taller &rarr; the tallest; use than.')
    + fact('تهجئة: <span class="en">big&rarr;bigger</span>، <span class="en">nice&rarr;nicer</span>، <span class="en">happy&rarr;happier</span>.', 'Spelling: big&rarr;bigger, nice&rarr;nicer, happy&rarr;happier.')
    + fact('صفة طويلة (مقطعان فأكثر): <span class="en">important &rarr; more important &rarr; the most important</span>.', 'Long adjective: important &rarr; more important &rarr; the most important.')
    + fact('المقارنة بين اثنين · التفضيل = <span class="en">the</span> + الأفضل في مجموعة.', 'Comparative = two things; superlative = the best in a group.')
    + '</ul>'
    '<table><tr><th>Adjective</th><th>Comparative</th><th>Superlative</th></tr>'
    '<tr><td class="en">tall</td><td class="en">taller</td><td class="en">the tallest</td></tr>'
    '<tr><td class="en">big</td><td class="en">bigger</td><td class="en">the biggest</td></tr>'
    '<tr><td class="en">happy</td><td class="en">happier</td><td class="en">the happiest</td></tr>'
    '<tr><td class="en">important</td><td class="en">more important</td><td class="en">the most important</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">صفة قصيرة؟ &rarr; <span class="hl-p en">-er / -est</span>. صفة طويلة؟ &rarr; <span class="hl-g en">more / most</span>. المقارنة + <span class="en">than</span>، التفضيل + <span class="en">the</span>.'
    '<span class="en-fact">Short adj &rarr; -er/-est. Long adj &rarr; more/most. than with comparative, the with superlative.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">مقارنة</span><div class="flow"><span class="after">Ali is <b>taller than</b> Sami.</span></div></div>'
    '<div class="ex"><span class="tag">تفضيل</span><div class="flow"><span class="after">This is <b>the biggest</b> house in the village.</span></div></div>'
    '<div class="ex"><span class="tag">صفة طويلة</span><div class="flow"><span class="after">Water is <b>more important than</b> gold.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">القصيرة: <span class="en">-er / the …est</span> · الطويلة: <span class="en">more / the most</span> · <span class="en">than</span> للمقارنة.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Short adjective (-er) or long (more)? Choose.', 'صفة قصيرة (-er) أم طويلة (more)؟ اختر/ي.',
    '<ol class="enlist">'
    '<li>tall &rarr; <span class="choices">( taller / more tall )</span></li>'
    '<li>beautiful &rarr; <span class="choices">( beautifuler / more beautiful )</span></li>'
    '<li>fast &rarr; <span class="choices">( faster / more fast )</span></li>'
    '<li>expensive &rarr; <span class="choices">( expensiver / more expensive )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct form.', 'اختر/ي الصيغة الصحيحة.',
    '<ol class="enlist">'
    '<li>My bag is ____ than yours. <span class="choices"><span class="opt">a) heavy</span><span class="opt">b) heavier</span><span class="opt">c) heaviest</span></span></li>'
    '<li>Today is the ____ day of the year. <span class="choices"><span class="opt">a) hot</span><span class="opt">b) hotter</span><span class="opt">c) hottest</span></span></li>'
    '<li>This book is ____ interesting than that one. <span class="choices"><span class="opt">a) more</span><span class="opt">b) most</span><span class="opt">c) much</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with the comparative (+ than).', 'أكمِل/ي بصيغة المقارنة (+ than).',
    '<ol class="enlist">'
    '<li>An elephant is __________ (big) than a cat.</li>'
    '<li>Gold is __________ (expensive) than silver.</li>'
    '<li>My sister is __________ (happy) than me today.</li>'
    '<li>This game is __________ (exciting) than chess.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each adjective with its superlative — write the letter.', 'صِل/ي كل صفة بصيغة تفضيلها — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) tall</span><span>____</span></div>'
    '<div class="row"><span>2) big</span><span>____</span></div>'
    '<div class="row"><span>3) famous</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) the biggest</span></div>'
    '<div class="row"><span>b) the most famous</span></div>'
    '<div class="row"><span>c) the tallest</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Write the superlative (the + …).', 'اكتب/ي صيغة التفضيل (the + …).',
    '<ol class="enlist">'
    '<li>(tall) building &rarr; ' + wl('52%') + '</li>'
    '<li>(beautiful) garden &rarr; ' + wl('52%') + '</li>'
    '<li>(hot) day &rarr; ' + wl('52%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>She is more taller than me. &rarr; ' + wl('50%') + '</li>'
    '<li>This is the most big room. &rarr; ' + wl('50%') + '</li>'
    '<li>He is the most fast runner. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Use the comparative or the superlative of the adjective.', 'استخدم/ي المقارنة أو التفضيل للصفة.',
    '<div class="para">Jaffa is famous for its oranges. Our orange tree is (1) __________ (tall) than the lemon tree, '
    'but the olive tree is (2) __________ (old) tree in the garden. My grandfather says Jaffa oranges are '
    '(3) __________ (sweet) than any others, and that spring is the (4) __________ (beautiful) season of all.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 2 sentences: one comparative and one superlative.', 'اكتب/ي جملتين: واحدة مقارنة وواحدة تفضيل.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'taller · more beautiful · faster · more expensive'),
    ('تمرين ٢:', 'b) heavier · c) hottest · a) more'),
    ('تمرين ٣:', 'bigger · more expensive · happier · more exciting'),
    ('تمرين ٤:', '1 &rarr; c · 2 &rarr; a · 3 &rarr; b'),
    ('تمرين ٥:', 'the tallest building · the most beautiful garden · the hottest day'),
    ('تمرين ٦:', 'She is taller than me. · This is the biggest room. · He is the fastest runner.'),
    ('تمرين ٧:', '1 taller · 2 the oldest · 3 sweeter · 4 most beautiful'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (مقارنة + than · تفضيل + the).'),
])
docs['comparatives-1'] = head('Comparatives & Superlatives — Level 1 | T. Wad Refae') + \
    page(s + foot(True, 'Comparatives & Superlatives · Level 1 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Comparatives & Superlatives · Level 1 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Comparatives & Superlatives · Level 1 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Comparatives & Superlatives · Level 1 · صفحة ٤ من ٤'))

# =========================================================================
# SHEET 2 — Adverbs: comparative & superlative (faster, more slowly)
# =========================================================================
s = lesson_head('مقارنة الظروف — Comparing with Adverbs', 'Level 2 — Adverbs')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نقارن <span class="hl-y">كيف</span> نؤدّي الأفعال باستخدام الظروف (adverbs). معظم الظروف تنتهي بـ <span class="en">-ly</span> &larr; <span class="en">more / most</span>؛ والظروف القصيرة (<span class="en">fast, hard, early</span>) تأخذ <span class="en">-er / -est</span>.'
    '<span class="en-fact">We compare how actions are done. Most -ly adverbs use more/most; short adverbs use -er/-est.</span></p>'
    '<div class="formula">more / most + adverb &nbsp;|&nbsp; short: adverb<span class="ing">-er / -est</span></div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('ظرف بـ <span class="en">-ly</span>: <span class="en">quickly &rarr; more quickly &rarr; most quickly</span>.', '-ly adverb: quickly &rarr; more quickly &rarr; most quickly.')
    + fact('ظرف قصير = صيغة الفعل: <span class="en">fast &rarr; faster</span>، <span class="en">hard &rarr; harder</span>، <span class="en">early &rarr; earlier</span>.', 'Short adverb: fast&rarr;faster, hard&rarr;harder, early&rarr;earlier.')
    + fact('<span class="en">than</span> مع المقارنة · <span class="en">the</span> مع التفضيل.', 'than with comparative; the with superlative.')
    + fact('الظرف يصف <span class="hl-p">الفعل</span> (كيف يحدث)، والصفة تصف <span class="hl-g">الاسم</span>.', 'Adverbs describe verbs (how); adjectives describe nouns.')
    + '</ul>'
    '<table><tr><th>Adverb</th><th>Comparative</th><th>Superlative</th></tr>'
    '<tr><td class="en">quickly</td><td class="en">more quickly</td><td class="en">most quickly</td></tr>'
    '<tr><td class="en">slowly</td><td class="en">more slowly</td><td class="en">most slowly</td></tr>'
    '<tr><td class="en">fast</td><td class="en">faster</td><td class="en">fastest</td></tr>'
    '<tr><td class="en">early</td><td class="en">earlier</td><td class="en">earliest</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">ظرف بـ <span class="en">-ly</span>؟ &rarr; <span class="hl-g en">more / most</span>. ظرف قصير؟ &rarr; <span class="hl-p en">-er / -est</span>. أضِف/ي <span class="en">than</span> للمقارنة.'
    '<span class="en-fact">-ly adverb &rarr; more/most. Short adverb &rarr; -er/-est. Add than for comparison.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">قصير</span><div class="flow"><span class="after">Sami runs <b>faster than</b> Ali.</span></div></div>'
    '<div class="ex"><span class="tag">-ly</span><div class="flow"><span class="after">She speaks <b>more quietly than</b> her sister.</span></div></div>'
    '<div class="ex"><span class="tag">تفضيل</span><div class="flow"><span class="after">He works <b>the hardest</b> in the class.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">-ly</span> &rarr; more / most · قصير &rarr; -er / -est · <span class="en">than</span> للمقارنة، <span class="en">the</span> للتفضيل.</div></div>')
e1 = q('1', 'Recognize · تعرّف', '-ly adverb (more) or short adverb (-er)? Choose.', 'ظرف بـ -ly (more) أم ظرف قصير (-er)؟ اختر/ي.',
    '<ol class="enlist">'
    '<li>quickly &rarr; <span class="choices">( quicker / more quickly )</span></li>'
    '<li>fast &rarr; <span class="choices">( faster / more fast )</span></li>'
    '<li>carefully &rarr; <span class="choices">( carefuller / more carefully )</span></li>'
    '<li>early &rarr; <span class="choices">( earlier / more early )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct form.', 'اختر/ي الصيغة الصحيحة.',
    '<ol class="enlist">'
    '<li>He runs ____ than me. <span class="choices"><span class="opt">a) fast</span><span class="opt">b) faster</span><span class="opt">c) fastest</span></span></li>'
    '<li>She sings ____ beautifully than before. <span class="choices"><span class="opt">a) more</span><span class="opt">b) most</span><span class="opt">c) much</span></span></li>'
    '<li>Of all the boys, Omar works the ____. <span class="choices"><span class="opt">a) hard</span><span class="opt">b) harder</span><span class="opt">c) hardest</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with the comparative adverb (+ than).', 'أكمِل/ي بصيغة مقارنة الظرف (+ than).',
    '<ol class="enlist">'
    '<li>A cheetah runs __________ (fast) than a horse.</li>'
    '<li>Please speak __________ (clearly) than before.</li>'
    '<li>My brother wakes up __________ (early) than me.</li>'
    '<li>She writes __________ (carefully) than I do.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each adverb with its superlative — write the letter.', 'صِل/ي كل ظرف بصيغة تفضيله — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) hard</span><span>____</span></div>'
    '<div class="row"><span>2) slowly</span><span>____</span></div>'
    '<div class="row"><span>3) early</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) the most slowly</span></div>'
    '<div class="row"><span>b) the earliest</span></div>'
    '<div class="row"><span>c) the hardest</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Make a comparative sentence (+ than) with the adverb.', 'كوّن/ي جملة مقارنة (+ than) بالظرف.',
    '<ol class="enlist">'
    '<li>Ali / run / fast / Sami &rarr; ' + wl('50%') + '</li>'
    '<li>She / speak / quietly / her friend &rarr; ' + wl('50%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>He drives more faster than me. &rarr; ' + wl('50%') + '</li>'
    '<li>She sings beautifuller than her sister. &rarr; ' + wl('50%') + '</li>'
    '<li>They arrived more early than us. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Use the comparative or superlative adverb.', 'استخدم/ي مقارنة الظرف أو تفضيله.',
    '<div class="para">It was sports day at our school. Yara ran (1) __________ (fast) than Lina, '
    'but Hala jumped (2) __________ (high) of all the girls. In the race, our team worked '
    '(3) __________ (hard) than last year, and we finished (4) __________ (early) than the other class.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 2 sentences comparing how two people do something.', 'اكتب/ي جملتين تقارن كيف يؤدّي شخصان شيئًا.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'more quickly · faster · more carefully · earlier'),
    ('تمرين ٢:', 'b) faster · a) more · c) hardest'),
    ('تمرين ٣:', 'faster · more clearly · earlier · more carefully'),
    ('تمرين ٤:', '1 &rarr; c · 2 &rarr; a · 3 &rarr; b'),
    ('تمرين ٥:', 'Ali runs faster than Sami. · She speaks more quietly than her friend.'),
    ('تمرين ٦:', 'He drives faster than me. · She sings more beautifully than her sister. · They arrived earlier than us.'),
    ('تمرين ٧:', '1 faster · 2 the highest · 3 harder · 4 earlier'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (مقارنة الظرف + than).'),
])
docs['comparatives-2'] = head('Comparatives & Superlatives — Level 2 | T. Wad Refae') + \
    page(s + foot(True, 'Comparatives & Superlatives · Level 2 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Comparatives & Superlatives · Level 2 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Comparatives & Superlatives · Level 2 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Comparatives & Superlatives · Level 2 · صفحة ٤ من ٤'))

# =========================================================================
# SHEET 3 — Irregular forms + (not) as ... as (adjectives & adverbs)
# =========================================================================
s = lesson_head('الشاذّة و (not) as … as — Irregular & Equality', 'Level 3 — Irregular & as…as')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">بعض الصفات والظروف <span class="hl-y">شاذّة</span>: <span class="en">good/well &rarr; better &rarr; best</span>، <span class="en">bad/badly &rarr; worse &rarr; worst</span>. ونستخدم <span class="hl-g">(not) as … as</span> للمساواة، وتعمل مع الصفات والظروف معًا.'
    '<span class="en-fact">Some adjectives/adverbs are irregular; use (not) as … as for equality, with both.</span></p>'
    '<div class="formula">good/well &rarr; better &rarr; best &nbsp;|&nbsp; (not) as + adj/adv + as</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">good</span> (صفة) و <span class="en">well</span> (ظرف) &rarr; <span class="en">better &rarr; the best</span>.', 'good (adj) & well (adv) &rarr; better &rarr; the best.')
    + fact('<span class="en">bad/badly &rarr; worse &rarr; worst</span> · <span class="en">far &rarr; farther &rarr; farthest</span>.', 'bad/badly &rarr; worse &rarr; worst; far &rarr; farther &rarr; farthest.')
    + fact('<span class="en">as + صفة/ظرف + as</span> = تساوٍ (<span class="en">as fast as</span>) · <span class="en">not as … as</span> = أقل.', 'as … as = equal; not as … as = less than.')
    + fact('<span class="en">better / best</span> تصلح للصفة <span class="en">good</span> وللظرف <span class="en">well</span> معًا.', 'better/best work for both good and well.')
    + '</ul>'
    '<table><tr><th>Word</th><th>Comparative</th><th>Superlative</th></tr>'
    '<tr><td class="en">good / well</td><td class="en">better</td><td class="en">the best</td></tr>'
    '<tr><td class="en">bad / badly</td><td class="en">worse</td><td class="en">the worst</td></tr>'
    '<tr><td class="en">far</td><td class="en">farther</td><td class="en">the farthest</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def"><span class="en">good/well</span>؟ &rarr; <span class="hl-g en">better / best</span>. <span class="en">bad</span>؟ &rarr; <span class="hl-p en">worse / worst</span>. تساوٍ؟ &rarr; <span class="en">(not) as … as</span>.'
    '<span class="en-fact">good/well &rarr; better/best. bad &rarr; worse/worst. Equality &rarr; (not) as … as.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">well&rarr;better</span><div class="flow"><span class="after">She plays football <b>better than</b> me.</span></div></div>'
    '<div class="ex"><span class="tag">not as…as</span><div class="flow"><span class="after">Fuad doesn\'t feel <b>as sick as</b> Yasser.</span></div></div>'
    '<div class="ex"><span class="tag">as…as</span><div class="flow"><span class="after">Please run <b>as fast as</b> you can.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">good/well &rarr; better &rarr; best</span> · <span class="en">bad &rarr; worse &rarr; worst</span> · <span class="en">(not) as … as</span> للمساواة.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the correct irregular form.', 'اختر/ي الصيغة الشاذّة الصحيحة.',
    '<ol class="enlist">'
    '<li>good &rarr; <span class="choices">( gooder / better )</span></li>'
    '<li>well &rarr; <span class="choices">( weller / better )</span></li>'
    '<li>bad &rarr; <span class="choices">( badder / worse )</span></li>'
    '<li>far &rarr; <span class="choices">( farrer / farther )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>This is the ____ day of my life! <span class="choices"><span class="opt">a) good</span><span class="opt">b) better</span><span class="opt">c) best</span></span></li>'
    '<li>He plays ____ than his brother. <span class="choices"><span class="opt">a) good</span><span class="opt">b) well</span><span class="opt">c) better</span></span></li>'
    '<li>Yasser feels ____ than Fuad. <span class="choices"><span class="opt">a) bad</span><span class="opt">b) worse</span><span class="opt">c) worst</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with as … as using the word in brackets.', 'أكمِل/ي بـ as … as مستخدمًا الكلمة بين القوسين.',
    '<ol class="enlist">'
    '<li>Fuad is not __________ Yasser. (sick)</li>'
    '<li>A bike is not __________ a car. (fast)</li>'
    '<li>She is __________ her mother. (tall)</li>'
    '<li>Please work __________ you can. (hard)</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each word with its comparative — write the letter.', 'صِل/ي كل كلمة بصيغة مقارنتها — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) good</span><span>____</span></div>'
    '<div class="row"><span>2) bad</span><span>____</span></div>'
    '<div class="row"><span>3) far</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) farther</span></div>'
    '<div class="row"><span>b) better</span></div>'
    '<div class="row"><span>c) worse</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Complete with better / best or worse / worst.', 'أكمِل/ي بـ better / best أو worse / worst.',
    '<ol class="enlist">'
    '<li>My English is __________ (good) than before. &rarr; ' + wl('40%') + '</li>'
    '<li>This is the __________ (bad) film I\'ve seen. &rarr; ' + wl('40%') + '</li>'
    '<li>Sara sings __________ (well) than Lana. &rarr; ' + wl('40%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>He is gooder than me at maths. &rarr; ' + wl('50%') + '</li>'
    '<li>This is the baddest day. &rarr; ' + wl('50%') + '</li>'
    '<li>She runs as faster as me. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Use better/best, worse/worst, or (not) as … as.', 'استخدم/ي better/best أو worse/worst أو (not) as … as.',
    '<div class="para">Fuad, Yasser and Majed all feel sick. Fuad doesn\'t feel (1) __________ (sick) as the others. '
    'Yasser feels (2) __________ (bad) than Fuad, but Majed feels the (3) __________ (bad) of them all. '
    'The doctor says rest is the (4) __________ (good) medicine, and that Majed must rest '
    '(5) __________ (long) as he can.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write one sentence with better/best and one with (not) as … as.', 'اكتب/ي جملة بـ better/best وأخرى بـ (not) as … as.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'better · better · worse · farther'),
    ('تمرين ٢:', 'c) best · c) better · b) worse'),
    ('تمرين ٣:', 'as sick as · as fast as · as tall as · as hard as'),
    ('تمرين ٤:', '1 &rarr; b · 2 &rarr; c · 3 &rarr; a'),
    ('تمرين ٥:', 'better · the worst · better'),
    ('تمرين ٦:', 'He is better than me at maths. · This is the worst day. · She runs as fast as me.'),
    ('تمرين ٧:', '1 as sick as · 2 worse · 3 worst · 4 best · 5 as long as'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (better/best · (not) as … as).'),
])
docs['comparatives-3'] = head('Comparatives & Superlatives — Level 3 | T. Wad Refae') + \
    page(s + foot(True, 'Comparatives & Superlatives · Level 3 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Comparatives & Superlatives · Level 3 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Comparatives & Superlatives · Level 3 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Comparatives & Superlatives · Level 3 · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
