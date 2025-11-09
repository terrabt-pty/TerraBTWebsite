import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 md:py-24 bg-gradient-to-br from-trust/10 via-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-chart-5/5 via-transparent to-primary/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 font-semibold mb-4">
            ⚡ {t('contact.availability')}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground" data-testid="text-phone">
                      Available via email
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Global Presence</p>
                    <p className="text-muted-foreground" data-testid="text-location">
                      Serving clients in 40+ countries worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-trust/10 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Fast Response Guarantee
              </h4>
              <p className="text-foreground/80 text-sm font-medium">
                Get expert advice within 24 hours. Our SAP BTP specialists are ready to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
