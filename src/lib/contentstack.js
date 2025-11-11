
// import * as contentstack from "contentstack";
// import ContentstackLivePreview, {
//   VB_EmptyBlockParentClass,
// } from "@contentstack/live-preview-utils";

// /** ==============================
//  *  🔧 Config (keep your same keys)
//  *  NOTE: keys are exposed via NEXT_PUBLIC_* for client-safe SDK usage
//  *  ============================== */
// const API_KEY =
//   process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "blt0e2bbb0bfbb601fb";
// const DELIVERY_TOKEN =
//   process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN ||
//   "cs5d73f6c881fdb2e42e3870b3";
// const PREVIEW_TOKEN =
//   process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN ||
//   "csa58b29e728def46d67fd50f7";
// const ENVIRONMENT =
//   process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "prod";
// const BRANCH = process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main";

// /** ✅ EU hosts */
// const DELIVERY_HOST = "eu-cdn.contentstack.com";
// const PREVIEW_HOST = "eu-rest-preview.contentstack.com";

// /** ==============================
//  *  🏗️ Stack (EU)
//  *  ============================== */
// export const Stack = contentstack.Stack({
//   api_key: API_KEY,
//   delivery_token: DELIVERY_TOKEN,
//   environment: ENVIRONMENT,
//   branch: BRANCH,
//   region: contentstack.Region.EU,
//   host: DELIVERY_HOST, // published entries via EU CDN
//   live_preview: {
//     enable: true,
//     preview_token: PREVIEW_TOKEN,
//     host: PREVIEW_HOST, // preview host only for LP
//   },
// });

// /** ==============================
//  *  🧠 Live Preview init (browser only)
//  *  ============================== */
// if (typeof window !== "undefined") {
//   window.addEventListener("load", () => {
//     setTimeout(() => {
//       try {
//         if (!window.__CS_LIVE_PREVIEW_INIT__) {
//           ContentstackLivePreview.init({
//             enable: true,
//             ssr: false,
//             mode: "builder",
//             stackSdk: Stack,
//             stackDetails: { apiKey: API_KEY, environment: ENVIRONMENT },
//             clientUrlParams: { protocol: "https", host: "app.contentstack.com", port: 443 },
//             editButton: { enable: true, exclude: ["outsideLivePreviewPortal"], position: "top-right" },
//             editInVisualBuilderButton: { enable: true, position: "bottom-right" },
//             cleanCslpOnProduction: true,
//           });
//           console.log("✅ Live Preview initialized (EU)");
//           window.__CS_LIVE_PREVIEW_INIT__ = true;
//         }
//       } catch (err) {
//         console.error("❌ LP init error:", err);
//       }
//     }, 800);
//   });
// }

// /** ==============================
//  *  🧩 Utility: attach live_preview hash if present
//  *  ============================== */
// const withLivePreview = (entryOrQuery) => {
//   try {
//     if (typeof window !== "undefined") {
//       const hash = ContentstackLivePreview?.hash;
//       if (hash) entryOrQuery.addParam("live_preview", hash);
//     }
//   } catch {
//     /* noop */
//   }
//   return entryOrQuery;
// };

// /** ==============================
//  *  📄 Pages
//  *  ============================== */

// // HOME (singleton)
// export const getHomePage = async () => {
//   try {
//     console.log("🏠 Fetching Home Page (EU)...");
//     let q = Stack.ContentType("home_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     const entry = res?.[0]?.[0] || null;
//     if (entry) console.log("✅ Home title:", entry.title);
//     return entry;
//   } catch (e) {
//     console.error("❌ getHomePage error:", e);
//     return null;
//   }
// };

// // SHOP (singleton)
// export const getShopPage = async () => {
//   try {
//     console.log("🛍️ Fetching Shop Page (EU)...");
//     let q = Stack.ContentType("shop_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     return res?.[0]?.[0] || null;
//   } catch (e) {
//     console.error("❌ getShopPage error:", e);
//     return null;
//   }
// };

