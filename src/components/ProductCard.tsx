"use client";

// 🌙 CYBERPUNK PRODUCT CARD - COMPLETE REDESIGN
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, Eye, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Card
      className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/30 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500 rounded-xl pointer-events-none" />

      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary/30">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Actions */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <button className="p-2.5 rounded-xl glass-dark border border-primary/30 hover:border-primary hover:bg-primary/20 transition-all hover:scale-110">
              <Heart className="h-4 w-4 text-primary" />
            </button>
            <button className="p-2.5 rounded-xl glass-dark border border-accent/30 hover:border-accent hover:bg-accent/20 transition-all hover:scale-110">
              <Eye className="h-4 w-4 text-accent" />
            </button>
          </div>

          {/* Badges */}
          {!product.inStock && (
            <Badge className="absolute top-3 left-3 bg-black/80 text-white backdrop-blur-sm border border-red-500/50">
              Out of Stock
            </Badge>
          )}
          {hasDiscount && product.inStock && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 animate-pulse font-bold">
              {discountPercent}% OFF
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-6 relative">
        <Link href={`/product/${product.id}`}>
          <Badge className="mb-3 text-xs bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors font-semibold">
            {product.category}
          </Badge>

          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors duration-300 mb-2">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 transition-all duration-300 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black gradient-text">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice?.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 font-bold border-0"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

          {product.inStock ? (
            <>
              <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              <span className="relative">Add to Cart</span>
              <Zap className="ml-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
            </>
          ) : (
            <span className="relative">Out of Stock</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
