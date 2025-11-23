"use client";

// ⚡ INSTANT CART TOAST - Shows immediately when item added
import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Product } from "@/types/product";

interface ToastProps {
  product: Product | null;
  onClose: () => void;
}

export function InstantCartToast({ product, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="glass-dark border border-primary/30 rounded-2xl p-4 shadow-lg shadow-primary/20 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm mb-1">Added to cart!</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{product.name}</p>
            <p className="text-sm font-bold text-primary mt-1">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
