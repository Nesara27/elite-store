"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getShopPage } from "@/lib/contentstack";
import { ClientLayout } from "@/components/ClientLayout";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Sparkles, Filter } from "lucide-react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default function ShopPage() {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getContent = async () => {
    try {
      console.log("🔄 Fetching Shop Page data...");
      const data = await getShopPage();
      console.log("📄 Shop Page data received:", data);
      setPage(data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching Shop Page data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  // 🔄 Listen for Live Preview changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      ContentstackLivePreview.onEntryChange(getContent);
    }
  }, []);

  if (loading) {
    return (
      <ClientLayout>
        <div className="text-center py-32 text-lg text-muted-foreground">
          Loading Shop...
        </div>
      </ClientLayout>
    );
  }

  if (!page) {
    return (
      <ClientLayout>
        <div className="text-center py-32">
          <div className="text-red-500 text-xl font-bold mb-4">
            ❌ Failed to load Shop Page content
          </div>
          <Button onClick={getContent} className="mt-4">
            Retry
          </Button>
        </div>
      </ClientLayout>
    );
  }

  const { hero_heading, hero_subtext, products = [], categories = [] } = page;

  // ✅ Normalize products to ensure features is always a string
  const normalizedProducts = products.map((p: any) => {
    let features = "";
    
    // Handle different types of features field
    if (typeof p.features === "string") {
      features = p.features;
    } else if (Array.isArray(p.features)) {
      features = p.features.join(", ");
    } else if (p.features && typeof p.features === "object") {
      features = JSON.stringify(p.features);
    }
    
    return {
      ...p,
      features: features,
      // Parse features into array for display
      featuresArray: features ? features.split(/\r?\n/).filter(Boolean) : []
    };
  });

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? normalizedProducts
      : normalizedProducts.filter((p: any) => p.category === selectedCategory);

  return (
    <ClientLayout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                <ShoppingCart className="h-5 w-5 text-purple-400 animate-pulse" />
                <span className="text-sm font-medium">Premium Products</span>
              </div>

              <h1
                {...(page.$?.hero_heading)}
                className="text-6xl md:text-7xl font-bold mb-6"
              >
                {hero_heading || "Shop Our Collection"}
              </h1>

              <p
                {...(page.$?.hero_subtext)}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                {hero_subtext || "Discover premium products"}
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <section className="py-8 border-b border-border/50">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="flex-shrink-0"
                >
                  All Products
                </Button>
                {categories.map((cat: any, index: number) => (
                  <Button
                    key={index}
                    variant={
                      selectedCategory === cat.name ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(cat.name)}
                    className="flex-shrink-0"
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                No products found in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product: any, index: number) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl glass border border-primary/20 overflow-hidden hover-lift"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image?.url || "/placeholder.png"}
                        alt={product.product_name || "Product"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.badge && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold">
                          {product.badge}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3
                        {...(page.$?.products?.[index]?.product_name)}
                        className="text-xl font-bold mb-2"
                      >
                        {product.product_name || "Product"}
                      </h3>

                      <p
                        {...(page.$?.products?.[index]?.description)}
                        className="text-muted-foreground text-sm mb-4 line-clamp-2"
                      >
                        {product.description || "No description"}
                      </p>

                      {/* Features */}
                      {product.featuresArray && product.featuresArray.length > 0 && (
                        <ul className="space-y-1 mb-4">
                          {product.featuresArray.slice(0, 3).map((feature: string, i: number) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <Sparkles className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Price & Rating */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          {...(page.$?.products?.[index]?.price)}
                          className="text-2xl font-bold gradient-text"
                        >
                          ${product.price || "0"}
                        </div>
                        {product.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {product.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        asChild
                      >
                        <Link
                          href={`/product/${product.uid || product._metadata?.uid}`}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </ClientLayout>
  );
}