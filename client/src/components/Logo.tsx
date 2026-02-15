interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8" }: LogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 28" className={className} style={{ direction: 'ltr' }}>
      <defs>
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
            .color-terra {
              fill: hsl(var(--primary));
            }
            .color-bt {
              fill: hsl(var(--trust));
            }
            .tagline {
              fill: hsl(var(--muted-foreground));
              font-family: Arial, sans-serif;
              letter-spacing: 0.3;
            }
          `}
        </style>
      </defs>

      <text x="0" y="16" fontSize="20" letterSpacing="-0.5">
        <tspan className="font-bold-main color-terra">T</tspan>
        <tspan className="font-asimovian color-terra">erra</tspan>
        <tspan className="font-asimovian color-bt">B</tspan>
        <tspan className="font-bold-main color-bt">T</tspan>
      </text>

      <text x="32" y="25" fontSize="6" className="tagline" textAnchor="middle">SAP BTP Consulting</text>
    </svg>
  );
}
