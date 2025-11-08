"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Truck,
  Star,
  TrendingUp,
  Sparkles,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ClientLayout } from "@/components/ClientLayout";
import { useCart } from "@/hooks/useCart";
import { CyberpunkHero } from "@/components/CyberpunkHero";
import { InstantCartToast } from "@/components/InstantCartToast";
import { Product } from "@/types/product";
import { getHomePage } from "@/lib/contentstack";
import { useLivePreview } from "@/hooks/useLivePreview";
import { useRouter } from "next/navigation";

const icons: Record<string, any> = {
  Zap,
  Shield,
  Truck,
  Package,
  Sparkles,
  Star,
};

export default function HomePage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setToastProduct(product);
  };

  // ✅ Navigate to shop page when card is clicked
  const handleProductClick = () => {
    router.push("/shop");
  };

  // ✅ Fetch Home Page data
  const fetchData = async () => {
    try {
      const fetched = await getHomePage();
      setData(fetched);
      setLoading(false);
      console.log("🏠 Home page fetched:", fetched?.hero_heading);
    } catch (err) {
      console.error("❌ Failed to fetch homepage content", err);
      setLoading(false);
    }
  };

  // 🟢 Initial data load
  useEffect(() => {
    fetchData();
  }, []);

  // 🟣 Enable Live Preview updates (real-time)
  useLivePreview(fetchData);

  // 💤 Loading state
  if (loading) {
    return (
      <ClientLayout>
        <div className="text-center py-32">Loading Home Page...</div>
      </ClientLayout>
    );
  }

  // ⚠️ Error state
  if (!data) {
    return (
      <ClientLayout>
        <div className="text-center py-32 text-red-500">
          ❌ Failed to load home page content.
        </div>
      </ClientLayout>
    );
  }

  const {
    hero_heading,
    hero_subtext,
    features = [],
    featured_products = [],
    cta_heading,
    cta_description,
    cta_button_label,
    cta_button_link,
  } = data;

  return (
    <ClientLayout>
      <div className="flex flex-col">
        {/* 🦸 Hero Section */}
        <CyberpunkHero
          title={hero_heading || "Welcome to Elite Store"}
          subtitle={hero_subtext || "Experience the future of shopping."}
        />

        {/* ⚡ Features Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.length > 0 ? (
                features.map((feature: any, index: number) => {
                  const Icon = icons[feature.icon_name?.trim()] || Sparkles;
                  return (
                    <div
                      key={feature.title || index}
                      className={`group relative animate-scale-in stagger-${index + 1}`}
                    >
                      <div className="relative p-6 rounded-2xl glass border border-primary/20 hover:border-primary/40 transition-all hover-lift overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient || "from-primary to-accent"} opacity-0 group-hover:opacity-10 transition-opacity`}
                        />
                        <div className="relative">
                          <div
                            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient || "from-primary to-accent"} mb-4 group-hover:scale-110 transition-transform`}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                            {feature.title || "Untitled Feature"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted-foreground text-center col-span-4">
                  No features available
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 🛍️ Featured Products */}
        {featured_products.length > 0 && (
          <section className="py-24 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Trending Now</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black mb-4">
                  Featured <span className="gradient-text">Products</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Handpicked selection of our most popular items
                </p>
              </div>

              {/* ✅ Click to navigate to shop page */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {featured_products.map((item: any, index: number) => {
                  const product = item.entry || item;
                  const productId =
                    product.uid ||
                    product.entry_uid ||
                    product._metadata?.uid ||
                    index;

                  return (
                    <div
                      key={productId}
                      onClick={handleProductClick}
                      className="cursor-pointer"
                    >
                      <ProductCard
                        product={{
                          id: productId,
                          name:
                            product.product_name ||
                            product.title ||
                            "Untitled Product",
                          description:
                            product.product_description ||
                            product.description ||
                            "",
                          price: Number(product.price) || 0,
                          category: product.category || "General",
                          image: product.image?.url || "/placeholder.png",
                          inStock:
                            product.in_stock === true ||
                            product.in_stock === "true" ||
                            true,
                          rating: Number(product.rating || 4.5),
                          reviewCount: Number(product.reviewcount || 0),
                        }}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 hover-glow group"
                  asChild
                >
                  <Link href="/shop">
                    <Sparkles className="mr-2 h-5 w-5" />
                    View All Products
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* ⭐ CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Star className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {cta_heading}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {cta_description}
            </p>
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 hover-glow"
              asChild
            >
              <Link href={cta_button_link?.href || "#"}>
                {cta_button_label || "Shop Now"}
              </Link>
            </Button>
          </div>
        </section>
      </div>

      {/* 🛒 Cart Toast */}
      <InstantCartToast
        product={toastProduct}
        onClose={() => setToastProduct(null)}
      />
    </ClientLayout>
  );
}