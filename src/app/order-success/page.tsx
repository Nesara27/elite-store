"use client";

// Order success page
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClientLayout } from "@/components/ClientLayout";

export default function OrderSuccess() {
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-2">
              Thank you for your purchase
            </p>
            <p className="text-sm text-muted-foreground">
              Order number: <span className="font-mono font-semibold">{orderNumber}</span>
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 text-left">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Estimated Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Your order will arrive by {estimatedDelivery}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    We'll send you a confirmation email with tracking information shortly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/shop">
                Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 rounded-lg bg-secondary/30">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✓ You'll receive an order confirmation email</li>
              <li>✓ We'll notify you when your order ships</li>
              <li>✓ Track your package with the tracking number</li>
              <li>✓ Enjoy your premium products!</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
