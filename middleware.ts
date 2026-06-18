import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const hostname = request.headers.get("host") || "";

  // 1. Resolve Blog Subdomain / Domain
  const blogDomain = process.env.BLOG_DOMAIN || "securitytesting.zetalabs.in";
  const mainDomain = process.env.MAIN_DOMAIN || "zetalabs.in";
  
  const isBlogHost = 
    hostname.includes(blogDomain) || 
    hostname.startsWith("securitytesting.");

  // Exclude static assets, API calls, and common directories from rewrites
  const isStaticOrApi =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/uploads") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/security.txt";

  if (isBlogHost && !isStaticOrApi) {
    if (pathname === "/") {
      // Rewrite root of blog subdomain to /blog page
      url.pathname = "/blog";
      return NextResponse.rewrite(url);
    } else {
      // Rewrite /some-post-slug to /blog/some-post-slug
      url.pathname = `/blog${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 2. Authentication Protection for /admin
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("sb_access_token")?.value;

    let isValid = false;
    if (sessionCookie) {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wjsgcmjgujkmedymjjxi.supabase.co";
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_publishable_a64Ek_zM03ASOHgHgzPllg_O-cmKWKM";
        const { createClient } = await import("@supabase/supabase-js");
        const client = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        });
        const { data: { user }, error } = await client.auth.getUser(sessionCookie);
        if (!error && user) {
          isValid = true;
        }
      } catch (err) {
        console.error("Middleware Supabase auth error:", err);
      }
    }

    if (!isValid) {
      // Redirect unauthenticated requests to login page
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Matching paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
