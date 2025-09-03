import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'chaitu@123',
      database: 'schooldb',
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}