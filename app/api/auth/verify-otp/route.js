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
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./session";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    // ✅ Replace this with real OTP validation
    // For now we just accept any OTP for testing
    const res = NextResponse.json({ ok: true, redirect: "/addSchool" });

    const session = await getIronSession(req, res, sessionOptions);
    session.user = { email };
    await session.save();

    return res;
  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
