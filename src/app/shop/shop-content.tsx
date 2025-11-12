
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { Search, SlidersHorizontal } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { ProductCard } from "@/components/ui/ProductCard";
// import { ClientLayout } from "@/components/ClientLayout";
// import { useCart } from "@/hooks/useCart";
// import { getShopPage, getProductPage, getAllProducts } from "@/lib/contentstack";

// type LocalProduct = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   originalPrice?: number;
//   category: string;
//   image: string;
//   images?: string[];
//   inStock: boolean;
//   rating: number;
//   reviewCount: number;
//   features?: string[];
// };

// export function ShopPageContent() {
//   const searchParams = useSearchParams();
//   const { addToCart } = useCart();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string>(
//     searchParams.get("category") || "all"
//   );
//   const [sortBy, setSortBy] = useState("featured");

//   const [products, setProducts] = useState<LocalProduct[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   // =====================================
//   // 🔄 Fetch Products and Categories
//   // =====================================
//   useEffect(() => {
//     let mounted = true;

//     (async () => {
//       setLoading(true);
//       setErrorMsg(null);

//       try {
//         let data: any = await getShopPage();
//         console.log("📦 shop_page raw:", data);

//         if (!data || !data.products) {
//           console.warn("⚠️ No shop_page data. Falling back to product_page...");
//           data = await getProductPage();
//         }

//         if (!data || !data.products) {
//           console.warn("⚠️ No product_page data. Falling back to all products...");
//           const allProducts = await getAllProducts();
//           data = { products: allProducts, categories: [] };
//         }

//         if (!data || !data.products) {
//           throw new Error("No product data found from any source.");
//         }

//         // Normalize categories
//         const rawCategories = data.categories ?? [];
//         const normalizedCategories: string[] = [];

//         if (Array.isArray(rawCategories)) {
//           for (const c of rawCategories) {
//             if (!c) continue;
//             if (typeof c === "string") normalizedCategories.push(c);
//             else if (typeof c === "object") {
//               const name =
//                 c.category_name ?? c.name ?? c.title ?? undefined;
//               if (name) normalizedCategories.push(String(name).trim());
//             }
//           }
//         }

//         const uniqueCats = Array.from(new Set(normalizedCategories)).filter(Boolean);

//         // Normalize products
//         const rawProducts = data.products ?? [];
//         const normalizedProducts: LocalProduct[] = [];

//         for (const p of rawProducts) {
//           if (!p) continue;

//           const id =
//             p.uid ||
//             p.identity ||
//             p._metadata?.uid ||
//             p.title ||
//             Math.random().toString(36).slice(2, 9);

//           const imageUrl =
//             typeof p.image === "string"
//               ? p.image
//               : p.image?.url || "/placeholder.png";

//           let features: string[] | undefined;
//           if (p.features) {
//             if (Array.isArray(p.features)) {
//               features = p.features.map((f: any) =>
//                 typeof f === "string" ? f : f?.feature_text ?? ""
//               );
//             } else if (typeof p.features === "string") {
//               features = p.features.split(/\r?\n/).map((s: string) => s.trim());
//             }
//           }

//           normalizedProducts.push({
//             id: String(id),
//             name: p.name ?? p.title ?? "Unnamed Product",
//             description: p.description ?? "",
//             price: Number(p.price ?? 0),
//             originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
//             category:
//               p.category ??
//               (Array.isArray(p.categories) ? p.categories[0] : "Uncategorized"),
//             image: imageUrl,
//             images:
//               Array.isArray(p.images) && p.images.length
//                 ? p.images.map((img: any) => img.url ?? img)
//                 : [imageUrl],
//             inStock: p.inStock ?? true,
//             rating: Number(p.rating ?? 4.5),
//             reviewCount: Number(p.reviewCount ?? 0),
//             features,
//           });
//         }

//         if (mounted) {
//           setCategories(uniqueCats);
//           setProducts(normalizedProducts);
//         }
//       } catch (err: any) {
//         console.error("❌ Error fetching Shop Page:", err);
//         const msg = err?.message || "Failed to fetch products from Contentstack.";
//         if (mounted) setErrorMsg(msg);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // =====================================
//   // 🔁 Sync URL Params
//   // =====================================
//   useEffect(() => {
//     const category = searchParams.get("category");
//     const search = searchParams.get("search");
//     if (category) setSelectedCategory(category);
//     if (search) setSearchQuery(search);
//   }, [searchParams]);

//   // =====================================
//   // 🧠 Filter & Sort Logic
//   // =====================================
//   const filteredProducts = useMemo(() => {
//     let result = [...products];

//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.description.toLowerCase().includes(q) ||
//           p.category.toLowerCase().includes(q)
//       );
//     }

//     // ✅ Smarter Category Matching
//     if (selectedCategory && selectedCategory !== "all") {
//       const cat = selectedCategory.toLowerCase();

//       result = result.filter((p) => {
//         const prodCat = (p.category || "").toLowerCase();

