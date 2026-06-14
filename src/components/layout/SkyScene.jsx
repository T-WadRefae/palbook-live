// Fixed site backdrop: blue sky + white clouds + green hills (night sky + moon in dark mode).
// Colors are driven by CSS variables defined in src/styles/index.css so it recolors with the theme.
const SkyScene = () => (
  <div className="sky-scene" aria-hidden="true">
    <div className="sky" />
    <div className="stars" />
    <div className="orb sun" />
    <div className="orb moon" />
    <div className="cloud c1" />
    <div className="cloud c2" />
    <div className="cloud c3" />
    <div className="cloud c4" />
    <div className="hills">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="var(--hill-far)" d="M0,210 C240,140 480,150 720,190 C960,230 1200,170 1440,200 L1440,320 L0,320 Z" />
        <path fill="var(--hill-mid)" d="M0,250 C260,200 520,260 780,240 C1040,220 1240,270 1440,245 L1440,320 L0,320 Z" />
        <path fill="var(--hill-near)" d="M0,290 C300,255 600,300 900,285 C1140,273 1300,300 1440,288 L1440,320 L0,320 Z" />
      </svg>
    </div>
  </div>
);

export default SkyScene;
