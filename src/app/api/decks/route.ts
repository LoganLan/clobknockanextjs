import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../data/db'; // Make sure this is the correct path to your db.ts file

// This function will handle the POST request for creating a new deck
export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON body
    const { user_id, deck_name } = await req.json();

    // Check if the user exists in the database
    const userCheck = await query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    if (userCheck.rows.length === 0) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Insert the new deck into the "decks" table
    const result = await query(
      'INSERT INTO decks (user_id, deck_name) VALUES ($1, $2) RETURNING deck_id',
      [user_id, deck_name]
    );

    // Get the new deck ID from the result
    const deck = result.rows[0];

    // Return the created deck
    return NextResponse.json({ deck }, { status: 200 });
  } catch (error) {
    console.error("Error creating deck:", error);
    return NextResponse.json({ error: 'Error creating deck.' }, { status: 500 });
  }
}