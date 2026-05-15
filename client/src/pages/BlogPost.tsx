import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Clock } from "lucide-react";
import { Link } from "wouter";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface BlogPostProps {
  title: string;
  category: string;
  readTime: string;
  image: string;
  content: JSX.Element;
  seoDescription: string;
  path: string;
  backTo?: string;
  backToLabel?: string;
}

export default function BlogPost({
  title,
  category,
  readTime,
  image,
  content,
  seoDescription,
  path,
  backTo,
  backToLabel,
}: BlogPostProps) {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF" }}>
      <SEOHead
        title={`${title} - TerraBT Blog`}
        description={seoDescription}
        path={path}
      />
      <Navigation />

      <article style={{ paddingTop: "48px", paddingBottom: "80px", flex: 1 }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 24px" }}>

          {/* Back link */}
          <Link href={getLocalizedPath(backTo ?? "/")}>
            <a
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#3A9A6A", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", marginBottom: "32px" }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
              data-testid="button-back"
            >
              ← {backToLabel ?? t("common.backToHome")}
            </a>
          </Link>

          {/* Category badge */}
          <div style={{ marginBottom: "16px" }}>
            <span style={{
              display: "inline-block",
              backgroundColor: "rgba(58,154,106,0.1)",
              color: "#2D7A53",
              border: "1px solid rgba(58,154,106,0.25)",
              borderRadius: "100px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "3px 12px",
            }}>
              {category}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ color: "#0F172A", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px", wordBreak: "break-word" }}>
            {title}
          </h1>

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94A3B8", fontSize: "0.875rem", marginBottom: "32px" }}>
            <Clock style={{ width: 14, height: 14 }} />
            <span>{readTime}</span>
          </div>

          {/* Hero image */}
          <div style={{ aspectRatio: "16/9", overflow: "hidden", borderRadius: "12px", marginBottom: "48px" }}>
            <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Content — blog-light-content overrides dark-mode Tailwind CSS vars */}
          <div className="blog-light-content">
            {content}
          </div>

        </div>
      </article>

      <Footer />
    </div>
  );
}
