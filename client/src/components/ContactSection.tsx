import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ background: "#F8FAFC" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold break-words" style={{ color: "#0F172A" }}>
            {t('contact.title')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#475569" }}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: "#0F172A" }}>
                {t('contact.contactInfo')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: "#0F172A" }}>{t('contact.email')}</p>
                    <a
                      href="mailto:contact@terrabt.com"
                      className="hover:text-primary transition-colors hover-elevate px-2 py-1 rounded-md inline-block"
                      style={{ color: "#475569" }}
                      data-testid="text-email"
                    >
                      contact@terrabt.com
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
