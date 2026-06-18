import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "密碼", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        // TODO: implement password hashing with bcrypt
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) return null;
        // Add password check here when passwords are implemented
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: unknown; id?: unknown }).role = token.role;
        (session.user as { role?: unknown; id?: unknown }).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/account/login",
    error: "/account/login",
  },
});

// Helper to check admin roles
export function isAdmin(role?: string) {
  return ["OWNER", "ADMIN"].includes(role ?? "");
}

export function hasRole(role: string | undefined, allowed: string[]) {
  return allowed.includes(role ?? "");
}
