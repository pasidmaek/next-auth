import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.API_PORT;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`http://127.0.0.1:${PORT}/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        console.log(user);
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.access_token;
        console.log("token -> ", token);
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.user = token.user;
      console.log("session -> ", session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signin, /admin, /user",
    error: "/signin",
  },
});
