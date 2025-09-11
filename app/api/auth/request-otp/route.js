import { NextResponse } from 'next/server';
import { sendOtpEmail } from '@/lib/sendOtp';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// simple in-memory store for demo; replace with DB in production
const otpStore = new Map();

export async function POST(req) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(otp, 10);
  otpStore.set(email, { hash, expires: Date.now() + 10 * 60 * 1000 });

  await sendOtpEmail(email, otp);
  return NextResponse.json({ ok: true });
}

export { otpStore };
