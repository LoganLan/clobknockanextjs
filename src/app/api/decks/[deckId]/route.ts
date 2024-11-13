import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../data/db';

export async function GET(req: NextRequest, context: { params: { deckId: string } }) {
  // Await the params to access deckId correctly
  const { deckId } = await context.params;

  try {
    // Query to fetch deck details
    const deckResult = await query('SELECT * FROM decks WHERE deck_id = $1', [deckId]);
    if (deckResult.rows.length === 0) {
      return NextResponse.json({ error: 'Deck not found.' }, { status: 404 });
    }
    
    // Query to fetch card_ids for the deck
    const cardResults = await query('SELECT card_id, quantity FROM deck_cards WHERE deck_id = $1', [deckId]);
    
    // Fetch card details for each card_id (e.g., from Scryfall)
    const cardDetails = await Promise.all(cardResults.rows.map(async (row) => {
      const cardResponse = await fetch(`https://api.scryfall.com/cards/${row.card_id}`);
      const cardData = await cardResponse.json();
      return {
        card_id: row.card_id,
        name: cardData.name,
        image_url: cardData.image_uris?.normal,
        quantity: row.quantity
      };
    }));

    const deck = deckResult.rows[0];
    return NextResponse.json({ deck, cards: cardDetails }, { status: 200 });
  } catch (error) {
    console.error('Error fetching deck:', error);
    return NextResponse.json({ error: 'Error fetching deck' }, { status: 500 });
  }
}
