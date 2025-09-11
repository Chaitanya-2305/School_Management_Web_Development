import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const cookieStore = cookies();
  const session = await getIronSession(cookieStore, sessionOptions);

  session.destroy();

  return NextResponse.json({ ok: true });
}
