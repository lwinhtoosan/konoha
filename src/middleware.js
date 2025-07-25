import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/customer") &&
      request.nextauth.token?.role !== "customer"
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/admin", "/customer"],
};
