import { IncomingForm } from 'formidable';
import { getPool } from '@/lib/db';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

// This function converts the web stream to a Node.js stream
function streamToBuffer(webStream) {
  if (!webStream) {
    throw new Error('Request body is not a readable stream.');
  }

  return new Promise((resolve, reject) => {
    const reader = webStream.getReader();
    const chunks = [];

    function pump() {
      reader.read().then(({ done, value }) => {
        if (done) {
          resolve(Buffer.concat(chunks));
          return;
        }
        chunks.push(value);
        pump();
      }).catch(reject);
    }
    pump();
  });
}

export async function POST(req) {
  const pool = getPool();
  
  const uploadDir = path.join(process.cwd(), 'public/schoolImages');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
  });

  try {
    const bodyBuffer = await streamToBuffer(req.body);
    const nodeReq = new Readable();
    nodeReq.push(bodyBuffer);
    nodeReq.push(null);
    
    nodeReq.headers = {
      'content-type': req.headers.get('content-type'),
      'content-length': bodyBuffer.length.toString(),
    };
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) {
            console.error('Formidable parse error:', err);
            return reject(err);
        }
        resolve([fields, files]);
      });
    });
    
    const imageFile = files.image && files.image[0];

    if (!imageFile) {
      throw new Error("No image file uploaded.");
    }
    
    // **CRUCIAL FIX:** Use newFilename instead of originalFilename
    const imageUrl = `/schoolImages/${imageFile.newFilename}`;
    
    const name = fields.name[0];
    const address = fields.address[0];
    const city = fields.city[0];
    const state = fields.state[0];
    const contact = fields.contact[0];
    const email_id = fields.email_id[0];
    
    await pool.query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageUrl, email_id]
    );

    return new Response(JSON.stringify({ message: 'School added successfully!', imageUrl }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing form data:', error);
    return new Response(JSON.stringify({ error: 'Error processing the request' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}