import Cookies from "js-cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import axios from "./axiosConfig";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/_next/")) {
    return response;
  }

  if (
    request.cookies.has("jwtoken") &&
    (request.url.endsWith("/login") ||
      request.url.endsWith("/signup") ||
      request.url.endsWith("/varify") ||
      request.nextUrl.pathname.startsWith("/varified"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !request.cookies.has("jwtoken") &&
    !request.url.endsWith("/login") &&
    !request.url.endsWith("/signup") &&
    !request.url.endsWith("/varify") &&
    !request.url.startsWith("/error") &&
    !request.nextUrl.pathname.startsWith("/varified")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
