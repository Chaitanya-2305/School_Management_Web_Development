// // import { getPool } from '@/lib/db';
// // import { NextResponse } from 'next/server';

// // export async function GET(request) { // <-- Pass the `request` object as a parameter
// //     try {
// //         const pool = getPool();
// //         const { searchParams } = new URL(request.url); // <-- Access the request's URL
// //         const id = searchParams.get('id'); // <-- Get the `id` from the URL parameters

// //         if (id) {
// //             // Handle request for a single school
// //             const [school] = await pool.query('SELECT * FROM schools WHERE id = ?', [id]);

// //             if (school.length === 0) {
// //                 return NextResponse.json({ error: 'School not found' }, { status: 404 });
// //             }

// //             return new Response(JSON.stringify(school[0]), {
// //                 headers: { 'Content-Type': 'application/json' },
// //                 status: 200,
// //             });

// //         } else {
// //             // Handle request for all schools (your original logic)
// //             const [schools] = await pool.query('SELECT id, name, address, city, state, image FROM schools');
            
// //             return new Response(JSON.stringify(schools), {
// //                 headers: { 'Content-Type': 'application/json' },
// //                 status: 200,
// //             });
// //         }
// //     } catch (error) {
// //         console.error('Error fetching schools:', error);
        
// //         // Return a proper error response from the server
// //         return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
// //     }
// // }


// // File: app/api/showSchools/route.js

// import { NextResponse } from 'next/server';
// import mysql from 'mysql2/promise';

// export async function GET(request) {
//     let connection;
//     try {
//         const { searchParams } = new URL(request.url);
//         const searchQuery = searchParams.get('search') || '';
//         const selectedState = searchParams.get('state') || '';

//         connection = await mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: 'chaitu@123',
//             database: 'schooldb',
//         });

//         let query = 'SELECT * FROM schools WHERE 1=1';
//         const params = [];

//         if (searchQuery) {
//             query += ' AND (name LIKE ? OR address LIKE ? OR city LIKE ?)';
//             params.push(`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`);
//         }

//         if (selectedState) {
//             query += ' AND state = ?';
//             params.push(selectedState);
//         }

//         const [rows] = await connection.execute(query, params);
        
//         return NextResponse.json({ schools: rows }, { status: 200 });

//     } catch (error) {
//         // Log the full error to the server console
//         console.error("API Error fetching schools:", error.message);
//         console.error(error.stack);

//         return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
//     } finally {
//         if (connection) {
//             await connection.end();
//         }
//     }
// }



// import { NextResponse } from "next/server";

// // Reuse the in-memory schools array (temporary)
// let schools = [];

// export async function GET() {
//   try {
//     return NextResponse.json(schools, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching schools:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // Allow POST here too (so both /addSchool and /getSchool can save)
// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     const school = {
//       id: Date.now(),
//       name: formData.get("name"),
//       address: formData.get("address"),
//       city: formData.get("city"),
//       state: formData.get("state"),
//       contact: formData.get("contact"),
//       email_id: formData.get("email_id"),
//       image: formData.get("image") ? formData.get("image").name : null,
//     };

//     schools.push(school);

//     return NextResponse.json({ message: "School added successfully", data: school }, { status: 201 });
//   } catch (error) {
//     console.error("Error adding school:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM schools");

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
