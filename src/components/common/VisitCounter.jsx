import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEye } from 'react-icons/fi';

// Counts once per browser session: the first load of a session increments the
// site-wide total (POST), later loads only read it (GET). Renders nothing until
// a real number arrives, and nothing if the request fails — so the footer never
// shows a broken or zero counter to visitors.
const SESSION_FLAG = 'palbook-visit-counted';

const VisitCounter = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [count, setCount] = useState(null);

  useEffect(() => {
    let alreadyCounted = false;
    try {
      alreadyCounted = sessionStorage.getItem(SESSION_FLAG) === '1';
      // Set the flag before the request so a double effect (React StrictMode)
      // or a quick reload doesn't count the same session twice.
      if (!alreadyCounted) sessionStorage.setItem(SESSION_FLAG, '1');
    } catch {
      /* storage blocked (private mode) — fall back to a plain read */
      alreadyCounted = true;
    }

    let cancelled = false;
    fetch('/api/views', { method: alreadyCounted ? 'GET' : 'POST' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.count === 'number') setCount(data.count);
      })
      .catch(() => {
        /* counter unavailable — stay hidden */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  const label = isAr ? 'زيارة' : 'visits';
  const formatted = new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US').format(count);

  return (
    <p
      className="flex items-center gap-1.5 text-slate-400"
      title={isAr ? 'إجمالي زيارات الموقع' : 'Total site visits'}
    >
      <FiEye className="text-accent-400" aria-hidden="true" />
      <span className="font-bold text-slate-200 tabular-nums">{formatted}</span>
      <span>{label}</span>
    </p>
  );
};

export default VisitCounter;