// // ABOUT (singleton)
// export const getAboutPage = async () => {
//   try {
//     console.log("ℹ️ Fetching About Page (EU)...");
//     let q = Stack.ContentType("about_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     const entry = res?.[0]?.[0] || null;
//     if (entry) console.log("✅ About title:", entry.title);
//     return entry;
//   } catch (e) {
//     console.error("❌ getAboutPage error:", e);
//     return null;
//   }
// };

// // SERVICES (singleton)
// export const getServicesPage = async () => {
//   try {
//     console.log("🛠️ Fetching Services Page (EU)...");
//     let q = Stack.ContentType("services_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     return res?.[0]?.[0] || null;
//   } catch (e) {
//     console.error("❌ getServicesPage error:", e);
//     return null;
//   }
// };

// /** ==============================
//  *  🧾 Products
//  *  ============================== */

// // Get "product_page" singleton & return its products array
// export const getProductPage = async () => {
//   try {
//     console.log("📦 Fetching Product Page (EU)...");
//     let q = Stack.ContentType("product_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     const entry = res?.[0]?.[0] || null;
//     if (entry) console.log("✅ Product Page:", entry.title);
//     return entry;
//   } catch (e) {
//     console.error("❌ getProductPage error:", e);
//     return null;
//   }
// };

// export const getAllProducts = async () => {
//   try {
//     const page = await getProductPage();
//     const products = page?.products || [];
//     console.log(`✅ Found ${products.length} products`);
//     return products;
//   } catch (e) {
//     console.error("❌ getAllProducts error:", e);
//     return [];
//   }
// };

// export const getProductById = async (productId) => {
//   try {
//     console.log("🔍 getProductById:", productId);
//     const products = await getAllProducts();
//     const p = products.find(
//       (it) =>
//         it.uid === productId ||
//         it._metadata?.uid === productId ||
//         it.identity === productId ||
//         it.product_id === productId ||
//         it.id === productId
//     );
//     if (!p) {
//       console.warn("⚠️ Product not found. Available IDs:", products.map(i => i.uid || i._metadata?.uid));
//       return null;
//     }
//     return p;
//   } catch (e) {
//     console.error("❌ getProductById error:", e);
//     return null;
//   }
// };

// export { VB_EmptyBlockParentClass };
import * as contentstack from "contentstack";
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils";

/** ==============================
 *  🔧 Config
 *  ============================== */
const API_KEY =
  process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "blt0e2bbb0bfbb601fb";
const DELIVERY_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN ||
  "cs5d73f6c881fdb2e42e3870b3";
const PREVIEW_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN ||
  "csa58b29e728def46d67fd50f7";
const ENVIRONMENT =
  process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "prod";
const BRANCH = process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main";

/** ✅ EU hosts */
const DELIVERY_HOST = "eu-cdn.contentstack.com";
const PREVIEW_HOST = "eu-rest-preview.contentstack.com";

/** ==============================
 *  🏗️ Stack (EU)
 *  ============================== */
export const Stack = contentstack.Stack({
  api_key: API_KEY,
  delivery_token: DELIVERY_TOKEN,
  environment: ENVIRONMENT,
  branch: BRANCH,
  region: contentstack.Region.EU,
  host: DELIVERY_HOST,
  live_preview: {
    enable: true,
    preview_token: PREVIEW_TOKEN,
    host: PREVIEW_HOST,
  },
});

