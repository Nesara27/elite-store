
// import * as contentstack from "contentstack";
// import ContentstackLivePreview, {
//   VB_EmptyBlockParentClass,
// } from "@contentstack/live-preview-utils";

// /* ==============================
//  * 🔧 Config (EU)
//  * ============================== */
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

// /* ==============================
//  * 🏗️ Stack (EU)
//  * ============================== */
// export const Stack = contentstack.Stack({
//   api_key: API_KEY,
//   delivery_token: DELIVERY_TOKEN,
//   environment: ENVIRONMENT,
//   branch: BRANCH,
//   region: contentstack.Region.EU,
//   host: DELIVERY_HOST,
//   live_preview: {
//     enable: true,
//     preview_token: PREVIEW_TOKEN,
//     host: PREVIEW_HOST,
//   },
// });

// /* ==============================
//  * 🧠 Live Preview init (browser only)
//  * ============================== */
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
//             clientUrlParams: {
//               protocol: "https",
//               host: "app.contentstack.com",
//               port: 443,
//             },
//             editButton: {
//               enable: true,
//               exclude: ["outsideLivePreviewPortal"],
//               position: "top-right",
//             },
//             editInVisualBuilderButton: { enable: true, position: "bottom-right" },
//             cleanCslpOnProduction: true,
//           });
//           window.__CS_LIVE_PREVIEW_INIT__ = true;
//           console.log("✅ Live Preview initialized (EU)");
//         }
//       } catch (err) {
//         console.error("❌ LP init error:", err);
//       }
//     }, 700);
//   });
// }

// /* ==============================
//  * 🧩 Helper: add live_preview hash if present
//  * ============================== */
// const withLivePreview = (entryOrQuery) => {
//   try {
//     if (typeof window !== "undefined") {
//       const hash = ContentstackLivePreview && ContentstackLivePreview.hash;
//       if (hash && entryOrQuery && typeof entryOrQuery.addParam === "function") {
//         entryOrQuery.addParam("live_preview", hash);
//       }
//     }
//   } catch {}
//   return entryOrQuery;
// };

// /* ==============================
//  * 🔎 SEO Normalizer (robust for new/legacy shapes)
//  * ============================== */
// const coerceBool = (v) => {
//   if (typeof v === "boolean") return v;
//   if (typeof v === "string") {
//     const s = v.trim().toLowerCase();
//     if (s === "true") return true;
//     if (s === "false") return false;
//   }
//   return undefined;
// };

// const parseRobotsToFlags = (robots) => {
//   if (!robots || typeof robots !== "string") return {};
//   const r = robots.toLowerCase();
//   return { noindex: r.includes("noindex"), nofollow: r.includes("nofollow") };
// };

// export function normalizeSeo(entry) {
//   if (!entry) return {};

//   // New `seo` group (object style)
//   if (entry.seo && !Array.isArray(entry.seo)) {
//     const g = entry.seo;
//     const ogImg =
//       typeof g.og_image === "string"
//         ? g.og_image
//         : g.og_image && g.og_image.url
//         ? g.og_image
//         : undefined;

//     const kw = Array.isArray(g.keywords)
//       ? g.keywords
//       : typeof g.keywords === "string"
//       ? g.keywords.split(",").map((s) => s.trim()).filter(Boolean)
//       : [];

//     return {
//       title: g.title,
//       description: g.description,
//       canonical_url: g.canonical_url,
//       noindex: coerceBool(g.noindex),
//       nofollow: coerceBool(g.nofollow),
//       og_title: g.og_title || g.title,
//       og_description: g.og_description || g.description,
//       og_image: ogImg,
//       twitter_card: g.twitter_card || "summary_large_image",
//       keywords: kw,
//       primary_keyword: g.primary_keyword,
//       structured_data: g.structured_data,
//     };
//   }

//   // Legacy `seo` array with seo_* fields
//   if (Array.isArray(entry.seo) && entry.seo.length > 0) {
//     const s = entry.seo[0] || {};
//     const flagsFromRobots = parseRobotsToFlags(s.seo_robots);
//     const ogImg =
//       typeof s.seo_og_image === "string"
//         ? s.seo_og_image
//         : s.seo_og_image && s.seo_og_image.url
//         ? s.seo_og_image
//         : undefined;

