// import { getIronSession } from "iron-session";
// import { sessionOptions } from "./session";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     const res = NextResponse.json({ ok: true });

//     const session = await getIronSession(req, res, sessionOptions);
//     session.user = { email }; // save user email in session
//     await session.save();

//     return res;
//   } catch (error) {
//     console.error("Error in verify-otp:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import { getIronSession } from "iron-session";
// import { sessionOptions } from "./session";
// import { verifyOtp } from "./store";

// export async function POST(req) {
//   try {
//     const { email, otp } = await req.json();
//     if (!email || !otp)
//       return NextResponse.json({ error: "Email & OTP required" }, { status: 400 });

//     if (!verifyOtp(email, otp)) {
//       return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
//     }

//     const res = NextResponse.json({ ok: true, redirect: "/addSchool" });
//     const session = await getIronSession(req, res, sessionOptions);
//     session.user = { email };
//     await session.save();

//     return res;
//   } catch (err) {
//     console.error("verify-otp error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }



// File: app/api/auth/verify-otp/route.js
// import { NextResponse } from "next/server";
// import { getIronSession } from "iron-session";
// import { sessionOptions } from "./session";

// export async function POST(req) {
//   try {
//     const { email, otp } = await req.json();

//     if (!email || !otp) {
//       return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
//     }

//     // ✅ Replace this with real OTP validation
//     // For now we just accept any OTP for testing
//     const res = NextResponse.json({ ok: true, redirect: "/addSchool" });

//     const session = await getIronSession(req, res, sessionOptions);
//     session.user = { email };
//     await session.save();

//     return res;
//   } catch (err) {
//     console.error("verify-otp error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { getOtp, removeOtp } from "./store";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../[...nextauth]/route";

// export async function POST(req) {
//   const { email, otp } = await req.json();
//   const validOtp = getOtp(email);

//   if (!validOtp || validOtp !== otp) {
//     return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
//   }

//   // Remove OTP after successful verification
//   removeOtp(email);

//   // ✅ Sign in the user by creating session (via NextAuth)
//   const session = await getServerSession(req, null, authOptions);

//   return NextResponse.json({ ok: true, redirect: "/addSchool" });
// }



import { NextResponse } from "next/server";
import { verifyOtp, removeOtp } from "@/lib/otpStore";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const valid = verifyOtp(email, otp);
    if (!valid) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

    removeOtp(email); // clean up after verification

    // ✅ Redirect to addSchool page after successful OTP
    return NextResponse.json({ ok: true, redirect: "/addSchool" });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}

