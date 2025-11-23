"use client";

import { useEffect, useRef } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

/**
 * 🔒 Stable useLivePreview Hook — No Infinite Loop Version
 */
export const useLivePreview = (fetchData) => {
  const initializedRef = useRef(false);
  const debounceRef = useRef(null);
  const lastTimestampRef = useRef(0);

  useEffect(() => {
    // ✅ Initialize only once
    if (!initializedRef.current) {
      try {
        ContentstackLivePreview.init({
          ssr: false,
          enable: true,
          mode: "preview",
          editButton: { enable: true },
          stackDetails: {
            apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
            environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
            branch: process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main",
          },
        });
        initializedRef.current = true;
        console.log("✅ Contentstack Live Preview v3 initialized");
      } catch {
        console.warn("⚠️ Live Preview already initialized");
      }
    }

    // ✅ Controlled callback — triggers only when real change happens
    const handleEntryChange = () => {
      const now = Date.now();
      // Ignore repeated events within 2 seconds (loop protection)
      if (now - lastTimestampRef.current < 2000) return;
      lastTimestampRef.current = now;

      console.log("🔄 Entry changed — reloading data once...");

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        await fetchData();
        console.log("✅ Live Preview content updated");
      }, 500);
    };

    // Subscribe safely
    const unsubscribe = ContentstackLivePreview.onEntryChange(handleEntryChange);

    return () => {
      if (unsubscribe && typeof unsubscribe === "function") unsubscribe();
      clearTimeout(debounceRef.current);
    };
  }, [fetchData]);
};
