"use client";

// Next-Level Home Page with Advanced Animations
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Truck, Shield, CreditCard, Sparkles, Zap, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { ClientLayout } from "@/components/ClientLayout";
import { useCart } from "@/hooks/useCart";

export default function Home() {
  const { addToCart } = useCart();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Featured products (first 4 in-stock items)
  const featuredProducts = products.filter(p => p.inStock).slice(0, 4);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ClientLayout>
      <div className="flex flex-col">
        {/* Hero Section - Mind-Blowing */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
            <div 
              className="absolute top-20 right-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float"
              style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
            />
            <div 
              className="absolute bottom-20 left-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float"
              style={{ 
                transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
                animationDelay: '1s'
              }}
            />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium">Premium Collection 2024</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-slide-up">
                Elevate Your
                <br />
                <span className="gradient-text inline-block animate-glow">Digital Lifestyle</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in stagger-2">
                Discover premium products crafted for those who appreciate quality, 
                design, and innovation. Experience excellence in every detail.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in stagger-3">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 hover-glow group"
                  asChild
                >
                  <Link href="/shop">
                    <Zap className="mr-2 h-5 w-5 group-hover:animate-bounce-slow" />
                    Shop Now 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-2 hover-lift"
                  asChild
                >
                  <Link href="/shop?category=Audio">
                    <Star className="mr-2 h-5 w-5" />
                    Explore Audio
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in stagger-4">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">4.9★</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features - Interactive Cards */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover-lift hover:border-primary/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="p-4 rounded-xl bg-primary/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Free Shipping</h3>
                  <p className="text-muted-foreground">
                    On orders over $100. Fast delivery worldwide.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/10 hover-lift hover:border-accent/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="p-4 rounded-xl bg-accent/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">2-Year Warranty</h3>
                  <p className="text-muted-foreground">
                    On all electronics. Your satisfaction guaranteed.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover-lift hover:border-primary/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="p-4 rounded-xl bg-primary/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-500">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Secure Payment</h3>
                  <p className="text-muted-foreground">
                    100% secure transactions. Multiple payment options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products - Premium Showcase */}
        <section className="py-24 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Trending Now</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
                Featured <span className="gradient-text">Products</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in stagger-2">
                Handpicked selection of our most popular items. Premium quality guaranteed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className={`animate-scale-in stagger-${index + 1}`}
                >
                  <ProductCard product={product} onAddToCart={addToCart} />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg hover-glow group"
                asChild
              >
                <Link href="/shop">
                  View All Products 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section - Premium */}
        <section className="py-24 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 overflow-hidden group hover-lift">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative text-center">
                  <Sparkles className="h-12 w-12 text-primary mx-auto mb-6 animate-pulse" />
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
                    Join Our <span className="gradient-text">Community</span>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in stagger-2">
                    Subscribe to get special offers, free giveaways, and exclusive deals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto animate-fade-in stagger-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-4 rounded-xl border-2 border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <Button size="lg" className="px-8 py-4 hover-glow">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 animate-fade-in stagger-4">
                    🎁 Get 10% off your first order when you subscribe!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClientLayout>
  );
}
