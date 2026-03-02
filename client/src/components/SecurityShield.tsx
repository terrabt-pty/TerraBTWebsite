export default function SecurityShield({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Main body gradient — teal-green → blue → dark navy, matching the BTP xID icon */}
        <linearGradient id="ss-body" x1="20" y1="0" x2="140" y2="188" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#2D8B7A" />
          <stop offset="38%"  stopColor="#1E5099" />
          <stop offset="100%" stopColor="#080E24" />
        </linearGradient>

        {/* Glass gloss — top-left highlight, same as the icon's corner shine */}
        <radialGradient id="ss-gloss" cx="32%" cy="22%" r="52%" fx="25%" fy="15%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.36)" />
          <stop offset="45%"  stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Edge rim gradient — green at top, fading to subtle blue */}
        <linearGradient id="ss-rim" x1="0" y1="0" x2="160" y2="188" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgba(76,175,80,0.7)" />
          <stop offset="45%"  stopColor="rgba(30,80,153,0.5)" />
          <stop offset="100%" stopColor="rgba(76,175,80,0.2)" />
        </linearGradient>

        {/* Inner icon fill — light/white semi-transparent, same treatment as the cross in the BTP xID icon */}
        <linearGradient id="ss-icon" x1="65" y1="80" x2="95" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgba(235,242,255,0.95)" />
          <stop offset="100%" stopColor="rgba(180,210,255,0.75)" />
        </linearGradient>

        {/* Drop shadow + green atmospheric glow */}
        <filter id="ss-shadow" x="-30%" y="-20%" width="160%" height="155%">
          <feDropShadow dx="0" dy="14" stdDeviation="20" floodColor="#000000" floodOpacity="0.55" />
          <feDropShadow dx="0" dy="0"  stdDeviation="10" floodColor="#2D8B7A" floodOpacity="0.25" />
        </filter>

        {/* Soft inner glow behind lock icon */}
        <radialGradient id="ss-inner-glow" cx="50%" cy="60%" r="35%">
          <stop offset="0%"   stopColor="rgba(76,175,80,0.18)" />
          <stop offset="100%" stopColor="rgba(76,175,80,0)" />
        </radialGradient>
      </defs>

      {/* ── Outer atmospheric halo ── */}
      <path
        d="M80 4 L155 28 L155 96 Q155 154 80 182 Q5 154 5 96 L5 28 Z"
        fill="rgba(45,139,122,0.12)"
        filter="url(#ss-shadow)"
      />

      {/* ── Shield body ── */}
      <path
        d="M80 10 L150 32 L150 96 Q150 150 80 176 Q10 150 10 96 L10 32 Z"
        fill="url(#ss-body)"
      />

      {/* ── Colored rim (border) ── */}
      <path
        d="M80 10 L150 32 L150 96 Q150 150 80 176 Q10 150 10 96 L10 32 Z"
        fill="none"
        stroke="url(#ss-rim)"
        strokeWidth="1.5"
      />

      {/* ── Inner bevel ── */}
      <path
        d="M80 20 L140 39 L140 96 Q140 142 80 164 Q20 142 20 96 L20 39 Z"
        fill="none"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1"
      />

      {/* ── Soft inner glow behind icon ── */}
      <path
        d="M80 20 L140 39 L140 96 Q140 142 80 164 Q20 142 20 96 L20 39 Z"
        fill="url(#ss-inner-glow)"
      />

      {/* ── Glass gloss (top-left shine, matching the BTP xID icon) ── */}
      <path
        d="M80 10 L150 32 L150 72 Q115 64 80 62 Q45 64 10 72 L10 32 Z"
        fill="url(#ss-gloss)"
      />

      {/* ── Left edge shine ── */}
      <path
        d="M10 32 L10 96 Q10 118 22 136"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Lock shackle ── */}
      <path
        d="M54 92 L54 75 Q54 58 80 58 Q106 58 106 75 L106 92"
        stroke="url(#ss-icon)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* ── Lock body ── */}
      <rect x="46" y="89" width="68" height="50" rx="9" fill="url(#ss-icon)" />

      {/* ── Keyhole ── */}
      <circle cx="80" cy="108" r="7" fill="rgba(20,40,90,0.55)" />
      <rect x="76.5" y="108" width="7" height="14" rx="3.5" fill="rgba(20,40,90,0.55)" />
    </svg>
  );
}
