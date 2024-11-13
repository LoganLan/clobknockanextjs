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

      {/* Header */}
      <header className="flex bg-gray-500 justify-between items-center p-2.5 flex-wrap">
        <div className="flex items-center">
          <Link href="/landing-page" legacyBehavior>
            <a className="text-2xl text-white hover-rainbow" style={{ margin: 0 }}>
              Clobknocka
            </a>
          </Link>
          <div className="h-8 w-px bg-white ml-4 rounded-full"></div>
        </div>

        <nav className="flex items-center">
          <div className="flex items-center space-x-5 mx-2">
            {/* Navigation Links */}
            <Link href="/landing-page" className="text-lg text-Blue_Colors-Palatinate_Blue bg-White_Colors-platinum hover:bg-White_Colors-Jet hover:text-Red_Colors-Red px-2 py-1 rounded-md">
              Home
            </Link>
            <Link href="/deck-builder" className="text-lg text-White_Colors-Jet bg-Blue_Colors-Zaffre hover:text-Red_Colors-Red hover:bg-Green_Colors-Pakistan_Green px-2 py-1 rounded-md">
              Explore
            </Link>
            <Link href="/help-page" className="text-lg text-Red_Colors-Red bg-White_Colors-Jet hover:bg-Green_Colors-Dartmouth_Green hover:text-White_Colors-platinum px-2 py-1 rounded-md">
              Help
            </Link>
            <Link href="/register-page" className="text-lg text-Green_Colors-Green bg-Red_Colors-OU_crimson hover:text-White_Colors-platinum hover:bg-Blue_Colors-Persian_Blue px-2 py-1 rounded-md">
              Register
            </Link>
            <Link href="/login-page" className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md">
              Sign In
            </Link>
          </div>
        </nav>
      </header>

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

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#3d3d3d',
        }}
      >
        <p>&copy; Created by Logan, Nathan, and Soraya</p>
        <p>
          <a href="#home" style={{ marginRight: '15px' }}>
            Privacy Policy
          </a>
          <a href="#home">Terms of Service</a>
        </p>
      </footer>

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

