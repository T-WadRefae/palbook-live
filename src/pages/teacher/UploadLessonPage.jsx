import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { FiLink, FiCheck, FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import GradeMultiSelect from '../../components/common/GradeMultiSelect';
import { addLesson } from '../../firebase/lessons';
import {
  SECTIONS,
  GENERAL_SUBSECTIONS,
  GRADES,
  UNITS,
  LESSONS,
  LESSON_EMOJIS,
} from '../../utils/constants';

const initialForm = {
  section: SECTIONS.PALBOOK,
  subsection: GENERAL_SUBSECTIONS.GRAMMAR,
  grade: 5,
  unit: 1,
  lesson: 1,
  grades: [], // General lessons: which grades this lesson serves (can be many)
  title: '',
  titleAr: '',
  description: '',
  thumbnail: '📚',
  fileUrl: '',
};

const UploadLessonPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => {
    const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [key]: val });
  };

  const isValidUrl = (url) => {
    try {
      const u = new URL(url);
      return u.protocol === 'https:' || u.protocol === 'http:';
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fileUrl) {
      toast.error('Please enter the URL');
      return;
    }

    if (!isValidUrl(form.fileUrl)) {
      toast.error('Please enter a valid URL');
      return;
    }

    if (!form.title) {
      toast.error('Please enter the title');
      return;
    }

    setSaving(true);
    try {
      const lessonData = {
        section: form.section,
        title: form.title,
        titleAr: form.titleAr,
        description: form.description,
        thumbnail: form.thumbnail,
        fileUrl: form.fileUrl,
        teacher: 'T. Wad Refae',
      };

      if (form.section === SECTIONS.PALBOOK) {
        lessonData.grade = form.grade;
        lessonData.unit = form.unit;
        lessonData.lesson = form.lesson;
      } else if (form.section === SECTIONS.GENERAL) {
        lessonData.subsection = form.subsection;
        lessonData.grades = form.grades; // grades this lesson serves
      }

      await addLesson(lessonData);
      toast.success('Added successfully!');
      setForm(initialForm);
      navigate('/teacher/lessons');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-pink-400 text-white flex items-center justify-center shadow-kid">
            <FiLink size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-extrabold gradient-text">
              Add New Lesson
            </h1>
            <p className="text-sm text-slate-500">by T. Wad Refae</p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="card space-y-5">
        <div>
          <label className="label">Section</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { v: SECTIONS.PALBOOK, label: 'PalBook Live', emoji: '🇵🇸' },
              { v: SECTIONS.GENERAL, label: 'General', emoji: '✨' },
              { v: SECTIONS.GAMES, label: 'Games', emoji: '🎮' },
            ].map((s) => (
              <button
                key={s.v}
                type="button"
                onClick={() => setForm({ ...form, section: s.v })}
                className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${
                  form.section === s.v
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-kid'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="text-3xl mb-1">{s.emoji}</div>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {form.section === SECTIONS.PALBOOK && (
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Grade</label>
              <select value={form.grade} onChange={update('grade')} className="input">
                {GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Unit</label>
              <select value={form.unit} onChange={update('unit')} className="input">
                {UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Lesson</label>
              <select value={form.lesson} onChange={update('lesson')} className="input">
                {LESSONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {form.section === SECTIONS.GENERAL && (
          <div>
            <label className="label">Sub-section</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: GENERAL_SUBSECTIONS.GRAMMAR, label: 'Grammar', emoji: '📝' },
                { v: GENERAL_SUBSECTIONS.PRONUNCIATION, label: 'Pronunciation', emoji: '🗣️' },
                { v: GENERAL_SUBSECTIONS.READING, label: 'Reading', emoji: '📖' },
                { v: GENERAL_SUBSECTIONS.WRITING, label: 'Writing', emoji: '✍️' },
              ].map((s) => (
                <button
                  key={s.v}
                  type="button"
                  onClick={() => setForm({ ...form, subsection: s.v })}
                  className={`p-3 rounded-2xl border-2 font-bold text-sm transition-all ${
                    form.subsection === s.v
                      ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{s.emoji}</div>
                  {s.label}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="label">
                {t('upload.grades')}
              </label>
              <GradeMultiSelect
                value={form.grades}
                onChange={(grades) => setForm({ ...form, grades })}
              />
              <p className="text-xs text-slate-500 mt-2">
                {t('upload.gradesHint')}
              </p>
            </div>
          </div>
        )}

        {form.section === SECTIONS.GAMES && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 border-2 border-accent-200">
            <p className="text-sm font-bold text-accent-800 mb-1">Adding a Game</p>
            <p className="text-xs text-slate-700">
              Games appear in the Games section. Upload your interactive HTML game to GitHub Pages first.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Title (EN)</label>
            <input
              type="text"
              value={form.title}
              onChange={update('title')}
              className="input"
              placeholder="Title in English"
              required
            />
          </div>
          <div>
            <label className="label">Title (AR)</label>
            <input
              type="text"
              value={form.titleAr}
              onChange={update('titleAr')}
              className="input"
              placeholder="العنوان بالعربي"
              dir="rtl"
            />
          </div>
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={form.description}
            onChange={update('description')}
            rows={3}
            className="input"
            placeholder="Brief description..."
          />
        </div>

        <div>
          <label className="label">Thumbnail Emoji</label>
          <div className="flex flex-wrap gap-2">
            {LESSON_EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setForm({ ...form, thumbnail: e })}
                className={`w-12 h-12 rounded-xl text-2xl transition-all ${
                  form.thumbnail === e
                    ? 'bg-gradient-pal scale-110 shadow-kid'
                    : 'bg-slate-100 hover:scale-105'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <FiLink className="text-primary-500" />
            URL from GitHub Pages
          </label>
          <input
            type="url"
            value={form.fileUrl}
            onChange={update('fileUrl')}
            className="input font-mono text-sm"
            placeholder="https://t-wadrefae.github.io/palbook-lessons/..."
            required
            dir="ltr"
          />

          <div className="mt-3 p-4 rounded-2xl bg-blue-50 border-2 border-blue-200">
            <p className="text-sm font-bold text-blue-800 mb-2">
              How to get the URL:
            </p>
            <ol className="text-xs text-slate-700 space-y-1 list-decimal list-inside">
              <li>Upload your HTML file to palbook-lessons repo</li>
              <li>Wait 2-3 minutes for GitHub Pages</li>
              <li>Copy the GitHub Pages URL</li>
              <li>Paste it above</li>
            </ol>
          </div>

          {form.fileUrl && isValidUrl(form.fileUrl) && (
            <a
              href={form.fileUrl}
              target="_blank"
              rel="noreferrer"
              
              className="mt-2 inline-flex items-center gap-2 text-sm text-secondary-600 hover:underline font-semibold"
            >
              <FiCheck /> Preview in new tab <FiExternalLink size={14} />
            </a>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/teacher')}
            className="btn-outline"
          >
            <FiArrowLeft className="rtl-flip" /> Back
          </button>
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FiCheck /> Save
              </>
            )}
          </button>
        </div>
      </form>
    </PageTransition>
  );
};

export default UploadLessonPage;