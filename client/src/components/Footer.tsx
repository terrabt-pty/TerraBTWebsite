import { Linkedin, Twitter, Github, Cloud } from "lucide-react";

export default function Footer() {
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
            <img 
              src="/attached_assets/Screenshot 2025-10-29 at 8.59.24 pm_1761968672258.png" 
              alt="TerraBT Logo" 
              className="h-10"
              data-testid="img-footer-logo"
            />
            <p className="text-sm text-muted-foreground">
              Specialized SAP BTP consulting delivering excellence worldwide
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
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-fiori"
                >
                  Fiori Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-architecture"
                >
                  BTP Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-integration"
                >
                  Integration Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-ai-solutions"
                >
                  AI Solutions
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Knowledge</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("#knowledge")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-blog"
                >
                  Blog Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#knowledge")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-case-studies"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#knowledge")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-resources"
                >
                  Resources
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("#home")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md"
                  data-testid="link-contact-footer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} TerraBT. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Cloud className="h-4 w-4 text-primary" />
            <span>Deployed on Cloudflare</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
