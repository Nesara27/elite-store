
// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import {
//   ArrowRight,
//   Percent,
//   Sparkles,
//   Star,
//   Truck,
//   Shield,
//   Zap,
//   Package,
//   TrendingUp,
//   Search,
//   Shirt,
//   ShoppingBag,
//   Watch,
//   Glasses,
//   ChevronLeft,
//   ChevronRight,
//   BadgePercent,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ClientLayout } from "@/components/ClientLayout";
// import { InstantCartToast } from "@/components/InstantCartToast";
// import { useCart } from "@/hooks/useCart";
// import { getHomePage, getProductPage, normalizeSeo, type NormalizedSeo } from "@/lib/contentstack";

// type DealBadge = "B1G1" | "50% OFF" | null;

// type Product = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   image: string;
//   inStock: boolean;
//   rating: number;
//   reviewCount: number;
//   badge?: DealBadge;
//   discountPercent?: number;
// };

// const FALLBACK = {
//   HERO: {
//     title: "Big Fashion Festival",
//     subtitle: "Up to 70% OFF • Top Brands • Free Returns",
//     cta: { label: "Shop New Arrivals", href: "/shop" },
//     banner:
//       "https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=1600&auto=format&fit=crop",
//   },
//   FEATURES: [
//     { icon: Truck, label: "Fast Delivery", sub: "2–4 business days" },
//     { icon: Shield, label: "Secure Payments", sub: "UPI, Cards, CoD" },
//     { icon: Zap, label: "Instant Refunds", sub: "Hassle-free returns" },
//     { icon: Package, label: "Quality Checked", sub: "200+ points" },
//   ],
//   CATEGORIES: [
//     { icon: Shirt, name: "Men", href: "/shop?cat=men" },
//     { icon: ShoppingBag, name: "Women", href: "/shop?cat=women" },
//     { icon: Watch, name: "Accessories", href: "/shop?cat=accessories" },
//     { icon: Glasses, name: "Eyewear", href: "/shop?cat=eyewear" },
//   ],
//   DEALS_PROMOS: [
//     {
//       image:
//         "https://images.unsplash.com/photo-1520975922284-906ae9a4d7b7?q=80&w=1200&auto=format&fit=crop",
//       title: "Flat 50% Off",
//       href: "/shop?deal=flat50",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1520975922284-7746c2a25b0d?q=80&w=1200&auto=format&fit=crop",
//       title: "Buy 1 Get 1",
//       href: "/shop?deal=b1g1",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
//       title: "Under ₹999",
//       href: "/shop?deal=under999",
//     },
//   ],
//   DISCOUNT: {
//     enabled: true,
//     tag: "DISCOUNT",
//     search_placeholder: "Shoes, T-shirts, Tops etc.",
//     banner:
//       "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
//     promos: [
//       {
//         image:
//           "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
//         title: "Sneaker Fest",
//         href: "/shop?tag=sneakers",
//       },
//       {
//         image:
//           "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
//         title: "Ethnic Wear",
//         href: "/shop?tag=ethnic",
//       },
//       {
//         image:
//           "https://images.unsplash.com/photo-1548883354-89cf2b61001a?q=80&w=1200&auto=format&fit=crop",
//         title: "Watches Bonanza",
//         href: "/shop?tag=watches",
//       },
//     ],
//   },
// };

// const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// function FeaturedStrip({
//   items,
//   href = "/shop",
//   speed = 40,
// }: {
//   items: Product[];
//   href?: string;
//   speed?: number;
// }) {
//   const loopItems = useMemo(() => [...items, ...items], [items]);
//   const trackRef = useRef<HTMLDivElement | null>(null);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     const el = trackRef.current;
//     if (!el) return;
//     const totalWidth = el.scrollWidth / 2;
//     const duration = totalWidth / speed;
//     el.style.setProperty("--slide-width", `${totalWidth}px`);
//     el.style.setProperty("--duration", `${duration}s`);
//   }, [loopItems, speed]);

//   return (
//     <div
//       className="relative group"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <button
//         aria-label="Prev"
//         onClick={() => trackRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
//         className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-background/80 p-2 hover:bg-background"
//       >
//         <ChevronLeft className="h-5 w-5" />
//       </button>
//       <button
//         aria-label="Next"
//         onClick={() => trackRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
//         className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-background/80 p-2 hover:bg-background"
//       >
//         <ChevronRight className="h-5 w-5" />
//       </button>

