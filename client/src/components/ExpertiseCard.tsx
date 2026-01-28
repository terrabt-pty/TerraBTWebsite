import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface ExpertiseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function ExpertiseCard({
  icon: Icon,
  title,
  description,
  href,
}: ExpertiseCardProps) {
  const { getLocalizedPath } = useLocalizedPath();
  const localizedHref = getLocalizedPath(href);

  return (
    <Link href={localizedHref}>
      <Card className="p-6 hover-elevate active-elevate-2 transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary cursor-pointer group" data-testid={`card-expertise-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="space-y-4">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/15 to-trust/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground flex items-start justify-between gap-2">
            <span className="break-words">{title}</span>
            <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
          </h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </Card>
    </Link>
  );
}
