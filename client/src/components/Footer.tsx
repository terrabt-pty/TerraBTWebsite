import { useTranslation } from "react-i18next";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import Logo from "@/components/Logo";
import { SUPPORTED_LANGUAGES, getRegions, getLanguagesByRegion } from "@/config/languages";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Logo className="h-10" data-testid="img-footer-logo" />
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/terrabt"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-md border hover-elevate flex items-center justify-center transition-all hover:bg-primary/5"
                data-testid="button-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/terrabt"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-md border hover-elevate flex items-center justify-center transition-all hover:bg-primary/5"
                data-testid="button-twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/terrabt"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-md border hover-elevate flex items-center justify-center transition-all hover:bg-primary/5"
                data-testid="button-facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/terrabt"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-md border hover-elevate flex items-center justify-center transition-all hover:bg-primary/5"
                data-testid="button-instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-fiori"
                >
                  {t('footer.fiori')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-architecture"
                >
                  {t('footer.architecture')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-integration"
                >
                  {t('footer.integration')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-ai-solutions"
                >
                  {t('footer.ai')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.knowledge')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("#knowledge")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-blog"
                >
                  {t('footer.blogArticles')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#knowledge")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-case-studies"
                >
                  {t('footer.caseStudies')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#knowledge")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-resources"
                >
                  {t('footer.resources')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("#home")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-about"
                >
                  {t('footer.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-contact-footer"
                >
                  {t('footer.contact')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t space-y-6">
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground text-center">{t('footer.availableLanguages')}</h4>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 max-w-4xl mx-auto">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <a
                  key={lang.code}
                  href={lang.code === 'en' ? '/' : `/${lang.code}`}
                  className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
                  hrefLang={lang.code}
                  data-testid={`link-lang-${lang.code}`}
                >
                  {lang.nativeName}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <a
              href="/privacy-policy"
              className="hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
              data-testid="link-privacy-policy"
            >
              {t('footer.privacy')}
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="/terms-of-service"
              className="hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
              data-testid="link-terms-of-service"
            >
              {t('footer.terms')}
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="/limited-liability"
              className="hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
              data-testid="link-limited-liability"
            >
              {t('footer.liability')}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} TerraBT. {t('footer.copyright')}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground/50 max-w-2xl text-center">
              SAP and SAP Business Technology Platform are trademarks or registered trademarks of SAP SE or its affiliates in Germany and in several other countries.
              TerraBT is an independent consulting company and is not affiliated with, endorsed by, or sponsored by SAP SE. {t('footer.serviceRestriction')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
