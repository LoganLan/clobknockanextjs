'use client';

import React, { useEffect, useState } from 'react';
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
  deck_type: string;
  deck_color: string; // Added color field to deck
}

interface DeckPageProps {
  params: Promise<{ deckId: string }>;
}

const deckTypes = [
  "Alchemy", "Brawl", "Booster Draft", "Canadian Highlander", "Commander (EDH)", "Constructed", "Cube Draft",
  "Duel Commander", "Extended", "Explorer", "Frontier", "Historic", "Historic Brawl", "Legacy", "Limited",
  "Modern", "Oath-breaker", "Pauper", "Pauper Commander", "Pioneer", "Premodern", "Sealed Deck", "Singleton",
  "Standard", "Tiny Leaders", "Two-Headed Giant", "Vintage"
];

const colorTypes = [
  "White (W)", "Blue (U)", "Black (B)", "Red (R)", "Green (G)",
  "Azorius(WU)", "Boros(WR)", "Orzhov(WB)", "Dimir(UB)", "Golgari(BG)", "Selesnya(GW)", "Gruul(GR)", "Izzet(UR)", 
  "Rakdos(BR)", "Simic(UG)", "Bant(WUG)", "Esper(WUB)", "Grixis(UBR)", "Jund(RBG)", "Naya(WRG)", "Mardu(RWB)", 
  "Temur(UGR)", "Abzan(BWG)", "Jeskai(RWU)", "Sultai(BGU)", "Chaos(UBRG)", "Dune(WBRG)", "Witch(WUBG)", 
  "Yore(WUBR)", "Altruism(WBGR)"
];

const DeckPage: React.FC<DeckPageProps> = ({ params }) => {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('Commander');
  const [selectedColor, setSelectedColor] = useState<string>('White');
  const [activeTab, setActiveTab] = useState<'type' | 'color'>('type');

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

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleTabSwitch = (tab: 'type' | 'color') => {
    setActiveTab(tab);
  };

  if (loading) return <p>Loading deck...</p>;
  if (!deck) return <p>Deck not found.</p>;

  return (
    <div>
      <Link href="/decks" className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md">
        Decks
      </Link>

      <h1 className="text-3xl font-bold">{deck.deck_name}</h1>

      {/* Tab Navigation */}
      <div className="mt-4">
        <button
          onClick={() => handleTabSwitch('type')}
          className={`mr-4 p-2 ${activeTab === 'type' ? 'text-white bg-blue-600' : 'text-gray-300'}`}
        >
          Deck Type
        </button>
        <button
          onClick={() => handleTabSwitch('color')}
          className={`p-2 ${activeTab === 'color' ? 'text-white bg-blue-600' : 'text-gray-300'}`}
        >
          Color Combinations
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'type' ? (
        <div className="mt-4">
          <label htmlFor="deck-type" className="mr-2 text-White_Colors-platinum">Select Deck Type:</label>
          <select
            id="deck-type"
            value={selectedType}
            onChange={handleTypeChange}
            className="border rounded px-3 py-2 text-White_Colors-Onyx bg-white"
          >
            {deckTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="mt-4">
          <label htmlFor="deck-color" className="mr-2 text-White_Colors-platinum">Select Deck Color:</label>
          <select
            id="deck-color"
            value={selectedColor}
            onChange={handleColorChange}
            className="border rounded px-3 py-2 text-White_Colors-Onyx bg-white"
          >
            {colorTypes.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display each card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {cards.length === 0 ? (
          <p>No cards found.</p>
        ) : (
          cards.map((card) => (
            <div key={card.card_id} className="border p-4 rounded-lg">
              <img
                src={card.image_url}
                alt={card.name}
                className="w-full h-auto mb-2"
                onError={(e) => (e.target as HTMLImageElement).src = '/default-image.jpg'} // Fallback image if the image doesn't load
              />
              <h3 className="text-lg font-semibold">{card.name}</h3>
              <p className="text-sm">Quantity: {card.quantity}</p>
            </div>
          ))
        )}
      </div>

      {/* Display Deck Type and Color */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Deck Type & Color</h3>
        <p>Type: {deck.deck_type}</p>
        <p>Color: {deck.deck_color}</p>
      </div>
    </div>
  );
};

export default DeckPage;
