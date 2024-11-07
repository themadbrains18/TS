import { AuthOptions, DefaultSession } from "next-auth"; // Importing necessary types from NextAuth
import CredentialsProvider from "next-auth/providers/credentials"; // Importing Credentials provider for custom login
import { jwtDecode } from "jwt-decode"; // Function to decode JWT tokens
import GoogleProvider from "next-auth/providers/google"; // Google authentication provider
import GithubProvider from "next-auth/providers/github"; // Github authentication provider
import FacebookProvider from "next-auth/providers/facebook"; // Facebook authentication provider

// Extending NextAuth types to include additional fields
declare module "next-auth" {
  interface Session {
    id: string; // User ID
    email: string; // User's email
    role: string; // User's role (e.g., 'admin' or 'user')
    token: string; // JWT token for authentication
    freeDownloads: string; // Number of free downloads remaining
    image: string; // URL of the user's profile image
  }

  interface User {
    id: string; // User ID
    email: string; // User's email
    role: string; // User's role
    token: string; // JWT token for authentication
    freeDownloads: string; // Number of free downloads remaining
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // User ID
    email: string; // User's email
    role: string; // User's role
    token: string; // JWT token for authentication
    freeDownloads: string; // Number of free downloads remaining
    image: string; // URL of the user's profile image
  }
}

// NextAuth options
export const authOptions: AuthOptions = {
  providers: [
    // Google authentication provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "", // Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "", // Google Client Secret
    }),
    // Github authentication provider
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "", // Github Client ID
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "", // Github Client Secret
    }),
    // Facebook authentication provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "", // Facebook App ID
      clientSecret: process.env.FACEBOOK_SECRET ?? "", // Facebook App Secret
    }),
    // Credentials provider for custom login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" }, // Email input
        password: { label: "Password", type: "password" }, // Password input
        otp: { label: "OTP", type: "text", required: false }, // OTP input (optional)
      },
      async authorize(credentials) {
        // Ensure credentials are provided
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const { email, password, otp } = credentials;

        // Call the login API to authenticate the user
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/login`, {
          method: "POST",
          body: JSON.stringify({ email, password, otp }),
          headers: { "Content-Type": "application/json" },
        });

        // Parse the response from the API
        const user = await res.json();
        console.log(user, "==user");

        // If login is successful, return user details
        if (res.ok && user) {
          return {
            id: user.results.data.id, // Adjust according to your API response structure
            email: user.results.data.email,
            role: user.results.data.role,
            token: user.results.token, // JWT token returned by the API
            name: user.results.data.name,
            image: user.results.data.image,
            freeDownloads: user.results.data.freeDownloads,
          };
        }

        // Return null if login fails
        return null;
      },
    }),
  ],
  callbacks: {
    // Callback for JWT token
    async jwt({ token, user }) {
      // If the user is authenticated, add additional information to the token
      if (user) {
        token.id = user?.id;
        token.email = user?.email;
        token.role = user?.role;
        token.token = user.token; // Store JWT token from API
        token.image = user.image || ""; // Store image URL
        token.freeDownloads = user.freeDownloads; // Store free downloads
        // Check if the token has expired
        if (token.token && isTokenExpired(token.token)) {
          // Clear sensitive data and set an "expired" flag
          return null;
        }
      }
      return token;
    },

    // Callback for session handling
    async session({ session, token }) {
      // If the token is expired, return null (user will be logged out)
      if (isTokenExpired(token.token)) {
        return null;
      }

      // Add token data to the session object
      session.id = token.id;
      session.email = token.email;
      session.role = token.role;
      session.token = token.token; // JWT Token available in the session
      session.image = token.image; // Profile image available in the session
      session.freeDownloads = token.freeDownloads; // Free downloads available in the session
      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // Custom sign-in page
    error: "/auth/error", // Error page for authentication errors
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for JWT encryption
};

// Helper function to check if the token is expired
const isTokenExpired = (token: string) => {
  if (!token) return true; // If token is missing, consider it expired
  try {
    const decodedToken = jwtDecode(token); // Decode the JWT token
    const currentTime = Date.now() / 1000; // Get the current time in seconds

    // Check if the token's expiration time is less than the current time
    return decodedToken.exp && decodedToken?.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Consider token expired if decoding fails
  }
};
