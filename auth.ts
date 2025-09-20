import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { v4 as uuidv4 } from "uuid";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { SignInFormInputs } from "./app/(auth)/sign-in/lib/definitions";
import { comparePassword } from "./app/(auth)/lib/passwords";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    colorScheme: "light",
    logo: "/cool-cards-logo.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials as SignInFormInputs;

          console.log(email, password);

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          const isPasswordCorrect = await comparePassword(
            password,
            user?.password as string
          );

          if (user && isPasswordCorrect) {
            return {
              ...user,
              email: user.email || "",
            };
          }

          return null;
        } catch (error) {
          console.log(error);

          if (error instanceof ZodError) {
            throw new Error(error.issues[0].message);
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      // console.log(user, token, account);
      if (account?.provider === "credentials") {
        const sessionToken = uuidv4();
        const expires = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days

        const sessionExists = await prisma.session.findFirst({
          where: {
            userId: user.id,
          },
        });
        if (sessionExists) {
          console.log("Session already exists, updating expiration date");
          // If the session already exists, update the expiration date
          // and store the session token in the JWT

          await prisma.session.update({
            where: {
              id: sessionExists.id,
            },
            data: {
              expires: new Date(expires),
            },
          });
          token.sessionToken = sessionExists.sessionToken;
          return token;
        }
        console.log("Creating new session");
        // Create a new session
        // and store the session token in the JWT
        // and the session in the database

        const session = await prisma.session.create({
          data: {
            sessionToken,
            user: {
              connect: {
                id: user.id,
              },
            },
            expires: new Date(expires),
          },
        });
        token.sessionToken = session.sessionToken;
      }
      return token;
    },
    async session({ session }: { session: Session }) {
      console.log("Session:", session);
      if (!session.user) return session;
      const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        roles: session.user.roles,
      };
      session.user = user;
      return session;
    },
  },
  jwt: {
    async encode({ token }: { token?: any }) {
      console.log("Token:", token);
      return token?.sessionToken as unknown as string;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
});
