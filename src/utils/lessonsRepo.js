// Discovers lesson files pushed to the palbook-lessons GitHub repo (served on
// GitHub Pages), so a plain `git push` is enough for a lesson to reach the site.
// Source order: manifest.json on GitHub Pages (no rate limits, auto-rebuilt by a
// workflow in that repo) -> GitHub API tree as fallback. Results are cached in
// localStorage and merged with the Firestore registry by getMergedLessons.

export const LESSONS_PAGES_BASE = 'https://t-wadrefae.github.io/palbook-lessons/';
const MANIFEST_URL = `${LESSONS_PAGES_BASE}manifest.json`;
const TREE_API_URL =
  'https://api.github.com/repos/t-wadrefae/palbook-lessons/git/trees/main?recursive=1';
const CACHE_KEY = 'palbook-lessons-manifest-v1';
const CACHE_TTL_MS = 15 * 60 * 1000;

// grade5/unit2p3.html -> PalBook Live lesson: grade 5, unit 2, lesson 3
const PALBOOK_FILE_RE = /^grade(\d+)\/unit(\d+)p(\d+)\.html$/i;

// Repo folders that map to the other site sections. These surface in the
// teacher dashboard for one-click registration.
const FOLDER_SECTIONS = {
  games: { section: 'games' },
  grammar: { section: 'general', subsection: 'grammar' },
  reading: { section: 'general', subsection: 'reading' },
  writing: { section: 'general', subsection: 'writing' },
  phonics: { section: 'general', subsection: 'pronunciation' },
};

const titleFromFilename = (name) =>
  name
    .replace(/\.html$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

// "Grade 5 · Unit 2 · Period 1 — Our Country" -> "Our Country"
const friendlyPalbookTitle = (raw) => {
  if (!raw) return '';
  const parts = raw.split(/[—|]/);
  const last = parts[parts.length - 1].trim();
  return parts.length > 1 && last ? last : raw.trim();
};

export const parseRepoFile = ({ path, title = '' }) => {
  if (!path || !/\.html$/i.test(path) || /(^|\/)index\.html$/i.test(path)) return null;

  const fileUrl = LESSONS_PAGES_BASE + path.split('/').map(encodeURIComponent).join('/');
  const id = `gh-${path.replace(/[^\w.-]+/g, '_')}`;

  const pal = path.match(PALBOOK_FILE_RE);
  if (pal) {
    const unit = Number(pal[2]);
    const lesson = Number(pal[3]);
    return {
      id,
      section: 'palbook',
      grade: Number(pal[1]),
      unit,
      lesson,
      title: friendlyPalbookTitle(title) || `Unit ${unit} · Lesson ${lesson}`,
      titleAr: '',
      description: title.trim(),
      views: 0,
      fileUrl,
      discovered: true,
    };
  }

  const segments = path.split('/');
  const mapped = FOLDER_SECTIONS[segments[0].toLowerCase()];
  if (!mapped || segments.length !== 2) return null;

  return {
    id,
    section: mapped.section,
    ...(mapped.subsection ? { subsection: mapped.subsection } : {}),
    title: title.trim() || titleFromFilename(segments[1]),
    titleAr: '',
    description: '',
    views: 0,
    fileUrl,
    discovered: true,
  };
};

const readCache = () => {
  try {
    const raw = globalThis.localStorage?.getItem(CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed?.files) ? parsed : null;
  } catch {
    return null;
  }
};

const writeCache = (files) => {
  try {
    globalThis.localStorage?.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), files }));
  } catch {
    /* cache is best-effort */
  }
};

const fetchManifest = async () => {
  const res = await fetch(MANIFEST_URL);
  if (!res.ok) throw new Error(`manifest ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data?.files)) throw new Error('bad manifest');
  return data.files.map(({ path, title }) => ({ path, title: title || '' }));
};

const fetchTree = async () => {
  const res = await fetch(TREE_API_URL);
  if (!res.ok) throw new Error(`tree ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data?.tree)) throw new Error('bad tree');
  return data.tree
    .filter((n) => n.type === 'blob' && /\.html$/i.test(n.path))
    .map((n) => ({ path: n.path, title: '' }));
};

const loadFiles = async (force) => {
  const cached = readCache();
  if (!force && cached && Date.now() - cached.ts < CACHE_TTL_MS) return cached.files;
  try {
    const files = await fetchManifest();
    writeCache(files);
    return files;
  } catch {
    try {
      const files = await fetchTree();
      writeCache(files);
      return files;
    } catch (err) {
      if (cached) return cached.files; // stale beats nothing
      throw err;
    }
  }
};

let inflight = null;

// Resolves to [] on total failure so callers can always merge safely.
export const fetchRepoLessons = async ({ force = false } = {}) => {
  if (force || !inflight) {
    inflight = loadFiles(force)
      .then((files) => files.map(parseRepoFile).filter(Boolean))
      .catch(() => []);
  }
  return inflight;
};
