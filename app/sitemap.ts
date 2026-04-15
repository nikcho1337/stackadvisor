import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { articles } from "@/lib/articles";

const BASE_URL = "https://stackadvisor.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((t) => ({
    url: `${BASE_URL}/reviews/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const articlePages = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages = ["crm", "ecommerce", "hosting", "ai-tools", "services"].map((cat) => ({
    url: `${BASE_URL}/categories/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...categoryPages,
    ...toolPages,
    ...articlePages,
  ];
}
