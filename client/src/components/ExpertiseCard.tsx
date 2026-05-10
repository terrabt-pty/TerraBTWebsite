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
      <Card
        className="p-6 active-elevate-2 cursor-pointer group transition-all duration-300"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.06)";
          el.style.borderColor = "#CBD5E1";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "";
          el.style.boxShadow = "";
          el.style.borderColor = "#E2E8F0";
        }}
        data-testid={`card-expertise-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="space-y-4">
          <div
            className="h-12 w-12 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(76, 175, 80, 0.1)" }}
          >
            <Icon className="h-6 w-6" style={{ color: "#3A9A6A" }} />
          </div>
          <h3 className="text-xl font-semibold flex items-start justify-between gap-2" style={{ color: "#0F172A" }}>
            <span className="break-words">{title}</span>
            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" style={{ color: "#3A9A6A" }} />
          </h3>
          <p className="leading-relaxed" style={{ color: "#475569" }}>{description}</p>
        </div>
      </Card>
    </Link>
  );
}
