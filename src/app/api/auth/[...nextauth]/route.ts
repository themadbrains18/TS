// Import necessary modules and configurations
import { authOptions } from "@/libs/auth";
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";

interface RouteHandlerContext {
    params: { nextauth: string[] }
}

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

async function auth(req: NextRequest, context: RouteHandlerContext) {
    // Get user's preference from form (if needed)
    const urlString = req.url;
    const url = new URL(urlString);
    const params = new URLSearchParams(url.search);
    const rememberPassword = params.get("rememberPassword");

    // Adjust session maxAge based on form input, if provided
    if (rememberPassword && authOptions.session) {
        authOptions.session.maxAge = rememberPassword === "true"
            ? 30 * 24 * 60 * 60  // 30 days
            : 15 * 60;            // 15 minutes
    }

    // Pass the request to NextAuth for further processing
    return await NextAuth(req, context, authOptions);
}

// Export the handler functions for POST and GET requests
export { auth as POST, auth as GET };

export const revalidate = 0 // Revalidate at most every second
