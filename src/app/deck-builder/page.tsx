// deck_builder/page.tsx
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

const DeckBuilderPage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch cards from Scryfall API based on search query
  const fetchCards = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}&order=name&page=1&unique=cards`);
      const data = await response.json();
      setCards(data.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
    setLoading(false);
  };

  // Update cards based on search query with debounce
  useEffect(() => {
    if (!searchQuery) return; // Skip if search query is empty

    const delayDebounce = setTimeout(() => {
      fetchCards(searchQuery);
    }, 300); // Wait 300ms before triggering fetch

    return () => clearTimeout(delayDebounce); // Cleanup on each keystroke
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Deck Builder</h1>
      <Button label="Add Card (Not functional)" onClick={handleButtonClick} />

      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for a card"
        className="border border-gray-300 rounded-lg p-2 mt-4 w-full"
      />

      {loading ? (
        <p>Loading cards...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-8">
          {cards.map(card => (
            <div key={card.id} className="flex justify-center">
              <Card
                title={card.name}
                description={card.oracle_text}
                imageUrl={card.image_uris?.normal}
                className="max-w-xs" // Keep max width for smaller cards
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckBuilderPage;
