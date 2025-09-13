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




// // app/api/auth/[...nextauth]/route.js
// import NextAuth from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "../../../../lib/prisma";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     EmailProvider({
//       server: {
//         host: "smtp.sendgrid.net",
//         port: 587,
//         auth: {
//           user: "apikey", // literal string required by SendGrid
//           pass: "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", // hardcoded SendGrid key
//         },
//       },
//       from: "syamannaluru@gmail.com", // must be verified in SendGrid
//     }),
//   ],
//   secret: "8Xv25rIH4kSy3vimHW+UaMjsUKpd5ALuLyot/88if1g=", // hardcoded secret
//   session: {
//     strategy: "database",
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { verifyOtp } from "@/lib/otpStore";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         otp: { label: "OTP", type: "text" },
//       },
//       async authorize(credentials) {
//         const { email, otp } = credentials;
//         if (verifyOtp(email, otp)) {
//           return { id: email, email };
//         }
//         return null;
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
// });
