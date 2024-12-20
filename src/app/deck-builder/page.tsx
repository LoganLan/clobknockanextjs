'use client';

import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';
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
  const test: ScryfallCard.Any[] = []
  const [cards, setCards] = useState<CardData[]>([]); // Store fetched cards
  const [loading, setLoading] = useState(false); // For loading state
  const [searchQuery, setSearchQuery] = useState(""); // For search query input
  const [searchFilter, setSearchFilter] = useState<"name" | "artist" | "type">("name"); // Add filter state
  const [deckName, setDeckName] = useState(""); // For deck name input
  const [decks, setDecks] = useState<Deck[]>([]); // Store the list of decks
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);
  const [searchQueries, setSearchQueries] = useState({
    name: "",
    type: "",
    mana: "",
    artist: "",
  });
  

  const fetchCards = async () => {
    setLoading(true);
    try {
      
      const { name, type, mana, artist } = searchQueries;
      
      if (!name && !type && !mana && !artist) {
        setCards([]); // Clear results if no queries are entered
        return;
      }
  
      // Build query components
      const queries = [
        name && `name:${name}`,
        type && `type:${type}`,
        mana && `mana:${mana.toUpperCase().replace(/[^0-9WUBRG]/g, "")}`, // Ensure proper mana syntax
        artist && `artist:${artist}`,
      ].filter(Boolean); // Remove empty filters
  
      const queryString = queries.join(" ");
      if (!queryString) {
        setCards([]); // If no filters are applied, clear results
        setLoading(false);
        return;
      }
  
      // Fetch cards from Scryfall
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${queryString}&order=name&page=1&unique=cards`);
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
    const delayDebounce = setTimeout(() => {
      fetchCards();
    }, 300);
  
    return () => clearTimeout(delayDebounce);
  }, [searchQueries]);
  

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
        href="/deck-builder"
        className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md"
      >
        Decks
      </Link>

      {/* Display the list of decks */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Your Decks</h2>
        <ul>
          {decks.length > 0 ? (
            decks.map((deck) => (
              <li key={deck.deck_id} className="mt-2">{deck.deck_name}</li>
            ))
          ) : (
            <p>No decks found.</p>
          )}
        </ul>
      </div>

      {/* Filter selection */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-lg">Search by Name:</label>
        <input
          type="text"
          value={searchQueries.name}
          onChange={(e) => setSearchQueries((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Search by Name"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 text-black"
        />

        <label className="block mb-2 font-semibold text-lg">Search by Type:</label>
        <input
          type="text"
          value={searchQueries.type}
          onChange={(e) => setSearchQueries((prev) => ({ ...prev, type: e.target.value }))}
          placeholder="Search by Type"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 text-black"
        />

        <label className="block mb-2 font-semibold text-lg">Search by Mana (e.g., 2WU):</label>
        <input
          type="text"
          value={searchQueries.mana}
          onChange={(e) =>
            setSearchQueries((prev) => ({ ...prev, mana: e.target.value.toUpperCase().replace(/[^0-9WUBRG]/g, "") }))
          }
          placeholder="Search by Mana"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 text-black"
        />

        <label className="block mb-2 font-semibold text-lg">Search by Artist:</label>
        <input
          type="text"
          value={searchQueries.artist}
          onChange={(e) => setSearchQueries((prev) => ({ ...prev, artist: e.target.value }))}
          placeholder="Search by Artist"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 text-black"
        />
      </div>


      {/* Display selected card and option to add to a deck */}
      {selectedCard && (
        <div>
          <h2 className="text-White_Colors-platinum">Add `{selectedCard.name}` to a Deck</h2>
          <select
            onChange={(e) => setSelectedDeckId(Number(e.target.value))}
            value={selectedDeckId || ''}
            className="text-White_Colors-outer-space"
          >
            <option value="" className="text-White_Colors-outer-space">Select Deck</option>
            {decks.map((deck) => (
              <option key={deck.deck_id} value={deck.deck_id} className="text-White_Colors-outer-space">
                {deck.deck_name}
              </option>
            ))}
          </select>
          <button onClick={handleAddCardToDeck}>Add to Deck</button>
        </div>
      )}

      {/* Display cards */}
      {loading ? (
        <p>Loading cards...</p>
      ) : (
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-8 text-White_Colors-anti-flash-white">
  {Array.isArray(cards) && cards.length > 0 ? (
    cards.map((card) => (
<div
  key={card.id}
  className="relative flex flex-col items-center cursor-pointer"
>
  {/* Selection Circle */}
  <input
    type="checkbox"
    checked={selectedCard?.id === card.id}
    onChange={(e) => handleCardSelect(card)}
    className="absolute top-2 left-2 w-5 h-5 cursor-pointer z-10"
  />

  {/* Card */}
  <Scrycard
    card={card as any}
    size={"lg"}
    animated
    flippable
    symbol_text_renderer={function (props: IScrytextProps): React.ReactNode {
      return null;
    }}
    flip_button_props={{
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent propagation for flipping
        e.preventDefault();
      },
    }}
  />

  {/* Dedicated Button for Navigation */}
  <button
    onClick={() => (window.location.href = `/cards/${card.id}`)}
    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    View Details
  </button>
</div>

    ))
  ) : (
    <p>No cards found.</p>
  )}
</div>

      )}

      <Footer />
    </div>
  );

};

export default DeckBuilderPage;