//     const kw = Array.isArray(s.seo_keywords)
//       ? s.seo_keywords
//       : typeof s.seo_keywords === "string"
//       ? s.seo_keywords.split(",").map((t) => t.trim()).filter(Boolean)
//       : [];

//     return {
//       title: s.seo_title,
//       description: s.seo_description,
//       canonical_url: (s.seo_canonical || "").replace(/"+$/, ""),
//       noindex: coerceBool(s.seo_noindex) ?? flagsFromRobots.noindex,
//       nofollow: coerceBool(s.seo_nofollow) ?? flagsFromRobots.nofollow,
//       og_title: s.seo_og_title || s.seo_title,
//       og_description: s.seo_og_description || s.seo_description,
//       og_image: ogImg,
//       twitter_card: s.seo_twitter_card || "summary_large_image",
//       keywords: kw,
//       structured_data: s.seo_structured_data,
//     };
//   }

//   // Fallback
//   return {
//     title: (entry.hero && entry.hero.heading) || entry.title || "Elite Store",
//     description: entry.hero && entry.hero.subheading,
//     canonical_url:
//       typeof entry.url === "string"
//         ? `https://www.elitestore.com${entry.url}`
//         : undefined,
//     noindex: false,
//     nofollow: false,
//     og_title: (entry.hero && entry.hero.heading) || entry.title,
//     og_description: entry.hero && entry.hero.subheading,
//     og_image: entry.hero && entry.hero.banner_image && entry.hero.banner_image.url,
//     twitter_card: "summary_large_image",
//     keywords: [],
//   };
// }

// /* ==============================
//  * 📄 Page Fetchers (kept intact)
//  * ============================== */
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

// export const getShopPage = async () => {
//   try {
//     console.log("🛍️ Fetching Shop Page (EU)...");
//     let q = Stack.ContentType("shop_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     const entry = res?.[0]?.[0] || null;
//     if (entry) console.log("✅ shop_page uid:", entry.uid);
//     return entry;
//   } catch (e) {
//     console.error("❌ getShopPage error:", e);
//     return null;
//   }
// };

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

// /* ==============================
//  * 🧾 Product Fetchers (EXPORTS PRESERVED)
//  * ============================== */

// // Kept for compatibility (some pages import this). Not used for listing.
// export const getProductPage = async () => {
//   try {
//     console.log("📦 Fetching Product Page (EU)...");
//     let q = Stack.ContentType("product_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     const entry = res?.[0]?.[0] || null;
//     if (entry) console.log("✅ Product Page:", entry.title || entry.uid);
//     return entry;
//   } catch (e) {
//     console.error("❌ getProductPage error:", e);
//     return null;
//   }
// };

// // Optional helper if you ever kept products on home (kept to avoid breaking imports elsewhere)
// export const getHomeProducts = async () => {
//   try {
//     const home = await getHomePage();
//     return Array.isArray(home?.products) ? home.products : [];
//   } catch (e) {
//     console.error("❌ getHomeProducts error:", e);
//     return [];
//   }
// };

// // 🔴 Source of truth for product list: shop_page.products ONLY
// export const getShopProducts = async () => {
//   try {
//     const shop = await getShopPage();
//     const items = Array.isArray(shop?.products) ? shop.products : [];
//     console.log("🛒 shop_page products:", items.length);
//     return items;
//   } catch (e) {
//     console.error("❌ getShopProducts error:", e);
//     return [];
//   }
// };

// // Back-compat alias: keep name but return ONLY shop_page products
// export const getAllProducts = async () => {
//   const items = await getShopProducts();
//   console.log(`✅ getAllProducts (shop_page only): ${items.length}`);
//   return items;
// };

// /* ==============================
//  * 🔎 Product Lookup (shop_page only)
//  * ============================== */
// const __slugify = (s) =>
//   (s || "")
//     .toString()
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");

