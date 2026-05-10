import { Check } from "lucide-react";

interface ValuePropositionProps {
  image: string;
  badge: string;
  title: string;
  description: string;
  points: string[];
  imageOnRight?: boolean;
}

export default function ValueProposition({
  image,
  badge,
  title,
  description,
  points,
  imageOnRight = false,
}: ValuePropositionProps) {
  return (
    <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${imageOnRight ? 'md:grid-flow-dense' : ''}`}>
      <div className={`space-y-6 ${imageOnRight ? 'md:col-start-1' : ''}`}>
        <div className="inline-block px-4 py-2 rounded-lg border" style={{ background: "rgba(76, 175, 80, 0.1)", borderColor: "rgba(76, 175, 80, 0.2)" }}>
          <span className="font-semibold text-sm" style={{ color: "#3A9A6A" }}>{badge}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#0F172A" }}>
          {title}
        </h2>
        <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
          {description}
        </p>
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(76, 175, 80, 0.1)" }}>
                <Check className="h-4 w-4" style={{ color: "#3A9A6A" }} />
              </div>
              <span style={{ color: "#475569" }}>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${imageOnRight ? 'md:col-start-2 md:row-start-1' : ''}`}>
        <div className="rounded-xl overflow-hidden border">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
