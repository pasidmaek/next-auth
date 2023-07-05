import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

const signingKey =
  "3af0ad51b15cb3bd4240a2298d79e2d7af55375870a9de6c9e40910e2f7ab13c"; // Replace with your actual signing key

const signOptions: SignOptions = {
  algorithm: "HS256",
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://127.0.0.1:3080/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      /* console.log("token that returns", token); */
      /* const token_sign = jwt.sign(token, signingKey, signOptions);
      console.log("sign al",token_sign) */
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // session = token?.user?.user;
        let sessionToken = jwt.sign(
          token?.user?.user?.username,
          "57918603f1c43835c880bce87fb2e050b22edafa4319e2732b20a1322e545647"
          // { algorithm: "RS256" }
        );
        session = { userid: sessionToken };
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
