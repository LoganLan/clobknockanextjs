import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../data/db'; // Adjust path to db.ts

export async function GET(req: NextRequest, context: { params: { deckId: string } }) {
  const { deckId } = await context.params; // Await the params before using them

  try {
    // Query to fetch the deck details for the given deckId
    const result = await query('SELECT * FROM decks WHERE deck_id = $1', [deckId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Deck not found.' }, { status: 404 });
    }

    const deck = result.rows[0];
    return NextResponse.json({ deck }, { status: 200 });
  } catch (error) {
    console.error('Error fetching deck:', error);
    return NextResponse.json({ error: 'Error fetching deck' }, { status: 500 });
  }
}
