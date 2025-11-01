import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ExpertiseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ExpertiseCard({
  icon: Icon,
  title,
  description,
}: ExpertiseCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-300" data-testid={`card-expertise-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="space-y-4">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
