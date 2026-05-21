import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ContextNav } from "@/components/ContextNav";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Murilo Ortega — Branding, Conteúdo e Presença Digital" },
      { name: "description", content: "Organizo marcas que precisam funcionar como marcas. Branding, conteúdo e presença digital conectados em um sistema." },
      { name: "author", content: "Murilo Ortega" },
      { property: "og:title", content: "Murilo Ortega — Branding, Conteúdo e Presença Digital" },
      { property: "og:description", content: "Organizo marcas que precisam funcionar como marcas. Branding, conteúdo e presença digital conectados em um sistema." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Murilo Ortega — Branding, Conteúdo e Presença Digital" },
      { name: "twitter:description", content: "Organizo marcas que precisam funcionar como marcas. Branding, conteúdo e presença digital conectados em um sistema." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4941153b-251a-4074-bce4-a0fd0ed637e7/id-preview-2dfc6bed--c044de80-1068-46cd-ac1e-69d643fa0638.lovable.app-1776975661590.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4941153b-251a-4074-bce4-a0fd0ed637e7/id-preview-2dfc6bed--c044de80-1068-46cd-ac1e-69d643fa0638.lovable.app-1776975661590.png" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Cursor />
      <Header />
      <ContextNav />
      <main className="animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