/** ==============================
 *  🧠 Live Preview init (browser only)
 *  ============================== */
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      try {
        // JS-safe: no TS cast
        if (!window.__CS_LIVE_PREVIEW_INIT__) {
          ContentstackLivePreview.init({
            enable: true,
            ssr: false,
            mode: "builder",
            stackSdk: Stack,
            stackDetails: { apiKey: API_KEY, environment: ENVIRONMENT },
            clientUrlParams: { protocol: "https", host: "app.contentstack.com", port: 443 },
            editButton: { enable: true, exclude: ["outsideLivePreviewPortal"], position: "top-right" },
            editInVisualBuilderButton: { enable: true, position: "bottom-right" },
            cleanCslpOnProduction: true,
          });
          console.log("✅ Live Preview initialized (EU)");
          window.__CS_LIVE_PREVIEW_INIT__ = true;
        }
      } catch (err) {
        console.error("❌ LP init error:", err);
      }
    }, 800);
  });
}

/** ==============================
 *  🧩 Utility: attach live_preview hash if present
 *  ============================== */
const withLivePreview = (entryOrQuery) => {
  try {
    if (typeof window !== "undefined") {
      const hash = ContentstackLivePreview && ContentstackLivePreview.hash;
      if (hash && entryOrQuery && typeof entryOrQuery.addParam === "function") {
        entryOrQuery.addParam("live_preview", hash);
      }
    }
  } catch {
    /* noop */
  }
  return entryOrQuery;
};

/** ==============================
 *  🔎 SEO Normalizer (JS version)
 *  ============================== */

/**
 * @typedef {Object} NormalizedSeo
 * @property {string=} title
 * @property {string=} description
 * @property {string=} canonical_url
 * @property {boolean=} noindex
 * @property {boolean=} nofollow
 * @property {string=} og_title
 * @property {string=} og_description
 * @property {string|Object=} og_image
 * @property {string=} twitter_card
 * @property {string[]=} keywords
 * @property {string=} primary_keyword
 * @property {string=} structured_data
 */

const coerceBool = (v) => {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "true") return true;
    if (s === "false") return false;
  }
  return undefined;
};

const parseRobotsToFlags = (robots) => {
  if (!robots || typeof robots !== "string") return {};
  const r = robots.toLowerCase();
  return {
    noindex: r.includes("noindex"),
    nofollow: r.includes("nofollow"),
  };
};

/**
 * @param {any} entry
 * @returns {NormalizedSeo}
 */
