import { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


declare module "next-auth" {
  interface Session {
    id: string;
    email: string;
    role: string;
    token: string;
    freeDownloads:string
    image:string
  }

  interface User {
    id: string;
    email: string;
    role: string;
    token: string;
    freeDownloads:string,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    token: string;
    freeDownloads:string
    image:string
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
        console.log(user,"==user");
        
        // If login is successful, return the user object
        if (res.ok && user) {    
                
          return {
            id: user.results.data.id, // Adjust according to your API response structure
            email: user.results.data.email,
            role: user.results.data.role,
            token: user.results.token, // Ensure this property is returned from your API
            name:user.results.data.name,
            image:user.results.data.image,
            freeDownloads:user.results.data.freeDownloads,

          };
        }

        // Return null if login fails
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      
      if (user ) {
        token.id = user?.id;
        token.email = user?.email;
        token.role = user?.role;
        token.token = user.token; // Store JWT token from API
        token.image = user.image || ""; // Store JWT token from API
        token.freeDownloads = user.freeDownloads; // Store JWT token from API
        if (token.token && isTokenExpired(token.token)) {
          // Instead of returning null, clear sensitive data and set an "expired" flag
          return null
        }
      }
      return token;
    },
    async session({ session, token }) {
      // console.log(token.token,"==token");
      if (isTokenExpired(token.token)) {
        return null; // Or redirect the user to login
      }
        session.id = token.id;
        session.email = token.email;
        session.role = token.role;
        session.token = token.token; // JWT Token available in the session
        session.image = token.image; // JWT Token available in the session
        session.freeDownloads = token.freeDownloads; // JWT Token available in the session
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

const isTokenExpired = (token:string) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    return decodedToken.exp && decodedToken?.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};
5