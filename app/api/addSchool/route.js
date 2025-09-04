// import { IncomingForm } from 'formidable';
// import { getPool } from '@/lib/db';
// import path from 'path';
// import fs from 'fs';
// import { Readable } from 'stream';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // This function converts the web stream to a Node.js stream
// function streamToBuffer(webStream) {
//   if (!webStream) {
//     throw new Error('Request body is not a readable stream.');
//   }

//   return new Promise((resolve, reject) => {
//     const reader = webStream.getReader();
//     const chunks = [];

//     function pump() {
//       reader.read().then(({ done, value }) => {
//         if (done) {
//           resolve(Buffer.concat(chunks));
//           return;
//         }
//         chunks.push(value);
//         pump();
//       }).catch(reject);
//     }
//     pump();
//   });
// }

// export async function POST(req) {
//   const pool = getPool();
  
//   const uploadDir = path.join(process.cwd(), 'public/schoolImages');
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   const form = new IncomingForm({
//     uploadDir,
//     keepExtensions: true,
//     maxFileSize: 10 * 1024 * 1024,
//   });

//   try {
//     const bodyBuffer = await streamToBuffer(req.body);
//     const nodeReq = new Readable();
//     nodeReq.push(bodyBuffer);
//     nodeReq.push(null);
    
//     nodeReq.headers = {
//       'content-type': req.headers.get('content-type'),
//       'content-length': bodyBuffer.length.toString(),
//     };
    
//     const [fields, files] = await new Promise((resolve, reject) => {
//       form.parse(nodeReq, (err, fields, files) => {
//         if (err) {
//             console.error('Formidable parse error:', err);
//             return reject(err);
//         }
//         resolve([fields, files]);
//       });
//     });
    
//     const imageFile = files.image && files.image[0];

//     if (!imageFile) {
//       throw new Error("No image file uploaded.");
//     }
    
//     // **CRUCIAL FIX:** Use newFilename instead of originalFilename
//     const imageUrl = `/schoolImages/${imageFile.newFilename}`;
    
//     const name = fields.name[0];
//     const address = fields.address[0];
//     const city = fields.city[0];
//     const state = fields.state[0];
//     const contact = fields.contact[0];
//     const email_id = fields.email_id[0];
    
//     await pool.query(
//       'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [name, address, city, state, contact, imageUrl, email_id]
//     );

//     return new Response(JSON.stringify({ message: 'School added successfully!', imageUrl }), {
//       headers: { 'Content-Type': 'application/json' },
//       status: 200,
//     });
//   } catch (error) {
//     console.error('Error processing form data:', error);
//     return new Response(JSON.stringify({ error: 'Error processing the request' }), {
//       headers: { 'Content-Type': 'application/json' },
//       status: 500,
//     });
//   }
// }




// import { NextResponse } from "next/server";

// let schools = []; // temporary in-memory store (resets on redeploy)

// export async function POST(req) {
//   try {
//     // Parse form data (supports file upload)
//     const formData = await req.formData();

//     const school = {
//       id: Date.now(),
//       name: formData.get("name"),
//       address: formData.get("address"),
//       city: formData.get("city"),
//       state: formData.get("state"),
//       contact: formData.get("contact"),
//       email_id: formData.get("email_id"),
//       // If file uploaded, get metadata
//       image: formData.get("image") ? formData.get("image").name : null,
//     };

//     // ✅ Basic validation
//     if (!school.name || !school.address || !school.city || !school.state || !school.contact || !school.email_id) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     schools.push(school);

//     return NextResponse.json({ message: "School added successfully", data: school }, { status: 201 });
//   } catch (error) {
//     console.error("Error in POST /api/addSchool:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({ data: schools });
// }








import { v2 as cloudinary } from "cloudinary";
import { getPool } from "@/lib/db";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false, // required for FormData file upload
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");

    const file = formData.get("image");

    // Upload file to Cloudinary
    let imageUrl = null;
    if (file && file.size > 0) {
      const uploadResult = await cloudinary.uploader.upload(file.stream(), {
        folder: "schools",
      });
      imageUrl = uploadResult.secure_url;
    }

    // Insert school data into MySQL
    const pool = getPool();
    await pool.query(
      `INSERT INTO school (name, address, city, state, contact, email_id, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, email_id, imageUrl]
    );

    res.status(200).json({ message: "School added successfully" });
  } catch (error) {
    console.error("Add school error:", error);
    res.status(500).json({ error: error.message });
  }
}



// import { NextResponse } from "next/server";
// import { getPool } from "@/lib/db";
// import { v2 as cloudinary } from "cloudinary";
// import { PassThrough } from "stream";

// // Initialize Cloudinary from CLOUDINARY_URL
// cloudinary.config({ secure: true });

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
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const stream = new PassThrough();
//       stream.end(buffer);

//       imageUrl = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { resource_type: "image" },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result.secure_url);
//           }
//         );
//         stream.pipe(uploadStream);
//       });
//     }

//     const pool = getPool();
//     await pool.query(
//       `INSERT INTO school (name, address, city, state, contact, email_id, image)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [name, address, city, state, contact, email_id, imageUrl]
//     );

//     return NextResponse.json({ message: "School added successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Add school error:", error.message, error.stack);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


