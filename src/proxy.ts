import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth(async (req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, .png files, robots.txt and sitemap.xml
    "/((?!api|_next/static|_next/image|.*\\.png$|robots.txt|sitemap.xml).*)",
  ],
};
