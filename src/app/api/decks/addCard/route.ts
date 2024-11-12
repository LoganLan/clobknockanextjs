import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../data/db'; // Adjust path if necessary

// POST route to add a card to a deck
export async function POST(req: NextRequest) {
  try {
    const { deck_id, card_id, quantity } = await req.json();

    // Check if deck exists
    const deckCheck = await query('SELECT * FROM decks WHERE deck_id = $1', [deck_id]);
    if (deckCheck.rows.length === 0) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    // Add card to deck, or update quantity if it already exists in the deck
    const result = await query(
        `INSERT INTO deck_cards (deck_id, card_id, quantity)
         VALUES ($1, $2, $3)
         ON CONFLICT (deck_id, card_id) 
         DO UPDATE SET quantity = excluded.quantity + $3`,
        [deck_id, card_id, quantity]  // This array contains the parameters to replace $1, $2, and $3
      );
      

    return NextResponse.json({ deck_card: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Error adding card to deck:", error);
    return NextResponse.json({ error: 'Error adding card to deck.' }, { status: 500 });
  }
}
