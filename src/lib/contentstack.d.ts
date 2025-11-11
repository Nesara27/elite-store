// src/lib/contentstack.d.ts

/** Mirrors the shape returned by normalizeSeo() in the JS file */
export type NormalizedSeo = {
  title?: string;
  description?: string;
  canonical_url?: string;
  noindex?: boolean;
  nofollow?: boolean;
  og_title?: string;
  og_description?: string;
  og_image?: string | { url: string; [k: string]: any };
  twitter_card?: string;
  keywords?: string[];
  primary_keyword?: string;
  structured_data?: string;
};

// Values/classes exported by the JS module
export const VB_EmptyBlockParentClass: string;
export const Stack: any;

export function normalizeSeo(entry: any): NormalizedSeo;

export function getHomePage(): Promise<any>;
export function getShopPage(): Promise<any>;
export function getAboutPage(): Promise<any>;
export function getServicesPage(): Promise<any>;

export function getProductPage(): Promise<any>;

export function getHomeProducts(): Promise<any[]>;
export function getShopProducts(): Promise<any[]>;
export function getAllProducts(): Promise<any[]>;
export function getProductById(id: string | string[]): Promise<any>;
