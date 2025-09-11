// // File: app/api/addSchool/route.js (Next.js 13+ app router)

// import { v2 as cloudinary } from "cloudinary";
// import { getPool } from "@/lib/db";
// import { NextResponse } from "next/server";

// // Configure Cloudinary from environment variables
// cloudinary.config({
//   cloud_name: "dxcfdg1pn",                  // your Cloudinary cloud name
//   api_key: "596943473991387",               // your Cloudinary API key
//   api_secret: "CJhR7o1LYXXXLUWn-7DOMqJRD30", // your Cloudinary API secret
//   secure: true,
// });


// // Disable body parser for file uploads
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Helper function to convert ReadableStream to buffer
// async function streamToBuffer(stream) {
//   const chunks = [];
//   for await (const chunk of stream) {
//     chunks.push(chunk);
//   }
//   return Buffer.concat(chunks);
// }

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     const name = formData.get("name");
//     const address = formData.get("address");
//     const city = formData.get("city");
//     const state = formData.get("state");
//     const contact = formData.get("contact");
//     const email_id = formData.get("email_id");

//     const file = formData.get("image");

//     let imageUrl = null;

//     if (file && file.size > 0) {
//       // Convert file stream to buffer
//       const buffer = await streamToBuffer(file.stream());

//       // Upload to Cloudinary
//       const uploadResult = await cloudinary.uploader.upload_stream(
//         { folder: "schools" },
//         (error, result) => {
//           if (error) throw error;
//           return result;
//         }
//       );

//       // In Next.js app router, easier way:
//       const upload = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "schools" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );
//         uploadStream.end(buffer);
//       });

//       imageUrl = upload.secure_url;
//     }

//     // Insert school into MySQL
//     const pool = getPool();
//     await pool.query(
//       `INSERT INTO school (name, address, city, state, contact, email_id, image)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [name, address, city, state, contact, email_id, imageUrl]
//     );

//     return NextResponse.json({ message: "School added successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Add school error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { v2 as cloudinary } from "cloudinary";
import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: "dxcfdg1pn",                  // your Cloudinary cloud name
  api_key: "596943473991387",               // your Cloudinary API key
  api_secret: "CJhR7o1LYXXXLUWn-7DOMqJRD30", // your Cloudinary API secret
  secure: true,
});

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Convert ReadableStream to buffer
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req) {
  try {
    // 🔒 Check authentication with iron-session
    const cookieStore = req.cookies; // Next.js App Router passes Request object
    const session = await getIronSession(req, sessionOptions);

    if (!session.user) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in first." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("image");

    let imageUrl = null;

    if (file && file.size > 0) {
      const buffer = await streamToBuffer(file.stream());

      // Cloudinary upload
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "schools" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    // Insert into MySQL
    const pool = getPool();
    await pool.query(
      `INSERT INTO school (name, address, city, state, contact, email_id, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, email_id, imageUrl]
    );

    return NextResponse.json(
      { message: "School added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add school error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