// export const getProductById = async (rawId) => {
//   try {
//     // normalize id
//     let id = Array.isArray(rawId) ? rawId[rawId.length - 1] : rawId;
//     id = (id == null ? "" : String(id)).trim().replace(/^"+|"+$/g, "");
//     try {
//       id = decodeURIComponent(id);
//     } catch {}

//     const candidates = Array.from(
//       new Set([id, id.toLowerCase(), id.toUpperCase(), __slugify(id)])
//     );

//     const products = await getShopProducts();

//     const match = products.find((p) => {
//       const keys = [
//         p.identity, // "PRD-1001"
//         p._metadata?.uid,
//         p.uid,
//         p.slug,
//         __slugify(p.slug),
//         __slugify(p.name),
//       ].filter(Boolean);

//       return keys.some((k) => {
//         const v = String(k);
//         return (
//           candidates.includes(v) ||
//           candidates.includes(v.toLowerCase()) ||
//           candidates.includes(v.toUpperCase()) ||
//           candidates.includes(__slugify(v))
//         );
//       });
//     });

//     if (!match) {
//       console.warn(
//         "⚠️ Product not found. Available IDs:",
//         products.map(
//           (p) =>
//             p.identity ||
//             p._metadata?.uid ||
//             p.uid ||
//             p.slug ||
//             __slugify(p.name)
//         )
//       );
//       return null;
//     }

//     return match;
//   } catch (e) {
//     console.error("❌ getProductById error:", e);
//     return null;
//   }
// };

// export { VB_EmptyBlockParentClass };
// import * as contentstack from "contentstack";
// import ContentstackLivePreview, {
//   VB_EmptyBlockParentClass,
// } from "@contentstack/live-preview-utils";

// /* ==============================
//  * 🔧 Config
//  * ============================== */
// const API_KEY =
//   process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "blt0e2bbb0bfbb601fb";
// const DELIVERY_TOKEN =
//   process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || "cs5d73f6c881fdb2e42e3870b3";
// const PREVIEW_TOKEN =
//   process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN || "csa58b29e728def46d67fd50f7";
// const ENVIRONMENT =
//   process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "prod";
// const BRANCH = process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main";

// /** ✅ EU hosts */
// const DELIVERY_HOST = "eu-cdn.contentstack.com";
// const PREVIEW_HOST = "eu-rest-preview.contentstack.com";

// /* ==============================
//  * 🏗️ Stack (EU)
//  * ============================== */
// export const Stack = contentstack.Stack({
//   api_key: API_KEY,
//   delivery_token: DELIVERY_TOKEN,
//   environment: ENVIRONMENT,
//   branch: BRANCH,
//   region: contentstack.Region.EU,
//   host: DELIVERY_HOST,
//   live_preview: {
//     enable: true,
//     preview_token: PREVIEW_TOKEN,
//     host: PREVIEW_HOST,
//   },
// });

// /* ==============================
//  * 🧠 Live Preview init (browser only)
//  * ============================== */
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
//             editButton: { enable: true, position: "top-right", exclude: ["outsideLivePreviewPortal"] },
//             editInVisualBuilderButton: { enable: true, position: "bottom-right" },
//             cleanCslpOnProduction: true,
//           });
//           window.__CS_LIVE_PREVIEW_INIT__ = true;
//           console.log("✅ Live Preview initialized (EU)");
//         }
//       } catch (err) {
//         console.error("❌ LP init error:", err);
//       }
//     }, 800);
//   });
// }

// /* ==============================
//  * 🧩 Helper: add live_preview hash if present
//  * ============================== */
// const withLivePreview = (entryOrQuery) => {
//   try {
//     if (typeof window !== "undefined") {
//       const hash = ContentstackLivePreview && ContentstackLivePreview.hash;
//       if (hash && entryOrQuery && typeof entryOrQuery.addParam === "function") {
//         entryOrQuery.addParam("live_preview", hash);
//       }
//     }
//   } catch {}
//   return entryOrQuery;
// };

// /* ==============================
//  * 🔎 SEO Normalizer
//  * ============================== */
// const coerceBool = (v) => {
//   if (typeof v === "boolean") return v;
//   if (typeof v === "string") {
//     const s = v.trim().toLowerCase();
//     if (s === "true") return true;
//     if (s === "false") return false;
//   }
//   return undefined;
// };

