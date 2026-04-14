import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";

export const authOptions :NextAuthOptions = {
    pages: {
        signIn: '/login',
    },
  providers: [
    CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "email", placeholder: "john@example.com" },
      password: {  label: "Password", type: "password" }
    },
    async authorize(credentials) {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()
      if (data.message === "success") {
        const decoded:{id : string} = jwtDecode(data.token) 
        return {
          id:decoded.id,
          user: data.user,
          token: data.token
        }
      }
      else {
        return null;
      }
    }
  })
  ],
  
  callbacks:{
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if(token){
        session.user = token.user;
      }
      return session;
    }
  }
}