//       <div className="relative overflow-hidden rounded-2xl border">
//         <style>{`
//           @keyframes scroll-x {
//             from { transform: translateX(0); }
//             to   { transform: translateX(calc(var(--slide-width, 1200px) * -1)); }
//           }
//         `}</style>
//         <div
//           ref={trackRef}
//           className="flex gap-4 w-max [animation:scroll-x_var(--duration)_linear_infinite] will-change-transform"
//           style={{ animationPlayState: (isPaused ? "paused" : "running") as any }}
//         >
//           {loopItems.map((p, i) => (
//             <Link
//               key={`${p.id}-${i}`}
//               href={`${href}?highlight=${p.id}`}
//               className="group/card relative shrink-0 w-[78vw] sm:w-[46vw] md:w-[32vw] lg:w-[24vw] xl:w-[20vw] max-w-[360px] mr-1"
//             >
//               <div className="relative overflow-hidden rounded-xl border bg-card">
//                 <img
//                   src={p.image}
//                   alt={p.description || p.name || "Product image"}
//                   className="h-56 w-full object-cover transition-transform group-hover/card:scale-[1.02]"
//                 />

//                 {p.badge && (
//                   <div className="absolute left-2 top-2">
//                     {p.badge === "B1G1" ? (
//                       <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold rounded-md bg-pink-600 text-white shadow">
//                         B1G1
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold rounded-md bg-emerald-600 text-white shadow">
//                         <BadgePercent className="h-3 w-3" />
//                         {p.discountPercent ?? 50}% OFF
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 <div className="p-3">
//                   <p className="font-semibold line-clamp-1">{p.name}</p>
//                   <p className="text-xs text-muted-foreground line-clamp-1">
//                     {p.description}
//                   </p>
//                   <div className="mt-2 flex items-center justify-between">
//                     <span className="text-base font-bold">{currency(p.price)}</span>
//                     <span className="text-xs text-muted-foreground">
//                       ★ {p.rating.toFixed(1)} ({p.reviewCount})
//                     </span>
//                   </div>
//                 </div>

//                 <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover/card:translate-y-0 transition-transform">
//                   <div className="m-2 rounded-lg bg-background/90 border px-3 py-2 text-sm font-semibold flex items-center justify-center">
//                     Shop this style <ArrowRight className="ml-1 h-4 w-4" />
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       <div className="mt-2 text-xs text-muted-foreground">
//         Tip: hover to pause • arrows to nudge
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const { addToCart } = useCart();
//   const [toastProduct, setToastProduct] = useState<Product | null>(null);
//   const [search, setSearch] = useState("");

//   const [hero, setHero] = useState(FALLBACK.HERO);
//   const [dealsPromos, setDealsPromos] = useState(FALLBACK.DEALS_PROMOS);
//   const [discount, setDiscount] = useState(FALLBACK.DISCOUNT);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [slideIndex, setSlideIndex] = useState(0);

//   const [seo, setSeo] = useState<NormalizedSeo | null>(null);

//   const discountRef = useRef<HTMLDivElement | null>(null);
//   const promoLen = useMemo(() => discount.promos?.length || 0, [discount.promos]);

//   useEffect(() => {
//     if (!promoLen) return;
//     const id = setInterval(() => setSlideIndex((i) => (i + 1) % promoLen), 2400);
//     return () => clearInterval(id);
//   }, [promoLen]);

//   // ===== Fetch from CMS (EU) =====
//   useEffect(() => {
//     (async () => {
//       try {
//         const home = await getHomePage();

//         if (home) {
//           // SEO (normalize supports both new `seo` group and legacy `seo_*`)
//           setSeo(normalizeSeo(home));

//           // HERO
//           const h = home.hero || {};
//           const bannerUrl = h.banner_image?.url || h.banner || FALLBACK.HERO.banner;
//           setHero({
//             title: h.heading || FALLBACK.HERO.title,
//             subtitle: h.subheading || FALLBACK.HERO.subtitle,
//             cta: {
//               label: h?.cta?.label || FALLBACK.HERO.cta.label,
//               href: h?.cta?.link?.href || h?.cta?.link?.url || FALLBACK.HERO.cta.href,
//             },
//             banner: bannerUrl,
//           });

//           // DEALS
//           const deals = Array.isArray(home.deals_promos) ? home.deals_promos : [];
//           setDealsPromos(
//             deals.map((d: any) => ({
//               image: d.image?.url || d.image || FALLBACK.DEALS_PROMOS[0].image,
//               title: d.title || "Deal",
//               href: d.href?.href || d.href?.url || "/shop",
//             }))
//           );

//           // DISCOUNT
//           const ds = home.discount_section || {};
//           const enabled =
//             typeof ds.enabled === "boolean"
//               ? ds.enabled
//               : Boolean(ds.enabled?.href || ds.enabled?.url || ds.enabled?.title);
//           const promos = Array.isArray(ds.promos)
//             ? ds.promos.map((p: any) => ({
//                 image: p.image?.url || p.image || FALLBACK.DISCOUNT.promos[0].image,
//                 title: p.title || "Promo",
//                 href: p.href?.href || p.href?.url || "/shop",
//               }))
//             : FALLBACK.DISCOUNT.promos;

