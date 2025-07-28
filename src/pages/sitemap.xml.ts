import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";
import type { APIRoute } from "astro";

// Helper to format date for sitemap
const formatDate = (date: Date) => date.toISOString().split("T")[0];

// Get current date for lastmod
const today = new Date();
const lastmod = formatDate(today);

// Priority settings for different page types
const PAGE_PRIORITIES = {
  homepage: 1.0,
  services: 0.9,
  serviceMain: 0.8,
  doctors: 0.8,
  doctorMain: 0.7,
  articles: 0.7,
  articleMain: 0.6,
  contact: 0.8,
  about: 0.7,
  booking: 0.9,
  landing: 0.8,
} as const;

// Change frequency for different page types
const PAGE_CHANGEFREQ = {
  homepage: "weekly",
  services: "monthly",
  serviceMain: "monthly",
  doctors: "monthly",
  doctorMain: "monthly",
  articles: "weekly",
  articleMain: "monthly",
  contact: "yearly",
  about: "yearly",
  booking: "monthly",
  landing: "monthly",
} as const;

interface SitemapURL {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

export const GET: APIRoute = async () => {
  const urls: SitemapURL[] = [];

  // Static pages
  const staticPages = [
    { path: "", type: "homepage" as const },
    { path: "servicii", type: "serviceMain" as const },
    { path: "medici", type: "doctorMain" as const },
    { path: "articole", type: "articleMain" as const },
    { path: "contact", type: "contact" as const },
    { path: "despre-noi", type: "about" as const },
    { path: "programare", type: "booking" as const },
  ];

  // Add static pages
  staticPages.forEach((page) => {
    urls.push({
      url: `${siteConfig.url}/${page.path}`,
      lastmod,
      changefreq: PAGE_CHANGEFREQ[page.type],
      priority: PAGE_PRIORITIES[page.type],
    });
  });

  // Add dynamic service pages
  try {
    const services = await getCollection("services");
    services.forEach((service) => {
      urls.push({
        url: `${siteConfig.url}/servicii/${service.slug}`,
        lastmod,
        changefreq: PAGE_CHANGEFREQ.services,
        priority: PAGE_PRIORITIES.services,
      });
    });
  } catch (error) {
    console.warn("Could not load services for sitemap:", error);
  }

  // Add dynamic doctor pages
  try {
    const doctors = await getCollection("doctors");
    doctors.forEach((doctor) => {
      urls.push({
        url: `${siteConfig.url}/medici/${doctor.slug}`,
        lastmod,
        changefreq: PAGE_CHANGEFREQ.doctors,
        priority: PAGE_PRIORITIES.doctors,
      });
    });
  } catch (error) {
    console.warn("Could not load doctors for sitemap:", error);
  }

  // Add dynamic article pages
  try {
    const articles = await getCollection("articles");
    articles.forEach((article) => {
      urls.push({
        url: `${siteConfig.url}/articole/${article.slug}`,
        lastmod: article.data.updatedDate
          ? formatDate(article.data.updatedDate)
          : formatDate(article.data.publishDate),
        changefreq: PAGE_CHANGEFREQ.articles,
        priority: PAGE_PRIORITIES.articles,
      });
    });
  } catch (error) {
    console.warn("Could not load articles for sitemap:", error);
  }

  // Add landing pages
  const landingPages = [
    "landing/botox-bucuresti",
    "landing/tratament-acnee-bucuresti",
    "landing/ecografie-sarcina-bucuresti",
    "landing/adwords/cardiolog-bucuresti",
    "landing/adwords/clinica-medicala-bucuresti",
  ];

  landingPages.forEach((page) => {
    urls.push({
      url: `${siteConfig.url}/${page}`,
      lastmod,
      changefreq: PAGE_CHANGEFREQ.landing,
      priority: PAGE_PRIORITIES.landing,
    });
  });

  // Sort URLs by priority (highest first) and then alphabetically
  urls.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return a.url.localeCompare(b.url);
  });

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls
  .map(
    ({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "X-Robots-Tag": "noindex",
    },
  });
};
