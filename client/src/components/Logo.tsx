interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8" }: LogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" className={className} style={{ direction: 'ltr' }}>
      <defs>
        {/* Gradient flows top-left → bottom-right across the full "Terra" word */}
        <linearGradient id="logo-terra-grad" x1="0" y1="0" x2="52" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#1A6B30" />
        </linearGradient>
        <style>
          {`
            @font-face {
              font-family: 'Asimovian';
              src: url('/fonts/Asimovian-Regular.woff2') format('woff2');
            }
            .font-bold-main {
              font-family: Arial, sans-serif;
              font-weight: bold;
            }
            .font-asimovian {
              font-family: 'Asimovian', sans-serif;
            }
            .color-bt {
              fill: hsl(var(--trust));
            }
          `}
        </style>
      </defs>

      <text x="0" y="16" fontSize="20" letterSpacing="-0.5">
        <tspan className="font-bold-main" fill="url(#logo-terra-grad)">T</tspan>
        <tspan className="font-asimovian" fill="url(#logo-terra-grad)">erra</tspan>
        <tspan className="font-asimovian color-bt">B</tspan>
        <tspan className="font-bold-main color-bt">T</tspan>
      </text>

    </svg>
  );
}
