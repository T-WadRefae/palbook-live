# -*- coding: utf-8 -*-
# Generator for the "Past Perfect" worksheets (3 levels),
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
    return ('<div class="lesson-head">\n<h1>Past Perfect</h1>\n'
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
# LEVEL 1 — Foundation: had + V3 (an action before another past action)
# =========================================================================
s = lesson_head('حدثٌ وقع قبل حدثٍ ماضٍ آخر — The Past Perfect', 'Level 1 — Foundation')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">الماضي التام لحدثٍ وقع واكتمل <span class="hl-y">قبل حدثٍ آخر في الماضي</span> (أو قبل لحظةٍ محدّدة في الماضي).'
    '<span class="en-fact">The past perfect is for an action completed before another past action or time.</span></p>'
    '<div class="formula">had + past participle (verb-<span class="ing">3</span>)</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('لكل الضمائر: <span class="en">had + V3</span> (I / he / we / they <span class="en">had finished</span>).', 'For every subject: had + past participle (V3).')
    + fact('يصف <span class="hl-g">الحدث الأسبق</span> عند الحديث عن حدثين ماضيين.', 'It marks the earlier of two past actions.')
    + fact('النفي: <span class="en">hadn\'t + V3</span> · السؤال: <span class="en">Had + subject + V3?</span>', 'Negative: hadn\'t + V3. Question: Had + subject + V3?')
    + fact('كلمات دالّة: <span class="en">already, just, never, before, by then</span>.', 'Signal words: already, just, never, before, by then.')
    + '</ul>'
    '<table><tr><th>(+)</th><th>(&minus;)</th><th>(?)</th></tr>'
    '<tr><td class="en">I had finished</td><td class="en">I hadn\'t finished</td><td class="en">Had you finished?</td></tr>'
    '<tr><td class="en">She had gone</td><td class="en">She hadn\'t gone</td><td class="en">Had she gone?</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">١) <span class="hl-p en">had</span> (لكل الضمائر) &nbsp; ٢) التصريف الثالث للفعل <span class="en">V3</span> (gone, eaten, seen…).'
    '<span class="en-fact">1) had (all subjects) &nbsp; 2) the past participle (V3).</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">الأسبق</span><div class="flow"><span class="after">When I arrived, the train <b>had left</b>.</span></div></div>'
    '<div class="ex"><span class="tag">already</span><div class="flow"><span class="after">She <b>had already eaten</b> before we came.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">الماضي التام = <span class="en"><b>had + V3</b></span> &larr; الحدث الذي وقع <b>أوّلًا</b> في الماضي.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the correct past participle (V3).', 'اختر/ي التصريف الثالث الصحيح (V3).',
    '<ol class="enlist">'
    '<li>They had ____ home. <span class="choices">( go / went / gone )</span></li>'
    '<li>I had ____ my lunch. <span class="choices">( eat / ate / eaten )</span></li>'
    '<li>She had ____ a letter. <span class="choices">( write / wrote / written )</span></li>'
    '<li>We had ____ that film. <span class="choices">( see / saw / seen )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct word.', 'اختر/ي الكلمة الصحيحة.',
    '<ol class="enlist">'
    '<li>When we arrived, the film ____ already started. <span class="choices"><span class="opt">a) has</span><span class="opt">b) had</span><span class="opt">c) was</span></span></li>'
    '<li>He ____ finished his work before lunch. <span class="choices"><span class="opt">a) had</span><span class="opt">b) has</span><span class="opt">c) have</span></span></li>'
    '<li>They hadn\'t ____ the news. <span class="choices"><span class="opt">a) hear</span><span class="opt">b) heard</span><span class="opt">c) hearing</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with the past perfect (had + V3).', 'أكمِل/ي بالماضي التام (had + V3).',
    '<ol class="enlist">'
    '<li>By 9 pm, I __________ (finish) my homework.</li>'
    '<li>She __________ (not / see) that film before.</li>'
    '<li>When the guests arrived, Mum __________ (cook) the meal.</li>'
    '<li>We __________ (never / visit) Jaffa before last summer.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match the two halves — write the letter.', 'صِل/ي النصفين — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) When I got to the station,</span><span>____</span></div>'
    '<div class="row"><span>2) She was happy because</span><span>____</span></div>'
    '<div class="row"><span>3) They were hungry because</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) they hadn\'t eaten all day.</span></div>'
    '<div class="row"><span>b) the train had already left.</span></div>'
    '<div class="row"><span>c) she had passed the exam.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Rewrite in the negative (&minus;).', 'أعِد/ي الكتابة بالنفي (&minus;).',
    '<ol class="enlist">'
    '<li>I had seen it. &rarr; ' + wl('52%') + '</li>'
    '<li>They had arrived. &rarr; ' + wl('52%') + '</li>'
    '<li>She had finished. &rarr; ' + wl('52%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>When we arrived, they have already left. &rarr; ' + wl('50%') + '</li>'
    '<li>I had saw the film before. &rarr; ' + wl('50%') + '</li>'
    '<li>She had not ate breakfast. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Put each verb into the past perfect.', 'ضع/ي الفعل في الماضي التام.',
    '<div class="para">When we reached the old house in the village, it was empty. The family (1) __________ (leave) '
    'years before. Someone (2) __________ (lock) the door and (3) __________ (take) everything inside. '
    'The garden, which my grandfather (4) __________ (plant), had grown wild. We (5) __________ (never / see) '
    'such a quiet place.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 2 sentences about things you had done before a past moment.', 'اكتب/ي جملتين عن أشياء كنت قد فعلتها قبل لحظةٍ ماضية.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'gone · eaten · written · seen'),
    ('تمرين ٢:', 'b) had · a) had · b) heard'),
    ('تمرين ٣:', 'had finished · hadn\'t seen · had cooked · had never visited'),
    ('تمرين ٤:', '1 &rarr; b · 2 &rarr; c · 3 &rarr; a'),
    ('تمرين ٥:', 'I hadn\'t seen it. · They hadn\'t arrived. · She hadn\'t finished.'),
    ('تمرين ٦:', 'they had already left · I had seen the film · She had not eaten breakfast'),
    ('تمرين ٧:', '1 had left · 2 had locked · 3 had taken · 4 had planted · 5 had never seen'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (had + V3).'),
])
docs['past-perfect-1'] = head('Past Perfect — Level 1 | T. Wad Refae') + \
    page(s + foot(True, 'Past Perfect · Level 1 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Perfect · Level 1 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Perfect · Level 1 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Perfect · Level 1 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 2 — Past Perfect vs Past Simple (before / after, order & comma)
# =========================================================================
s = lesson_head('الأسبق والأحدث — Which Action Came First?', 'Level 2 — vs Past Simple')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">عند حدثين ماضيين: الحدث <span class="hl-y">الأسبق</span> &larr; الماضي التام (<span class="en">had + V3</span>)، والحدث <span class="hl-g">الأحدث</span> &larr; الماضي البسيط. نربط بينهما بـ <span class="en">before / after</span>.'
    '<span class="en-fact">Earlier action = past perfect; later action = past simple. Link with before / after.</span></p>'
    '<div class="formula">Past Perfect (earlier) &nbsp;+&nbsp; Past Simple (later)</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('الحدث الأسبق &larr; <span class="en">had + V3</span> · الأحدث &larr; <span class="en">past simple</span>.', 'Earlier &rarr; had + V3; later &rarr; past simple.')
    + fact('<span class="en">After</span> + الماضي التام للحدث الأسبق: <span class="en">After he had eaten, he slept.</span>', 'After + past perfect for the earlier action.')
    + fact('<span class="en">before</span> + الماضي البسيط للحدث الأحدث: <span class="en">He had eaten before he slept.</span>', 'before + past simple for the later action.')
    + fact('فاصلة إذا بدأت الجملة بالعبارة الزمنية (After… , …).', 'Use a comma when the time clause comes first.')
    + '</ul>'
    '<table><tr><th>Order</th><th>Example</th></tr>'
    '<tr><td class="en">After + past perfect, past simple</td><td class="en">After she had cooked, she ate.</td></tr>'
    '<tr><td class="en">past perfect + before + past simple</td><td class="en">She had cooked before she ate.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">حدّد/ي الحدث <span class="hl-p">الأسبق</span> &rarr; <span class="en">had + V3</span>، والحدث <span class="hl-g">الأحدث</span> &rarr; <span class="en">past simple</span>. اربط/ي بـ <span class="en">after / before</span>.'
    '<span class="en-fact">Mark the earlier action (had + V3) and the later one (past simple); link with after/before.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">after</span><div class="flow"><span class="after"><b>After</b> the bell <b>had rung</b>, the students <b>left</b>.</span></div></div>'
    '<div class="ex"><span class="tag">before</span><div class="flow"><span class="after">The match <b>had finished before</b> we <b>arrived</b>.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">الأسبق &rarr; <span class="en">had + V3</span> · الأحدث &rarr; <span class="en">past simple</span> · اربط/ي بـ <span class="en">after / before</span>.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the past perfect (earlier) or the past simple (later).', 'اختر/ي الماضي التام (الأسبق) أو البسيط (الأحدث).',
    '<ol class="enlist">'
    '<li>When I arrived, the train ____ . <span class="choices">( had left / left )</span></li>'
    '<li>After he ____ dinner, he watched TV. <span class="choices">( had finished / finished )</span></li>'
    '<li>She ____ the book before she saw the film. <span class="choices">( had read / read )</span></li>'
    '<li>They ____ home after the party ended. <span class="choices">( had gone / went )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose before or after.', 'اختر/ي before أو after.',
    '<ol class="enlist">'
    '<li>____ she had cleaned the house, she rested. <span class="choices"><span class="opt">a) After</span><span class="opt">b) Before</span></span></li>'
    '<li>He had studied hard ____ he took the exam. <span class="choices"><span class="opt">a) before</span><span class="opt">b) after</span></span></li>'
    '<li>____ the rain started, we had finished the game. <span class="choices"><span class="opt">a) After</span><span class="opt">b) Before</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Use the past perfect for the earlier action and the past simple for the later one.', 'استخدم/ي الماضي التام للأسبق والبسيط للأحدث.',
    '<ol class="enlist">'
    '<li>When we __________ (reach) the cinema, the film __________ (already / start).</li>'
    '<li>After she __________ (finish) her work, she __________ (go) out.</li>'
    '<li>They __________ (eat) dinner before the guests __________ (arrive).</li>'
    '<li>I __________ (lose) the key that my father __________ (give) me.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match the two halves — write the letter.', 'صِل/ي النصفين — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) After I had done my homework,</span><span>____</span></div>'
    '<div class="row"><span>2) The shop had closed</span><span>____</span></div>'
    '<div class="row"><span>3) She felt sick because</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) before we got there.</span></div>'
    '<div class="row"><span>b) she had eaten too much.</span></div>'
    '<div class="row"><span>c) I watched TV.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Join the sentences with after or before (use the past perfect).', 'اربط/ي الجملتين بـ after أو before (باستخدام الماضي التام).',
    '<ol class="enlist">'
    '<li>He finished work. He went home. (after) &rarr; ' + wl('46%') + '</li>'
    '<li>I locked the door. I left. (before) &rarr; ' + wl('46%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>When we arrived, the train has left. &rarr; ' + wl('50%') + '</li>'
    '<li>After she had went home, she called me. &rarr; ' + wl('50%') + '</li>'
    '<li>They had finished before we have arrived. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Use the past perfect or the past simple for each verb.', 'استخدم/ي الماضي التام أو البسيط لكل فعل.',
    '<div class="para">Yesterday I (1) __________ (go) to the library, but it (2) __________ (close) already. '
    'The librarian (3) __________ (lock) the door before I (4) __________ (get) there. '
    'I was sad because I (5) __________ (not / return) my books on time.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 2 sentences using before and after with the past perfect.', 'اكتب/ي جملتين باستخدام before و after مع الماضي التام.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'had left · had finished · had read · went'),
    ('تمرين ٢:', 'a) After · a) before · b) Before'),
    ('تمرين ٣:', 'reached / had already started · had finished / went · had eaten / arrived · lost / had given'),
    ('تمرين ٤:', '1 &rarr; c · 2 &rarr; a · 3 &rarr; b'),
    ('تمرين ٥:', 'After he had finished work, he went home. · I had locked the door before I left.'),
    ('تمرين ٦:', 'the train had left · After she had gone home · before we arrived'),
    ('تمرين ٧:', '1 went · 2 had closed · 3 had locked · 4 got · 5 had not returned'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (before / after + الماضي التام).'),
])
docs['past-perfect-2'] = head('Past Perfect — Level 2 | T. Wad Refae') + \
    page(s + foot(True, 'Past Perfect · Level 2 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Perfect · Level 2 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Perfect · Level 2 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Perfect · Level 2 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 3 — Time connectors: before · after · as soon as · by the time (the lesson)
# =========================================================================
s = lesson_head('before · after · as soon as · by the time', 'Level 3 — Time Connectors')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نربط حدثين ماضيين بروابط: <span class="en">before, after, as soon as, by the time</span> — <span class="hl-y">الأسبق</span> غالبًا ماضٍ تام.'
    '<span class="en-fact">We link two past actions with before, after, as soon as, by the time.</span></p>'
    '<div class="formula">by the time / as soon as + past simple &nbsp;…&nbsp; had + V3</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">by the time</span> = بحلول ذلك الوقت كان الحدث الآخر <span class="hl-g">قد اكتمل</span> (ماضٍ تام).', 'by the time = by then the other action had already finished.')
    + fact('<span class="en">as soon as</span> = حالما / فور (حدثان متتابعان مباشرةً، غالبًا ماضٍ بسيط).', 'as soon as = immediately after (usually both past simple).')
    + fact('<span class="en">after</span> + ماضٍ تام (الأسبق) · <span class="en">before</span> + ماضٍ بسيط (الأحدث).', 'after + past perfect (earlier); before + past simple (later).')
    + fact('فاصلة إذا بدأت الجملة بالعبارة الزمنية.', 'Use a comma when the time clause comes first.')
    + '</ul>'
    '<table><tr><th>Connector</th><th>Example</th></tr>'
    '<tr><td class="en">by the time + past simple</td><td class="en">By the time I woke up, everyone had left.</td></tr>'
    '<tr><td class="en">as soon as + past simple</td><td class="en">As soon as the bell rang, we left.</td></tr>'
    '<tr><td class="en">after + past perfect</td><td class="en">After he had won, he took the city.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def"><span class="hl-p en">by the time</span> &rarr; الحدث الآخر <span class="en">had + V3</span>. <span class="hl-g en">as soon as</span> &rarr; تتابع مباشر (ماضٍ بسيط). <span class="en">after</span> + تام · <span class="en">before</span> + بسيط.'
    '<span class="en-fact">by the time &rarr; the other action is past perfect. as soon as &rarr; immediate sequence (past simple).</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">by the time</span><div class="flow"><span class="after"><b>By the time</b> we <b>got</b> home, the rain <b>had stopped</b>.</span></div></div>'
    '<div class="ex"><span class="tag">as soon as</span><div class="flow"><span class="after"><b>As soon as</b> the match <b>finished</b>, the fans <b>left</b>.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">by the time</span> + بسيط &rarr; الآخر <span class="en">had + V3</span> · <span class="en">as soon as</span> &rarr; تتابع مباشر · <span class="en">after/before</span>.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Complete with before, after, as soon as, or by the time.', 'أكمِل/ي بـ before أو after أو as soon as أو by the time.',
    '<ol class="enlist">'
    '<li>__________ we reached the stadium, the match had already started.</li>'
    '<li>__________ the alarm rang, everyone ran out at once.</li>'
    '<li>He had locked the door __________ he left.</li>'
    '<li>__________ she had finished cooking, she called us.</li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct tense.', 'اختر/ي الزمن الصحيح.',
    '<ol class="enlist">'
    '<li>By the time the bus came, we ____ for an hour. <span class="choices"><span class="opt">a) had waited</span><span class="opt">b) waited</span></span></li>'
    '<li>As soon as the film ended, we ____ home. <span class="choices"><span class="opt">a) had gone</span><span class="opt">b) went</span></span></li>'
    '<li>By the time I finished, everyone ____ . <span class="choices"><span class="opt">a) had left</span><span class="opt">b) left</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Use the past perfect or the past simple.', 'استخدم/ي الماضي التام أو البسيط.',
    '<ol class="enlist">'
    '<li>By the time the teacher arrived, the students __________ (finish) the test.</li>'
    '<li>As soon as he __________ (hear) the news, he smiled.</li>'
    '<li>After the army __________ (win) the battle, it __________ (enter) the city.</li>'
    '<li>By the time we got to the shop, it __________ (close).</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match the two halves — write the letter.', 'صِل/ي النصفين — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) By the time we arrived,</span><span>____</span></div>'
    '<div class="row"><span>2) As soon as the rain stopped,</span><span>____</span></div>'
    '<div class="row"><span>3) After he had finished,</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) he went to bed.</span></div>'
    '<div class="row"><span>b) the train had left.</span></div>'
    '<div class="row"><span>c) we went outside.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Combine using the connector given.', 'اربط/ي باستخدام الرابط المعطى.',
    '<ol class="enlist">'
    '<li>(by the time) I woke up / everyone / leave &rarr; ' + wl('44%') + '</li>'
    '<li>(as soon as) the bell / ring / we / leave &rarr; ' + wl('44%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>By the time we arrived, the film started. &rarr; ' + wl('50%') + '</li>'
    '<li>As soon as he had saw me, he waved. &rarr; ' + wl('50%') + '</li>'
    '<li>By the time she called, I have finished. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Use the past perfect or the past simple for each verb.', 'استخدم/ي الماضي التام أو البسيط لكل فعل.',
    '<div class="para">By the time Salah Al-Din reached Jerusalem, he (1) __________ (unite) large parts of the Muslim world. '
    'After he (2) __________ (defeat) his enemies at the Battle of Hittin, the city soon (3) __________ (fall). '
    'As soon as Jerusalem (4) __________ (become) free, the people (5) __________ (celebrate). '
    'By the summer of 1192, most of his enemies (6) __________ (leave) Palestine.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 2 sentences: one with "by the time" and one with "as soon as".', 'اكتب/ي جملتين: واحدة بـ "by the time" وأخرى بـ "as soon as".',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'By the time · As soon as · before · After'),
    ('تمرين ٢:', 'a) had waited · b) went · a) had left'),
    ('تمرين ٣:', 'had finished · heard · had won / entered · had closed'),
    ('تمرين ٤:', '1 &rarr; b · 2 &rarr; c · 3 &rarr; a'),
    ('تمرين ٥:', 'By the time I woke up, everyone had left. · As soon as the bell rang, we left.'),
    ('تمرين ٦:', 'the film had started · As soon as he saw me · I had finished'),
    ('تمرين ٧:', '1 had united · 2 had defeated · 3 fell · 4 became · 5 celebrated · 6 had left'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (by the time · as soon as).'),
])
docs['past-perfect-3'] = head('Past Perfect — Level 3 | T. Wad Refae') + \
    page(s + foot(True, 'Past Perfect · Level 3 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Perfect · Level 3 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Perfect · Level 3 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Perfect · Level 3 · صفحة ٤ من ٤'))

# =========================================================================
# LEVEL 4 — Comprehensive Review of Levels 1-3
# =========================================================================
s = lesson_head('مراجعة شاملة للمستويات الثلاثة — Comprehensive Review', 'Level 4 — Review')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">مراجعة: الماضي التام <span class="hl-y">had + V3</span> للحدث <span class="hl-g">الأسبق</span>، نقارنه بالماضي البسيط للحدث الأحدث، ونربط بينهما بـ <span class="en">before · after · as soon as · by the time</span>.'
    '<span class="en-fact">Review: had + V3 for the earlier action; past simple for the later one; link with before/after/as soon as/by the time.</span></p>'
    '<div class="formula">had + V3 (earlier) &nbsp;|&nbsp; past simple (later) &nbsp;|&nbsp; connectors</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('الصيغة: <span class="en">had + V3</span> لكل الضمائر · النفي <span class="en">hadn\'t</span> · السؤال <span class="en">Had…?</span>', 'Form: had + V3 (all subjects); negative hadn\'t; question Had…?')
    + fact('الحدث الأسبق &rarr; <span class="en">had + V3</span> · الأحدث &rarr; <span class="en">past simple</span>.', 'Earlier &rarr; had + V3; later &rarr; past simple.')
    + fact('<span class="en">by the time</span> &rarr; الآخر <span class="en">had + V3</span> · <span class="en">as soon as</span> &rarr; تتابع مباشر (بسيط).', 'by the time &rarr; the other is past perfect; as soon as &rarr; immediate (past simple).')
    + '</ul>'
    '<table><tr><th>Point</th><th>Example</th></tr>'
    '<tr><td class="en">Form (had + V3)</td><td class="en">She had gone / hadn\'t gone.</td></tr>'
    '<tr><td class="en">Order (before / after)</td><td class="en">After he had eaten, he slept.</td></tr>'
    '<tr><td class="en">by the time / as soon as</td><td class="en">By the time I came, they had left.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">اسأل/ي: أيّ حدث وقع <span class="hl-p">أوّلًا</span>؟ ← <span class="en">had + V3</span>. أيّهما تلاه؟ ← <span class="en">past simple</span>. أيّ رابط يناسب المعنى؟'
    '<span class="en-fact">Ask: which happened first (had + V3) and which followed (past simple)? Then pick the connector.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">صيغة</span><div class="flow"><span class="after">They <b>had packed</b> everything before the trip.</span></div></div>'
    '<div class="ex"><span class="tag">by the time</span><div class="flow"><span class="after"><b>By the time</b> the bell <b>rang</b>, we <b>had finished</b>.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">الأسبق <span class="en">had + V3</span> · الأحدث <span class="en">past simple</span> · <span class="en">before/after · as soon as · by the time</span>.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the correct form.', 'اختر/ي الصيغة الصحيحة.',
    '<ol class="enlist">'
    '<li>By the time I woke up, the bus ____ . <span class="choices">( had gone / went )</span></li>'
    '<li>As soon as she saw me, she ____ . <span class="choices">( had smiled / smiled )</span></li>'
    '<li>He ____ his keys before he reached home. <span class="choices">( had lost / lost )</span></li>'
    '<li>After the film ____ , we went home. <span class="choices">( had ended / ended )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct answer.', 'اختر/ي الإجابة الصحيحة.',
    '<ol class="enlist">'
    '<li>They hadn\'t ____ the city before 1187. <span class="choices"><span class="opt">a) see</span><span class="opt">b) saw</span><span class="opt">c) seen</span></span></li>'
    '<li>____ we arrived, the match had started. <span class="choices"><span class="opt">a) By the time</span><span class="opt">b) As soon as</span></span></li>'
    '<li>After she ____ cooked, she served the food. <span class="choices"><span class="opt">a) had</span><span class="opt">b) has</span><span class="opt">c) was</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Use the past perfect or the past simple.', 'استخدم/ي الماضي التام أو البسيط.',
    '<ol class="enlist">'
    '<li>By the time we __________ (arrive), the guests __________ (already / leave).</li>'
    '<li>As soon as the rain __________ (stop), the children __________ (go) out.</li>'
    '<li>She __________ (not / finish) her book before the lesson __________ (begin).</li>'
    '<li>After the army __________ (enter) the city, people __________ (feel) safe.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match the two halves — write the letter.', 'صِل/ي النصفين — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) By the time we got there,</span><span>____</span></div>'
    '<div class="row"><span>2) He was tired because</span><span>____</span></div>'
    '<div class="row"><span>3) As soon as the bell rang,</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) he had worked all night.</span></div>'
    '<div class="row"><span>b) the shop had closed.</span></div>'
    '<div class="row"><span>c) the pupils ran out.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Combine using the connector given.', 'اربط/ي باستخدام الرابط المعطى.',
    '<ol class="enlist">'
    '<li>(after) she / finish / work / she / rest &rarr; ' + wl('42%') + '</li>'
    '<li>(by the time) we / arrive / the train / leave &rarr; ' + wl('42%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>By the time we arrived, the film has started. &rarr; ' + wl('50%') + '</li>'
    '<li>After he had went out, it rained. &rarr; ' + wl('50%') + '</li>'
    '<li>They had not ate before the guests came. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Use the past perfect or the past simple for each verb.', 'استخدم/ي الماضي التام أو البسيط لكل فعل.',
    '<div class="para">Last week we planned a trip to Jaffa. By the time we (1) __________ (reach) the station, '
    'the train (2) __________ (already / leave). We were upset because we (3) __________ (not / check) the time. '
    'As soon as we (4) __________ (find) a bus, we (5) __________ (take) it. '
    'After we (6) __________ (arrive), we forgot our bad start and enjoyed the sea.</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 past-perfect sentences: one with "before", one with "after", one with "by the time".', 'اكتب/ي ٣ جمل بالماضي التام: بـ "before" و"after" و"by the time".',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'had gone · smiled · had lost · ended'),
    ('تمرين ٢:', 'c) seen · a) By the time · a) had'),
    ('تمرين ٣:', 'arrived / had already left · stopped / went · hadn\'t finished / began · had entered / felt'),
    ('تمرين ٤:', '1 &rarr; b · 2 &rarr; a · 3 &rarr; c'),
    ('تمرين ٥:', 'After she had finished work, she rested. · By the time we arrived, the train had left.'),
    ('تمرين ٦:', 'the film had started · After he had gone out · They had not eaten'),
    ('تمرين ٧:', '1 reached · 2 had already left · 3 had not checked · 4 found · 5 took · 6 had arrived'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (before · after · by the time + had + V3).'),
])
docs['past-perfect-4'] = head('Past Perfect — Level 4 | T. Wad Refae') + \
    page(s + foot(True, 'Past Perfect · Level 4 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Perfect · Level 4 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Perfect · Level 4 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Perfect · Level 4 · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