// const parseRobotsToFlags = (robots) => {
//   if (!robots || typeof robots !== "string") return {};
//   const r = robots.toLowerCase();
//   return {
//     noindex: r.includes("noindex"),
//     nofollow: r.includes("nofollow"),
//   };
// };

// export function normalizeSeo(entry) {
//   if (!entry) return {};

//   // New "seo" group (object)
//   if (entry.seo && !Array.isArray(entry.seo)) {
//     const g = entry.seo;
//     const ogImg =
//       typeof g.og_image === "string" ? g.og_image : g.og_image?.url ? g.og_image : undefined;
//     const kw = Array.isArray(g.keywords)
//       ? g.keywords
//       : typeof g.keywords === "string"
//       ? g.keywords.split(",").map((s) => s.trim()).filter(Boolean)
//       : [];

//     return {
//       title: g.title,
//       description: g.description,
//       canonical_url: g.canonical_url,
//       noindex: coerceBool(g.noindex),
//       nofollow: coerceBool(g.nofollow),
//       og_title: g.og_title || g.title,
//       og_description: g.og_description || g.description,
//       og_image: ogImg,
//       twitter_card: g.twitter_card || "summary_large_image",
//       keywords: kw,
//       primary_keyword: g.primary_keyword,
//       structured_data: g.structured_data,
//     };
//   }

//   // Legacy "seo" array
//   if (Array.isArray(entry.seo) && entry.seo.length > 0) {
//     const s = entry.seo[0] || {};
//     const flags = parseRobotsToFlags(s.seo_robots);
//     const ogImg =
//       typeof s.seo_og_image === "string"
//         ? s.seo_og_image
//         : s.seo_og_image?.url
//         ? s.seo_og_image
//         : undefined;
//     const kw = Array.isArray(s.seo_keywords)
//       ? s.seo_keywords
//       : typeof s.seo_keywords === "string"
//       ? s.seo_keywords.split(",").map((t) => t.trim()).filter(Boolean)
//       : [];

//     return {
//       title: s.seo_title,
//       description: s.seo_description,
//       canonical_url: (s.seo_canonical || "").replace(/"+$/, ""),
//       noindex: coerceBool(s.seo_noindex) ?? flags.noindex,
//       nofollow: coerceBool(s.seo_nofollow) ?? flags.nofollow,
//       og_title: s.seo_og_title || s.seo_title,
//       og_description: s.seo_og_description || s.seo_description,
//       og_image: ogImg,
//       twitter_card: s.seo_twitter_card || "summary_large_image",
//       keywords: kw,
//       structured_data: s.seo_structured_data,
//     };
//   }

//   // Fallback
//   return {
//     title: entry?.hero?.heading || entry?.title || "Elite Store",
//     description: entry?.hero?.subheading,
//     canonical_url:
//       typeof entry?.url === "string" ? `https://www.elitestore.com${entry.url}` : undefined,
//     noindex: false,
//     nofollow: false,
//     og_title: entry?.hero?.heading || entry?.title,
//     og_description: entry?.hero?.subheading,
//     og_image: entry?.hero?.banner_image?.url,
//     twitter_card: "summary_large_image",
//     keywords: [],
//   };
// }

// /* ==============================
//  * 📄 Page Fetchers
//  * ============================== */
// export const getHomePage = async () => {
//   try {
//     console.log("🏠 Fetching Home Page (EU)...");
//     let q = Stack.ContentType("home_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     return res?.[0]?.[0] || null;
//   } catch (e) {
//     console.error("❌ getHomePage error:", e);
//     return null;
//   }
// };

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

// export const getAboutPage = async () => {
//   try {
//     console.log("ℹ️ Fetching About Page (EU)...");
//     let q = Stack.ContentType("about_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     return res?.[0]?.[0] || null;
//   } catch (e) {
//     console.error("❌ getAboutPage error:", e);
//     return null;
//   }
// };

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

