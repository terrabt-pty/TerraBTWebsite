import { useTranslation } from "react-i18next";
import { Linkedin, Twitter, Github, Cloud } from "lucide-react";
import Logo from "@/components/Logo";

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
              <button
                className="h-9 w-9 rounded-md border hover-elevate flex items-center justify-center transition-all"
                onClick={() => console.log("LinkedIn clicked")}
                data-testid="button-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button
                className="h-9 w-9 rounded-md border hover-elevate flex items-center justify-center transition-all"
                onClick={() => console.log("Twitter clicked")}
                data-testid="button-twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                className="h-9 w-9 rounded-md border hover-elevate flex items-center justify-center transition-all"
                onClick={() => console.log("Github clicked")}
                data-testid="button-github"
              >
                <Github className="h-4 w-4" />
              </button>
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

        <div className="pt-8 border-t space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} TerraBT. {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Cloud className="h-4 w-4 text-primary" />
              <span>{t('footer.deployedOn')}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2 pt-4">
            <p className="text-xs text-muted-foreground/50 max-w-2xl text-center">
              SAP and SAP Business Technology Platform are trademarks or registered trademarks of SAP SE or its affiliates in Germany and in several other countries. 
              TerraBT is an independent consulting company and is not affiliated with, endorsed by, or sponsored by SAP SE.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
