import * as contentstack from "contentstack";

import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils";

// ✅ Configuration
const API_KEY = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "blt18d10037183f942b";
const DELIVERY_TOKEN = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || "cs2db14d3ab10ccece9d42e28a";
const PREVIEW_TOKEN = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN || "cs565b41a59524c55a6a9bbff3";
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "development";
const BRANCH = process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main";

// ✅ Use Preview Host for Live Preview
const PREVIEW_HOST = "rest-preview.contentstack.com";

// 🏗️ Initialize the Contentstack Stack
export const Stack = contentstack.Stack({
  api_key: API_KEY,
  delivery_token: DELIVERY_TOKEN, // ✅ Use Delivery Token for API calls
  environment: ENVIRONMENT,
  branch: BRANCH,
  region: contentstack.Region.US,
  host: PREVIEW_HOST, // ✅ Use Preview API

  // ✅ Enable Live Preview SDK
  live_preview: {
    enable: true,
    preview_token: PREVIEW_TOKEN,
    host: PREVIEW_HOST,
    management_token: null,
  },
});

// 🧠 Initialize Contentstack Live Preview SDK (Browser only)
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      try {
        if (!window.__CS_LIVE_PREVIEW_INIT__) {
          ContentstackLivePreview.init({
            enable: true,
            ssr: false,
            mode: "builder", // 👈 required for Visual Builder
            stackSdk: Stack,

            // ✅ REQUIRED: Stack details for authentication
            stackDetails: {
              apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
              environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
            },

            clientUrlParams: {
              protocol: "https",
              host: "app.contentstack.com",
              port: 443,
            },
            editButton: {
              enable: true,
              exclude: ["outsideLivePreviewPortal"],
              position: "top-right",
            },
            editInVisualBuilderButton: {
              enable: true,
              position: "bottom-right",
            },
            cleanCslpOnProduction: true,
          });

          console.log("✅ Live Preview SDK initialized successfully");
          window.__CS_LIVE_PREVIEW_INIT__ = true;
        }
      } catch (error) {
        console.error("❌ Error initializing Live Preview SDK:", error);
      }
    }, 800);
  });
}


// 🧩 Helper: Add Live Preview hash
const withLivePreview = (entryOrQuery) => {
  try {
    if (typeof window !== "undefined") {
      const hash = ContentstackLivePreview?.hash;
      if (hash) {
        entryOrQuery.addParam("live_preview", hash);
        console.log("🧩 Using Live Preview hash:", hash);
      }
    }
  } catch (e) {
    console.warn("⚠️ Live Preview hash not available:", e.message);
  }

  return entryOrQuery;
};

// ==============================
// 🏠 HOME PAGE
// ==============================
export const getHomePage = async () => {
  try {
    console.log("🏠 Fetching Home Page...");
    let query = Stack.ContentType("home_page").Query();
    query = withLivePreview(query);
    const result = await query
      .includeReference(["features", "featured_products"])
      .toJSON()
      .find();

    const entry = result?.[0]?.[0];
    console.log("✅ Home Page fetched:", entry?.title || "Untitled");
    return entry;
  } catch (error) {
    console.error("❌ Error fetching Home Page:", error);
    return null;
  }
};

// ==============================
// 🛍️ SHOP PAGE
// ==============================
export const getShopPage = async () => {
  try {
    console.log("🛍️ Fetching Shop Page...");
    let entry = Stack.ContentType("shop_page").Entry("bltffc0c7993d3c1419");
    entry = withLivePreview(entry);
    const result = await entry
      .includeReference(["products", "categories"])
      .toJSON()
      .fetch();
    console.log("✅ Shop Page fetched:", result?.entry?.title || "Untitled");
    return result.entry;
  } catch (error) {
    console.error("❌ Error fetching Shop Page:", error);
    return null;
  }
};

// ==============================
// ℹ️ ABOUT PAGE
// ==============================
export const getAboutPage = async () => {
  try {
    console.log("ℹ️ Fetching About Page...");
    let query = Stack.ContentType("about_page").Query();
    query = withLivePreview(query);
    query.includeReference(["team", "timeline", "stats", "values"]);
    const result = await query.toJSON().find();
    const entry = result?.[0]?.[0];
    console.log("✅ About Page fetched:", entry?.title || "Untitled");
    return entry;
  } catch (error) {
    console.error("❌ Error fetching About Page:", error);
    return null;
  }
};

// ==============================
// ⚙️ SERVICES PAGE
// ==============================
export const getServicesPage = async () => {
  try {
    console.log("🛠 Fetching Services Page...");
    let query = Stack.ContentType("services_page").Query();
    query = withLivePreview(query);
    const result = await query.toJSON().find();
    const entry = result?.[0]?.[0];
    console.log("✅ Services Page fetched:", entry?.title || "Untitled");
    return entry;
  } catch (error) {
    console.error("❌ Error fetching Services Page:", error);
    return null;
  }
};

// ==============================
// 🧾 PRODUCTS
// ==============================
export const getAllProducts = async () => {
  try {
    console.log("🧾 Fetching All Products...");
    let query = Stack.ContentType("product_page").Query();
    query = withLivePreview(query);
    const result = await query.includeReference(["products"]).toJSON().find();
    const products = result?.[0]?.[0]?.products || [];
    console.log(`✅ Found ${products.length} products`);
    return products;
  } catch (error) {
    console.error("❌ Error fetching all products:", error);
    return [];
  }
};

export const getProductPage = async () => {
  try {
    console.log("🧾 Fetching Product Page...");
    let entry = Stack.ContentType("product_page").Entry("blt9f48cc9bcb7fa7ef");
    entry = withLivePreview(entry);
    const result = await entry.includeReference(["products"]).toJSON().fetch();
    console.log("✅ Product Page fetched:", result?.entry?.title || "Untitled");
    return result.entry;
  } catch (error) {
    console.error("❌ Error fetching Product Page:", error);
    return null;
  }
};

export { VB_EmptyBlockParentClass };
