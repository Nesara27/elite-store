"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShoppingCart,
  Star,
  Check,
  ChevronLeft,
  Truck,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ClientLayout } from "@/components/ClientLayout";
import { useCart } from "@/hooks/useCart";
import { getProductById } from "@/lib/contentstack";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    (async () => {
      if (!params.id) return;
      const productData = await getProductById(params.id.toString());
      setProduct(productData);
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) {
    return (
      <ClientLayout>
        <div className="text-center py-32">Loading Product...</div>
      </ClientLayout>
    );
  }

  if (!product) {
    return (
      <ClientLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </ClientLayout>
    );
  }

  const name = product.name || product.product_name;
  const description = product.description || product.product_description;
  const price = product.price || 0;
  const originalPrice = product.original_price || null;
  const category = product.category || "Uncategorized";
  const inStock = product.in_stock ?? true;
  const rating = product.rating || 4.5;
  const reviewCount = product.review_count || 0;
  const features = product.features || [];
  const image =
    product.image?.url ||
    "https://via.placeholder.com/600x600?text=No+Image+Available";

  const displayImages = [image, ...(product.additional_images || [])];
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.uid || name,
        name,
        description,
        price,
        category,
        image,
        inStock,
        rating,
        reviewCount,
        features,
      },
      quantity
    );
    setQuantity(1);
  };

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 -ml-4" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary/30">
              <img
                src={displayImages[selectedImage]}
                alt={name}
                className="h-full w-full object-cover"
              />
              {hasDiscount && inStock && (
                <Badge className="absolute top-4 left-4 bg-destructive text-white">
                  {discountPercent}% OFF
                </Badge>
              )}
            </div>
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? "border-accent"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${name} ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="mb-3">
              {category}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {rating} ({reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold gradient-text">
                ₹{price.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {features.length > 0 && (
              <div>
                
                <ul className="space-y-2">
                 {Array.isArray(features) && features.length > 0 ? (
  <>
    <h3 className="font-semibold mb-3">Key Features</h3>
    <ul className="space-y-2">
      {features.map((feature: string, idx: number) => (
        <li key={idx} className="flex items-start">
          <Check className="h-5 w-5 text-accent mr-2 mt-1" />
          <span className="text-muted-foreground">{feature}</span>
        </li>
      ))}
    </ul>
  </>
) : features ? (
  <>
    <h3 className="font-semibold mb-3">Key Features</h3>
    <p className="text-muted-foreground">
      {typeof features === "string"
        ? features
        : "No feature list available."}
    </p>
  </>
) : null}

                </ul>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!inStock}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!inStock}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-accent" />
                <span>Free shipping on orders over ₹8,300</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-accent" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
