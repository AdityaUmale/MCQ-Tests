import type { AuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User as UserModel } from "./model/user-model";
import  dbConnect  from "./lib/mongo";

export const authOptions: AuthOptions = {
    secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any)._id;  // Add the user ID to the token
    
    }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
        (session.user as any).id = token.id;  // Add the user ID to the session
        
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await dbConnect();
        if (credentials === null) return null;
        try {
          const user = await UserModel.findOne({ email: credentials.email });
          if (user) {
            const isMatch = await bcrypt.compare(credentials.password, user.password);
            if (isMatch) return user;
            else throw new Error("Invalid credentials");
          } else throw new Error("User not found");
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
};