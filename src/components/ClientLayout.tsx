"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { useCart } from "@/hooks/useCart";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onAuthClick={() => setAuthOpen(true)}
      />
      
      <main className="flex-1">{children}</main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        cartTotal={cartTotal}
      />

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
