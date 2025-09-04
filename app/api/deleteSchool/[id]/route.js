import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id);  // ✅ convert to number
    if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const pool = getPool();
    const [result] = await pool.query("DELETE FROM school WHERE id = ?", [id]);

    if (result.affectedRows === 0) return NextResponse.json({ error: "School not found" }, { status: 404 });

    return NextResponse.json({ message: "School deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error", message: error.message }, { status: 500 });
  }
}
