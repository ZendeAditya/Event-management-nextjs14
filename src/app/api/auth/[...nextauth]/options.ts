import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import { Awaitable, NextAuthOptions, RequestInternal } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../libs/mongodb";
import bcrypt from "bcrypt";
import User from "@/app/models/user";
import { randomBytes, randomUUID } from "crypto";
import connectDB from "@/app/helper/connectDB";
export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise!),
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your name" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Your email here",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials, req) {
        async function authorize(credentials, req) {
          try {
            const email = credentials?.email ?? "";
            const password = credentials?.password ?? "";

            await connectDB();

            const user = await User.findOne({ email });

            if (user) {
              const isPasswordValid = await bcrypt.compare(
                password,
                user.password
              );

              if (isPasswordValid) {
                return user;
              }
            }
            return null;
          } catch (error) {
            console.error("Authentication error:", error);
            return null;
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 6 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
};
