import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useState } from "react";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  slug: string;
}

export default function BlogCard({
  image,
  category,
  title,
  excerpt,
  readTime,
  slug,
}: BlogCardProps) {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={getLocalizedPath(`/blog/${slug}`)}
      className="block overflow-hidden transition-all duration-300 group"
      style={{
        background: "#FFFFFF",
        border: hovered ? "1px solid #CBD5E1" : "1px solid #E2E8F0",
        borderRadius: "12px",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(0, 0, 0, 0.06)" : "none",
        textDecoration: "none",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`card-blog-${title.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}`}
    >
      <div className="aspect-video overflow-hidden" style={{ borderRadius: "12px 12px 0 0" }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-4">
        <span
          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(76, 175, 80, 0.1)",
            color: "#3A9A6A",
          }}
        >
          {category}
        </span>
        <h3 className="text-xl font-semibold line-clamp-2" style={{ color: "#0F172A" }}>
          {title}
        </h3>
        <p className="text-sm line-clamp-3" style={{ color: "#475569", lineHeight: "1.65" }}>
          {excerpt}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm" style={{ color: "#94A3B8" }}>
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
          <span
            className="flex items-center gap-1 font-medium text-sm px-3 py-2 rounded-md transition-all"
            style={{ color: hovered ? "#2D7A53" : "#3A9A6A" }}
            data-testid="button-read-more"
          >
            {t('knowledge.readMore')}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