// /* ==============================
//  * 🧾 Products (SHOP-ONLY as requested)
//  * ============================== */
// export const getProductPage = async () => {
//   try {
//     console.log("📦 Fetching Product Page (EU)...");
//     let q = Stack.ContentType("product_page").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     return res?.[0]?.[0] || null;
//   } catch (e) {
//     console.error("❌ getProductPage error:", e);
//     return null;
//   }
// };
// uid: bltc4d043bd16d69cb5
// ct: lytics_js_tag

// export const getLyticsPage = async () => {
//   try {
//     console.log("📦 Fetching Product Page (EU)...");
//     let q = Stack.ContentType("lytics_js_tag").Query();
//     q = withLivePreview(q);
//     const res = await q.toJSON().find();
//     return res?.[0]?.[0] || null;
//   } catch (e) {
//     console.error("❌ getProductPage error:", e);
//     return null;
//   }
// };
// /** Products from shop_page only */
// export const getShopProducts = async () => {
//   try {
//     const shop = await getShopPage();
//     const items = Array.isArray(shop?.products) ? shop.products : [];
//     console.log(`🛍️ shop_page products: ${items.length}`);
//     return items;
//   } catch (e) {
//     console.error("❌ getShopProducts error:", e);
//     return [];
//   }
// };

// /** Keep for completeness — not used for listing now */
// export const getHomeProducts = async () => {
//   try {
//     const home = await getHomePage();
//     return Array.isArray(home?.products) ? home.products : [];
//   } catch (e) {
//     console.error("❌ getHomeProducts error:", e);
//     return [];
//   }
// };

// /** All products = shop_page only (per your requirement) */
// export const getAllProducts = async () => {
//   try {
//     const shopOnly = await getShopProducts();
//     console.log(`✅ Found ${shopOnly.length} products (shop_page only)`);
//     return shopOnly;
//   } catch (e) {
//     console.error("❌ getAllProducts error:", e);
//     return [];
//   }
// };

// /* ==============================
//  * 🔎 Robust Product Lookup (shop-only)
//  * ============================== */
// const __slugify = (s) =>
//   (s || "")
//     .toString()
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");

// export const getProductById = async (productId) => {
//   try {
//     const normalizeId = (raw) => {
//       let id = Array.isArray(raw) ? raw[raw.length - 1] : raw;
//       id = id == null ? "" : String(id);
//       id = id.trim().replace(/^"+|"+$/g, "");
//       try { id = decodeURIComponent(id); } catch {}
//       return id;
//     };

//     const input = normalizeId(productId);
//     const candidates = Array.from(
//       new Set([input, input.toLowerCase(), input.toUpperCase(), __slugify(input)])
//     );

//     const products = await getShopProducts();

//     const match = (val) => {
//       if (!val) return false;
//       const v = String(val);
//       return (
//         candidates.includes(v) ||
//         candidates.includes(v.toLowerCase()) ||
//         candidates.includes(v.toUpperCase()) ||
//         candidates.includes(__slugify(v))
//       );
//     };

//     const p = products.find((it) => {
//       const keys = [
//         it.product_id,
//         it.identity,              // PRD-1001… from your shop_page
//         it.sku,
//         it.code,
//         it.uid,
//         it._metadata && it._metadata.uid,
//         it.id,
//         it.slug,
//         __slugify(it.slug),
//         __slugify(it.name),
//       ].filter(Boolean);
//       return keys.some(match);
//     });

//     if (!p) {
//       console.warn(
//         "⚠️ Product not found for:",
//         input,
//         "Available identifiers (shop only):",
//         products.map((i) =>
//           i.product_id || i.identity || i.uid || (i._metadata && i._metadata.uid) || i.id || i.slug || __slugify(i.name)
//         )
//       );
//       return null;
//     }

//     return p;
//   } catch (e) {
//     console.error("❌ getProductById error:", e);
//     return null;
//   }
// };

// export { VB_EmptyBlockParentClass };
// src/lib/contentstack.js

import * as contentstack from "contentstack";
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils";

/* ==============================
 * 🔧 Config (EU)
 * ============================== */
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

