// type module augmentation
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-aut/jwt";

declare module "next-auth" {
  interface Session {
    userid: string;
  }

  interface User extends DefaultUser {
    user: User;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    user: User;
  }
}
