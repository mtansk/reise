import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/rec/", "/chat/", "/auth/", "/settings/"],
    },
    sitemap: "https://ai.mtansk.com/sitemap.xml",
  };
}
