// File: app/api/deleteSchool/[id]/route.js

import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise'; // Use the promise-based version for async/await

export async function DELETE(request) {
    let connection;
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
        }

        // Create a connection to your MySQL database
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'chaitu@123',
            database: 'schooldb',
        });

        // Execute the DELETE query
        const [result] = await connection.execute(
            'DELETE FROM school WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'School not found' }, { status: 404 });
        }

        return NextResponse.json({ message: "School deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting school:", error);
        return NextResponse.json({ error: "Failed to delete school" }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}