"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
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
};

export default function ShopPage() {
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

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        // 🧩 Try Shop Page first
        let data: any = await getShopPage();
        console.log("📦 shop_page raw:", data);

        // 🧩 If shop page missing, fallback to product_page
        if (!data || !data.products) {
          console.warn("⚠️ No shop_page data. Falling back to product_page...");
          data = await getProductPage();
        }

        // 🧩 If still missing, fallback to all products
        if (!data || !data.products) {
          console.warn("⚠️ No product_page data. Falling back to all products...");
          const allProducts = await getAllProducts();
          data = { products: allProducts, categories: [] };
        }

        if (!data || !data.products) {
          throw new Error("No product data found from any source.");
        }

        // -------------------------
        // Normalize categories
        // -------------------------
        const rawCategories = data.categories ?? [];
        const normalizedCategories: string[] = [];

        if (Array.isArray(rawCategories)) {
          for (const c of rawCategories) {
            if (!c) continue;
            if (typeof c === "string") normalizedCategories.push(c);
            else if (typeof c === "object") {
              const name =
                c.category_name ??
                c.name ??
                c.title ??
                (typeof c === "string" ? c : undefined);
              if (name) normalizedCategories.push(String(name).trim());
            }
          }
        }
        const uniqueCats = Array.from(new Set(normalizedCategories)).filter(Boolean);

        // -------------------------
        // Normalize products
        // -------------------------
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

          let imageUrl = "";
          if (typeof p.image === "string") imageUrl = p.image;
          else if (p.image?.url) imageUrl = p.image.url;

          let features: string[] | undefined;
          if (p.features) {
            if (Array.isArray(p.features))
              features = p.features.map((f: any) =>
                typeof f === "string" ? f : f?.feature_text ?? ""
              );
            else if (typeof p.features === "string")
              features = p.features.split(/\r?\n/).map((s) => s.trim());
          }

          normalizedProducts.push({
            id: String(id),
            name: p.name ?? p.title ?? "Unnamed Product",
            description: p.description ?? "",
            price: Number(p.price ?? 0),
            originalPrice: p.original_price ? Number(p.original_price) : undefined,
            category:
              p.category ??
              (Array.isArray(p.categories) ? p.categories[0] : "Uncategorized"),
            image: imageUrl || "/placeholder.png",
            images:
              Array.isArray(p.images) && p.images.length
                ? p.images.map((img: any) => img.url ?? img)
                : [imageUrl],
            inStock: p.in_stock ?? true,
            rating: Number(p.rating ?? 4.5),
            reviewCount: Number(p.review_count ?? 0),
            features,
          });
        }

        if (mounted) {
          setCategories(uniqueCats);
          setProducts(normalizedProducts);
        }
      } catch (err: any) {
        console.error("❌ Error fetching Shop Page:", err);
        const msg =
          err?.message || "Failed to fetch products from Contentstack.";
        if (mounted) setErrorMsg(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);

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
      result = result.filter((p) => p.category === selectedCategory);
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
    }
    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground">
            Browse our collection of {products.length} premium products
          </p>
        </div>

        {/* Filters */}
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

              {categories.length > 0
                ? categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))
                : Array.from(new Set(products.map((p) => p.category))).map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
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

        {/* Results */}
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