export function normalizeSeo(entry) {
  if (!entry) return {};
  // New `seo` group (object)
  if (entry.seo && !Array.isArray(entry.seo)) {
    const g = entry.seo;
    const flags = {
      noindex: coerceBool(g.noindex),
      nofollow: coerceBool(g.nofollow),
    };
    const ogImg =
      typeof g.og_image === "string"
        ? g.og_image
        : g.og_image && g.og_image.url
        ? g.og_image
        : undefined;

    const kw = Array.isArray(g.keywords)
      ? g.keywords
      : typeof g.keywords === "string"
      ? g.keywords.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    return {
      title: g.title,
      description: g.description,
      canonical_url: g.canonical_url,
      ...flags,
      og_title: g.og_title || g.title,
      og_description: g.og_description || g.description,
      og_image: ogImg,
      twitter_card: g.twitter_card || "summary_large_image",
      keywords: kw,
      primary_keyword: g.primary_keyword,
      structured_data: g.structured_data,
    };
  }

  // Legacy `seo` array with `seo_*`
  if (Array.isArray(entry.seo) && entry.seo.length > 0) {
    const s = entry.seo[0] || {};
    const flagsFromRobots = parseRobotsToFlags(s.seo_robots);
    const ogImg =
      typeof s.seo_og_image === "string"
        ? s.seo_og_image
        : s.seo_og_image && s.seo_og_image.url
        ? s.seo_og_image
        : undefined;

    const kw = Array.isArray(s.seo_keywords)
      ? s.seo_keywords
      : typeof s.seo_keywords === "string"
      ? s.seo_keywords.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    return {
      title: s.seo_title,
      description: s.seo_description,
      canonical_url: (s.seo_canonical || "").replace(/"+$/, ""),
      noindex: coerceBool(s.seo_noindex) ?? flagsFromRobots.noindex,
      nofollow: coerceBool(s.seo_nofollow) ?? flagsFromRobots.nofollow,
      og_title: s.seo_og_title || s.seo_title,
      og_description: s.seo_og_description || s.seo_description,
      og_image: ogImg,
      twitter_card: s.seo_twitter_card || "summary_large_image",
      keywords: kw,
      structured_data: s.seo_structured_data,
    };
  }

  // Fallback
  return {
    title: (entry.hero && entry.hero.heading) || entry.title || "Elite Store",
    description: entry.hero && entry.hero.subheading,
    canonical_url:
      typeof entry.url === "string"
        ? `https://www.elitestore.com${entry.url}`
        : undefined,
    noindex: false,
    nofollow: false,
    og_title: (entry.hero && entry.hero.heading) || entry.title,
    og_description: entry.hero && entry.hero.subheading,
    og_image: entry.hero && entry.hero.banner_image && entry.hero.banner_image.url,
    twitter_card: "summary_large_image",
    keywords: [],
  };
}

/** ==============================
 *  📄 Pages
 *  ============================== */

// HOME (singleton)
export const getHomePage = async () => {
  try {
    console.log("🏠 Fetching Home Page (EU)...");
    let q = Stack.ContentType("home_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    const entry = (res && res[0] && res[0][0]) || null;
    if (entry) console.log("✅ Home title:", entry.title);
    return entry;
  } catch (e) {
    console.error("❌ getHomePage error:", e);
    return null;
  }
};

// SHOP (singleton)
export const getShopPage = async () => {
  try {
    console.log("🛍️ Fetching Shop Page (EU)...");
    let q = Stack.ContentType("shop_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    return (res && res[0] && res[0][0]) || null;
  } catch (e) {
    console.error("❌ getShopPage error:", e);
    return null;
  }
};

// ABOUT (singleton)
export const getAboutPage = async () => {
  try {
    console.log("ℹ️ Fetching About Page (EU)...");
    let q = Stack.ContentType("about_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    const entry = (res && res[0] && res[0][0]) || null;
    if (entry) console.log("✅ About title:", entry.title);
    return entry;
  } catch (e) {
    console.error("❌ getAboutPage error:", e);
    return null;
  }
};

// SERVICES (singleton)
export const getServicesPage = async () => {
  try {
    console.log("🛠️ Fetching Services Page (EU)...");
    let q = Stack.ContentType("services_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    return (res && res[0] && res[0][0]) || null;
  } catch (e) {
    console.error("❌ getServicesPage error:", e);
    return null;
  }
};

/** ==============================
 *  🧾 Products
 *  ============================== */

export const getProductPage = async () => {
  try {
    console.log("📦 Fetching Product Page (EU)...");
    let q = Stack.ContentType("product_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    const entry = (res && res[0] && res[0][0]) || null;
    if (entry) console.log("✅ Product Page:", entry.title);
    return entry;
  } catch (e) {
    console.error("❌ getProductPage error:", e);
    return null;
  }
};

export const getAllProducts = async () => {
  try {
    const page = await getProductPage();
    const products = (page && page.products) || [];
    console.log(`✅ Found ${products.length} products`);
    return products;
  } catch (e) {
    console.error("❌ getAllProducts error:", e);
    return [];
  }
};

export const getProductById = async (productId) => {
  try {
    console.log("🔍 getProductById:", productId);
    const products = await getAllProducts();
    const p = products.find(
      (it) =>
        it.uid === productId ||
        (it._metadata && it._metadata.uid === productId) ||
        it.identity === productId ||
        it.product_id === productId ||
        it.id === productId
    );
    if (!p) {
      console.warn(
        "⚠️ Product not found. Available IDs:",
        products.map((i) => i.uid || (i._metadata && i._metadata.uid))
      );
      return null;
    }
    return p;
  } catch (e) {
    console.error("❌ getProductById error:", e);
    return null;
  }
};

export { VB_EmptyBlockParentClass };
