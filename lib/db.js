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






import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}


