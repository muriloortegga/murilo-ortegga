// Helper to build a consistent per-route head payload with canonical + OG tags.
// Uses relative paths so canonical/og:url resolve correctly on any host.

export interface RouteSeoInput {
  path: string; // e.g. "/sobre" (self-referencing)
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string; // absolute URL preferred
}

export function routeSeo({ path, title, description, type = "website", image }: RouteSeoInput) {
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: path }],
  };
}
