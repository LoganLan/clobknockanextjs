import { NextResponse } from 'next/server';
import { query } from '../../../data/db'; // Adjust path to db.ts

export async function GET() {
  try {
    // Simulate getting user_id from session or authentication system
    const user_id = 1; // Replace this with actual user ID
  
    // Query to fetch all decks for the given user
    const result = await query('SELECT * FROM decks WHERE user_id = $1', [user_id]);
  
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "No decks found for this user." }, { status: 404 });
    }
  
    return NextResponse.json({ decks: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching decks:", error);
    return NextResponse.json({ error: "Error fetching decks" }, { status: 500 });
  }
}
