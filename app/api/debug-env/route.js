import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? "loaded" : "missing",
    FROM_EMAIL: process.env.FROM_EMAIL || "not set",
  });
}
