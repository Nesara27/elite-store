import ContentstackLivePreview from "@contentstack/live-preview-utils";

if (typeof window !== "undefined") {
  ContentstackLivePreview.init({
    enable: true,
    ssr: false,
    mode: "preview", // or "builder" if you use Visual Builder
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"],
      position: "top-right",
    },
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
      branch: process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main",
    },
  });

  console.log("✅ Contentstack Live Preview v3 initialized");
}

export const onLiveEdit = ContentstackLivePreview.onLiveEdit;
export const onEntryChange = ContentstackLivePreview.onEntryChange;
export default ContentstackLivePreview;
