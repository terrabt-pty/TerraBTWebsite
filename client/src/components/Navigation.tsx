import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const navLinks = [
    { label: t('nav.home'), href: "#home" },
    { label: t('nav.services'), href: "#services" },
    { label: t('nav.knowledge'), href: "#knowledge" },
    { label: t('nav.contact'), href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={getLocalizedPath("/")} className="flex items-center gap-2 flex-shrink">
            <Logo className="h-8 xxs:h-10 md:h-12" data-testid="img-logo" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
                data-testid={`link-${link.href.replace('#', '')}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-md shadow-urgency/20"
              data-testid="button-schedule-consultation"
            >
              {t('nav.bookConsultation')}
            </Button>
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center gap-0.5 xxs:gap-1 sm:gap-2 flex-shrink-0">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 xxs:p-2 text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background" data-testid="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-foreground font-medium hover-elevate rounded-md"
                data-testid={`mobile-link-${link.href.replace('#', '')}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              className="w-full bg-urgency text-urgency-foreground hover:bg-urgency"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-mobile-consultation"
            >
              {t('nav.bookConsultation')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
