import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { Menu, X, UserCircle } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { isANZ as checkIsANZ } from "@/lib/anz";

declare global {
  interface Window { GEO_COUNTRY?: string; }
}

const HOME_scrollLinks = [
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.contact",  href: "#contact"  },
];

const BTPXID_scrollLinks = [
  { labelKey: "nav.services",  href: "#services"  },
  { labelKey: "nav.contact",   href: "#contact"   },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const homePath = getLocalizedPath("/");
  const btpxidPath = getLocalizedPath("/products/btp-xid");
  const isOnBTPxID = location === btpxidPath || location === btpxidPath.replace(/\/$/, "");
  const isANZ = checkIsANZ();
  const rawScrollLinks = isOnBTPxID ? BTPXID_scrollLinks : HOME_scrollLinks;
  const scrollLinks = isANZ
    ? rawScrollLinks.filter(l => l.href !== '#services')
    : rawScrollLinks;

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
    setMobileMenuOpen(false);
    setLocation(getLocalizedPath(path));
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">

          {/* Logo */}
          <Link href={homePath} className="flex items-center gap-2 flex-shrink">
            <Logo className="h-8 xxs:h-10 md:h-12" data-testid="img-logo" />
          </Link>

          {/* Centre — desktop nav */}
          <div className="hidden lg:flex items-center justify-center gap-6">
            <button
              onClick={() => { setLocation(homePath); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
              style={{ color: "#475569" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0F172A")}
              onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
              data-testid="link-home"
            >
              {t('nav.home')}
            </button>

            {/* SAP BTP User Management direct link */}
            <button
              onClick={() => goToProduct("/products/btp-xid")}
              className="font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
              style={{ color: "#475569" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#0F172A"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#475569"}
              data-testid="link-sap-btp-user-management"
            >
              {t('nav.sapBtpUserManagement')}
            </button>

            {/* Fixed scroll links — same on every page */}
            {scrollLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="font-medium transition-colors hover-elevate px-3 py-2 rounded-md"
                style={{ color: "#475569" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0F172A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
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
                className="flex flex-col items-center transition-colors hover-elevate p-2 rounded-md"
                style={{ color: "#475569" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0F172A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
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
                className="p-1.5 xxs:p-2 hover:bg-slate-200 rounded-md transition-colors"
                style={{ color: "#475569" }}
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
        <div className="lg:hidden border-t border-slate-200" style={{ background: "#FFFFFF" }} data-testid="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); setLocation(homePath); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="block w-full text-left px-3 py-2 font-medium hover-elevate rounded-md"
              style={{ color: "#475569" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0F172A")}
              onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
              data-testid="mobile-link-home"
            >
              {t('nav.home')}
            </button>

            {/* SAP BTP User Management direct link */}
            <button
              onClick={() => goToProduct("/products/btp-xid")}
              className="block w-full text-left px-3 py-2 font-medium hover-elevate rounded-md"
              style={{ color: "#475569" }}
              data-testid="mobile-link-sap-btp-user-management"
            >
              {t('nav.sapBtpUserManagement')}
            </button>

            {scrollLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-3 py-2 font-medium hover-elevate rounded-md"
                style={{ color: "#475569" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0F172A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                data-testid={`mobile-link-${link.href.replace('#', '')}`}
              >
                {t(link.labelKey)}
              </button>
            ))}

            <a
              href={`https://accounts.terrabt.com/auth/login?lang=${i18n.language}`}
              className="flex items-center gap-2 w-full px-3 py-2 font-medium hover-elevate rounded-md"
              style={{ color: "#475569" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0F172A")}
              onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
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