/* ==============================
 * 🏗️ Stack (EU)
 * ============================== */
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

/* ==============================
 * 🧠 Live Preview Init (Browser Only)
 * ============================== */
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      try {
        if (!window.__CS_LIVE_PREVIEW_INIT__) {
          ContentstackLivePreview.init({
            enable: true,
            ssr: false,
            mode: "builder",
            stackSdk: Stack,
            stackDetails: { apiKey: API_KEY, environment: ENVIRONMENT },
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
          window.__CS_LIVE_PREVIEW_INIT__ = true;
          console.log("✅ Live Preview initialized (EU)");
        }
      } catch (err) {
        console.error("❌ LP init error:", err);
      }
    }, 800);
  });
}

/* ==============================
 * 🧩 Helper: add live_preview hash if present
 * ============================== */
const withLivePreview = (entryOrQuery) => {
  try {
    if (typeof window !== "undefined") {
      const hash = ContentstackLivePreview && ContentstackLivePreview.hash;
      if (hash && entryOrQuery && typeof entryOrQuery.addParam === "function") {
        entryOrQuery.addParam("live_preview", hash);
      }
    }
  } catch {}
  return entryOrQuery;
};

/* ==============================
 * 🔎 SEO Normalizer
 * ============================== */
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

export function normalizeSeo(entry) {
  if (!entry) return {};

  // ✅ New "seo" group
  if (entry.seo && !Array.isArray(entry.seo)) {
    const g = entry.seo;
    const ogImg =
      typeof g.og_image === "string" ? g.og_image : g.og_image?.url ? g.og_image : undefined;
    const kw = Array.isArray(g.keywords)
      ? g.keywords
      : typeof g.keywords === "string"
      ? g.keywords.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    return {
      title: g.title,
      description: g.description,
      canonical_url: g.canonical_url,
      noindex: coerceBool(g.noindex),
      nofollow: coerceBool(g.nofollow),
      og_title: g.og_title || g.title,
      og_description: g.og_description || g.description,
      og_image: ogImg,
      twitter_card: g.twitter_card || "summary_large_image",
      keywords: kw,
      primary_keyword: g.primary_keyword,
      structured_data: g.structured_data,
    };
  }

  // ⚙️ Legacy "seo" array
  if (Array.isArray(entry.seo) && entry.seo.length > 0) {
    const s = entry.seo[0] || {};
    const flags = parseRobotsToFlags(s.seo_robots);
    const ogImg =
      typeof s.seo_og_image === "string"
        ? s.seo_og_image
        : s.seo_og_image?.url
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
      noindex: coerceBool(s.seo_noindex) ?? flags.noindex,
      nofollow: coerceBool(s.seo_nofollow) ?? flags.nofollow,
      og_title: s.seo_og_title || s.seo_title,
      og_description: s.seo_og_description || s.seo_description,
      og_image: ogImg,
      twitter_card: s.seo_twitter_card || "summary_large_image",
      keywords: kw,
      structured_data: s.seo_structured_data,
    };
  }

  // 🪄 Fallback
  return {
    title: entry?.hero?.heading || entry?.title || "Elite Store",
    description: entry?.hero?.subheading,
    canonical_url:
      typeof entry?.url === "string" ? `https://www.elitestore.com${entry.url}` : undefined,
    noindex: false,
    nofollow: false,
    og_title: entry?.hero?.heading || entry?.title,
    og_description: entry?.hero?.subheading,
    og_image: entry?.hero?.banner_image?.url,
    twitter_card: "summary_large_image",
    keywords: [],
  };
}

/* ==============================
 * 📄 Page Fetchers
 * ============================== */
