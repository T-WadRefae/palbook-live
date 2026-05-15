import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { FiPlus, FiSearch, FiX, FiSave, FiLink, FiExternalLink, FiCheck } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import LessonCard from '../../components/common/LessonCard';
import LessonViewer from '../../components/common/LessonViewer';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getLessons, deleteLesson, updateLesson } from '../../firebase/lessons';
import {
  SECTIONS,
  GENERAL_SUBSECTIONS,
  GRADES,
  UNITS,
  LESSONS,
  LESSON_EMOJIS,
} from '../../utils/constants';

const ManageLessonsPage = () => {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeLesson, setActiveLesson] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadLessons = async () => {
    try {
      const data = await getLessons({});
      setLessons(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const handleDelete = async (lesson) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      await deleteLesson(lesson.id);
      toast.success('Deleted');
      setLessons((prev) => prev.filter((l) => l.id !== lesson.id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const isValidUrl = (url) => {
    try {
      const u = new URL(url);
      return u.protocol === 'https:' || u.protocol === 'http:';
    } catch {
      return false;
    }
  };

  const handleEditSave = async () => {
    if (!editingLesson) return;

    if (!editingLesson.fileUrl || !isValidUrl(editingLesson.fileUrl)) {
      toast.error('Please enter a valid URL');
      return;
    }

    if (!editingLesson.title) {
      toast.error('Title is required');
      return;
    }

    setSaving(true);
    try {
      // Build the update object based on section
      const updates = {
        section: editingLesson.section,
        title: editingLesson.title,
        titleAr: editingLesson.titleAr || '',
        description: editingLesson.description || '',
        thumbnail: editingLesson.thumbnail || '📚',
        fileUrl: editingLesson.fileUrl,
      };

      // Section-specific fields
      if (editingLesson.section === SECTIONS.PALBOOK) {
        updates.grade = editingLesson.grade;
        updates.unit = editingLesson.unit;
        updates.lesson = editingLesson.lesson;
        updates.subsection = null;
      } else if (editingLesson.section === SECTIONS.GENERAL) {
        updates.subsection = editingLesson.subsection;
        updates.grade = null;
        updates.unit = null;
        updates.lesson = null;
      } else {
        // Games
        updates.grade = null;
        updates.unit = null;
        updates.lesson = null;
        updates.subsection = null;
      }

      await updateLesson(editingLesson.id, updates);
      toast.success('Updated successfully!');
      setLessons((prev) =>
        prev.map((l) => (l.id === editingLesson.id ? { ...l, ...updates } : l))
      );
      setEditingLesson(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = lessons.filter((l) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      l.title?.toLowerCase().includes(term) ||
      l.titleAr?.includes(search);
    const matchesFilter = filter === 'all' || l.section === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-extrabold gradient-text">
            My Lessons
          </h1>
          <p className="text-sm text-slate-500">
            Manage all your content • by T. Wad Refae
          </p>
        </div>
        <Link to="/teacher/upload" className="btn-primary">
          <FiPlus /> Add New
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="input ps-12"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { v: 'all', label: 'All', emoji: '🌟' },
            { v: 'palbook', label: 'PalBook', emoji: '🇵🇸' },
            { v: 'general', label: 'General', emoji: '✨' },
            { v: 'games', label: 'Games', emoji: '🎮' },
          ].map((f) => (
            <button
              key={f.v}
              onClick={() => setFilter(f.v)}
              className={`px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
                filter === f.v
                  ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-kid'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700'
              }`}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState
          emoji="📭"
          title="No items yet"
          message="Start by adding your first lesson or game!"
          action={
            <Link to="/teacher/upload" className="btn-primary">
              <FiPlus /> Add New
            </Link>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l, i) => (
            <LessonCard
              key={l.id}
              lesson={l}
              index={i}
              onOpen={setActiveLesson}
              onEdit={setEditingLesson}
              onDelete={handleDelete}
              showActions
            />
          ))}
        </div>
      )}

      {activeLesson && (
        <LessonViewer lesson={activeLesson} onClose={() => setActiveLesson(null)} />
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditingLesson(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold gradient-text">
                  Edit {editingLesson.section === 'games' ? 'Game' : 'Lesson'}
                </h2>
                <button
                  onClick={() => setEditingLesson(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                >
                  <FiX />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Section */}
                <div>
                  <label className="label">Section</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: SECTIONS.PALBOOK, label: 'PalBook', emoji: '🇵🇸' },
                      { v: SECTIONS.GENERAL, label: 'General', emoji: '✨' },
                      { v: SECTIONS.GAMES, label: 'Games', emoji: '🎮' },
                    ].map((s) => (
                      <button
                        key={s.v}
                        type="button"
                        onClick={() => setEditingLesson({ ...editingLesson, section: s.v })}
                        className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${
                          editingLesson.section === s.v
                            ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-kid'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="text-2xl mb-1">{s.emoji}</div>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PalBook fields */}
                {editingLesson.section === SECTIONS.PALBOOK && (
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="label">Grade</label>
                      <select
                        value={editingLesson.grade || 5}
                        onChange={(e) => setEditingLesson({ ...editingLesson, grade: Number(e.target.value) })}
                        className="input"
                      >
                        {GRADES.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Unit</label>
                      <select
                        value={editingLesson.unit || 1}
                        onChange={(e) => setEditingLesson({ ...editingLesson, unit: Number(e.target.value) })}
                        className="input"
                      >
                        {UNITS.map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Lesson</label>
                      <select
                        value={editingLesson.lesson || 1}
                        onChange={(e) => setEditingLesson({ ...editingLesson, lesson: Number(e.target.value) })}
                        className="input"
                      >
                        {LESSONS.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* General subsection */}
                {editingLesson.section === SECTIONS.GENERAL && (
                  <div>
                    <label className="label">Sub-section</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { v: GENERAL_SUBSECTIONS.GRAMMAR, label: 'Grammar', emoji: '📝' },
                        { v: GENERAL_SUBSECTIONS.PRONUNCIATION, label: 'Pronunciation', emoji: '🗣️' },
                        { v: GENERAL_SUBSECTIONS.READING, label: 'Reading', emoji: '📖' },
                      ].map((s) => (
                        <button
                          key={s.v}
                          type="button"
                          onClick={() => setEditingLesson({ ...editingLesson, subsection: s.v })}
                          className={`p-2 rounded-xl border-2 font-bold text-xs transition-all ${
                            editingLesson.subsection === s.v
                              ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                              : 'border-slate-200'
                          }`}
                        >
                          <div className="text-xl mb-1">{s.emoji}</div>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Title */}
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="label">Title (EN)</label>
                    <input
                      value={editingLesson.title || ''}
                      onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                      className="input"
                      placeholder="Title in English"
                    />
                  </div>
                  <div>
                    <label className="label">Title (AR)</label>
                    <input
                      value={editingLesson.titleAr || ''}
                      onChange={(e) => setEditingLesson({ ...editingLesson, titleAr: e.target.value })}
                      className="input"
                      placeholder="العنوان بالعربي"
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="label">Description</label>
                  <textarea
                    value={editingLesson.description || ''}
                    onChange={(e) => setEditingLesson({ ...editingLesson, description: e.target.value })}
                    rows={3}
                    className="input"
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
                        onClick={() => setEditingLesson({ ...editingLesson, thumbnail: e })}
                        className={`w-10 h-10 rounded-xl text-xl transition-all ${
                          editingLesson.thumbnail === e
                            ? 'bg-gradient-pal scale-110 shadow-kid'
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                {/* URL */}
                <div>
                  <label className="label flex items-center gap-2">
                    <FiLink className="text-primary-500" />
                    URL (from GitHub Pages)
                  </label>
                  <input
                    type="url"
                    value={editingLesson.fileUrl || ''}
                    onChange={(e) => setEditingLesson({ ...editingLesson, fileUrl: e.target.value })}
                    className="input font-mono text-sm"
                    placeholder="https://t-wadrefae.github.io/palbook-lessons/..."
                    dir="ltr"
                  />

                  {editingLesson.fileUrl && isValidUrl(editingLesson.fileUrl) && (
                     <a
                      href={editingLesson.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm text-secondary-600 hover:underline font-semibold"
                    >
                      <FiCheck /> Preview in new tab <FiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4 flex gap-2">
                <button
                  onClick={() => setEditingLesson(null)}
                  className="btn-outline flex-1"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="btn-primary flex-1"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ManageLessonsPage;