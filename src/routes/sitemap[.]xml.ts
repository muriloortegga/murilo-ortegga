import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://murilo-ortegga.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/trabalho", changefreq: "weekly", priority: "0.9" },
          { path: "/sobre", changefreq: "monthly", priority: "0.8" },
          { path: "/contato", changefreq: "monthly", priority: "0.8" },
          { path: "/metodos", changefreq: "weekly", priority: "0.9" },
          { path: "/metodos/estruturacao-de-marca", changefreq: "monthly", priority: "0.8" },
          { path: "/metodos/presenca-digital", changefreq: "monthly", priority: "0.8" },
          { path: "/metodos/sistema-de-conteudo", changefreq: "monthly", priority: "0.8" },
          { path: "/metodos/midia-impressa", changefreq: "monthly", priority: "0.8" },
          { path: "/metodos/midia-ooh", changefreq: "monthly", priority: "0.8" },
          { path: "/metodos/marketing-de-influencia", changefreq: "monthly", priority: "0.8" },
          { path: "/evidive", changefreq: "monthly", priority: "0.7" },
          { path: "/kapyi", changefreq: "monthly", priority: "0.7" },
          { path: "/kmillion", changefreq: "monthly", priority: "0.7" },
          { path: "/livin", changefreq: "monthly", priority: "0.7" },
          { path: "/marco-boni", changefreq: "monthly", priority: "0.7" },
          { path: "/maxi", changefreq: "monthly", priority: "0.7" },
          { path: "/milgrows", changefreq: "monthly", priority: "0.7" },
          { path: "/natrave", changefreq: "monthly", priority: "0.7" },
          { path: "/solid", changefreq: "monthly", priority: "0.7" },
          { path: "/symplice", changefreq: "monthly", priority: "0.7" },
          { path: "/talk2buy", changefreq: "monthly", priority: "0.7" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
