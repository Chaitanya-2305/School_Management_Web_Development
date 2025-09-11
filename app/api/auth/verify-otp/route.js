import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { sessionOptions } from '@/lib/session';
import { IronSession } from 'iron-session';
import { otpStore } from '../request-otp/route';

export async function POST(req) {
  const { email, otp } = await req.json();
  const entry = otpStore.get(email);
  if (!entry || Date.now() > entry.expires)
    return NextResponse.json({ error: 'OTP expired' }, { status: 400 });

  const valid = await bcrypt.compare(otp, entry.hash);
  if (!valid) return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });

  otpStore.delete(email);

  const cookieStore = cookies();
  const session = new IronSession(cookieStore, sessionOptions);
  session.set('user', { email });
  await session.save();

  return NextResponse.json({ ok: true });
}
