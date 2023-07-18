import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       if (req.nextUrl.pathname === "/admin") {
//         return token?.user?.role === "admin";
//       } else if (req.nextUrl.pathname === "/user") {
//         if (token?.user?.role === "user" || token?.user?.role === "admin")
//           return true;
//       }
//       return !!token;
//     },
//   },
// });

// export const config = { matcher: ["/admin", "/user"] };

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log("[Middleware] -> ", request.nextUrl.pathname);
    console.log("[Middleware] -> ", request.nextauth.token);

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.user?.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/denied", request.url));
    }

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

export const config = { matcher: ["/admin", "/user"] };
