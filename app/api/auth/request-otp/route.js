import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey('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');

export const otpStore = new Map();

export async function POST(req) {
  const { email } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(otp, 10);

  otpStore.set(email, { hash, expires: Date.now() + 10 * 60 * 1000 });

  await sgMail.send({
    to: email,
    from: 'syamannaluru@gmail.com',
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });

  return NextResponse.json({ ok: true });
}
