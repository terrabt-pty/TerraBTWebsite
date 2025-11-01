import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Wifi, WifiOff, Smartphone, Cloud, Zap, Shield, Package, Wrench, ScanBarcode, Radio } from "lucide-react";
import { Link } from "wouter";

export default function OfflinePWA() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Package,
      title: "Stocktake Apps",
      description: "Comprehensive inventory management and stocktaking solutions that work offline.",
      features: [
        "Real-time inventory counting offline",
        "Batch processing and bulk updates",
        "Photo capture for stock verification",
        "Location-based stock tracking",
        "Variance reporting and reconciliation",
        "Integration with SAP S/4HANA inventory"
      ]
    },
    {
      icon: Wrench,
      title: "Service Management Apps",
      description: "Complete field service management including work orders and maintenance operations.",
      features: [
        "Work order creation and updates offline",
        "Maintenance notification management",
        "Equipment history and documentation",
        "Parts and materials consumption tracking",
        "Technician time and attendance tracking",
        "Customer signature capture"
      ]
    },
    {
      icon: ScanBarcode,
      title: "Barcode Scanning",
      description: "Advanced barcode scanning capabilities for inventory and asset management.",
      features: [
        "1D and 2D barcode scanning",
        "QR code recognition",
        "Batch scanning for multiple items",
        "Offline barcode validation",
        "Asset tagging and tracking",
        "Serial number capture and verification"
      ]
    },
    {
      icon: Radio,
      title: "RFID Scanning",
      description: "RFID technology integration for rapid asset and inventory tracking.",
      features: [
        "Bulk RFID tag reading",
        "Real-time asset location tracking",
        "High-speed inventory counting",
        "Anti-theft and security monitoring",
        "Equipment calibration tracking",
        "Automated check-in/check-out"
      ]
    },
    {
      icon: WifiOff,
      title: "Offline-First Architecture",
      description: "Design applications that work seamlessly even without internet connectivity.",
      features: [
        "Service Worker implementation",
        "Offline data caching strategies",
        "IndexedDB and local storage management",
        "Background sync capabilities",
        "Conflict resolution strategies",
        "Queue management for offline actions"
      ]
    },
    {
      icon: Cloud,
      title: "Data Synchronization",
      description: "Intelligent sync mechanisms to keep data consistent across devices.",
      features: [
        "Automatic background synchronization",
        "Delta sync for efficient data transfer",
        "Conflict detection and resolution",
        "Optimistic UI updates",
        "Retry mechanisms and error handling",
        "Real-time SAP BTP integration"
      ]
    }
  ];

  const benefits = [
    "Work anywhere, anytime - even without internet",
    "Improved user experience with instant loading",
    "Reduced server costs with efficient caching",
    "Higher conversion rates from app-like experience",
    "Better engagement with push notifications"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-chart-5/10 via-trust/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover-elevate" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl">
            <Badge className="bg-trust/10 text-trust border-trust/30 mb-6" data-testid="badge-category">
              Progressive Web Apps
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
                Offline PWA Apps
              </span>
              <br />
              <span className="text-foreground">for SAP BTP</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Progressive web applications with offline capabilities for stocktaking, service management, work orders, 
              maintenance notifications, barcode scanning, RFID tracking, and more. Build field-ready SAP BTP apps 
              that work seamlessly anywhere, even without internet connectivity.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-build-pwa"
            >
              Build Your PWA →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete PWA Development Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Complete PWA solutions including stocktake apps, service management with work orders and maintenance, barcode/RFID scanning, and more - all working offline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="p-8 hover-elevate transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary"
                data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/15 to-trust/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/30 mb-6">
                The PWA Advantage
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Native Experience, Web Simplicity
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Progressive Web Apps combine the best of web and native apps. No app store approvals, 
                instant updates, and work across all devices - all while providing an app-like experience.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-8 bg-gradient-to-br from-card to-card/50">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Offline Capability</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">3x</div>
                  <div className="text-muted-foreground">Faster Load Times</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50%</div>
                  <div className="text-muted-foreground">Reduced Data Usage</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">80%</div>
                  <div className="text-muted-foreground">Higher Engagement</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            ⚡ Enable Offline Capabilities Today
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              Ready to Build
            </span>
            <br />
            <span className="text-foreground">Your Offline-First PWA?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's create a progressive web app that works flawlessly offline and delivers 
            a native app experience to your users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-start-pwa-project"
            >
              Start Your PWA Project →
            </Button>
            <Link href="/">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-trust text-trust-foreground hover:bg-trust"
                data-testid="button-view-services"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
