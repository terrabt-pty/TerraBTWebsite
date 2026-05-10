import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { ArrowRight, Download, Monitor } from "lucide-react";
import dashboardImg from "@assets/BTP_xID_Dashboard_1772336098798.png";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  previewImage: string | null;
  /**
   * Optional placeholder gradient (CSS `background` value) used when previewImage is null.
   * Lets each product carry its own colour identity in the listing grid.
   */
  placeholderGradient?: string;
  /** Optional short label shown inside the placeholder tile (defaults to product name). */
  placeholderLabel?: string;
  startingPrice: string;
  path: string;
}

const products: Product[] = [
  {
    id: "btp-xid",
    name: "BTP xID",
    tagline: "SAP BTP user management — minus the twelve browser tabs.",
    description:
      "A desktop application that gives IT administrators a single interface to manage users across an entire SAP BTP landscape — multiple global accounts, subaccounts, Cloud Foundry orgs, and spaces.",
    category: "Desktop App",
    status: "Beta",
    previewImage: dashboardImg,
    startingPrice: "Free",
    path: "/products/btp-xid",
  },
  {
    id: "claude-cli",
    name: "Claude CLI Backup & Viewer",
    tagline: "Your Claude CLI conversations, backed up and searchable.",
    description:
      "A desktop app to back up, view, search, and export your Claude CLI conversations with smart delta sync, message filtering, and JSON export.",
    category: "Desktop App",
    status: "New",
    previewImage: null,
    placeholderGradient:
      "linear-gradient(135deg, #4CAF50 0%, #3A9A6A 50%, #1E5099 100%)",
    placeholderLabel: "Claude CLI Backup",
    startingPrice: "Download",
    path: "/products/claude-cli",
  },
];

export default function Products() {
  const { getLocalizedPath } = useLocalizedPath();

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF", color: "#0F172A" }}>
      <SEOHead
        title="Products - SAP BTP Tools by TerraBT"
        description="TerraBT products for SAP BTP administrators. Download desktop apps and tools to manage your SAP BTP landscape more efficiently."
        path="/products"
      />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: "#0F172A" }} data-testid="text-products-heading">
            Products
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "#475569" }}>
            Purpose-built tools for SAP BTP administrators. Download, install, and manage your landscape more efficiently.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={getLocalizedPath(product.path)}>
              <Card
                className="group h-full cursor-pointer hover-elevate overflow-visible"
                data-testid={`card-product-${product.id}`}
              >
                {/* Screenshot preview — falls back to a styled placeholder when no image is available */}
                <div className="relative rounded-t-md overflow-hidden border-b aspect-video bg-muted">
                  {product.previewImage ? (
                    <>
                      <img
                        src={product.previewImage}
                        alt={product.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background:
                          product.placeholderGradient ??
                          "linear-gradient(135deg, hsl(var(--muted)), hsl(var(--accent)))",
                      }}
                      data-testid={`placeholder-product-${product.id}`}
                    >
                      <span className="text-white text-xl font-bold tracking-tight drop-shadow-md">
                        {product.placeholderLabel ?? product.name}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}
                </div>

                <CardContent className="pt-5 pb-6 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" data-testid={`badge-category-${product.id}`}>
                      {product.category}
                    </Badge>
                    <Badge variant="outline" data-testid={`badge-status-${product.id}`}>
                      {product.status}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-1" data-testid={`text-product-name-${product.id}`}>
                      {product.name}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium mb-2">
                      {product.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Monitor className="h-4 w-4" />
                      <span>Starts at <strong className="text-foreground">{product.startingPrice}</strong></span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      <Download className="h-4 w-4" />
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Coming soon placeholder */}
          <Card className="h-full border-dashed opacity-60" data-testid="card-product-coming-soon">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-64 text-center gap-3 py-12">
              <div className="p-3 rounded-md bg-muted">
                <Monitor className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">More coming soon</p>
                <p className="text-sm text-muted-foreground mt-1">
                  New products in development
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
