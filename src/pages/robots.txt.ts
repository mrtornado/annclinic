import { siteConfig } from "../config/site";
import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const robotsTxt = `
User-agent: *
Allow: /

# Main sitemap
Sitemap: ${siteConfig.url}/sitemap.xml

# Specific crawl delays for different bots
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2

# Block sensitive areas
Disallow: /api/
Disallow: /admin/
Disallow: /_astro/
Disallow: /node_modules/

# Allow important medical content
Allow: /servicii/
Allow: /medici/
Allow: /articole/
Allow: /contact
Allow: /despre-noi
Allow: /programare

# Block duplicate content
Disallow: /*?*
Disallow: /*#*

# Allow access to important static assets
Allow: /images/
Allow: /favicon.svg
Allow: /*.css$
Allow: /*.js$

# Medical organization compliance
# Allow health authority crawlers
User-agent: HealthBot
Allow: /

# Romanian medical authority compliance
# Allow Romanian health ministry bots
User-agent: ROHealthBot
Allow: /
`.trim();

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
