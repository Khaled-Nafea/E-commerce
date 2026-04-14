import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const getToken = async () => {
    const cookie = await cookies();
    const myToken = cookie.get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token: myToken, secret: process.env.NEXTAUTH_SECRET! });
    const token = decodedToken?.token;
    return token;
}