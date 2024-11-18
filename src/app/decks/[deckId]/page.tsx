'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Heading from "@/app/components/Heading";
import Footer from "@/app/components/Footer";
import Card from "@/app/deck-builder/components/Card";

interface CardData {
  card_id: string;
  name: string;
  image_url: string;
  quantity: number;
  description: string;
  artist: string;
  type: string;
  legality: string; // Add legality
}

interface Deck {
  deck_id: number;
  deck_name: string;
  deck_type: string;
  deck_color: string;
}

interface DeckPageProps {
  params: Promise<{ deckId: string }>;
}

const DeckPage: React.FC<DeckPageProps> = ({ params }) => {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search state

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setDeckId(resolvedParams.deckId);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (deckId) {
      const fetchDeck = async () => {
        try {
          const response = await fetch(`/api/decks/${deckId}`);
          const data = await response.json();
          if (response.ok) {
            setDeck(data.deck);
            setCards(data.cards); // Assuming the API response has a 'cards' property
          } else {
            console.error('Error fetching deck:', data.error);
          }
        } catch (error) {
          console.error('Error fetching deck:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDeck();
    }
  }, [deckId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchQuery)
  );

  const handleDeleteCard = async (cardId: string) => {
    if (!deckId) return;

    try {
      const response = await fetch(`/api/decks/${deckId}?cardId=${cardId}`, { method: 'DELETE' });

      if (response.ok) {
        setCards((prevCards) => prevCards.filter((card) => card.card_id !== cardId)); // Update state
      } else {
        const data = await response.json();
        console.error('Error deleting card:', data.error);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  if (loading) return <p>Loading deck...</p>;
  if (!deck) return <p>Deck not found.</p>;

  return (
    <div>
      <Heading />
      <Link
        href="/decks"
        className="text-lg text-white bg-green-500 hover:text-blue-500 hover:bg-gray-800 px-2 py-1 rounded-md"
      >
        Decks
      </Link>

      <h1 className="text-3xl font-bold mt-4">{deck.deck_name}</h1>

      {/* Search bar */}
      <div className="mt-4">
        <label htmlFor="search" className="text-white">Search Cards:</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a card..."
          className="border rounded px-3 py-2 ml-2 text-gray-800 bg-white"
        />
      </div>

      {/* Display cards */}
      <div className="card-grid">
        {filteredCards.length === 0 ? (
          <p>No cards match your search.</p>
        ) : (
          filteredCards.map((card) => (
            <div key={card.card_id} className="card-container">
              <div className="flex flex-col items-center">
                <Card
                  title={card.name}
                  imageUrl={card.image_url}
                  description={card.description}
                  className="mb-1"  // Added margin to create space between image and details
                />
                <div className="card-details">
                  <p className="text-sm text-white">Quantity: {card.quantity}</p>
                  <button
                    onClick={() => handleDeleteCard(card.card_id)}
                    className="mt-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DeckPage;
