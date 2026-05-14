import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { FiLink, FiCheck, FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
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
  grade: 7,
  unit: 1,
  lesson: 1,
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
      toast.error('Please enter the lesson URL');
      return;
    }

    if (!isValidUrl(form.fileUrl)) {
      toast.error('Please enter a valid URL (starting with https://)');
      return;
    }

    if (!form.title) {
      toast.error('Please enter the lesson title');
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
      } else {
        lessonData.subsection = form.subsection;
      }

      await addLesson(lessonData);

      toast.success('Lesson added successfully!');
      setForm(initialForm);
      navigate('/teacher/lessons');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to save lesson');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-pink-600 text-white flex items-center justify-center shadow-kid">
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
        {/* Section */}
        <div>
          <label className="label">Section</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: SECTIONS.PALBOOK, label: 'PalBook Live', emoji: '🇵🇸' },
              { v: SECTIONS.GENERAL, label: 'General', emoji: '✨' },
            ].map((s) => (
              <button
                key={s.v}
                type="button"
                onClick={() => setForm({ ...form, section: s.v })}
                className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${
                  form.section === s.v
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-kid'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                <div className="text-3xl mb-1">{s.emoji}</div>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* PalBook fields */}
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

        {/* General subsection */}
        {form.section === SECTIONS.GENERAL && (
          <div>
            <label className="label">Sub-section</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: GENERAL_SUBSECTIONS.GRAMMAR, label: 'Grammar', emoji: '📝' },
                { v: GENERAL_SUBSECTIONS.PRONUNCIATION, label: 'Pronunciation', emoji: '🗣️' },
              ].map((s) => (
                <button
                  key={s.v}
                  type="button"
                  onClick={() => setForm({ ...form, subsection: s.v })}
                  className={`p-3 rounded-2xl border-2 font-bold text-sm transition-all ${
                    form.subsection === s.v
                      ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-2xl me-2">{s.emoji}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Title */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Lesson Title (EN)</label>
            <input
              type="text"
              value={form.title}
              onChange={update('title')}
              className="input"
              placeholder="Communication and Technology"
              required
            />
          </div>
          <div>
            <label className="label">Lesson Title (AR)</label>
            <input
              type="text"
              value={form.titleAr}
              onChange={update('titleAr')}
              className="input"
              placeholder="التواصل والتكنولوجيا"
              dir="rtl"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            value={form.description}
            onChange={update('description')}
            rows={3}
            className="input"
            placeholder="Brief description for students..."
          />
        </div>

        {/* Emoji picker */}
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
                    : 'bg-slate-100 dark:bg-slate-800 hover:scale-105'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* URL Field - THE NEW APPROACH */}
        <div>
          <label className="label flex items-center gap-2">
            <FiLink className="text-primary-500" />
            Lesson URL (from GitHub Pages)
          </label>
          <input
            type="url"
            value={form.fileUrl}
            onChange={update('fileUrl')}
            className="input font-mono text-sm"
            placeholder="https://t-wadrefae.github.io/palbook-lessons/grade7/unit17p3.html"
            required
            dir="ltr"
          />

          {/* Instructions card */}
          <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 border-2 border-blue-200 dark:border-slate-600">
            <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
              💡 How to get the URL:
            </p>
            <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-decimal list-inside">
              <li>Upload your HTML lesson to <a href="https://github.com/T-WadRefae/palbook-lessons" target="_blank" rel="noreferrer" className="font-bold text-primary-600 hover:underline inline-flex items-center gap-1">palbook-lessons repo <FiExternalLink size={12} /></a></li>
              <li>Wait 2-3 minutes for GitHub Pages to publish</li>
              <li>Copy the GitHub Pages URL (format: <code className="bg-slate-200 dark:bg-slate-900 px-1 rounded">https://t-wadrefae.github.io/palbook-lessons/...</code>)</li>
              <li>Paste it above</li>
            </ol>
          </div>

          {/* Preview link */}
          {form.fileUrl && isValidUrl(form.fileUrl) && (
            
              href={form.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm text-secondary-600 hover:underline font-semibold"
            >
              <FiCheck /> Preview lesson in new tab <FiExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Submit */}
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
                <FiCheck /> Save Lesson
              </>
            )}
          </button>
        </div>
      </form>
    </PageTransition>
  );
};

export default UploadLessonPage;