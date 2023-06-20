import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text ", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        /* const user = { username: "admin", password: "admin" }; */

        const { username, password } = credentials as any;
        const res = await fetch(
            "http://127.0.0.1:8081/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );
        /* .then((res) => res.json())
          .then(console.log); */
        const data = await res.json();
        console.log(data);

        if (res.ok && data) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
