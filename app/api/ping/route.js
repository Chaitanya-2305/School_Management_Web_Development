import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT 1 AS ok");
    return NextResponse.json({ db: "connected", result: rows[0] }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ db: "error", message: e.message }, { status: 500 });
  }
}
