// import mysql from "mysql2/promise";

// let pool;

// export function getPool() {
//   if (!pool) {
//     pool = mysql.createPool({
//       host: 'localhost',
//       user: 'root',
//       password: 'chaitu@123',
//       database: 'schooldb',
//       waitForConnections: true,
//       connectionLimit: 10,
//     });
//   }
//   return pool;
// }



// lib/db.js
import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: switchback.proxy.rlwy.net,
      port: 54907,
      user: rootCertificates,
      password: lPWRoWEDJunZKfPczQiYqWaRDVUOVIso,
      database: railway,
      waitForConnections: true,
      connectionLimit: 10,
      // If SSL needed on Railway (sometimes required):
      // ssl: {}
    });
  }
  return pool;
}

