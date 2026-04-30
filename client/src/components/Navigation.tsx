import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { Menu, X, UserCircle, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

declare global {
  interface Window { GEO_COUNTRY?: string; }
}

const PRODUCTS = [
  { id: "btp-xid",     name: "BTP xID",                    tagline: "SAP BTP user management",        path: "/products/btp-xid",    badge: "NEW" },
  { id: "claude-cli",  name: "Claude CLI Backup & Viewer",  tagline: "Back up & search conversations", path: "/products/claude-cli", badge: "NEW"  },
];

const HOME_scrollLinks = [
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.contact",  href: "#contact"  },
];

const BTPXID_scrollLinks = [
  { labelKey: "nav.services",  href: "#services"  },
  { labelKey: "nav.pricing",   href: "#pricing"   },
  { labelKey: "nav.contact",   href: "#contact"   },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const homePath = getLocalizedPath("/");
  const btpxidPath = getLocalizedPath("/products/btp-xid");
  const isOnBTPxID = location === btpxidPath || location === btpxidPath.replace(/\/$/, "");
  const scrollLinks = isOnBTPxID ? BTPXID_scrollLinks : HOME_scrollLinks;

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const mainHomePath = getLocalizedPath("/");
    const onHomePage = location === "/" || location === mainHomePath || location === mainHomePath.replace(/\/$/, "");
    const sectionExistsOnPage = !!document.querySelector(href);
    if (!onHomePage && !sectionExistsOnPage) {
      setLocation(mainHomePath);
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 500);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToProduct = (path: string) => {
    setProductsOpen(false);
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
    setLocation(getLocalizedPath(path));
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">

          {/* Logo */}
          <Link href={homePath} className="flex items-center gap-2 flex-shrink">
            <Logo className="h-8 xxs:h-10 md:h-12" data-testid="img-logo" />
          </Link>

          {/* Centre — desktop nav */}
          <div className="hidden lg:flex items-center justify-center gap-6">
            <button
              onClick={() => setLocation(homePath)}
              className="text-foreground/80 hover:text-foreground font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
              data-testid="link-home"
            >
              {t('nav.home')}
            </button>

            {/* Products dropdown */}
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <button
                className="flex items-center gap-1 text-foreground/80 hover:text-foreground font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
                data-testid="link-products"
                aria-expanded={productsOpen}
              >
                Products
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 pt-1 z-50" data-testid="dropdown-products">
                  <div className="rounded-lg border bg-background shadow-lg py-1.5">
                    {PRODUCTS.map((p) => (
                      <button key={p.id} onClick={() => goToProduct(p.path)} className="w-full text-left px-4 py-2.5 hover:bg-accent transition-colors group" data-testid={`dropdown-product-${p.id}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{p.name}</span>
                          {p.badge && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary leading-none">{p.badge}</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{p.tagline}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fixed scroll links — same on every page */}
            {scrollLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
                data-testid={`link-${link.href.replace('#', '')}`}
              >
                {t(link.labelKey)}
              </button>
            ))}
          </div>

          {/* Right — language + sign in */}
          <div className="flex items-center gap-0.5 xxs:gap-1 sm:gap-2 justify-end">
            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher />
              <a
                href={`https://accounts.terrabt.com/auth/login?lang=${i18n.language}`}
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
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
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

            {/* Products — expandable */}
            <div>
              <button
                onClick={() => setMobileProductsOpen((v) => !v)}
                className="flex items-center justify-between w-full px-3 py-2 text-foreground/80 hover:text-foreground font-medium hover-elevate rounded-md"
                data-testid="mobile-link-products"
              >
                Products
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileProductsOpen && (
                <div className="ml-3 mt-1 space-y-1 border-l pl-3">
                  {PRODUCTS.map((p) => (
                    <button key={p.id} onClick={() => goToProduct(p.path)} className="block w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors" data-testid={`mobile-product-${p.id}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{p.name}</span>
                        {p.badge && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary leading-none">{p.badge}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.tagline}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {scrollLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-foreground font-medium hover-elevate rounded-md"
                data-testid={`mobile-link-${link.href.replace('#', '')}`}
              >
                {t(link.labelKey)}
              </button>
            ))}

            <a
              href={`https://accounts.terrabt.com/auth/login?lang=${i18n.language}`}
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
