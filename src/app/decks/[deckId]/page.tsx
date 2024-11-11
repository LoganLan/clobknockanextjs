'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';

interface Deck {
  deck_id: number;
  deck_name: string;
}

interface DeckPageProps {
  params: Promise<{ deckId: string }>; // Define params as a Promise type
}

const DeckPage: React.FC<DeckPageProps> = ({ params }) => {
  const { deckId } = use(params); // Use `use()` to unwrap the params promise
  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDeck = async () => {
    try {
      const response = await fetch(`/api/decks/${deckId}`);
      const data = await response.json();
      if (response.ok) {
        setDeck(data.deck);
      } else {
        console.error("Error fetching deck:", data.error);
      }
    } catch (error) {
      console.error("Error fetching deck:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeck();
  }, [deckId]);

  if (loading) return <p>Loading deck...</p>;
  if (!deck) return <p>Deck not found.</p>;

  return (
    <div>
        <Link href="/decks" className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md">
            Decks
        </Link>
        <Link href="/deck-builder" className="text-lg  text-Red_Colors-Red bg-White_Colors-Jet hover:bg-Green_Colors-Dartmouth_Green hover:text-White_Colors-platinum px-2 py-1 rounded-md">
            Deck Builder
      </Link>
      <h1 className="text-3xl font-bold">{deck.deck_name}</h1>
      {/* Add more details here about the deck, such as cards, stats, etc. */}
    </div>
  );
};

export default DeckPage;