//           setDiscount({
//             enabled: enabled ?? true,
//             tag: ds.tag || FALLBACK.DISCOUNT.tag,
//             search_placeholder:
//               ds.search_placeholder || FALLBACK.DISCOUNT.search_placeholder,
//             banner: ds.banner?.url || ds.banner || FALLBACK.DISCOUNT.banner,
//             promos,
//           });

//           // PRODUCTS
//           const homeProducts = Array.isArray(home.products) ? home.products : [];
//           const mappedFromHome: Product[] = homeProducts.map((p: any, idx: number) => {
//             const badgeRaw =
//               p.badge?.toString?.().toUpperCase?.() || p.badge || null;
//             const badge: DealBadge =
//               badgeRaw === "B1G1" ? "B1G1" : badgeRaw === "50% OFF" ? "50% OFF" : null;

//             return {
//               id: p.id || p.id1 || p.uid || `hp-${idx}`,
//               name: p.name || p.title || "Product",
//               description: p.description || "",
//               price: Number(p.price ?? 0),
//               category: p.category || "General",
//               image: p.image?.url || p.image || "/placeholder.png",
//               inStock:
//                 typeof p.in_stock === "boolean"
//                   ? p.in_stock
//                   : p.in_stock === "true"
//                   ? true
//                   : true,
//               rating: Number(p.rating ?? 4.5),
//               reviewCount: Number(p.review_count ?? p.reviewcount ?? 0),
//               badge,
//               discountPercent:
//                 typeof p.discount_percent === "number" ? p.discount_percent : undefined,
//             };
//           });

//           if (mappedFromHome.length) {
//             setProducts(mappedFromHome);
//           } else {
//             const productPage = await getProductPage();
//             const cmsProducts = Array.isArray(productPage?.products)
//               ? productPage.products
//               : [];
//             const mappedFromProductPage: Product[] = cmsProducts.map(
//               (p: any, idx: number) => {
//                 const badgeRaw =
//                   p.badge?.toString?.().toUpperCase?.() || p.badge || null;
//                 const badge: DealBadge =
//                   badgeRaw === "B1G1"
//                     ? "B1G1"
//                     : badgeRaw === "50% OFF"
//                     ? "50% OFF"
//                     : null;

//                 return {
//                   id: p.id || p.uid || `p-${idx}`,
//                   name: p.name || p.title || "Product",
//                   description: p.description || "",
//                   price: Number(p.price ?? 0),
//                   category: p.category || "General",
//                   image: p.image?.url || p.image || "/placeholder.png",
//                   inStock:
//                     typeof p.in_stock === "boolean"
//                       ? p.in_stock
//                       : p.in_stock === "true"
//                       ? true
//                       : true,
//                   rating: Number(p.rating ?? 4.5),
//                   reviewCount: Number(p.review_count ?? p.reviewcount ?? 0),
//                   badge,
//                   discountPercent:
//                     typeof p.discount_percent === "number"
//                       ? p.discount_percent
//                       : undefined,
//                 };
//               }
//             );
//             setProducts(mappedFromProductPage);
//           }
//         }
//       } catch (e) {
//         console.error("❌ Home fetch error:", e);
//       }
//     })();
//   }, []);

//   const ogImg =
//     (typeof seo?.og_image === "string" && seo?.og_image) ||
//     (seo?.og_image && (seo.og_image as any).url) ||
//     undefined;

//   // JSON-LD prepared from normalized seo (falls back to basic)
//   const ldJson = seo?.structured_data
//     ? seo.structured_data
//     : JSON.stringify({
//         "@context": "https://schema.org",
//         "@type": "WebSite",
//         name: "Elite Store",
//         url: seo?.canonical_url || "https://www.elitestore.com/",
//         keywords: Array.isArray(seo?.keywords) ? seo?.keywords.join(", ") : undefined,
//         potentialAction: {
//           "@type": "SearchAction",
//           target: "https://www.elitestore.com/shop?search={search_term_string}",
//           "query-input": "required name=search_term_string",
//         },
//       });

//   return (
//     <ClientLayout>
//       {/* ====== SEO HEAD ====== */}
//       <Head>
//         <title>{seo?.title || hero.title || "Elite Store"}</title>
//         {seo?.description && <meta name="description" content={seo.description} />}
//         {seo?.canonical_url && <link rel="canonical" href={seo.canonical_url} />}

//         {/* Robots */}
//         <meta
//           name="robots"
//           content={`${seo?.noindex ? "noindex" : "index"}, ${seo?.nofollow ? "nofollow" : "follow"}`}
//         />

