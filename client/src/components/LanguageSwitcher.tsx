import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { SUPPORTED_LANGUAGES, getLanguageByCode, getRegions, getLanguagesByRegion } from "@/config/languages";

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
  const regions = getRegions();

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger 
        className="w-[200px] gap-2" 
        data-testid="select-language"
      >
        <Globe className="h-4 w-4 shrink-0" />
        <SelectValue>
          {currentLanguage.nativeName}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        {regions.map((region) => {
          const languagesInRegion = getLanguagesByRegion(region);
          return (
            <SelectGroup key={region}>
              <SelectLabel className="text-xs font-semibold text-muted-foreground">
                {region}
              </SelectLabel>
              {languagesInRegion.map((language) => (
                <SelectItem 
                  key={language.code} 
                  value={language.code}
                  data-testid={`option-language-${language.code}`}
                >
                  <div className="flex items-center justify-between w-full gap-3">
                    <span className="font-medium">{language.nativeName}</span>
                    <span className="text-muted-foreground text-xs">{language.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
}
