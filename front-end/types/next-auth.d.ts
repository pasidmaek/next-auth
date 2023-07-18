// type module augmentation
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-aut/jwt";
import { Token } from "typescript";

declare module "next-auth" {
  interface Session {
    userid: string;
    expires: string;
    token: token;
  }

  interface User extends DefaultUser {
    user: User;
    role: string;
    access_token: Token;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    user: User;
  }
}
