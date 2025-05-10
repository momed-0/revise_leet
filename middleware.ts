import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("auth");
  
  // Redirect authenticated users away from /login
  if (auth && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!auth && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|login).*)"], // Protect all routes except /login and static files
};