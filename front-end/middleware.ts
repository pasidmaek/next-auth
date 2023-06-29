import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === "/admin") {
        return token?.user?.user?.role === "admin";
      } else if (req.nextUrl.pathname === "/user") {
        if (
          token?.user?.user?.role === "user" ||
          token?.user?.user?.role === "admin"
        )
          return true;
      }
      return !!token;
    },
  },
});

export const config = { matcher: ["/admin", "/user"] };
