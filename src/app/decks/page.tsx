// src/app/decks/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Deck {
  deck_id: number;
  deck_name: string;
}

const DeckListPage: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch decks from the API
  const fetchDecks = async () => {
    const user_id = 1; // Replace with actual user ID logic
    try {
      const response = await fetch(`/api/decks?user_id=${user_id}`);
      const data = await response.json();
      if (response.ok) {
        setDecks(data.decks || []);
      } else {
        console.error("Error fetching decks:", data.error);
      }
    } catch (error) {
      console.error("Error fetching decks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  if (loading) return <p>Loading decks...</p>;

  return (
    <div>
      <Link href="/deck-builder" className="text-lg  text-Red_Colors-Red bg-White_Colors-Jet hover:bg-Green_Colors-Dartmouth_Green hover:text-White_Colors-platinum px-2 py-1 rounded-md">
        Deck Builder
      </Link>
      <h1 className="text-3xl font-bold mb-4 m-4">Your Decks</h1>
      {decks.length === 0 ? (
        <p>No decks found.</p>
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.deck_id}>
              <Link className="text-lg hover:text-Blue_Colors-Cornflower_Blue hover:bg-blue m-4" href={`/decks/${deck.deck_id}`}>{deck.deck_name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeckListPage;
