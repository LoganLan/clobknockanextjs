'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Deck {
  deck_id: number;
  deck_name: string;
}

const DeckListPage: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search input

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

  // Filter decks based on search term
  const filteredDecks = decks.filter(deck =>
    deck.deck_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading decks...</p>;

  return (
    <div>
      <Header />

      <div className="pt-5 pb-5">
        <Link
          href="/deck-builder"
          className="text-lg text-Red_Colors-Red bg-White_Colors-Jet hover:bg-Green_Colors-Dartmouth_Green hover:text-White_Colors-platinum px-2 py-1 rounded-md"
        >
          Deck Builder
        </Link>
      </div>

      {/* Search Bar */}
<div className="mb-4">
  <input
    type="text"
    placeholder="Search decks..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="p-1 border rounded-md w-32 text-sm text-White_Colors-outer-space"
  />
</div>


      <h1 className="text-3xl font-bold mb-4 m-4 text-White_Colors-outer-space">Your Decks</h1>
      {filteredDecks.length === 0 ? (
        <p>No decks found.</p>
      ) : (
        <ul>
          {filteredDecks.map((deck) => (
            <li key={deck.deck_id}>
              <Link className="text-lg hover:text-Blue_Colors-Cornflower_Blue hover:bg-blue m-4" href={`/decks/${deck.deck_id}`}>{deck.deck_name}</Link>
            </li>
          ))}
        </ul>
      )}
      
      <Footer />

      {/* Custom animation */}
      <style jsx>{`
        @keyframes rainbow {
          0% { color: #ffffff; } /* White */
          12.5% { color: #6e9aff; } /* Cornflower_Blue */
          25% { color: #989898; } /* battleship-grey */
          37.5% { color: #ed1515; } /* Red(CMYK) */
          50% { color: #22ff1f; } /* Green */
          62.5% { color: #dcdcdc; } /* platinum */
          75% { color: #1f40ff; } /* Palatinate_Blue */
          87.5% { color: #525252; } /* Davys-Gray */
          90% { color: #c80d0d; } /* Engineering_Orange */
          100% { color: #008b06; } /* India_Green */
        }

        .hover-rainbow:hover {
          animation: rainbow 5s infinite;
        }
      `}</style>
    </div>
  );
};

export default DeckListPage;

