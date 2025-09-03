// import { getPool } from '@/lib/db';
// import { NextResponse } from 'next/server';

// export async function GET() {
//     try {
//         const pool = getPool();
//         const [schools] = await pool.query('SELECT id, name, address, city, image FROM schools');
        
//         return new Response(JSON.stringify(schools), {
//             headers: { 'Content-Type': 'application/json' },
//             status: 200,
//         });
//     } catch (error) {
//         console.error('Error fetching schools:', error);
        
//         // Return a proper error response from the server
//         return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
//     }
// }

import { getPool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) { // <-- Pass the `request` object as a parameter
    try {
        const pool = getPool();
        const { searchParams } = new URL(request.url); // <-- Access the request's URL
        const id = searchParams.get('id'); // <-- Get the `id` from the URL parameters

        if (id) {
            // Handle request for a single school
            const [school] = await pool.query('SELECT * FROM schools WHERE id = ?', [id]);

            if (school.length === 0) {
                return NextResponse.json({ error: 'School not found' }, { status: 404 });
            }

            return new Response(JSON.stringify(school[0]), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });

        } else {
            // Handle request for all schools (your original logic)
            const [schools] = await pool.query('SELECT id, name, address, city, state, image FROM schools');
            
            return new Response(JSON.stringify(schools), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });
        }
    } catch (error) {
        console.error('Error fetching schools:', error);
        
        // Return a proper error response from the server
        return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
    }
}