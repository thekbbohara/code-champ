import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/arena/:path*", "/auth"], // Match /arena and /auth
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // Redirect unauthenticated users trying to access /arena
  if (request.nextUrl.pathname.startsWith("/arena") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Redirect authenticated users trying to access /auth
  if (request.nextUrl.pathname === "/auth" && isAuthenticated) {
    return NextResponse.redirect(new URL("/arena", request.url));
  }

  return NextResponse.next();
}
