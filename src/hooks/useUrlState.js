import { useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const clean = (obj) => {
  const out = {};
  Object.entries(obj || {}).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== '') out[k] = String(v);
  });
  return out;
};

/**
 * Keeps a page's drill-down position (grade / unit / open lesson) in the URL
 * query string, so every step becomes its own browser-history entry.
 *
 * The device Back button then walks back one step at a time —
 * lesson → unit → grade → home — instead of jumping straight out of the
 * section and back to the home page. It also makes every view linkable.
 */
export default function useUrlState() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Move forward one step: adds a history entry the Back button can undo.
  const push = useCallback((next) => setParams(clean(next)), [setParams]);

  // Move back one step. When this page is the first entry of the session
  // (someone opened a deep link straight into a lesson) there is nothing to
  // go back to, so we rewrite the current entry instead of bouncing the
  // student out of the site.
  const back = useCallback(
    (fallback) => {
      if (location.key !== 'default') {
        navigate(-1);
        return;
      }
      setParams(clean(fallback), { replace: true });
    },
    [location.key, navigate, setParams]
  );

  return { params, push, back };
}
