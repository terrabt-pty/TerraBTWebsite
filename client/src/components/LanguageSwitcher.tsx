import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Search, Check } from "lucide-react";
import { SUPPORTED_LANGUAGES, getLanguageByCode, getRegions, getLanguagesByRegion } from "@/config/languages";
import { saveBrowserLanguage } from "@/i18n";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLanguageChange = (newLang: string) => {
    const currentLang = i18n.language;

    if (currentLang === newLang) {
      setOpen(false);
      return;
    }

    saveBrowserLanguage(newLang);

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

    setOpen(false);
    setSearchQuery('');
    setLocation(newPath);
  };

  const currentLanguage = getLanguageByCode(i18n.language);
  const regions = getRegions();

  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) {
      return regions.map(region => ({
        region,
        languages: getLanguagesByRegion(region)
      }));
    }

    const query = searchQuery.toLowerCase();
    return regions.map(region => ({
      region,
      languages: getLanguagesByRegion(region).filter(lang =>
        lang.name.toLowerCase().includes(query) ||
        lang.nativeName.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query)
      )
    })).filter(r => r.languages.length > 0);
  }, [searchQuery, regions]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-auto lg:w-[200px] justify-start gap-2 px-2 lg:px-4"
          data-testid="select-language"
        >
          <Globe className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline truncate">{currentLanguage.nativeName}</span>
          <span className="sm:hidden text-xs font-medium uppercase">{i18n.language.split('-')[0]}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="end">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-language-search"
            />
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {filteredRegions.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No languages found
            </div>
          ) : (
            filteredRegions.map(({ region, languages }) => (
              <div key={region}>
                <div className="sticky top-0 bg-muted/80 backdrop-blur-sm px-3 py-2 border-b">
                  <span className="text-sm font-bold text-foreground">
                    {region}
                  </span>
                </div>
                <div className="py-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className="w-full px-3 py-2 flex items-center justify-between hover:bg-accent/50 transition-colors text-left"
                      data-testid={`option-language-${language.code}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{language.nativeName}</span>
                        <span className="text-muted-foreground text-xs">{language.name}</span>
                      </div>
                      {i18n.language === language.code && (
                        <Check className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
