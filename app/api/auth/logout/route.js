import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function POST(req, res) {
  const session = await getIronSession(req, res, sessionOptions);
  session.user = null;
  await session.save();
  return NextResponse.json({ ok: true });
}
