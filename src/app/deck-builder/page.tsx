"use client";

import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';

interface CardData {
  id: string;
  name: string;
  image_uris: {
    normal: string;
  };
  mana_cost: string;
  type_line: string;
  oracle_text: string;
}

interface Deck {
  deck_id: number;
  deck_name: string;
}

const DeckBuilderPage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]); // Store fetched cards
  const [loading, setLoading] = useState(false); // For loading state
  const [searchQuery, setSearchQuery] = useState(""); // For search query input
  const [deckName, setDeckName] = useState(""); // For deck name input
  const [deckId, setDeckId] = useState<number | null>(null); // Store created deck ID after it's created
  const [decks, setDecks] = useState<Deck[]>([]); // Store the list of decks

  // Fetch cards from Scryfall API based on search query
  const fetchCards = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}&order=name&page=1&unique=cards`);
      const data = await response.json();
      setCards(data.data); // Set the fetched cards in state
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
    setLoading(false);
  };
// Fetch decks from the server
const fetchDecks = async () => {
  try {
    const user_id = 1; // Replace this with the actual user ID from your session
    const response = await fetch(`/api/decks?user_id=${user_id}`);
    
    if (!response.ok) {
      console.error("Response not OK:", response.status, response.statusText);
      setDecks([]);
      return;
    }
    
    const data = await response.json();
    if (data && Array.isArray(data.decks)) {
      setDecks(data.decks);
    } else {
      console.warn("Unexpected data structure:", data);
      setDecks([]);
    }
  } catch (error) {
    console.error("Network or parsing error while fetching decks:", error);
    setDecks([]);
  }
};


  // Debounced search query effect
  useEffect(() => {
    if (!searchQuery) return; // Don't search if empty query

    const delayDebounce = setTimeout(() => {
      fetchCards(searchQuery); // Trigger API call after debounce time
    }, 300); // 300ms debounce time

    return () => clearTimeout(delayDebounce); // Cleanup debounce on each keystroke
  }, [searchQuery]);

  // Fetch decks when the page loads
  useEffect(() => {
    fetchDecks(); // Fetch the list of decks
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDeckNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeckName(event.target.value);
  };

  const handleCreateDeck = async () => {
    if (!deckName.trim()) {
      alert("Please provide a valid deck name.");
      return;
    }

    // Simulate getting user_id from session or authentication system
    const user_id = 1; // Replace this with actual user ID retrieved from session

    const deckPayload = {
      user_id,
      deck_name: deckName,
    };

    try {
      const response = await fetch('/api/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deckPayload), // Send user_id with the deck name
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to create deck: ${errorData.error || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      if (data.deck) {
        setDeckId(data.deck.deck_id); // Set the deck ID after successful creation
        setDeckName(""); // Clear the deck name input field
        fetchDecks(); // Fetch the updated list of decks
        alert("Deck created successfully!");
      } else {
        alert("Failed to create deck.");
      }
    } catch (error) {
      console.error("Error creating deck:", error);
      alert("Error creating deck.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Deck Builder</h1>
      
      {/* Deck name input */}
      <div className="mb-4">
        <input
          type="text"
          value={deckName}
          onChange={handleDeckNameChange}
          placeholder="Enter deck name"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <Button label="Create Deck" onClick={handleCreateDeck} />
      </div>

      {/* Display the list of decks */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Your Decks</h2>
        <ul>
          {decks.length > 0 ? (
            decks.map(deck => (
              <li key={deck.deck_id} className="mt-2">{deck.deck_name}</li>
            ))
          ) : (
            <p>No decks found.</p>
          )}
        </ul>
      </div>
      
      {/* Search bar for cards */}
            <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for a card"
        className="border border-gray-300 rounded-lg p-2 mt-4 w-full"
      />

      {/* Display cards */}
      {loading ? (
        <p>Loading cards...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-8">
          {Array.isArray(cards) && cards.length > 0 ? (
            cards.map(card => (
              <div key={card.id} className="flex justify-center">
                <Card
                  title={card.name}
                  description={card.oracle_text}
                  imageUrl={card.image_uris?.normal}
                />
              </div>
            ))
          ) : (
            <p>No cards found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DeckBuilderPage;
