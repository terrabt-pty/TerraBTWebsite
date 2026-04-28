import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { Menu, X, UserCircle } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

declare global {
  interface Window { GEO_COUNTRY?: string; }
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const isOnBTPxID = location.includes("/products/btp-xid");
  const isOnClaudeCLI = location.includes("/products/claude-cli");
  const isOnProductPage = isOnBTPxID || isOnClaudeCLI;
  const isANZ = ["AU", "NZ"].includes(window.GEO_COUNTRY ?? "");
  const homePath = getLocalizedPath(isANZ ? "/products/btp-xid" : "/");
  const productsPath = getLocalizedPath("/products");

  const btpxidScrollLinks = [
    { label: t('nav.features'), href: "#features" },
    { label: t('nav.downloads'), href: "#download" },
    { label: t('nav.pricing'), href: "#pricing" },
  ];

  // Claude CLI page has no pricing section (it's free) — surface only Features and Downloads.
  const claudeCliScrollLinks = [
    { label: t('nav.features'), href: "#features" },
    { label: t('nav.downloads'), href: "#download" },
  ];

  const scrollLinks = isOnBTPxID
    ? btpxidScrollLinks
    : isOnClaudeCLI
    ? claudeCliScrollLinks
    : [
        { label: t('nav.services'), href: "#services" },
        { label: t('nav.knowledge'), href: "#knowledge" },
        { label: t('nav.contact'), href: "#contact" },
      ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const mainHomePath = getLocalizedPath("/");
    const onHomePage = location === "/" || location === mainHomePath || location === mainHomePath.replace(/\/$/, "");

    if (!onHomePage && !isOnProductPage) {
      // On a sub-page — navigate to homepage first, then scroll to section
      setLocation(mainHomePath);
      setTimeout(() => {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToBTPxID = () => {
    setMobileMenuOpen(false);
    setLocation(getLocalizedPath("/products/btp-xid"));
  };

  const goToProducts = () => {
    setMobileMenuOpen(false);
    setLocation(productsPath);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">
          <Link href={homePath} className="flex items-center gap-2 flex-shrink">
            <Logo className="h-8 xxs:h-10 md:h-12" data-testid="img-logo" />
          </Link>

          {/* Centre column — main nav links */}
          <div className="hidden lg:flex items-center justify-center gap-6">
            <button
              onClick={() => { setMobileMenuOpen(false); setLocation(homePath); }}
              className="text-foreground/80 hover:text-foreground font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
              data-testid="link-home"
            >
              {t('nav.home')}
            </button>

            {/* Products — plain nav link to the catalog page, always visible */}
            <button
              onClick={goToProducts}
              className="text-foreground/80 hover:text-foreground font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
              data-testid="link-products"
            >
              Products
            </button>

            {/* BTP xID — highlighted nav item (hidden when already on the page, except for ANZ users) */}
            {(!isOnBTPxID || isANZ) && (
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
            )}

            {scrollLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
                data-testid={`link-${link.href.replace('#', '')}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right column — utility icons + mobile toggle */}
          <div className="flex items-center gap-0.5 xxs:gap-1 sm:gap-2 justify-end">
            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher />
              <a
                href="https://accounts.terrabt.com/auth/login"
                className="flex flex-col items-center text-foreground/80 hover:text-foreground transition-colors hover-elevate p-2 rounded-md"
                data-testid="link-sign-in"
                aria-label={t('nav.signIn')}
              >
                <UserCircle className="h-5 w-5" />
                <span className="text-[10px] leading-tight mt-0.5">{t('nav.signIn')}</span>
              </a>
            </div>

            <div className="lg:hidden flex items-center gap-0.5 xxs:gap-1 sm:gap-2">
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
          </div>{/* end right column */}
        </div>{/* end grid */}
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background" data-testid="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); setLocation(homePath); }}
              className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-foreground font-medium hover-elevate rounded-md"
              data-testid="mobile-link-home"
            >
              {t('nav.home')}
            </button>

            {/* Products — plain mobile link to the catalog page */}
            <button
              onClick={goToProducts}
              className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-foreground font-medium hover-elevate rounded-md"
              data-testid="mobile-link-products"
            >
              Products
            </button>

            {/* BTP xID — mobile highlighted (hidden when already on the page, except for ANZ users) */}
            {(!isOnBTPxID || isANZ) && (
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
            )}

            {scrollLinks.map((link) => (
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
