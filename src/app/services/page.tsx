import Link from "next/link";
import {
  Truck, Shield, Headphones, RefreshCw, Award, Zap,
  Package, CreditCard, Globe, Clock, Star, ArrowRight,
  Sparkles, Heart, TrendingUp, Gift
} from "lucide-react";
import { getServicesPage } from "@/lib/contentstack";
import { Button } from "@/components/ui/button";
import { ClientLayout } from "@/components/ClientLayout";
import { ParticleBackground } from "@/components/ParticleBackground";

// ✅ Automatically refresh CMS data every 10 seconds
export const revalidate = 10;

const icons: Record<string, React.ElementType> = {
  Truck, Shield, Headphones, RefreshCw, Award, Zap,
  Package, CreditCard, Globe, Clock, Star, ArrowRight,
  Sparkles, Heart, TrendingUp, Gift,
};

// ✅ Helper to animate last 2 words (same as About Page)
function HighlightedHeading({ text }: { text: string }) {
  if (!text) return null;
  const words = text.split(" ");
  const main = words.slice(0, -2).join(" ");
  const lastTwo = words.slice(-2).join(" ");

  return (
    <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-slide-up">
      {main}{" "}
      <span className="gradient-text inline-block animate-bounce-slow">
        {lastTwo}
      </span>
    </h1>
  );
}

export default async function ServicesPage() {
  const data = await getServicesPage();

  if (!data) {
    return (
      <ClientLayout>
        <div className="text-center py-32 text-lg">Error loading Services Page...</div>
      </ClientLayout>
    );
  }

  const {
    hero_heading,
    hero_subtext,
    hero_features,
    core_services,
    additional_services,
    testimonials,
    cta_heading,
    cta_description,
    cta_button_label,
    cta_button_link,
  } = data;

  return (
    <ClientLayout>
      <div className="relative overflow-hidden">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ParticleBackground />

          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-float" />
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in">
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
              <span className="text-sm font-medium">Premium Services</span>
            </div>

            <HighlightedHeading text={hero_heading || "Services That Exceed Expectations"} />

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in stagger-2">
              {hero_subtext || "We don't just sell products, we deliver exceptional experiences with every order."}
            </p>

            {/* Hero Features */}
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in stagger-3">
              {Array.isArray(hero_features) && hero_features.length > 0 ? (
                hero_features.map((item: any, index: number) => {
                  const Icon = icons[item.icon_name as keyof typeof icons] ?? Truck;
                  return (
                    <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover-lift">
                      <Icon className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted-foreground">No hero features added.</p>
              )}
            </div>
          </div>
        </section>

        {/* ================= CORE SERVICES ================= */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                Our <span className="gradient-text">Core Services</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need for a seamless shopping experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(core_services) && core_services.length > 0 ? (
                core_services.map((service: any, index: number) => {
                  const Icon = icons[service.icon_name as keyof typeof icons] ?? Zap;
                  return (
                    <div
                      key={index}
                      className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover-lift"
                    >
                      <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 mb-6">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-6">{service.description}</p>

                      {Array.isArray(service.features) && service.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          {f}
                        </div>
                      ))}
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground">No core services available.</p>
              )}
            </div>
          </div>
        </section>

        {/* ================= ADDITIONAL SERVICES ================= */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="gradient-text">More</span> Benefits
              </h2>
              <p className="text-xl text-muted-foreground">
                Additional perks that make us special
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.isArray(additional_services) && additional_services.length > 0 ? (
                additional_services.map((item: any, index: number) => {
                  const Icon = icons[item.icon_name as keyof typeof icons] ?? Gift;
                  return (
                    <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover-lift">
                      <div className="p-3 rounded-xl bg-purple-500/10 w-fit mb-4">
                        <Icon className="h-6 w-6 text-purple-500" />
                      </div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground">No additional services yet.</p>
              )}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-16">
              Real experiences from real people
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.isArray(testimonials) && testimonials.length > 0 ? (
                testimonials.map((t: any, index: number) => (
                  <div key={index} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover-lift">
                    <div className="flex gap-1 mb-4 justify-center">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-lg mb-6">{t.content}</p>
                    <div className="flex items-center justify-center gap-4">
                      <img src={t.image?.url} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50" />
                      <div>
                        <div className="font-bold">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No testimonials available.</p>
              )}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="h-16 w-16 text-purple-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{cta_heading}</h2>
            <p className="text-xl text-muted-foreground mb-8">{cta_description}</p>
            <Button size="lg" className="px-12 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600" asChild>
              <Link href={cta_button_link?.href || "#"}>
                <Sparkles className="mr-2 h-5 w-5" />
                {cta_button_label}
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </ClientLayout>
  );
}
