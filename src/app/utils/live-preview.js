import ContentstackLivePreview from "@contentstack/live-preview-utils";

ContentstackLivePreview.init({
  ssr: false, // set to false for Next.js / React
  enable: true,
  stackDetails: {
    apiKey: "blt18d10037183f942b", // from your Contentstack stack
    environment: "development",   // or staging/production
    branch: "main",
  },
  editButton: {
    enable: true,
    position: "top-right", // shows the "Edit" button on your site
  },
  cleanCslpOnProduction: true, // removes extra tags in production
});
