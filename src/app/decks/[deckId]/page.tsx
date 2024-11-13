'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';

interface Card {
  card_id: string;
  name: string;
  image_url: string;
  quantity: number;
}

interface Deck {
  deck_id: number;
  deck_name: string;
}

interface DeckPageProps {
  params: Promise<{ deckId: string }>;
}

const DeckPage: React.FC<DeckPageProps> = ({ params }) => {
  const { deckId } = use(params);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeck = async () => {
    try {
      const response = await fetch(`/api/decks/${deckId}`);
      const data = await response.json();
      if (response.ok) {
        setDeck(data.deck);
        setCards(data.cards || []);
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
      <Link href="/deck-builder" className="text-lg text-Red_Colors-Red bg-White_Colors-Jet hover:bg-Green_Colors-Dartmouth_Green hover:text-White_Colors-platinum px-2 py-1 rounded-md">
        Deck Builder
      </Link>
      <h1 className="text-3xl font-bold">{deck.deck_name}</h1>

      {/* Display each card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {cards.map((card) => (
          <div key={card.card_id} className="border p-4 rounded-lg">
            <img src={card.image_url} alt={card.name} className="w-full h-auto mb-2" />
            <h3 className="text-lg font-semibold">{card.name}</h3>
            <p className="text-sm">Quantity: {card.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckPage;
