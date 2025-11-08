"use client";

import { Suspense } from "react";
import { ClientLayout } from "@/components/ClientLayout";
import { ShopPageContent } from "./shop-content";

// Loading skeleton
function ShopSkeleton() {
  return (
    <ClientLayout>
      <div className="flex justify-center items-center min-h-screen text-xl py-40">
        Loading Shop...
      </div>
    </ClientLayout>
  );
}

// Main page component - NO useSearchParams() here!
export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopPageContent />
    </Suspense>
  );
}