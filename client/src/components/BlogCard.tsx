import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
}

export default function BlogCard({
  image,
  category,
  title,
  excerpt,
  readTime,
}: BlogCardProps) {
  const { t } = useTranslation();
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 group" data-testid={`card-blog-${title.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}`}>
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-4">
        <Badge variant="secondary" className="text-xs font-semibold">
          {category}
        </Badge>
        <h3 className="text-xl font-semibold text-foreground line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{readTime} read</span>
          </div>
          <button
            className="flex items-center gap-1 text-primary font-medium text-sm hover-elevate px-3 py-2 rounded-md transition-all"
            onClick={() => console.log(`Read more: ${title}`)}
            data-testid="button-read-more"
          >
            {t('knowledge.readMore')}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
