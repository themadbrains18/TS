import { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    id: string;
    email: string;
    role: string;
    token: string;
  }

  interface User {
    id: string;
    email: string;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    token: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
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

        // Call your login API
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/login`, {
          method: "POST",
          body: JSON.stringify({ email, password, otp }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        
        // If login is successful, return the user object
        if (res.ok && user) {
          return {
            id: user.results.id, // Adjust according to your API response structure
            email: user.results.email,
            role: user.results.role,
            token: user.results.token, // Ensure this property is returned from your API
          };
        }

        // Return null if login fails
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(user,"==user=");
      
      if (user ) {
        token.id = user?.id;
        token.email = user?.email;
        token.role = user?.role;
        token.token = user.token; // Store JWT token from API
      }
      return token;
    },
    async session({ session, token }) {
      console.log(token,"==token");
 
        session.id = token.id;
        session.email = token.email;
        session.role = token.role;
        session.token = token.token; // JWT Token available in the session
        return session;
    },

  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Error page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
