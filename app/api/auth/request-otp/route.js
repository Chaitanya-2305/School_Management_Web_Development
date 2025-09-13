

// // route.js
// import sgMail from "@sendgrid/mail";
// import { NextResponse } from "next/server";
// import { saveOtp } from "../verify-otp/store"; // Adjust path if needed

// // Hardcoded SendGrid API Key (for testing)
// const SENDGRID_API_KEY = "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";
// sgMail.setApiKey(SENDGRID_API_KEY);

// export async function POST(req) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     // Generate a random 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save OTP in temporary store
//     saveOtp(email, otp);

//     // Prepare email message
//     const msg = {
//       to: email,
//       from: "syamannaluru@gmail.com", // Must be verified in SendGrid
//       subject: "Your OTP Code",
//       text: `Your OTP code is: ${otp}`,
//     };

//     // Send email
//     const response = await sgMail.send(msg);

//     console.log(`OTP for ${email}: ${otp}`);
//     console.log("SendGrid response:", response);

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error("OTP send error:", error);
//     if (error.response) console.error("SendGrid response body:", error.response.body);
//     return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { saveOtp } from '@/lib/otpStore';

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    saveOtp(email, code);

    console.log(`OTP for ${email}: ${code}`);
    return NextResponse.json({ success: true, otp: code });
  } catch (err) {
    console.error('request-otp error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}




// import sgMail from "@sendgrid/mail";
// import { NextResponse } from "next/server";
// import { saveOtp } from "@/lib/otpStore";

// // **Hardcode your API key here for testing only**
// const SENDGRID_API_KEY = "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";
// sgMail.setApiKey(SENDGRID_API_KEY);
// export async function POST(req) {
//   try {
//     const { email } = await req.json();
//     if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     saveOtp(email, otp);

//     const msg = {
//       to: email,
//       from: "syamannaluru@gmail.com", // must be verified in SendGrid
//       subject: "Your OTP Code",
//       text: `Your OTP code is: ${otp}`,
//     };

//     await sgMail.send(msg);

//     if (process.env.NODE_ENV !== "production") console.log(`OTP for ${email}: ${otp}`);

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error("OTP send error:", error);
//     return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
//   }
// }