//         if (cat === "clothing" || cat === "clothes") {
//           return prodCat.includes("clothing");
//         }
//         if (cat === "footwear" || cat === "shoes") {
//           return prodCat.includes("footwear");
//         }
//         return prodCat === cat;
//       });
//     }

//     // Sorting
//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "rating":
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//       case "name":
//         result.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       default:
//         break;
//     }

//     return result;
//   }, [products, searchQuery, selectedCategory, sortBy]);

//   // =====================================
//   // 🖼️ UI RENDER
//   // =====================================
//   if (loading) {
//     return (
//       <ClientLayout>
//         <div className="flex justify-center items-center min-h-screen text-xl py-40">
//           Loading Shop...
//         </div>
//       </ClientLayout>
//     );
//   }

//   if (errorMsg) {
//     return (
//       <ClientLayout>
//         <div className="flex flex-col items-center justify-center min-h-screen text-center py-40">
//           <div className="text-2xl text-red-600 font-semibold mb-4">
//             ❌ Error loading Shop Page.
//           </div>
//           <div className="text-sm text-muted-foreground mb-6 max-w-lg">{errorMsg}</div>
//           <Button onClick={() => window.location.reload()}>Retry</Button>
//         </div>
//       </ClientLayout>
//     );
//   }

//   return (
//     <ClientLayout>
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">Shop</h1>
//           <p className="text-muted-foreground">
//             Browse our collection of {products.length} premium products
//           </p>
//         </div>

//         {/* 🔍 Filters */}
//         <div className="mb-8 space-y-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//             <Input
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 flex flex-wrap gap-2">
//               <Badge
//                 variant={selectedCategory === "all" ? "default" : "outline"}
//                 className="cursor-pointer"
//                 onClick={() => setSelectedCategory("all")}
//               >
//                 All
//               </Badge>

//               {(categories.length > 0
//                 ? categories
//                 : Array.from(new Set(products.map((p) => p.category)))
//               ).map((category) => (
//                 <Badge
//                   key={category}
//                   variant={
//                     selectedCategory === category ||
//                     (selectedCategory === "Clothing" &&
//                       category.toLowerCase().includes("clothing")) ||
//                     (selectedCategory === "Footwear" &&
//                       category.toLowerCase().includes("footwear"))
//                       ? "default"
//                       : "outline"
//                   }
//                   className="cursor-pointer"
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category}
//                 </Badge>
//               ))}
//             </div>

//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-full sm:w-[200px]">
//                 <SlidersHorizontal className="mr-2 h-4 w-4" />
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="featured">Featured</SelectItem>
//                 <SelectItem value="price-low">Price: Low to High</SelectItem>
//                 <SelectItem value="price-high">Price: High to Low</SelectItem>
//                 <SelectItem value="rating">Highest Rated</SelectItem>
//                 <SelectItem value="name">Name: A to Z</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* 🛍️ Products */}
//         {filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onAddToCart={() =>
//                   addToCart({
//                     id: product.id,
//                     name: product.name,
//                     description: product.description,
//                     price: product.price,
//                     category: product.category,
//                     image: product.image,
//                     inStock: product.inStock,
//                     rating: product.rating,
//                     reviewCount: product.reviewCount,
//                     features: product.features,
//                   })
//                 }
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <p className="text-lg text-muted-foreground">No products found</p>
//             <Button
//               variant="outline"
//               className="mt-4"
//               onClick={() => {
//                 setSearchQuery("");
//                 setSelectedCategory("all");
//               }}
//             >
//               Clear Filters
//             </Button>
//           </div>
//         )}
//       </div>
//     </ClientLayout>
//   );
// }
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/ProductCard";
import { ClientLayout } from "@/components/ClientLayout";
import { useCart } from "@/hooks/useCart";
import { getShopPage, getProductPage, getAllProducts } from "@/lib/contentstack";

type SEOData = {
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  seo_canonical?: string;
  seo_robots?: string;
  seo_noindex?: boolean;
  seo_nofollow?: boolean;
  seo_og_title?: string;
  seo_og_description?: string;
};

type LocalProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  features?: string[];
  seo?: SEOData;
};

