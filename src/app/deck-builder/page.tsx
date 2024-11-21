'use client';

import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Link from 'next/link';
import Heading from "@/app/components/Heading";
import Footer from "@/app/components/Footer";
import { ScryfallCard } from "@scryfall/api-types";
import { IScrytextProps, Scrycard } from 'react-scrycards';

interface CardData {
  id: string;
  name: string;
  image_uris: {
    normal: string;
  };
  card_faces?: {
    image_uris: {
      normal: string;
    };
  }[]; // Added card_faces for dual-face card support
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  prices: {
    usd: string | null;
    usd_foil: string | null;
    eur: string | null;
  };
}

interface Deck {
  deck_id: number;
  deck_name: string;
}

const DeckBuilderPage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]); // Store fetched cards
  const [loading, setLoading] = useState(false); // For loading state

  // Separate states for each filter
  const [nameFilter, setNameFilter] = useState(""); 
  const [artistFilter, setArtistFilter] = useState(""); 
  const [typeFilter, setTypeFilter] = useState("");
  const [manaCostFilter, setManaCostFilter] = useState("");

  const [deckName, setDeckName] = useState(""); // For deck name input
  const [decks, setDecks] = useState<Deck[]>([]); // Store the list of decks
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);

  // Combine the filters to create a query string
  const fetchCards = async () => {
    setLoading(true);
    try {
      // Build the query by combining the filters if they are provided
      let query = "";
      if (nameFilter) query += `name:${nameFilter}`;
      if (artistFilter) query += query ? `+artist:${artistFilter}` : `artist:${artistFilter}`;
      if (typeFilter) query += query ? `+type:${typeFilter}` : `type:${typeFilter}`;
      if (manaCostFilter) query += query ? `+mana:${manaCostFilter}` : `mana:${manaCostFilter}`;

      if (!query) return; // No query means no fetch

      const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}&order=name&page=1&unique=cards`);
      const data = await response.json();
      setCards(data.data || []);
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

  useEffect(() => {
    if (!nameFilter && !artistFilter && !typeFilter && !manaCostFilter) return;

    const delayDebounce = setTimeout(() => {
      fetchCards();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [nameFilter, artistFilter, typeFilter, manaCostFilter]);

  // Fetch decks when the page loads
  useEffect(() => {
    fetchDecks(); // Fetch the list of decks
  }, []);

  // Handle input changes and update respective state
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFilter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFilter(event.target.value);
  };

  const handleCreateDeck = async () => {
    if (!deckName.trim()) {
      alert("Please provide a valid deck name.");
      return;
    }

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
        body: JSON.stringify(deckPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to create deck: ${errorData.error || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      if (data.deck) {
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

  const handleAddCardToDeck = async () => {
    if (!selectedDeckId || !selectedCard) return;

    try {
      const response = await fetch('/api/decks/addCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deck_id: selectedDeckId, card_id: selectedCard.id, quantity: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to add card: ${errorData.error || 'Unknown error'}`);
        return;
      }

      alert("Card added successfully!");
    } catch (error) {
      console.error("Error adding card to deck:", error);
      alert("Error adding card to deck.");
    }
  };

  const handleCardSelect = (card: CardData) => {
    setSelectedCard((prevSelectedCard) =>
      prevSelectedCard && prevSelectedCard.id === card.id ? null : card
    );
  };

  // Add the missing handleDeckNameChange function
  const handleDeckNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeckName(event.target.value);
  };

  return (
    <div className="p-8">
      <Heading />

      <h1 className="text-3xl font-bold mb-4">Deck Builder</h1>

      {/* Deck name input */}
      <div className="mb-4">
        <input
          type="text"
          value={deckName}
          onChange={handleDeckNameChange}
          placeholder="Enter deck name"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 text-White_Colors-outer-space"
        />
        <Button label="Create Deck" onClick={handleCreateDeck} />
      </div>

      <Link
        href="/decks"
        className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md"
      >
        Decks
      </Link>

      {/* Filter inputs for Name, Artist, Type, Mana Cost */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-2">
        <div>
          <label className="block font-semibold text-sm">Name:</label>
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => handleInputChange(e, setNameFilter)}
            placeholder="Search by Name"
            className="border border-gray-300 rounded-lg p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-sm">Artist:</label>
          <input
            type="text"
            value={artistFilter}
            onChange={(e) => handleInputChange(e, setArtistFilter)}
            placeholder="Search by Artist"
            className="border border-gray-300 rounded-lg p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-sm">Type:</label>
          <input
            type="text"
            value={typeFilter}
            onChange={(e) => handleInputChange(e, setTypeFilter)}
            placeholder="Search by Type"
            className="border border-gray-300 rounded-lg p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-sm">Mana Cost:</label>
          <input
            type="text"
            value={manaCostFilter}
            onChange={(e) => handleInputChange(e, setManaCostFilter)}
            placeholder="Search by Mana Cost"
            className="border border-gray-300 rounded-lg p-2 w-full text-black"
          />
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">Cards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cards.map((card) => (
                <div key={card.id} className="card p-4 border rounded-md">
                  <img
                    src={
                      card.image_uris
                        ? card.image_uris.normal
                        : card.card_faces
                        ? card.card_faces[0].image_uris.normal
                        : '/fallback-image.png'
                    }
                    alt={card.name}
                    className="w-full h-64 object-contain mb-4"
                  />
                  <h3 className="text-xl font-semibold">{card.name}</h3>
                  <p className="text-sm">{card.type_line}</p>
                  <p className="text-sm">{card.oracle_text}</p>
                  <p className="text-sm">Mana cost: {card.mana_cost}</p>
                  <p className="text-sm">Price: ${card.prices.usd}</p>

                  <button
                    className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mt-4"
                    onClick={() => handleCardSelect(card)}
                  >
                    {selectedCard && selectedCard.id === card.id
                      ? 'Deselect Card'
                      : 'Select Card'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DeckBuilderPage;
