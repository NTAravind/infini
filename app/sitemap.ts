import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://infiniio.tech/automations/accountants", changeFrequency: "monthly", priority: 0.7 },
  ]
}
