"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Users,
  Target,
  Zap,
  Award,
  TrendingUp,
  Heart,
  Globe,
  Shield,
  Star,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientLayout } from "@/components/ClientLayout";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useLivePreview } from "@/hooks/useLivePreview";
import { getAboutPage } from "@/lib/contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

// Icon map for dynamic rendering
const icons: Record<string, React.ElementType> = {
  Sparkles,
  Users,
  Target,
  Zap,
  Award,
  TrendingUp,
  Heart,
  Globe,
  Shield,
  Star,
  Rocket,
};

// ✅ Fancy heading with highlight animation
function HighlightedHeading({
  text,
  fieldTag,
}: {
  text: string;
  fieldTag?: any;
}) {
  if (!text) return null;

  const words = text.split(" ");
  const main = words.slice(0, -2).join(" ");
  const lastTwo = words.slice(-2).join(" ");

  return (
    <h1
      {...(fieldTag ?? {})}
      className="text-6xl md:text-8xl font-bold mb-8 animate-slide-up"
    >
      {main}{" "}
      <span className="gradient-text inline-block animate-bounce-slow">
        {lastTwo}
      </span>
    </h1>
  );
}

export default function AboutPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Contentstack data
  const fetchData = async () => {
    try {
      const result = await getAboutPage();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching About Page data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Enable Live Preview
  useLivePreview(fetchData);

  useEffect(() => {
    if (typeof window !== "undefined" && ContentstackLivePreview?.onEntryChange) {
      ContentstackLivePreview.onEntryChange(() => {
        console.log("🔄 Live Preview update detected, refetching...");
        fetchData();
      });
    }
  }, []);

  if (loading || !data) {
    return (
      <ClientLayout>
        <div className="text-center py-32 text-lg text-muted-foreground">
          Loading About Page...
        </div>
      </ClientLayout>
    );
  }

  const {
    hero_heading,
    hero_subtext,
    hero_button_label,
    hero_button_link,
    secondary_button_label,
    secondary_button_link,
    stats,
    values,
    timeline,
    team,
    cta_heading,
    cta_description,
    cta_button_label,
    cta_button_link,
  } = data;

  return (
    <ClientLayout>
      <div className="relative overflow-hidden">
        {/* ================= Hero Section ================= */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ParticleBackground />

          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in">
                <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
                <span className="text-sm font-medium">About Elite Store</span>
              </div>

              {/* ✅ Live Edit Tag for hero_heading */}
              <HighlightedHeading
                text={hero_heading || "We’re Redefining Digital Shopping"}
                fieldTag={data.$?.hero_heading}
              />

              {/* ✅ Live Edit Tag for hero_subtext */}
              <p
                {...(data.$?.hero_subtext ?? {})}
                className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in stagger-2"
              >
                {hero_subtext}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-3">
                {/* Primary Button */}
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover-glow group"
                  asChild
                >
                  <Link
                    {...(data.$?.hero_button_link ?? {})}
                    href={hero_button_link?.href || "#"}
                  >
                    <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce-slow" />
                    <span {...(data.$?.hero_button_label ?? {})}>
                      {hero_button_label || "Our Story"}
                    </span>
                  </Link>
                </Button>

                {/* Secondary Button */}
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-2 hover-lift"
                  asChild
                >
                  <Link
                    {...(data.$?.secondary_button_link ?? {})}
                    href={secondary_button_link?.href || "#"}
                  >
                    <Star className="mr-2 h-5 w-5" />
                    <span {...(data.$?.secondary_button_label ?? {})}>
                      {secondary_button_label || "Explore Products"}
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Stats Section ================= */}
        <section className="py-24">
          <div
            className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            {...(data.$?.stats ?? {})}
          >
            {Array.isArray(stats) && stats.length > 0 ? (
              stats.map((stat: any, index: number) => {
                const Icon = icons[stat?.icon_name?.trim?.()] ?? Heart;
                return (
                  <div key={index} {...(stat.$ ?? {})} className="group">
                    <div className="p-6 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 inline-block mb-4">
                      <Icon className="h-8 w-8 text-purple-500" />
                    </div>
                    <div
                      {...(stat.$?.value ?? {})}
                      className="text-4xl font-bold gradient-text mb-2"
                    >
                      {stat?.value}
                    </div>
                    <div
                      {...(stat.$?.label ?? {})}
                      className="text-muted-foreground"
                    >
                      {stat?.label}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="col-span-4 text-muted-foreground text-center">
                No statistics available.
              </p>
            )}
          </div>
        </section>

        {/* ================= CTA Section ================= */}
        <section className="py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <Award className="h-16 w-16 text-purple-500 mx-auto mb-6" />
            <h2
              {...(data.$?.cta_heading ?? {})}
              className="text-4xl font-bold mb-4"
            >
              {cta_heading}
            </h2>
            <p
              {...(data.$?.cta_description ?? {})}
              className="text-xl text-muted-foreground mb-8"
            >
              {cta_description}
            </p>
            <Button
              size="lg"
              className="px-12 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600"
              asChild
            >
              <Link
                {...(data.$?.cta_button_link ?? {})}
                href={cta_button_link?.href || "#"}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                <span {...(data.$?.cta_button_label ?? {})}>
                  {cta_button_label || "Learn More"}
                </span>
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </ClientLayout>
  );
}
