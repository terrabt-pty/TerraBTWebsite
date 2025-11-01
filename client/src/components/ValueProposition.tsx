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
        <div className="inline-block px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-primary font-semibold text-sm">{badge}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground/90">{point}</span>
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
