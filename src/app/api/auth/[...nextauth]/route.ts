import { authOptions } from "@/libs/auth";
import NextAuth from "next-auth";

/**
 * Named export for the POST method to handle login
 */
export const POST = NextAuth(authOptions);

/**
 * Optionally, you can handle GET if required for session retrieval
 */
export const GET = NextAuth(authOptions);
