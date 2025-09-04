// File: app/api/getSchool/route.js

import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id"); // may be null

    const pool = getPool();

    if (idParam) {
      // If id is provided, return specific school
      const id = Number(idParam);
      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }

      const [rows] = await pool.query("SELECT * FROM school WHERE id = ?", [id]);

      if (rows.length === 0) {
        return NextResponse.json(null, { status: 404 });
      }

      return NextResponse.json(rows[0], { status: 200 });
    } else {
      // If no id, return all schools
      const [rows] = await pool.query("SELECT * FROM school ORDER BY id ASC");
      return NextResponse.json(rows, { status: 200 });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Database error", message: error.message },
      { status: 500 }
    );
  }
}
