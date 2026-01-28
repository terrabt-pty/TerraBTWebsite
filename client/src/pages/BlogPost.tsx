import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "wouter";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

interface BlogPostProps {
  title: string;
  category: string;
  readTime: string;
  image: string;
  content: JSX.Element;
  seoDescription: string;
}

export default function BlogPost({
  title,
  category,
  readTime,
  image,
  content,
  seoDescription,
}: BlogPostProps) {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${title} - TerraBT Blog`}
        description={seoDescription}
      />
      <Navigation />

      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={getLocalizedPath("/")}>
            <Button variant="ghost" className="mb-8 hover-elevate" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("blogs.backToHome")}
            </Button>
          </Link>

          <Badge className="mb-4">{category}</Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground break-words">
            {title}
          </h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          </div>

          <div className="aspect-video overflow-hidden rounded-xl mb-12">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {content}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
