import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { otpStore } from "../request-otp/route";
import bcrypt from "bcryptjs";

export async function POST(req, res) {
  const { email, otp } = await req.json();
  const entry = otpStore.get(email);

  if (!entry || Date.now() > entry.expires) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  const valid = await bcrypt.compare(otp, entry.hash);
  if (!valid) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

  otpStore.delete(email);

  const session = await getIronSession(req, res, sessionOptions);
  session.user = { email };
  await session.save();

  return NextResponse.json({ ok: true });
}
