
import CredentialsProvider from "next-auth/providers/credentials";



import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";



declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
        expires_in : string,
        access_token : string,
    } & DefaultSession["user"];
  }

}

export interface dataShape {
    expires_in : string,
    access_token : string,
}

export const authOptions : NextAuthOptions  = {
  session: { strategy: 'jwt' },
  pages: {
    error: '/auth/error',     // Error page URL
    signIn: '/',
    signOut: '/auth/signout',
  },
  secret : process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        // email: { label: "Email", type: "text" },
        // password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) : Promise<any> => {
        try {
            if(!credentials) return null
            const data  = credentials as dataShape ;
            if (!data?.access_token && !data.expires_in) {
                return null;
            }
          // Return user object if everything is okay
          return data;
        } catch (error : any) {
          throw new Error(error?.message);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // Add user to the token right after signin
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          ...user
        };
      }
      return token;
    },

    async session(params : unknown | any) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          access_token: params.token.access_token as string,
          expires_in: params.token.expires_in as string,
     
        },
      };
    },
  }
};


/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};