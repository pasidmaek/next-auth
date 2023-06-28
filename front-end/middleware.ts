import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === "/admin") {
        console.log(token?.user?.user?.role);
        return token?.user?.user?.role === "admin";
      } /* } else if (req.nextUrl.pathname === "/user") {
        console.log(token?.role);
        return token?.role === "user";
      } */
      return !!token;
    },
  },
});

export const config = { matcher: ["/admin"] };
