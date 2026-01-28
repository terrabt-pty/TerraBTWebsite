interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8" }: LogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 28" className={className}>
      <defs>
        <style>
          {`
            @font-face {
              font-family: 'Asimovian';
              src: url('/fonts/Asimovian-Regular.woff2') format('woff2');
            }
            .terra-text {
              fill: hsl(var(--primary));
              font-family: Arial, sans-serif;
              font-weight: bold;
            }
            .bt-text {
              fill: hsl(var(--trust));
              font-family: 'Asimovian', sans-serif;
              font-weight: bold;
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
        <tspan className="terra-text">Terra</tspan>
        <tspan className="bt-text">BT</tspan>
      </text>

      <text x="32" y="25" fontSize="6" className="tagline" textAnchor="middle">SAP BTP Consulting</text>
    </svg>
  );
}
