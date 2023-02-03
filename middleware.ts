import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/_next/")) {
    return response;
  }

  if (
    request.cookies.has("jwtoken") &&
    (request.url.endsWith("/login") || request.url.endsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !request.cookies.has("jwtoken") &&
    !request.url.endsWith("/login") &&
    !request.url.endsWith("/signup") &&
    !request.url.startsWith("/error")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
