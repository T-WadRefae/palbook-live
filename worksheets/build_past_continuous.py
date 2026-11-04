# -*- coding: utf-8 -*-
# Generator for the "Past Continuous" worksheets (2 sheets),
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
    return ('<div class="lesson-head">\n<h1>Past Continuous</h1>\n'
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
# SHEET 1 — Foundation: was/were + V-ing (an action in progress in the past)
# =========================================================================
s = lesson_head('حدثٌ كان جاريًا في الماضي — The Past Continuous', 'Level 1 — Foundation')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">الماضي المستمر لحدثٍ كان <span class="hl-y">جاريًا في لحظةٍ محدّدة في الماضي</span> (بدأ قبلها ولم ينتهِ بعد).'
    '<span class="en-fact">An action that was in progress at a specific moment in the past.</span></p>'
    '<div class="formula">was / were + verb-<span class="ing">ing</span></div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">I / He / She / It was</span> · <span class="en">You / We / They were</span> + <span class="en">V-ing</span>.', 'Use was with I/he/she/it, were with you/we/they, + the -ing verb.')
    + fact('نستخدمه لحدثٍ <span class="hl-g">مستمرٍّ في وقتٍ محدّد بالماضي</span> (<span class="en">At 8 pm, I was studying</span>).', 'For an action in progress at a past time (At 8 pm, I was studying).')
    + fact('النفي: <span class="en">wasn\'t / weren\'t</span> · السؤال: <span class="en">Was / Were + subject + V-ing?</span>', 'Negative: wasn\'t/weren\'t. Question: Was/Were + subject + V-ing?')
    + '</ul>'
    '<table><tr><th>Subject</th><th>(+)</th><th>(&minus;)</th><th>(?)</th></tr>'
    '<tr><td class="en">I / He / She / It</td><td class="en">was playing</td><td class="en">wasn\'t playing</td><td class="en">Was he playing?</td></tr>'
    '<tr><td class="en">You / We / They</td><td class="en">were playing</td><td class="en">weren\'t playing</td><td class="en">Were you playing?</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">١) اختر/ي <span class="hl-p en">was / were</span> حسب الفاعل &nbsp; ٢) أضِف/ي الفعل + <span class="ing">ing</span>.'
    '<span class="en-fact">1) choose was/were for the subject &nbsp; 2) add verb + ing.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">في وقت محدّد</span><div class="flow"><span class="after">At 9 pm, I <b>was reading</b> a book.</span></div></div>'
    '<div class="ex"><span class="tag">مشهد ماضٍ</span><div class="flow"><span class="after">The children <b>were playing</b> in the yard.</span></div></div>'
    '<div class="ex"><span class="tag">طوال الصباح</span><div class="flow"><span class="after">It <b>was raining</b> all morning.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt">الماضي المستمر = <span class="en"><b>was / were + V-ing</b></span> &larr; حدثٌ كان جاريًا في لحظةٍ ماضية.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose was or were.', 'اختر/ي was أو were.',
    '<ol class="enlist">'
    '<li>I ____ watching TV. <span class="choices">( was / were )</span></li>'
    '<li>They ____ playing football. <span class="choices">( was / were )</span></li>'
    '<li>She ____ cooking lunch. <span class="choices">( was / were )</span></li>'
    '<li>You ____ sleeping early. <span class="choices">( was / were )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct form.', 'اختر/ي الصيغة الصحيحة.',
    '<ol class="enlist">'
    '<li>At 8, we were ____ dinner. <span class="choices"><span class="opt">a) have</span><span class="opt">b) had</span><span class="opt">c) having</span></span></li>'
    '<li>She was ____ a letter. <span class="choices"><span class="opt">a) write</span><span class="opt">b) writing</span><span class="opt">c) wrote</span></span></li>'
    '<li>The boys ____ playing outside. <span class="choices"><span class="opt">a) was</span><span class="opt">b) were</span><span class="opt">c) are</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Complete with was/were + the -ing verb.', 'أكمِل/ي بـ was/were + الفعل + ing.',
    '<ol class="enlist">'
    '<li>At 7 am, I __________ (sleep).</li>'
    '<li>My father __________ (read) the newspaper.</li>'
    '<li>The students __________ (write) in their books.</li>'
    '<li>We __________ (wait) for the bus.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each subject with its verb phrase — write the letter.', 'صِل/ي كل فاعل بفعله — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) The baby</span><span>____</span></div>'
    '<div class="row"><span>2) My friends and I</span><span>____</span></div>'
    '<div class="row"><span>3) You</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) were walking together.</span></div>'
    '<div class="row"><span>b) was sleeping quietly.</span></div>'
    '<div class="row"><span>c) were drawing a picture.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Rewrite in the negative (&minus;).', 'أعِد/ي الكتابة بالنفي (&minus;).',
    '<ol class="enlist">'
    '<li>I was reading. &rarr; ' + wl('52%') + '</li>'
    '<li>They were running. &rarr; ' + wl('52%') + '</li>'
    '<li>She was singing. &rarr; ' + wl('52%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>They was playing. &rarr; ' + wl('52%') + '</li>'
    '<li>I were watching TV. &rarr; ' + wl('52%') + '</li>'
    '<li>She was cook dinner. &rarr; ' + wl('52%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Put each verb into the past continuous.', 'ضع/ي الفعل في الماضي المستمر.',
    '<div class="para">Yesterday evening our house was busy. My mother (1) __________ (make) taboon bread. '
    'My father (2) __________ (water) the olive trees. My little brothers (3) __________ (play) in the yard. '
    'I (4) __________ (help) my sister with her homework. Everyone was busy!</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 3 sentences about what you were doing at 8 pm yesterday.', 'اكتب/ي ٣ جمل عمّا كنت تفعله الساعة ٨ مساءً أمس.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'was · were · was · were'),
    ('تمرين ٢:', 'c) having · b) writing · b) were'),
    ('تمرين ٣:', 'was sleeping · was reading · were writing · were waiting'),
    ('تمرين ٤:', '1 &rarr; b · 2 &rarr; a · 3 &rarr; c'),
    ('تمرين ٥:', "I wasn't reading. · They weren't running. · She wasn't singing."),
    ('تمرين ٦:', 'They were playing. · I was watching TV. · She was cooking dinner.'),
    ('تمرين ٧:', '1 was making · 2 was watering · 3 were playing · 4 was helping'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (was/were + V-ing).'),
])
docs['past-continuous-1'] = head('Past Continuous — Level 1 | T. Wad Refae') + \
    page(s + foot(True, 'Past Continuous · Level 1 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Continuous · Level 1 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Continuous · Level 1 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Continuous · Level 1 · صفحة ٤ من ٤'))

# =========================================================================
# SHEET 2 — with Past Simple: WHEN only (interrupted actions)
# =========================================================================
s = lesson_head('الحدث المُقاطِع — Past Continuous + when', 'Level 2 — with when')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">حدثٌ طويل كان جاريًا (<span class="hl-y">ماضٍ مستمر</span>) <span class="hl-p">يقطعه</span> حدثٌ قصير وقع فجأة (<span class="hl-g">ماضٍ بسيط</span>)، ونربط بينهما بـ <span class="en">when</span>.'
    '<span class="en-fact">A long action in progress (past continuous) is interrupted by a short action (past simple), joined with when.</span></p>'
    '<div class="formula">was / were + V-ing &nbsp;+&nbsp; when &nbsp;+&nbsp; past simple</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('الحدث الطويل الجاري &larr; <span class="hl-g">ماضٍ مستمر</span> · الحدث القصير المُقاطِع &larr; <span class="hl-p">ماضٍ بسيط</span>.', 'Long background action = past continuous; short interrupting action = past simple.')
    + fact('<span class="en">when</span> يسبق <span class="hl-y">الحدث القصير</span> في الماضي البسيط.', 'when comes before the short action in the past simple.')
    + fact('ترتيبان للجملة: <span class="en">[continuous + when + simple]</span> أو <span class="en">[When + simple, continuous]</span>.', 'Two orders: continuous + when + simple, OR When + simple, continuous.')
    + fact('إذا بدأت الجملة بـ <span class="en">When</span> نضع <span class="hl-y">فاصلة</span> بعد العبارة الأولى.', 'When the sentence starts with When, put a comma after the first clause.')
    + '</ul>'
    '<table><tr><th>continuous + when + simple</th><th>When + simple, continuous</th></tr>'
    '<tr><td class="en">I was sleeping when the alarm rang.</td><td class="en">When the alarm rang, I was sleeping.</td></tr>'
    '<tr><td class="en">She was cooking when I arrived.</td><td class="en">When I arrived, she was cooking.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">الخلفية الطويلة &rarr; <span class="hl-p en">was/were + V-ing</span>. المقاطعة القصيرة بعد <span class="en">when</span> &rarr; <span class="hl-g en">past simple</span>.'
    '<span class="en-fact">Long background &rarr; was/were + V-ing. Short interruption after when &rarr; past simple.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">مقاطعة</span><div class="flow"><span class="after">I <b>was reading</b> when the lights <b>went</b> out.</span></div></div>'
    '<div class="ex"><span class="tag">مقاطعة</span><div class="flow"><span class="after">She <b>was cooking</b> when the guests <b>arrived</b>.</span></div></div>'
    '<div class="ex"><span class="tag">بادئة بـ When</span><div class="flow"><span class="after"><b>When</b> the teacher <b>came</b> in, we <b>were talking</b>.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">was/were + V-ing</span> + <span class="en">when</span> + <span class="en">past simple</span> &larr; حدثٌ طويل قطعه حدثٌ قصير.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the past continuous (long) or the past simple (short).', 'اختر/ي الماضي المستمر (الطويل) أو البسيط (القصير).',
    '<ol class="enlist">'
    '<li>I ____ TV when she called. <span class="choices">( was watching / watched )</span></li>'
    '<li>The phone rang when I ____ . <span class="choices">( was sleeping / slept )</span></li>'
    '<li>When the bell ____ , we were leaving. <span class="choices">( was ringing / rang )</span></li>'
    '<li>They ____ when it started to rain. <span class="choices">( were playing / played )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose the correct verb form.', 'اختر/ي صيغة الفعل الصحيحة.',
    '<ol class="enlist">'
    '<li>I was cooking when the phone ____ . <span class="choices"><span class="opt">a) was ringing</span><span class="opt">b) rang</span></span></li>'
    '<li>When the rain started, we ____ outside. <span class="choices"><span class="opt">a) were playing</span><span class="opt">b) played</span></span></li>'
    '<li>She ____ a letter when I arrived. <span class="choices"><span class="opt">a) was writing</span><span class="opt">b) wrote</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Use the past continuous for the long action and the past simple for the short one.', 'استخدم/ي الماضي المستمر للحدث الطويل والبسيط للقصير.',
    '<ol class="enlist">'
    '<li>I __________ (sleep) when the earthquake __________ (happen).</li>'
    '<li>We __________ (have) dinner when you __________ (call).</li>'
    '<li>When the teacher __________ (enter), the students __________ (talk).</li>'
    '<li>She __________ (read) when the lights __________ (go) out.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each clause with its ending — write the letter.', 'صِل/ي كل بداية بنهايتها — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) I was riding my bike</span><span>____</span></div>'
    '<div class="row"><span>2) We were sleeping</span><span>____</span></div>'
    '<div class="row"><span>3) When the bell rang,</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) when the phone rang.</span></div>'
    '<div class="row"><span>b) when I fell down.</span></div>'
    '<div class="row"><span>c) we were leaving class.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Join the two sentences with when.', 'اربط/ي الجملتين بـ when.',
    '<ol class="enlist">'
    '<li>I was cooking. The phone rang. &rarr; ' + wl('50%') + '</li>'
    '<li>We were walking home. It started to rain. &rarr; ' + wl('50%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I was read when she called. &rarr; ' + wl('50%') + '</li>'
    '<li>They was playing when it started to snow. &rarr; ' + wl('50%') + '</li>'
    '<li>When I was cooking, I was cutting my finger. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Use the past continuous or the past simple for each verb.', 'استخدم/ي الماضي المستمر أو البسيط لكل فعل.',
    '<div class="para">Last night our street was quiet. I (1) __________ (do) my homework when the lights suddenly '
    '(2) __________ (go) off. My mother (3) __________ (look) for a candle when my father '
    '(4) __________ (come) home. We (5) __________ (sit) together when the power finally (6) __________ (return).</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write 2 sentences with when about yesterday.', 'اكتب/ي جملتين بـ when عن أمس.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'was watching · was sleeping · rang · were playing'),
    ('تمرين ٢:', 'b) rang · a) were playing · a) was writing'),
    ('تمرين ٣:', 'was sleeping / happened · were having / called · entered / were talking · was reading / went'),
    ('تمرين ٤:', '1 &rarr; b · 2 &rarr; a · 3 &rarr; c'),
    ('تمرين ٥:', 'I was cooking when the phone rang. · We were walking home when it started to rain.'),
    ('تمرين ٦:', 'I was reading when she called. · They were playing when it started to snow. · When I was cooking, I cut my finger.'),
    ('تمرين ٧:', '1 was doing · 2 went · 3 was looking · 4 came · 5 were sitting · 6 returned'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (continuous + when + past simple).'),
])
docs['past-continuous-2'] = head('Past Continuous — Level 2 | T. Wad Refae') + \
    page(s + foot(True, 'Past Continuous · Level 2 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Continuous · Level 2 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Continuous · Level 2 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Continuous · Level 2 · صفحة ٤ من ٤'))

# =========================================================================
# SHEET 3 — when AND while (interrupted + parallel actions)
# =========================================================================
s = lesson_head('when / while — Interrupted & Parallel', 'Level 3 — when & while')
s += sec('red', '1', 'Definition · التعريف',
    '<div class="box"><p class="def">نختار بين <span class="en">when</span> و <span class="en">while</span> حسب الفعل: <span class="hl-g">when + ماضٍ بسيط</span> (حدث قصير)، و<span class="hl-y">while + ماضٍ مستمر</span> (حدث طويل جارٍ).'
    '<span class="en-fact">Choose when or while by the verb: when + past simple (short), while + past continuous (long).</span></p>'
    '<div class="formula">While + was/were V-ing &nbsp;…&nbsp; / &nbsp;… when + past simple</div></div>')
s += sec('red', '2', 'Key Facts · حقائق أساسية',
    '<ul class="facts">'
    + fact('<span class="en">when</span> + ماضٍ بسيط (القصير) · <span class="en">while</span> + ماضٍ مستمر (الطويل الجاري).', 'when + past simple (short); while + past continuous (long).')
    + fact('المعنى نفسه بصياغتين: <span class="en">I was reading when the phone rang</span> = <span class="en">While I was reading, the phone rang</span>.', 'Same meaning both ways (when / while).')
    + fact('حدثان طويلان متوازيان: <span class="en">While I was cooking, he was cleaning.</span>', 'Two long parallel actions: while + past continuous for both.')
    + fact('فاصلة إذا بدأت الجملة بـ <span class="en">When/While</span>.', 'Comma when the sentence starts with When/While.')
    + '</ul>'
    '<table><tr><th>when + past simple</th><th>while + past continuous</th></tr>'
    '<tr><td class="en">When the phone rang, I was reading.</td><td class="en">While I was reading, the phone rang.</td></tr>'
    '<tr><td class="en">I was sleeping when it happened.</td><td class="en">While I was cooking, he was cleaning.</td></tr></table>')
s += sec('red', '3', 'Steps · خطوات النجاح',
    '<div class="box soft"><p class="def">فعل قصير مفاجئ؟ &rarr; <span class="hl-g en">when + past simple</span>. فعل طويل جارٍ؟ &rarr; <span class="hl-y en">while + was/were V-ing</span>.'
    '<span class="en-fact">Short sudden action? &rarr; when + past simple. Long ongoing action? &rarr; while + was/were V-ing.</span></p></div>'
    '<div class="examples">'
    '<div class="ex"><span class="tag">while</span><div class="flow"><span class="after"><b>While</b> we <b>were walking</b>, it <b>started</b> to rain.</span></div></div>'
    '<div class="ex"><span class="tag">when</span><div class="flow"><span class="after">I <b>was studying</b> when my friend <b>arrived</b>.</span></div></div>'
    '<div class="ex"><span class="tag">متوازيان</span><div class="flow"><span class="after"><b>While</b> my mother <b>was cooking</b>, I <b>was helping</b> her.</span></div></div></div>')
s += sec('red', '4', 'Summary · الخلاصة',
    '<div class="sticky"><div class="lbl">&#10022; تذكّر/ي دائمًا · Remember</div>'
    '<div class="txt"><span class="en">when</span> + قصير (بسيط) · <span class="en">while</span> + طويل (مستمر) · فاصلة إذا بدأت بالعبارة.</div></div>')
e1 = q('1', 'Recognize · تعرّف', 'Choose the past continuous or the past simple.', 'اختر/ي الماضي المستمر أو الماضي البسيط.',
    '<ol class="enlist">'
    '<li>While I ____ , I saw a friend. <span class="choices">( was walking / walked )</span></li>'
    '<li>When the teacher ____ in, we were talking. <span class="choices">( was coming / came )</span></li>'
    '<li>They were playing when it ____ to rain. <span class="choices">( was starting / started )</span></li>'
    '<li>While she ____ , the phone rang. <span class="choices">( was cooking / cooked )</span></li></ol>')
e2 = q('2', 'Multiple Choice · اختيار من متعدد', 'Choose when or while.', 'اختر/ي when أو while.',
    '<ol class="enlist">'
    '<li>____ I was reading, the lights went out. <span class="choices"><span class="opt">a) When</span><span class="opt">b) While</span></span></li>'
    '<li>I was sleeping ____ the earthquake happened. <span class="choices"><span class="opt">a) when</span><span class="opt">b) while</span></span></li>'
    '<li>____ my brother was studying, I was watching TV. <span class="choices"><span class="opt">a) When</span><span class="opt">b) While</span></span></li></ol>')
e3 = q('3', 'Fill in · إكمال الفراغ', 'Use the past continuous for long actions and the past simple for short ones.', 'استخدم/ي الماضي المستمر للأحداث الطويلة والبسيط للقصيرة.',
    '<ol class="enlist">'
    '<li>While we __________ (have) lunch, the guests __________ (arrive).</li>'
    '<li>I __________ (watch) TV when the power __________ (go) off.</li>'
    '<li>While my mother __________ (cook), my father __________ (water) the plants.</li>'
    '<li>When you __________ (call), I __________ (study) in my room.</li></ol>')
e4 = q('4', 'Match · توصيل', 'Match each clause with its ending — write the letter.', 'صِل/ي كل بداية بنهايتها — اكتب/ي الحرف.',
    '<div class="match"><div class="col">'
    '<div class="row"><span>1) While I was studying,</span><span>____</span></div>'
    '<div class="row"><span>2) When the rain started,</span><span>____</span></div>'
    '<div class="row"><span>3) I was riding my bike</span><span>____</span></div></div>'
    '<div class="col">'
    '<div class="row"><span>a) we were playing outside.</span></div>'
    '<div class="row"><span>b) when I fell down.</span></div>'
    '<div class="row"><span>c) my brother was watching TV.</span></div></div></div>')
e5 = q('5', 'Transform · تحويل', 'Join the sentences with when or while.', 'اربط/ي الجملتين بـ when أو while.',
    '<ol class="enlist">'
    '<li>I was cooking. The phone rang. &rarr; ' + wl('50%') + '</li>'
    '<li>My mother was cooking. My father was cleaning. &rarr; ' + wl('50%') + '</li></ol>')
e6 = q('6', 'Correct · تصحيح خطأ', 'Each sentence has one mistake. Correct it.', 'في كل جملة خطأ واحد. صحّح/يه.',
    '<ol class="enlist">'
    '<li>I was read when she called. &rarr; ' + wl('50%') + '</li>'
    '<li>While they played, it started to snow. &rarr; ' + wl('50%') + '</li>'
    '<li>When I was cooking, I was cutting my finger. &rarr; ' + wl('50%') + '</li></ol>')
e7 = q('7', 'In Context · توظيف سياقي', 'Use the past continuous or the past simple for each verb.', 'استخدم/ي الماضي المستمر أو البسيط لكل فعل.',
    '<div class="para">It was a quiet afternoon in Jaffa. While my grandfather (1) __________ (tell) us a story, '
    'the electricity suddenly (2) __________ (go) off. We (3) __________ (sit) in the dark when my mother '
    '(4) __________ (bring) a lamp. While she (5) __________ (light) it, we all (6) __________ (laugh).</div>')
e8 = q('8', 'Create · تحدٍ إبداعي', 'Write one sentence with when and one with while about yesterday.', 'اكتب/ي جملة بـ when وأخرى بـ while عن أمس.',
    '<div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>')
key = akbox([
    ('تمرين ١:', 'was walking · came · started · was cooking'),
    ('تمرين ٢:', 'b) While · a) when · b) While'),
    ('تمرين ٣:', 'were having / arrived · was watching / went · was cooking / was watering · called / was studying'),
    ('تمرين ٤:', '1 &rarr; c · 2 &rarr; a · 3 &rarr; b'),
    ('تمرين ٥:', 'I was cooking when the phone rang. · While my mother was cooking, my father was cleaning.'),
    ('تمرين ٦:', 'I was reading when she called. · While they were playing, it started to snow. · When I was cooking, I cut my finger.'),
    ('تمرين ٧:', '1 was telling · 2 went · 3 were sitting · 4 brought · 5 was lighting · 6 laughed'),
    ('تمرين ٨:', OPEN % 'إجابات مفتوحة (when + ماضٍ بسيط · while + ماضٍ مستمر).'),
])
docs['past-continuous-3'] = head('Past Continuous — Level 3 | T. Wad Refae') + \
    page(s + foot(True, 'Past Continuous · Level 3 · صفحة ١ من ٤')) + \
    page(ptitle("Let's Practice!") + e1 + e2 + e3 + e4 + foot(False, 'Past Continuous · Level 3 · صفحة ٢ من ٤')) + \
    page(ptitle("Keep Going!") + e5 + e6 + e7 + e8 + foot(False, 'Past Continuous · Level 3 · صفحة ٣ من ٤')) + \
    page(ptitle('Answer Key', 'var(--red)') + key + foot(True, 'Past Continuous · Level 3 · صفحة ٤ من ٤'))

for name, html in docs.items():
    with open(os.path.join(OUT, name + '.html'), 'w') as f:
        f.write(html)
    print('wrote', name + '.html', round(len(html) / 1024, 1), 'KB')
