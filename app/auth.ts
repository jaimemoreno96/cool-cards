import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "./(auth)/sign-in/lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    colorScheme: "light",
    logo: "/cool-cards-logo.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    // Credentials({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   authorize: async (credentials) => {
    //     try {
    //       const { email, password } =
    //         await signInSchema.parseAsync(credentials);

            

            
    //       return null;
    //     } catch (error) {
    //       if (error instanceof ZodError) {
            
    //       }
    //       return null;
    //     }
    //   },
    // }),
  ],
});
