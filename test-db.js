import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",          // use root since you logged in with root
  password: "chaitu@123",  // replace with the same one you just used
  database: "schooldb"  // make sure this DB exists
});

try {
  const conn = await pool.getConnection();
  console.log("✅ Connected to DB!");
  conn.release();
} catch (err) {
  console.error("❌ DB Connection failed:", err.message);
}
