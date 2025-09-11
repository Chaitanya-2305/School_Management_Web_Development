import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { IronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';

export async function POST() {
  const session = new IronSession(cookies(), sessionOptions);
  await session.destroy();
  return NextResponse.json({ ok: true });
}
