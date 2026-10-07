// Creative Commons BY-NC-ND badge: the CC, BY (attribution), NC (non-commercial) and
// ND (no derivatives) marks as small inline SVGs, so they work offline and in the
// dark footer (they follow `currentColor`). The whole badge links to the licence deed.
// Drawn locally — swap in the official files from creativecommons.org if preferred.
const ICON = 'h-[1.35em] w-[1.35em] shrink-0';

const Circle = () => (
  <circle cx="8" cy="8" r="7.1" fill="none" stroke="currentColor" strokeWidth="1.1" />
);

const CCBadge = ({ className = '' }) => (
  <a
    href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
    target="_blank"
    rel="license noopener noreferrer"
    aria-label="Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International"
    title="Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International"
    className={`inline-flex items-center gap-1 hover:text-accent-400 transition-colors ${className}`}
    dir="ltr"
  >
    {/* CC */}
    <svg viewBox="0 0 16 16" className={ICON} aria-hidden="true">
      <Circle />
      <text
        x="8"
        y="10.9"
        textAnchor="middle"
        fontSize="8"
        fontWeight="800"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="currentColor"
      >
        cc
      </text>
    </svg>
    {/* BY — attribution */}
    <svg viewBox="0 0 16 16" className={ICON} aria-hidden="true">
      <Circle />
      <circle cx="8" cy="4.9" r="1.45" fill="currentColor" />
      <path d="M5.4 7.1h5.2v3.3H9.3v2.5H6.7v-2.5H5.4z" fill="currentColor" />
    </svg>
    {/* NC — non-commercial */}
    <svg viewBox="0 0 16 16" className={ICON} aria-hidden="true">
      <Circle />
      <text
        x="8"
        y="11"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="800"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="currentColor"
      >
        $
      </text>
      <line x1="3.6" y1="12.4" x2="12.4" y2="3.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
    {/* ND — no derivatives */}
    <svg viewBox="0 0 16 16" className={ICON} aria-hidden="true">
      <Circle />
      <rect x="4.4" y="5.5" width="7.2" height="1.7" fill="currentColor" />
      <rect x="4.4" y="8.8" width="7.2" height="1.7" fill="currentColor" />
    </svg>
  </a>
);

export default CCBadge;
