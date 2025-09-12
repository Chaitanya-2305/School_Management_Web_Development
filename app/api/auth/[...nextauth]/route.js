// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey", // literal string
          pass: "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", // SendGrid key
        },
      },
      from: "syamannaluru@gmail.com", // must be verified in SendGrid
    }),
  ],
  secret: "8Xv25rIH4kSy3vimHW+UaMjsUKpd5ALuLyot/88if1g=",
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
