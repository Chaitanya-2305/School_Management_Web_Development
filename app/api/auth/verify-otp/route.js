import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { sessionOptions } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { otpStore } from '../request-otp/route';

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    // Check OTP
    const entry = otpStore.get(email);
    if (!entry || Date.now() > entry.expires) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    const valid = await bcrypt.compare(otp, entry.hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Delete OTP after verification
    otpStore.delete(email);

    // Get session using iron-session
    const cookieStore = cookies();
    const session = await getIronSession(cookieStore, sessionOptions);

    // Set user in session
    session.user = { email };
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
