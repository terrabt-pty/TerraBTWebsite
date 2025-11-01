import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Wifi, WifiOff, Smartphone, Cloud, Zap, Shield } from "lucide-react";
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
      icon: WifiOff,
      title: "Offline-First Architecture",
      description: "Design applications that work seamlessly even without internet connectivity.",
      features: [
        "Service Worker implementation",
        "Offline data caching strategies",
        "IndexedDB and local storage management",
        "Background sync capabilities",
        "Conflict resolution strategies"
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
        "Retry mechanisms and error handling"
      ]
    },
    {
      icon: Smartphone,
      title: "Progressive Web App Features",
      description: "Native app-like experience with modern web capabilities.",
      features: [
        "App manifest configuration",
        "Add to home screen functionality",
        "Push notification support",
        "Camera and GPS integration",
        "App shell architecture"
      ]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast load times and smooth offline transitions.",
      features: [
        "Pre-caching critical resources",
        "Lazy loading for images and content",
        "Code splitting and bundling",
        "Compression and minification",
        "Performance monitoring and analytics"
      ]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Secure offline data storage and transmission.",
      features: [
        "Data encryption at rest",
        "Secure authentication tokens",
        "HTTPS enforcement",
        "Content Security Policy (CSP)",
        "Regular security audits"
      ]
    },
    {
      icon: Wifi,
      title: "Online Enhancement",
      description: "Enhanced functionality when connectivity is available.",
      features: [
        "Real-time updates and notifications",
        "Cloud backup and restore",
        "Multi-device synchronization",
        "Analytics and telemetry",
        "Feature detection and progressive enhancement"
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
              Progressive web applications with offline capabilities ensuring seamless user experience anywhere. 
              Build apps that work perfectly whether online or offline, delivering native app experiences through the web.
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
              From offline-first architecture to push notifications, we build PWAs that rival native apps.
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