//         {/* Keywords (optional) */}
//         {Array.isArray(seo?.keywords) && seo.keywords.length > 0 && (
//           <meta name="keywords" content={seo.keywords.join(", ")} />
//         )}

//         {/* Open Graph */}
//         <meta property="og:type" content="website" />
//         <meta property="og:title" content={seo?.og_title || seo?.title || hero.title} />
//         {seo?.og_description && (
//           <meta property="og:description" content={seo.og_description} />
//         )}
//         {ogImg && <meta property="og:image" content={ogImg} />}
//         {seo?.canonical_url && <meta property="og:url" content={seo.canonical_url} />}

//         {/* Twitter */}
//         <meta name="twitter:card" content={seo?.twitter_card || "summary_large_image"} />
//         <meta name="twitter:title" content={seo?.og_title || seo?.title || hero.title} />
//         {seo?.og_description && (
//           <meta name="twitter:description" content={seo.og_description} />
//         )}
//         {ogImg && <meta name="twitter:image" content={ogImg} />}

//         {/* JSON-LD */}
//         {ldJson && (
//           <script
//             type="application/ld+json"
//             // seo.structured_data is stored as a string already, else we stringified above
//             dangerouslySetInnerHTML={{ __html: ldJson }}
//           />
//         )}
//       </Head>

//       {/* ====== PAGE ====== */}
//       <div className="flex flex-col">
//         {/* HERO */}
//         <section className="relative">
//           <div className="relative h-[52vh] md:h-[64vh] w-full overflow-hidden rounded-none md:rounded-3xl">
//             <video
//               src={hero.banner}
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="absolute inset-0 h-full w-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
//             <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24">
//               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 border text-xs font-semibold">
//                 <Sparkles className="h-3.5 w-3.5" />
//                 New Season • Fresh Drops
//               </span>
//               <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
//                 {hero.title}
//               </h1>
//               <p className="mt-2 md:mt-3 text-base md:text-lg text-muted-foreground">
//                 {hero.subtitle}
//               </p>
//               <div className="mt-6">
//                 <Button size="lg" className="font-bold" asChild>
//                   <Link href={hero.cta.href}>
//                     {hero.cta.label}
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CATEGORY STRIP */}
//         <section className="container mx-auto px-4 md:px-6">
//           <div className="flex gap-3 overflow-x-auto no-scrollbar py-5">
//             {FALLBACK.CATEGORIES.map((c) => {
//               const Icon = c.icon;
//               return (
//                 <Link
//                   key={c.name}
//                   href={c.href}
//                   className="shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:border-primary hover:text-primary transition-colors"
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span className="text-sm font-semibold">{c.name}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </section>

//         {/* FEATURE ICONS */}
//         <section className="py-6">
//           <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//             {FALLBACK.FEATURES.map((f, i) => {
//               const Icon = f.icon;
//               return (
//                 <div
//                   key={i}
//                   className="rounded-2xl border bg-card/50 p-4 flex items-center gap-3"
//                 >
//                   <div className="rounded-xl p-3 border">
//                     <Icon className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold">{f.label}</p>
//                     <p className="text-xs text-muted-foreground">{f.sub}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         {/* DEALS */}
//         <section className="py-10">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="flex items-center justify-between mb-5">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border">
//                 <TrendingUp className="h-4 w-4" />
//                 <span className="text-sm font-medium">Today’s Top Deals</span>
//               </div>
//               <Link
//                 href="/shop?sort=trending"
//                 className="text-sm font-semibold hover:underline"
//               >
//                 View all
//               </Link>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {dealsPromos.map((p) => (
//                 <Link
//                   key={p.title}
//                   href={p.href}
//                   className="group relative rounded-2xl overflow-hidden border"
//                 >
//                   <img
//                     src={p.image}
//                     alt={p.title}
//                     className="h-56 w-full object-cover transition-transform group-hover:scale-[1.02]"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
//                   <div className="absolute bottom-3 left-3">
//                     <p className="text-xl font-black">{p.title}</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* SEARCH + DISCOUNT */}
//         {discount.enabled && (
//           <section ref={discountRef} className="py-10 border-t">
//             <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
//               <div className="rounded-2xl border p-5 bg-card/50">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
//                   <Percent className="h-4 w-4" />
//                   <span className="font-semibold tracking-wider">
//                     {discount.tag}
//                   </span>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-2">Find your style</h3>
//                 <p className="text-sm text-muted-foreground mb-4">
//                   Search brands, categories, or collections
//                 </p>
//                 <div className="flex gap-2">
//                   <div className="flex-1 inline-flex items-center gap-2 border rounded-xl px-3">
//                     <Search className="h-4 w-4" />
//                     <input
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       placeholder={discount.search_placeholder}
//                       className="w-full bg-transparent py-3 outline-none text-sm"
//                     />
//                   </div>
//                   <Button
//                     onClick={() => console.log("Search:", search)}
//                     className="px-6"
//                   >
//                     SEARCH
//                   </Button>
//                 </div>
//               </div>

