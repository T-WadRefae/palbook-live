/**
 * Shuffle array (Fisher-Yates)
 */
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = date.toDate ? date.toDate() : new Date(date);
  return d.toLocaleDateString();
};

/**
 * Validate file is HTML
 */
export const isHtmlFile = (file) => {
  if (!file) return false;
  const validTypes = ['text/html'];
  const validExt = /\.(html|htm)$/i;
  return validTypes.includes(file.type) || validExt.test(file.name);
};

/**
 * Friendly file size
 */
export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Calculate progress percentage
 */
export const calcProgress = (progress = {}) => {
  const total = Object.keys(progress).length;
  if (total === 0) return 0;
  const done = Object.values(progress).filter((p) => p.completed).length;
  return Math.round((done / total) * 100);
};

/**
 * Generate achievement badges based on points
 */
export const getAchievements = (points = 0) => {
  const all = [
    { id: 'starter', title: 'Starter', icon: '🌱', threshold: 10 },
    { id: 'learner', title: 'Eager Learner', icon: '📖', threshold: 50 },
    { id: 'rising', title: 'Rising Star', icon: '⭐', threshold: 100 },
    { id: 'champion', title: 'Champion', icon: '🏆', threshold: 250 },
    { id: 'master', title: 'English Master', icon: '👑', threshold: 500 },
    { id: 'legend', title: 'Palestine Legend', icon: '🇵🇸', threshold: 1000 },
  ];
  return all.map((a) => ({ ...a, unlocked: points >= a.threshold }));
};
