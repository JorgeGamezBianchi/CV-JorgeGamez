/**
 * @file robots.txt.ts
 * @description Generador dinámico de robots.txt para control de indexación de motores de búsqueda.
 * Capa: Pages / Endpoints
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = site ? new URL('sitemap-index.xml', site).href : 'https://jorgegamez.vercel.app/sitemap-index.xml';

  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*.json$

Sitemap: ${sitemapUrl}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