//               <Link
//                 href="/shop?tag=festival"
//                 className="rounded-2xl overflow-hidden border block"
//                 aria-label="Discount banner"
//               >
//                 <img
//                   src={discount.banner}
//                   alt="discount"
//                   className="w-full h-[260px] object-cover hover:scale-[1.01] transition-transform"
//                 />
//               </Link>
//             </div>

//             <div className="container mx-auto px-4 md:px-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[0, 1, 2].map((col) => {
//                 const pick = (offset: number) =>
//                   discount.promos[
//                     (slideIndex + col + offset) % (discount.promos.length || 1)
//                   ];
//                 const item = pick(0);
//                 return (
//                   <Link
//                     key={col}
//                     href={item.href}
//                     className="rounded-2xl overflow-hidden border block h-[220px]"
//                     aria-label={item.title}
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>
//         )}

//         {/* FEATURED PRODUCTS */}
//         <section className="py-12 border-t">
//           <div className="container mx-auto px-4 md:px-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border">
//                 <Star className="h-4 w-4" />
//                 <span className="text-sm font-medium">Featured Products</span>
//               </div>
//               <Link href="/shop" className="text-sm font-semibold hover:underline">
//                 Explore all
//               </Link>
//             </div>
//             <FeaturedStrip items={products} href="/shop" speed={55} />
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="py-14">
//           <div className="container mx-auto px-4 md:px-6 text-center">
//             <Star className="h-14 w-14 mx-auto mb-4" />
//             <h3 className="text-3xl md:text-4xl font-black mb-2">
//               New Drops Every Day
//             </h3>
//             <p className="text-muted-foreground mb-6">
//               Explore thousands of styles across categories
//             </p>
//             <Button size="lg" asChild>
//               <Link href="/shop">Start Shopping</Link>
//             </Button>
//           </div>
//         </section>
//       </div>

//       <InstantCartToast
//         product={toastProduct}
//         onClose={() => setToastProduct(null)}
//       />
//     </ClientLayout>
//   );
// }
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  Percent,
  Sparkles,
  Star,
  Truck,
  Shield,
  Zap,
  Package,
  TrendingUp,
  Search,
  Shirt,
  ShoppingBag,
  Watch,
  Glasses,
  ChevronLeft,
  ChevronRight,
  BadgePercent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientLayout } from "@/components/ClientLayout";
import { InstantCartToast } from "@/components/InstantCartToast";
import { useCart } from "@/hooks/useCart";
import { getHomePage, getProductPage, normalizeSeo, type NormalizedSeo } from "@/lib/contentstack";

type DealBadge = "B1G1" | "50% OFF" | null;

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  badge?: DealBadge;
  discountPercent?: number;
};

const FALLBACK = {
  HERO: {
    title: "Big Fashion Festival",
    subtitle: "Up to 70% OFF • Top Brands • Free Returns",
    cta: { label: "Shop New Arrivals", href: "/shop" },
    banner:
      "https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=1600&auto=format&fit=crop",
  },
  FEATURES: [
    { icon: Truck, label: "Fast Delivery", sub: "2–4 business days" },
    { icon: Shield, label: "Secure Payments", sub: "UPI, Cards, CoD" },
    { icon: Zap, label: "Instant Refunds", sub: "Hassle-free returns" },
    { icon: Package, label: "Quality Checked", sub: "200+ points" },
  ],
  CATEGORIES: [
    { icon: Shirt, name: "Men", href: "/shop?cat=men" },
    { icon: ShoppingBag, name: "Women", href: "/shop?cat=women" },
    { icon: Watch, name: "Accessories", href: "/shop?cat=accessories" },
    { icon: Glasses, name: "Eyewear", href: "/shop?cat=eyewear" },
  ],
  DEALS_PROMOS: [
    {
      image:
        "https://images.unsplash.com/photo-1520975922284-906ae9a4d7b7?q=80&w=1200&auto=format&fit=crop",
      title: "Flat 50% Off",
      href: "/shop?deal=flat50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1520975922284-7746c2a25b0d?q=80&w=1200&auto=format&fit=crop",
      title: "Buy 1 Get 1",
      href: "/shop?deal=b1g1",
    },
    {
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
      title: "Under ₹999",
      href: "/shop?deal=under999",
    },
  ],
  DISCOUNT: {
    enabled: true,
    tag: "DISCOUNT",
    search_placeholder: "Shoes, T-shirts, Tops etc.",
    banner:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    promos: [
      {
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
        title: "Sneaker Fest",
        href: "/shop?tag=sneakers",
      },
      {
        image:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
        title: "Ethnic Wear",
        href: "/shop?tag=ethnic",
      },
      {
        image:
          "https://images.unsplash.com/photo-1548883354-89cf2b61001a?q=80&w=1200&auto=format&fit=crop",
        title: "Watches Bonanza",
        href: "/shop?tag=watches",
      },
    ],
  },
};

