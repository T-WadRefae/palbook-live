import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import LessonCard from '../../components/common/LessonCard';
import LessonViewer from '../../components/common/LessonViewer';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getLessons, deleteLesson, updateLesson } from '../../firebase/lessons';
import { deleteLessonFile } from '../../firebase/storage';
import { LESSON_EMOJIS } from '../../utils/constants';

const ManageLessonsPage = () => {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeLesson, setActiveLesson] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);

  const loadLessons = async () => {
    try {
      const data = await getLessons({});
      setLessons(data);
    } catch (err) {
      console.error(err);
      toast.error(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const handleDelete = async (lesson) => {
    if (!window.confirm(t('upload.confirmDelete'))) return;
    try {
      await deleteLesson(lesson.id);
      if (lesson.filePath) {
        try {
          await deleteLessonFile(lesson.filePath);
        } catch (e) {
          // file may not exist anymore
        }
      }
      toast.success(t('upload.deleteSuccess'));
      setLessons((prev) => prev.filter((l) => l.id !== lesson.id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditSave = async () => {
    if (!editingLesson) return;
    try {
      await updateLesson(editingLesson.id, {
        title: editingLesson.title,
        titleAr: editingLesson.titleAr,
        description: editingLesson.description,
        thumbnail: editingLesson.thumbnail,
      });
      toast.success(t('upload.updateSuccess'));
      setLessons((prev) =>
        prev.map((l) => (l.id === editingLesson.id ? editingLesson : l))
      );
      setEditingLesson(null);
    } catch (err) {
      toast.error(err.message);
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
            {t('dashboard.myLessons')}
          </h1>
          <p className="text-sm text-slate-500">
            Manage all your lessons • by T. Wad Refae
          </p>
        </div>
        <Link to="/teacher/upload" className="btn-primary">
          <FiPlus /> {t('dashboard.uploadLesson')}
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('common.search')}
            className="input ps-12"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'palbook', 'general'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-kid'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700'
              }`}
            >
              {f === 'all' ? t('common.all') : f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState
          emoji="📭"
          title="No lessons yet"
          message="Upload your first lesson to get started!"
          action={
            <Link to="/teacher/upload" className="btn-primary">
              <FiPlus /> {t('dashboard.uploadLesson')}
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

      {/* Edit modal */}
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
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold gradient-text">
                  {t('upload.edit')} Lesson
                </h2>
                <button
                  onClick={() => setEditingLesson(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label">{t('upload.lessonTitle')}</label>
                  <input
                    value={editingLesson.title || ''}
                    onChange={(e) =>
                      setEditingLesson({ ...editingLesson, title: e.target.value })
                    }
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">{t('upload.lessonTitleAr')}</label>
                  <input
                    value={editingLesson.titleAr || ''}
                    onChange={(e) =>
                      setEditingLesson({ ...editingLesson, titleAr: e.target.value })
                    }
                    className="input"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="label">{t('upload.description')}</label>
                  <textarea
                    value={editingLesson.description || ''}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">{t('upload.thumbnail')}</label>
                  <div className="flex flex-wrap gap-2">
                    {LESSON_EMOJIS.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() =>
                          setEditingLesson({ ...editingLesson, thumbnail: e })
                        }
                        className={`w-10 h-10 rounded-xl text-xl transition-all ${
                          editingLesson.thumbnail === e
                            ? 'bg-gradient-pal scale-110'
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setEditingLesson(null)}
                    className="btn-outline flex-1"
                  >
                    {t('common.cancel')}
                  </button>
                  <button onClick={handleEditSave} className="btn-primary flex-1">
                    <FiSave /> {t('common.save')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ManageLessonsPage;
