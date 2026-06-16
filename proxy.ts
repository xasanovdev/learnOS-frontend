import { NextResponse, type NextRequest } from "next/server";

const ACCESS_TOKEN_COOKIE_NAME = "access_token";

export function proxy(request: NextRequest) {
  const hasAccessToken = request.cookies.has(ACCESS_TOKEN_COOKIE_NAME);

  if (hasAccessToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/auth", request.url);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/room/:path*"],
};
