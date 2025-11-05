import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative"
      data-testid="button-language-toggle"
      title={i18n.language === 'en' ? 'Switch to Japanese' : '日本語から英語へ'}
    >
      <Globe className="h-5 w-5" />
      <span className="absolute bottom-1 right-1 text-[8px] font-bold">
        {i18n.language === 'en' ? 'EN' : 'JA'}
      </span>
    </Button>
  );
}