export function ShopPageContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState("featured");

  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pageSEO, setPageSEO] = useState<SEOData | null>(null);

  // =====================================
  // 🔄 Fetch Products, Categories, and SEO
  // =====================================
  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        let data: any = await getShopPage();
        console.log("📦 shop_page raw:", data);

        if (!data || !data.products) {
          console.warn("⚠️ No shop_page data. Falling back to product_page...");
          data = await getProductPage();
        }

        if (!data || !data.products) {
          console.warn("⚠️ No product_page data. Falling back to all products...");
          const allProducts = await getAllProducts();
          data = { products: allProducts, categories: [] };
        }

        if (!data || !data.products) {
          throw new Error("No product data found from any source.");
        }

        // Normalize categories
        const rawCategories = data.categories ?? [];
        const normalizedCategories: string[] = [];

        if (Array.isArray(rawCategories)) {
          for (const c of rawCategories) {
            if (!c) continue;
            if (typeof c === "string") normalizedCategories.push(c);
            else if (typeof c === "object") {
              const name =
                c.category_name ?? c.name ?? c.title ?? undefined;
              if (name) normalizedCategories.push(String(name).trim());
            }
          }
        }

        const uniqueCats = Array.from(new Set(normalizedCategories)).filter(Boolean);

        // Normalize products + SEO
        const rawProducts = data.products ?? [];
        const normalizedProducts: LocalProduct[] = [];

        for (const p of rawProducts) {
          if (!p) continue;

          const id =
            p.uid ||
            p.identity ||
            p._metadata?.uid ||
            p.title ||
            Math.random().toString(36).slice(2, 9);

          const imageUrl =
            typeof p.image === "string"
              ? p.image
              : p.image?.url || "/placeholder.png";

          let features: string[] | undefined;
          if (p.features) {
            if (Array.isArray(p.features)) {
              features = p.features.map((f: any) =>
                typeof f === "string" ? f : f?.feature_text ?? ""
              );
            } else if (typeof p.features === "string") {
              features = p.features.split(/\r?\n/).map((s: string) => s.trim());
            }
          }

          // ✅ Normalize SEO fields
          const seo: SEOData = {
            seo_title: p?.seo?.seo_title || p?.seo_title || `${p.name} | Hack_ecom`,
            seo_description:
              p?.seo?.seo_description ||
              p?.seo_description ||
              p?.description ||
              "",
            seo_keywords:
              p?.seo?.seo_keywords ||
              p?.seo_keywords ||
              `${p.category}, ${p.name}, online shopping`,
            seo_canonical:
              p?.seo?.seo_canonical ||
              p?.seo_canonical ||
              `https://hackecom.com/products/${String(p.name ?? id)
                .toLowerCase()
                .replace(/\s+/g, "-")}`,
            seo_robots: p?.seo?.seo_robots || "index,follow",
            seo_noindex: p?.seo?.seo_noindex || false,
            seo_nofollow: p?.seo?.seo_nofollow || false,
            seo_og_title: p?.seo?.seo_og_title || p?.name,
            seo_og_description:
              p?.seo?.seo_og_description || p?.description || "",
          };

          normalizedProducts.push({
            id: String(id),
            name: p.name ?? p.title ?? "Unnamed Product",
            description: p.description ?? "",
            price: Number(p.price ?? 0),
            originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
            category:
              p.category ??
              (Array.isArray(p.categories) ? p.categories[0] : "Uncategorized"),
            image: imageUrl,
            images:
              Array.isArray(p.images) && p.images.length
                ? p.images.map((img: any) => img.url ?? img)
                : [imageUrl],
            inStock: p.inStock ?? true,
            rating: Number(p.rating ?? 4.5),
            reviewCount: Number(p.reviewCount ?? 0),
            features,
            seo,
          });
        }

        if (mounted) {
          setCategories(uniqueCats);
          setProducts(normalizedProducts);

          // Set page-level SEO (from shop_page entry if available)
          const pageSeoData = data?.seo ?? data?.seo_fields ?? null;
          setPageSEO(pageSeoData);
        }
      } catch (err: any) {
        console.error("❌ Error fetching Shop Page:", err);
        const msg = err?.message || "Failed to fetch products from Contentstack.";
        if (mounted) setErrorMsg(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================
  // 🔁 Sync URL Params
  // =====================================
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  // =====================================
  // 🧠 Filter & Sort Logic
  // =====================================
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      const cat = selectedCategory.toLowerCase();
      result = result.filter((p) => (p.category || "").toLowerCase().includes(cat));
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // =====================================
  // 🖼️ UI + SEO Meta Tags
  // =====================================
  const seoTitle = pageSEO?.seo_title || "Shop | Hack_ecom";
  const seoDesc =
    pageSEO?.seo_description ||
    "Discover and shop the best clothing and footwear collections online.";
  const seoKeywords = pageSEO?.seo_keywords || "shop, products, hack_ecom, fashion, online store";

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex justify-center items-center min-h-screen text-xl py-40">
          Loading Shop...
        </div>
      </ClientLayout>
    );
  }

  if (errorMsg) {
    return (
      <ClientLayout>
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-40">
          <div className="text-2xl text-red-600 font-semibold mb-4">
            ❌ Error loading Shop Page.
          </div>
          <div className="text-sm text-muted-foreground mb-6 max-w-lg">{errorMsg}</div>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content={pageSEO?.seo_robots || "index,follow"} />
        {pageSEO?.seo_canonical && (
          <link rel="canonical" href={pageSEO.seo_canonical} />
        )}
        <meta property="og:title" content={pageSEO?.seo_og_title || seoTitle} />
        <meta
          property="og:description"
          content={pageSEO?.seo_og_description || seoDesc}
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground">
            Browse our collection of {products.length} premium products
          </p>
        </div>

        {/* 🔍 Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Badge>

              {(categories.length > 0
                ? categories
                : Array.from(new Set(products.map((p) => p.category)))
              ).map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 🛍️ Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    image: product.image,
                    inStock: product.inStock,
                    rating: product.rating,
                    reviewCount: product.reviewCount,
                    features: product.features,
                  })
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No products found</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}