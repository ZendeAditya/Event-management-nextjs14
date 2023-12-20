import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
        const user = {
          id: "50",
          username: "aditya",
          email: "adityazende6710@gmail.com",
          password: "aditya@123",
        };
        return new Promise((resolve) => {
          if (
            credentials?.username === user.username &&
            credentials?.password === user.password
          ) {
            resolve(user);
            // alert("user signIn");
            console.log(user);
          } else {
            resolve(null);
            alert("User failed to signIn");
          }
        });
      },
    }),
  ],
};
