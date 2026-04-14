import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string;
    user: userData 
    token: string;
  }
}

export interface userData {
  email: string;
  name: string;
  role: string;
}


declare module "next-auth/jwt" {
  interface JWT {
    user?: userData;
    idToken?: string
  }
}