import { AuthOptions, DefaultSession, Session, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { type GetServerSidePropsContext } from "next";

/**
 * Extending NextAuth types to include additional fields
 */

declare module "next-auth" {
  interface Session {
    id: string;
    email: string;
    role: string;
    token: string;
    freeDownloads: string;
    image: string;
  }

  interface User {
    id: string;
    email: string;
    role: string;
    token: string;
    freeDownloads: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    token: string;
    freeDownloads: string;
    image: string;
  }
}

/**
 * NextAuth options
 */
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text", required: false },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const { email, password, otp } = credentials;
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/login`, {
          method: "POST",
          body: JSON.stringify({ email, password, otp }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        if (res.ok && user) {
          return {
            id: user.results.data.id,
            email: user.results.data.email,
            role: user.results.data.role,
            token: user.results.token,
            name: user.results.data.name,
            image: user.results.data.image,
            freeDownloads: user.results.data.freeDownloads,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (token?.token && isTokenExpired(token?.token)) {
        return null as any;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
        token.image = user.image || "";
        token.freeDownloads = user.freeDownloads;
      }
      return token;
    },

    async session({ session, token }) {
      if (isTokenExpired(token.token)) {
        return null as any;
      }


      return {
        ...session,
        id: token.id,
        email: token.email,
        role: token.role,
        token: token.token,
        image: token.image,
        freeDownloads: token.freeDownloads,
      } as Session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 // 4 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Helper function to check if the token is expired
 */
const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

/**
 * Wrapper function to get the server-side session for a user. This helps in accessing the session
 * in server-side rendering scenarios without the need to import `authOptions` repeatedly.
 *
 * @param {Object} ctx - The server-side context containing the request and response objects.
 * @returns {Promise<Session | null>} - The session object if available, otherwise null.
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};