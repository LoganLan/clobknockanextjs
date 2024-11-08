// app/api/decks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../data/db'; // Ensure this path is correct

// POST handler for creating a new deck
export async function POST(req: NextRequest) {
  try {
    const { user_id, deck_name } = await req.json();
    const userCheck = await query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    if (userCheck.rows.length === 0) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    const result = await query(
      'INSERT INTO decks (user_id, deck_name) VALUES ($1, $2) RETURNING deck_id',
      [user_id, deck_name]
    );
    const deck = result.rows[0];
    return NextResponse.json({ deck }, { status: 200 });
  } catch (error) {
    console.error("Error creating deck:", error);
    return NextResponse.json({ error: 'Error creating deck.' }, { status: 500 });
  }
}

// GET handler for fetching all decks for a specific user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const result = await query('SELECT deck_id, deck_name FROM decks WHERE user_id = $1', [user_id]);
    return NextResponse.json({ decks: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching decks:", error);
    return NextResponse.json({ error: 'Error fetching decks.' }, { status: 500 });
  }
}
