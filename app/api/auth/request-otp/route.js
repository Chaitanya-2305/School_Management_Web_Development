// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import sgMail from "@sendgrid/mail";

// // --- Configuration ---
// if (!process.env.SENDGRID_API_KEY || !process.env.FROM_EMAIL) {
//   console.warn("Missing SENDGRID_API_KEY or FROM_EMAIL in environment variables");
// }
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // Store OTPs in memory (clears on server restart)
// export const otpStore = new Map();

// export async function POST(req) {
//   try {
//     const { email } = await req.json();
//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     // Generate a 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const hash = await bcrypt.hash(otp, 10);

//     // Save hashed OTP with 10-minute expiry
//     otpStore.set(email, { hash, expires: Date.now() + 10 * 60 * 1000 });

//     // Send email
//     await sgMail.send({
//       to: email,
//       from: process.env.FROM_EMAIL,
//       subject: "Your OTP Code",
//       text: `Your OTP is ${otp}. It expires in 10 minutes.`,
//     });

//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     console.error("OTP send error:", err);
//     return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
//   }
// }



// import sgMail from "@sendgrid/mail";
// import { NextResponse } from "next/server";

// // Hardcoded SendGrid API Key
// sgMail.setApiKey("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");

// export async function POST(req) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     // Generate a random 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     // Send email via SendGrid
//     const msg = {
//       to: email,
//       from: "syamannaluru@gmail.com", // Must be verified in SendGrid
//       subject: "Your OTP Code",
//       text: `Your OTP code is: ${otp}`,
//     };

//     await sgMail.send(msg);

//     // For testing, you can log OTP to console (remove in production)
//     console.log(`OTP for ${email}: ${otp}`);

//     return NextResponse.json({ ok: true, otp }); // otp included for testing
//   } catch (error) {
//     console.error("OTP send error:", error);
//     return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
//   }
// }


import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";
import { saveOtp } from "../verify-otp/store"; // import helper to store OTP

// Set API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in temporary store (for verification later)
    saveOtp(email, otp);

    // Send the email via SendGrid
    const msg = {
      to: email,
      from: "syamannaluru@gmail.com", // must be verified in SendGrid
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    await sgMail.send(msg);

    // Optional: log for local testing only
    if (process.env.NODE_ENV !== "production") {
      console.log(`OTP for ${email}: ${otp}`);
    }

    return NextResponse.json({ ok: true }); // no OTP in response for security
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