const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function FeaturedStrip({
  items,
  href = "/shop",
  speed = 40,
}: {
  items: Product[];
  href?: string;
  speed?: number;
}) {
  const loopItems = useMemo(() => [...items, ...items], [items]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const totalWidth = el.scrollWidth / 2;
    const duration = totalWidth / speed;
    el.style.setProperty("--slide-width", `${totalWidth}px`);
    el.style.setProperty("--duration", `${duration}s`);
  }, [loopItems, speed]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        aria-label="Prev"
        onClick={() => trackRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-background/80 p-2 hover:bg-background"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next"
        onClick={() => trackRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-background/80 p-2 hover:bg-background"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="relative overflow-hidden rounded-2xl border">
        <style>{`
          @keyframes scroll-x {
            from { transform: translateX(0); }
            to   { transform: translateX(calc(var(--slide-width, 1200px) * -1)); }
          }
        `}</style>
        <div
          ref={trackRef}
          className="flex gap-4 w-max [animation:scroll-x_var(--duration)_linear_infinite] will-change-transform"
          style={{ animationPlayState: (isPaused ? "paused" : "running") as any }}
        >
          {loopItems.map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              href={`${href}?highlight=${p.id}`}
              className="group/card relative shrink-0 w-[78vw] sm:w-[46vw] md:w-[32vw] lg:w-[24vw] xl:w-[20vw] max-w-[360px] mr-1"
            >
              <div className="relative overflow-hidden rounded-xl border bg-card">
                <img
                  src={p.image}
                  alt={p.description || p.name || "Product image"}
                  className="h-56 w-full object-cover transition-transform group-hover/card:scale-[1.02]"
                />

                {p.badge && (
                  <div className="absolute left-2 top-2">
                    {p.badge === "B1G1" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold rounded-md bg-pink-600 text-white shadow">
                        B1G1
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold rounded-md bg-emerald-600 text-white shadow">
                        <BadgePercent className="h-3 w-3" />
                        {p.discountPercent ?? 50}% OFF
                      </span>
                    )}
                  </div>
                )}

                <div className="p-3">
                  <p className="font-semibold line-clamp-1">{p.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {p.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-bold">{currency(p.price)}</span>
                    <span className="text-xs text-muted-foreground">
                      ★ {p.rating.toFixed(1)} ({p.reviewCount})
                    </span>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover/card:translate-y-0 transition-transform">
                  <div className="m-2 rounded-lg bg-background/90 border px-3 py-2 text-sm font-semibold flex items-center justify-center">
                    Shop this style <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        Tip: hover to pause • arrows to nudge
      </div>
    </div>
  );
}

export default function HomePage() {
  const { addToCart } = useCart();
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  const [hero, setHero] = useState(FALLBACK.HERO);
  const [dealsPromos, setDealsPromos] = useState(FALLBACK.DEALS_PROMOS);
  const [discount, setDiscount] = useState(FALLBACK.DISCOUNT);
  const [products, setProducts] = useState<Product[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const [seo, setSeo] = useState<NormalizedSeo | null>(null);

  const discountRef = useRef<HTMLDivElement | null>(null);
  const promoLen = useMemo(() => discount.promos?.length || 0, [discount.promos]);

  useEffect(() => {
    if (!promoLen) return;
    const id = setInterval(() => setSlideIndex((i) => (i + 1) % promoLen), 2400);
    return () => clearInterval(id);
  }, [promoLen]);

  // ===== Fetch from CMS (EU) =====
  useEffect(() => {
    (async () => {
      try {
        const home = await getHomePage();

        if (home) {
          // SEO
          setSeo(normalizeSeo(home));

          // HERO
          const h = home.hero || {};
          const bannerUrl = h.banner_image?.url || h.banner || FALLBACK.HERO.banner;
          setHero({
            title: h.heading || FALLBACK.HERO.title,
            subtitle: h.subheading || FALLBACK.HERO.subtitle,
            cta: {
              label: h?.cta?.label || FALLBACK.HERO.cta.label,
              href: h?.cta?.link?.href || h?.cta?.link?.url || FALLBACK.HERO.cta.href,
            },
            banner: bannerUrl,
          });

          // DEALS
          const deals = Array.isArray(home.deals_promos) ? home.deals_promos : [];
          setDealsPromos(
            deals.map((d: any) => ({
              image: d.image?.url || d.image || FALLBACK.DEALS_PROMOS[0].image,
              title: d.title || "Deal",
              href: d.href?.href || d.href?.url || "/shop",
            }))
          );

          // DISCOUNT
          const ds = home.discount_section || {};
          const enabled =
            typeof ds.enabled === "boolean"
              ? ds.enabled
              : Boolean(ds.enabled?.href || ds.enabled?.url || ds.enabled?.title);
          const promos = Array.isArray(ds.promos)
            ? ds.promos.map((p: any) => ({
                image: p.image?.url || p.image || FALLBACK.DISCOUNT.promos[0].image,
                title: p.title || "Promo",
                href: p.href?.href || p.href?.url || "/shop",
              }))
            : FALLBACK.DISCOUNT.promos;

          setDiscount({
            enabled: enabled ?? true,
            tag: ds.tag || FALLBACK.DISCOUNT.tag,
            search_placeholder:
              ds.search_placeholder || FALLBACK.DISCOUNT.search_placeholder,
            banner: ds.banner?.url || ds.banner || FALLBACK.DISCOUNT.banner,
            promos,
          });

          // PRODUCTS
          const homeProducts = Array.isArray(home.products) ? home.products : [];
          const mappedFromHome: Product[] = homeProducts.map((p: any, idx: number) => {
            const badgeRaw =
              p.badge?.toString?.().toUpperCase?.() || p.badge || null;
            const badge: DealBadge =
              badgeRaw === "B1G1" ? "B1G1" : badgeRaw === "50% OFF" ? "50% OFF" : null;

            return {
              id: p.id || p.id1 || p.uid || `hp-${idx}`,
              name: p.name || p.title || "Product",
              description: p.description || "",
              price: Number(p.price ?? 0),
              category: p.category || "General",
              image: p.image?.url || p.image || "/placeholder.png",
              inStock:
                typeof p.in_stock === "boolean"
                  ? p.in_stock
                  : p.in_stock === "true"
                  ? true
                  : true,
              rating: Number(p.rating ?? 4.5),
              reviewCount: Number(p.review_count ?? p.reviewcount ?? 0),
              badge,
              discountPercent:
                typeof p.discount_percent === "number" ? p.discount_percent : undefined,
            };
          });

          if (mappedFromHome.length) {
            setProducts(mappedFromHome);
          } else {
            const productPage = await getProductPage();
            const cmsProducts = Array.isArray(productPage?.products)
              ? productPage.products
              : [];
            const mappedFromProductPage: Product[] = cmsProducts.map(
              (p: any, idx: number) => {
                const badgeRaw =
                  p.badge?.toString?.().toUpperCase?.() || p.badge || null;
                const badge: DealBadge =
                  badgeRaw === "B1G1"
                    ? "B1G1"
                    : badgeRaw === "50% OFF"
                    ? "50% OFF"
                    : null;

                return {
                  id: p.id || p.uid || `p-${idx}`,
                  name: p.name || p.title || "Product",
                  description: p.description || "",
                  price: Number(p.price ?? 0),
                  category: p.category || "General",
                  image: p.image?.url || p.image || "/placeholder.png",
                  inStock:
                    typeof p.in_stock === "boolean"
                      ? p.in_stock
                      : p.in_stock === "true"
                      ? true
                      : true,
                  rating: Number(p.rating ?? 4.5),
                  reviewCount: Number(p.review_count ?? p.reviewcount ?? 0),
                  badge,
                  discountPercent:
                    typeof p.discount_percent === "number"
                      ? p.discount_percent
                      : undefined,
                };
              }
            );
            setProducts(mappedFromProductPage);
          }
        }
      } catch (e) {
        console.error("❌ Home fetch error:", e);
      }
    })();
  }, []);

  const ogImg =
    (typeof seo?.og_image === "string" && seo?.og_image) ||
    (seo?.og_image && (seo.og_image as any).url) ||
    undefined;

  // JSON-LD prepared from normalized seo (falls back to basic)
  const ldJson = seo?.structured_data
    ? seo.structured_data
    : JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Elite Store",
        url: seo?.canonical_url || "https://www.elitestore.com/",
        keywords: Array.isArray(seo?.keywords) ? seo?.keywords.join(", ") : undefined,
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.elitestore.com/shop?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      });

  return (
    <ClientLayout>
      {/* Lytics tracking tag (after interactive) */}
      <Script
        id="lytics-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
jstag.init({ src: 'https://c.lytics.io/api/tag/310c5dfc29f534db76db2f91db7477d8/latest.min.js' });
jstag.pageView();
          `,
        }}
      />

      {/* ====== SEO HEAD ====== */}
      <Head>
        <title>{seo?.title || hero.title || "Elite Store"}</title>
        {seo?.description && <meta name="description" content={seo.description} />}
        {seo?.canonical_url && <link rel="canonical" href={seo.canonical_url} />}

        {/* Robots */}
        <meta
          name="robots"
          content={`${seo?.noindex ? "noindex" : "index"}, ${seo?.nofollow ? "nofollow" : "follow"}`}
        />

        {/* Keywords (optional) */}
        {Array.isArray(seo?.keywords) && seo.keywords.length > 0 && (
          <meta name="keywords" content={seo.keywords.join(", ")} />
        )}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo?.og_title || seo?.title || hero.title} />
        {seo?.og_description && (
          <meta property="og:description" content={seo.og_description} />
        )}
        {ogImg && <meta property="og:image" content={ogImg} />}
        {seo?.canonical_url && <meta property="og:url" content={seo.canonical_url} />}

        {/* Twitter */}
        <meta name="twitter:card" content={seo?.twitter_card || "summary_large_image"} />
        <meta name="twitter:title" content={seo?.og_title || seo?.title || hero.title} />
        {seo?.og_description && (
          <meta name="twitter:description" content={seo.og_description} />
        )}
        {ogImg && <meta name="twitter:image" content={ogImg} />}

        {/* JSON-LD */}
        {ldJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: ldJson }}
          />
        )}
      </Head>

      {/* ====== PAGE ====== */}
      <div className="flex flex-col">
        {/* HERO */}
        <section className="relative">
          <div className="relative h-[52vh] md:h-[64vh] w-full overflow-hidden rounded-none md:rounded-3xl">
            <video
              src={hero.banner}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 border text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                New Season • Fresh Drops
              </span>
              <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
                {hero.title}
              </h1>
              <p className="mt-2 md:mt-3 text-base md:text-lg text-muted-foreground">
                {hero.subtitle}
              </p>
              <div className="mt-6">
                <Button size="lg" className="font-bold" asChild>
                  <Link href={hero.cta.href}>
                    {hero.cta.label}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY STRIP */}
        <section className="container mx-auto px-4 md:px-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-5">
            {FALLBACK.CATEGORIES.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.name}
                  href={c.href}
                  className="shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-semibold">{c.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FEATURE ICONS */}
        <section className="py-6">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {FALLBACK.FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border bg-card/50 p-4 flex items-center gap-3"
                >
                  <div className="rounded-xl p-3 border">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{f.label}</p>
                    <p className="text-xs text-muted-foreground">{f.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DEALS */}
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Today’s Top Deals</span>
              </div>
              <Link
                href="/shop?sort=trending"
                className="text-sm font-semibold hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dealsPromos.map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  className="group relative rounded-2xl overflow-hidden border"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-56 w-full object-cover transition-transform group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-xl font-black">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEARCH + DISCOUNT */}
        {discount.enabled && (
          <section ref={discountRef} className="py-10 border-t">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="rounded-2xl border p-5 bg-card/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Percent className="h-4 w-4" />
                  <span className="font-semibold tracking-wider">
                    {discount.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Find your style</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Search brands, categories, or collections
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 inline-flex items-center gap-2 border rounded-xl px-3">
                    <Search className="h-4 w-4" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={discount.search_placeholder}
                      className="w-full bg-transparent py-3 outline-none text-sm"
                    />
                  </div>
                  <Button
                    onClick={() => console.log("Search:", search)}
                    className="px-6"
                  >
                    SEARCH
                  </Button>
                </div>
              </div>

              <Link
                href="/shop?tag=festival"
                className="rounded-2xl overflow-hidden border block"
                aria-label="Discount banner"
              >
                <img
                  src={discount.banner}
                  alt="discount"
                  className="w-full h-[260px] object-cover hover:scale-[1.01] transition-transform"
                />
              </Link>
            </div>

            <div className="container mx-auto px-4 md:px-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((col) => {
                const pick = (offset: number) =>
                  discount.promos[
                    (slideIndex + col + offset) % (discount.promos.length || 1)
                  ];
                const item = pick(0);
                return (
                  <Link
                    key={col}
                    href={item.href}
                    className="rounded-2xl overflow-hidden border block h-[220px]"
                    aria-label={item.title}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* FEATURED PRODUCTS */}
        <section className="py-12 border-t">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">Featured Products</span>
              </div>
              <Link href="/shop" className="text-sm font-semibold hover:underline">
                Explore all
              </Link>
            </div>
            <FeaturedStrip items={products} href="/shop" speed={55} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-14">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <Star className="h-14 w-14 mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-black mb-2">
              New Drops Every Day
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore thousands of styles across categories
            </p>
            <Button size="lg" asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        </section>
      </div>

      <InstantCartToast
        product={toastProduct}
        onClose={() => setToastProduct(null)}
      />
    </ClientLayout>
  );
}
