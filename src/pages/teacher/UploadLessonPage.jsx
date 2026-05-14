import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { FiUploadCloud, FiCheck, FiArrowLeft } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import { uploadLessonFile, buildLessonPath } from '../../firebase/storage';
import { addLesson } from '../../firebase/lessons';
import {
  SECTIONS,
  GENERAL_SUBSECTIONS,
  GRADES,
  UNITS,
  LESSONS,
  LESSON_EMOJIS,
} from '../../utils/constants';
import { isHtmlFile, formatBytes } from '../../utils/helpers';

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
};

const UploadLessonPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const update = (key) => (e) => {
    const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [key]: val });
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!isHtmlFile(f)) {
      toast.error('Please upload an HTML file (.html)');
      return;
    }
    setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error(t('upload.htmlFile'));
      return;
    }
    if (!form.title) {
      toast.error(t('upload.lessonTitle'));
      return;
    }

    setUploading(true);
    try {
      const path = buildLessonPath({
        section: form.section,
        grade: form.grade,
        unit: form.unit,
        lesson: form.lesson,
        fileName: file.name,
      });

      const { url, path: storedPath } = await uploadLessonFile(file, path);

      const lessonData = {
        section: form.section,
        title: form.title,
        titleAr: form.titleAr,
        description: form.description,
        thumbnail: form.thumbnail,
        fileUrl: url,
        filePath: storedPath,
        fileName: file.name,
        teacher: 'T. Wad Refae',
        school: 'Surda Basic Mixed School',
      };

      if (form.section === SECTIONS.PALBOOK) {
        lessonData.grade = form.grade;
        lessonData.unit = form.unit;
        lessonData.lesson = form.lesson;
      } else {
        lessonData.subsection = form.subsection;
      }

      await addLesson(lessonData);

      toast.success(t('upload.uploadSuccess'));
      setForm(initialForm);
      setFile(null);
      navigate('/teacher/lessons');
    } catch (err) {
      console.error(err);
      toast.error(err.message || t('upload.uploadError'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageTransition>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-pink-600 text-white flex items-center justify-center shadow-kid">
            <FiUploadCloud size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-extrabold gradient-text">
              {t('upload.title')}
            </h1>
            <p className="text-sm text-slate-500">by T. Wad Refae</p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="card space-y-5">
        {/* Section */}
        <div>
          <label className="label">{t('upload.section')}</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: SECTIONS.PALBOOK, label: t('upload.palbook'), emoji: '🇵🇸' },
              { v: SECTIONS.GENERAL, label: t('upload.general'), emoji: '✨' },
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
              <label className="label">{t('upload.grade')}</label>
              <select value={form.grade} onChange={update('grade')} className="input">
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">{t('upload.unit')}</label>
              <select value={form.unit} onChange={update('unit')} className="input">
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">{t('upload.lesson')}</label>
              <select value={form.lesson} onChange={update('lesson')} className="input">
                {LESSONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* General subsection */}
        {form.section === SECTIONS.GENERAL && (
          <div>
            <label className="label">{t('upload.subsection')}</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: GENERAL_SUBSECTIONS.GRAMMAR, label: t('upload.grammar'), emoji: '📝' },
                { v: GENERAL_SUBSECTIONS.PRONUNCIATION, label: t('upload.pronunciation'), emoji: '🗣️' },
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
            <label className="label">{t('upload.lessonTitle')} (EN)</label>
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
            <label className="label">{t('upload.lessonTitleAr')}</label>
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
          <label className="label">{t('upload.description')}</label>
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
          <label className="label">{t('upload.thumbnail')}</label>
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

        {/* File upload */}
        <div>
          <label className="label">{t('upload.htmlFile')}</label>
          <label className="block cursor-pointer">
            <input
              type="file"
              accept=".html,.htm,text/html"
              onChange={handleFile}
              className="hidden"
            />
            <div
              className={`p-6 rounded-2xl border-2 border-dashed text-center transition-colors ${
                file
                  ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20'
                  : 'border-slate-300 dark:border-slate-600 hover:border-primary-500'
              }`}
            >
              {file ? (
                <>
                  <FiCheck className="mx-auto text-4xl text-secondary-500 mb-2" />
                  <p className="font-bold text-slate-800 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatBytes(file.size)} • {t('upload.fileSelected')}
                  </p>
                </>
              ) : (
                <>
                  <FiUploadCloud className="mx-auto text-4xl text-slate-400 mb-2" />
                  <p className="font-semibold text-slate-700 dark:text-slate-200">
                    {t('upload.uploadFile')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">.html files only</p>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/teacher')}
            className="btn-outline"
          >
            <FiArrowLeft className="rtl-flip" /> {t('common.back')}
          </button>
          <button type="submit" disabled={uploading} className="btn-primary flex-1">
            {uploading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('upload.uploading')}
              </>
            ) : (
              <>
                <FiUploadCloud /> {t('upload.submit')}
              </>
            )}
          </button>
        </div>
      </form>
    </PageTransition>
  );
};

export default UploadLessonPage;
