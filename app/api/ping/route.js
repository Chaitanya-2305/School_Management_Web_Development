// import { NextResponse } from "next/server";
// import { getPool } from "@/lib/db";

// export async function GET() {
//   try {
//     const pool = getPool();
//     const [rows] = await pool.query("SELECT 1 AS ok");
//     return NextResponse.json({ db: "connected", result: rows[0] }, { status: 200 });
//   } catch (e) {
//     return NextResponse.json({ db: "error", message: e.message }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM school WHERE id = ?", [id]);

    if (rows.length === 0) return NextResponse.json(null, { status: 404 });

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error", message: error.message }, { status: 500 });
  }
}