export const getHomePage = async () => {
  try {
    console.log("🏠 Fetching Home Page (EU)...");
    let q = Stack.ContentType("home_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    return res?.[0]?.[0] || null;
  } catch (e) {
    console.error("❌ getHomePage error:", e);
    return null;
  }
};

export const getShopPage = async () => {
  try {
    console.log("🛍️ Fetching Shop Page (EU)...");
    let q = Stack.ContentType("shop_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    return res?.[0]?.[0] || null;
  } catch (e) {
    console.error("❌ getShopPage error:", e);
    return null;
  }
};

export const getAboutPage = async () => {
  try {
    console.log("ℹ️ Fetching About Page (EU)...");
    let q = Stack.ContentType("about_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    return res?.[0]?.[0] || null;
  } catch (e) {
    console.error("❌ getAboutPage error:", e);
    return null;
  }
};

export const getServicesPage = async () => {
  try {
    console.log("🛠️ Fetching Services Page (EU)...");
    let q = Stack.ContentType("services_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    return res?.[0]?.[0] || null;
  } catch (e) {
    console.error("❌ getServicesPage error:", e);
    return null;
  }
};

/* ==============================
 * 🧠 Lytics JS Tag Fetcher (NEW)
 * ============================== */
export const getLyticsPage = async () => {
  try {
    console.log("🧠 Fetching Lytics JS Tag (EU)...");
    let q = Stack.ContentType("lytics_js_tag").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    const entry = res?.[0]?.[0] || null;
    if (entry) console.log("✅ Lytics JS Tag entry:", entry.uid);
    return entry;
  } catch (e) {
    console.error("❌ getLyticsPage error:", e);
    return null;
  }
};

/* ==============================
 * 🧾 Products (SHOP-ONLY)
 * ============================== */
export const getProductPage = async () => {
  try {
    console.log("📦 Fetching Product Page (EU)...");
    let q = Stack.ContentType("product_page").Query();
    q = withLivePreview(q);
    const res = await q.toJSON().find();
    return res?.[0]?.[0] || null;
  } catch (e) {
    console.error("❌ getProductPage error:", e);
    return null;
  }
};

export const getShopProducts = async () => {
  try {
    const shop = await getShopPage();
    const items = Array.isArray(shop?.products) ? shop.products : [];
    console.log(`🛍️ shop_page products: ${items.length}`);
    return items;
  } catch (e) {
    console.error("❌ getShopProducts error:", e);
    return [];
  }
};

export const getHomeProducts = async () => {
  try {
    const home = await getHomePage();
    return Array.isArray(home?.products) ? home.products : [];
  } catch (e) {
    console.error("❌ getHomeProducts error:", e);
    return [];
  }
};

export const getAllProducts = async () => {
  try {
    const shopOnly = await getShopProducts();
    console.log(`✅ Found ${shopOnly.length} products (shop_page only)`);
    return shopOnly;
  } catch (e) {
    console.error("❌ getAllProducts error:", e);
    return [];
  }
};

/* ==============================
 * 🔎 Product Lookup (Shop-Only)
 * ============================== */
const __slugify = (s) =>
  (s || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getProductById = async (productId) => {
  try {
    const normalizeId = (raw) => {
      let id = Array.isArray(raw) ? raw[raw.length - 1] : raw;
      id = id == null ? "" : String(id);
      id = id.trim().replace(/^"+|"+$/g, "");
      try {
        id = decodeURIComponent(id);
      } catch {}
      return id;
    };

    const input = normalizeId(productId);
    const candidates = Array.from(
      new Set([input, input.toLowerCase(), input.toUpperCase(), __slugify(input)])
    );

    const products = await getShopProducts();

    const match = (val) => {
      if (!val) return false;
      const v = String(val);
      return (
        candidates.includes(v) ||
        candidates.includes(v.toLowerCase()) ||
        candidates.includes(v.toUpperCase()) ||
        candidates.includes(__slugify(v))
      );
    };

    const p = products.find((it) => {
      const keys = [
        it.product_id,
        it.identity,
        it.sku,
        it.code,
        it.uid,
        it._metadata?.uid,
        it.id,
        it.slug,
        __slugify(it.slug),
        __slugify(it.name),
      ].filter(Boolean);
      return keys.some(match);
    });

    if (!p) {
      console.warn(
        "⚠️ Product not found for:",
        input,
        "Available identifiers:",
        products.map(
          (i) =>
            i.product_id ||
            i.identity ||
            i.uid ||
            i._metadata?.uid ||
            i.id ||
            i.slug ||
            __slugify(i.name)
        )
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
