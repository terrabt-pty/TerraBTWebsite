import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { SUPPORTED_LANGUAGES, getLanguageByCode } from "@/config/languages";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [location, setLocation] = useLocation();

  const handleLanguageChange = (newLang: string) => {
    const currentLang = i18n.language;
    
    if (currentLang === newLang) return;
    
    let currentPath = location;
    const currentPrefix = SUPPORTED_LANGUAGES.find(lang => 
      currentPath.startsWith(`/${lang.code}`) && lang.code !== 'en'
    );
    
    if (currentPrefix) {
      currentPath = currentPath.replace(new RegExp(`^/${currentPrefix.code}`), '') || '/';
    }
    
    let newPath: string;
    if (newLang === 'en') {
      newPath = currentPath;
    } else {
      newPath = currentPath === '/' ? `/${newLang}` : `/${newLang}${currentPath}`;
    }
    
    setLocation(newPath);
  };

  const currentLanguage = getLanguageByCode(i18n.language);

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger 
        className="w-[180px] gap-2" 
        data-testid="select-language"
      >
        <Globe className="h-4 w-4 shrink-0" />
        <SelectValue>
          {currentLanguage.nativeName}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {SUPPORTED_LANGUAGES.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            data-testid={`option-language-${language.code}`}
          >
            <div className="flex items-center justify-between w-full gap-3">
              <span>{language.nativeName}</span>
              <span className="text-muted-foreground text-sm">{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
