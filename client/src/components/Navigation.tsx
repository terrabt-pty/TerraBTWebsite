import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { Menu, X, UserCircle } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const scrollLinks = [
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
    } else {
      setMobileMenuOpen(false);
      const homePath = getLocalizedPath("/");
      setLocation(homePath);
      setTimeout(() => {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  const goToBTPxID = () => {
    setMobileMenuOpen(false);
    setLocation(getLocalizedPath("/products/btp-xid"));
  };

  const isOnBTPxID = location.includes("/products/btp-xid");

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={getLocalizedPath("/")} className="flex items-center gap-2 flex-shrink">
            <Logo className="h-8 xxs:h-10 md:h-12" data-testid="img-logo" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("#home")}
              className="text-foreground/80 hover:text-foreground font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
              data-testid="link-home"
            >
              {t('nav.home')}
            </button>

            {/* BTP xID — highlighted nav item */}
            <button
              onClick={goToBTPxID}
              className="nav-btpxid-link"
              data-testid="link-btpxid"
            >
              <span className="nav-btpxid-label">
                BTP{" "}
                <span className="nav-btpxid-x">x</span>
                <span className="nav-btpxid-id">ID</span>
              </span>
              <span className="nav-btpxid-new">NEW</span>
            </button>

            {scrollLinks.filter(l => l.href !== "#home").map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
                data-testid={`link-${link.href.replace('#', '')}`}
              >
                {link.label}
              </button>
            ))}

            <LanguageSwitcher />
            <a
              href="https://accounts.terrabt.com/auth/login"
              className="text-foreground/80 hover:text-foreground transition-colors hover-elevate p-2 rounded-md"
              data-testid="link-sign-in"
              aria-label={t('nav.signIn')}
            >
              <UserCircle className="h-5 w-5" />
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-0.5 xxs:gap-1 sm:gap-2 flex-shrink-0">
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
        <div className="lg:hidden border-t bg-background" data-testid="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => scrollToSection("#home")}
              className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-foreground font-medium hover-elevate rounded-md"
              data-testid="mobile-link-home"
            >
              {t('nav.home')}
            </button>

            {/* BTP xID — mobile highlighted */}
            <button
              onClick={goToBTPxID}
              className="nav-btpxid-mobile"
              data-testid="mobile-link-btpxid"
            >
              <span className="nav-btpxid-label">
                BTP{" "}
                <span className="nav-btpxid-x">x</span>
                <span className="nav-btpxid-id">ID</span>
              </span>
              <span className="nav-btpxid-new">NEW</span>
            </button>

            {scrollLinks.filter(l => l.href !== "#home").map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-foreground font-medium hover-elevate rounded-md"
                data-testid={`mobile-link-${link.href.replace('#', '')}`}
              >
                {link.label}
              </button>
            ))}

            <a
              href="https://accounts.terrabt.com/auth/login"
              className="flex items-center gap-2 w-full px-3 py-2 text-foreground/80 hover:text-foreground font-medium hover-elevate rounded-md"
              data-testid="mobile-link-sign-in"
            >
              <UserCircle className="h-4 w-4" />
              {t('nav.signIn')}
            </a>

          </div>
        </div>
      )}
    </nav>
  );
}
