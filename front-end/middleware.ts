import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log("[Middleware] -> ", request.nextUrl.pathname);
    console.log("[Middleware] -> ", request.nextauth.token?.access);

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.user?.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/denied", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/data")) {
      let parts = request.nextUrl.pathname.split("/");
      console.log("search -> ", parts[2]);
      return NextResponse.rewrite(
        new URL(
          `https://jsonplaceholder.typicode.com/todos/${parts[2]}`,
          request.url
        )
      );
    }

    // if (request.nextUrl.pathname.includes("/users/find")) {
    //   const headers = new Headers(request.headers);

    //   headers.set("Authorization", `Bearer ${request.nextauth.token?.access}`);
    //   console.log("Call");
    //   return NextResponse.next({
    //     ...request,
    //     headers: headers,
    //   });
    // }

    if (
      request.nextUrl.pathname.startsWith("/user") &&
      request.nextauth.token?.user?.role !== "admin" &&
      request.nextauth.token?.user?.role !== "user"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin", "/user", "/data/:path*", "/fetch"],
};
