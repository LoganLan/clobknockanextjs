'use client';

import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';
import Link from 'next/link';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);

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
    setSelectedCard(card); // Set the selected card when a card is clicked
  };

  return (
    <div className="p-8">

    <Header />


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
      <Link href="/decks" className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md">
              Decks
      </Link>

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
        className="border border-gray-300 rounded-lg p-2 mt-4 w-full text-White_Colors-Onyx"
      />
      
      {/* Display selected card and option to add to a deck */}
      {selectedCard && (
        <div>
        <h2 className='text-White_Colors-platinum'>Add "{selectedCard.name}" to a Deck</h2>
        <select 
          onChange={(e) => setSelectedDeckId(Number(e.target.value))} 
          value={selectedDeckId || ''} 
          className='text-White_Colors-outer-space'
        >
          <option value="" className='text-White_Colors-outer-space'>Select Deck</option>
          {decks.map(deck => (
            <option key={deck.deck_id} value={deck.deck_id} className='text-White_Colors-outer-space'>{deck.deck_name}</option>
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
            cards.map(card => (
              <div
                key={card.id}
                className="flex justify-center cursor-pointer"
                onClick={() => handleCardSelect(card)} // Set the selected card when clicked
              >
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

            /* Apply hover and transition effect */
            .hover-rainbow {
              display: inline-block; /* Ensure the element behaves like a button/link */
              transition: color 0.5s ease-in-out; /* Smooth transition for color change */
            }

            .hover-rainbow:hover {
              animation: rainbow 5s linear infinite; /* Smooth color cycling */
            }
          `}</style>


        </div>
      )}
    </div>
  );
};

export default DeckBuilderPage;
