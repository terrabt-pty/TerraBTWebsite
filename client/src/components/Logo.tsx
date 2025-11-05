interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8" }: LogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" className={className}>
      <defs>
        <style>
          {`
            @font-face {
              font-family: 'Asimovian';
              src: url('/fonts/Asimovian-Regular.woff2') format('woff2');
            }
            .green-text {
              fill: #5AC765;
              font-family: Arial, sans-serif;
              font-weight: bold;
            }
            .gray-text {
              fill: #999999;
              font-family: 'Asimovian', sans-serif;
            }
          `}
        </style>
      </defs>
      
      <text x="0" y="16" fontSize="20" letterSpacing="-0.5">
        <tspan className="green-text">T</tspan>
        <tspan className="gray-text">erra</tspan>
        <tspan className="gray-text">B</tspan>
        <tspan className="green-text">T</tspan>
      </text>
    </svg>
  );
}
