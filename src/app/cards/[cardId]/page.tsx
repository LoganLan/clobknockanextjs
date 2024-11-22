import React from 'react';
import Link from 'next/link';

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

const fetchCardDetails = async (cardId: string): Promise<CardData | null> => {
  try {
    const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch card details');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching card details:', error);
    return null;
  }
};

const CardDetailPage = async ({ params }: { params: Promise<{ cardId: string }> }) => {
  const { cardId } = await params; // Await `params` to resolve the promise.
  const cardDetails = await fetchCardDetails(cardId);

  if (!cardDetails) {
    return <div>Card not found</div>;
  }

  return (
    <div className="p-8">
        <Link
          href="/deck-builder"
          className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md"
        >
          Deck Builder
      </Link>
      <h1 className="text-3xl font-bold">{cardDetails.name}</h1>
      <img
        src={cardDetails.image_uris.normal}
        alt={cardDetails.name}
        className="mt-4 rounded-lg"
      />
      <p className="mt-4"><strong>Mana Cost:</strong> {cardDetails.mana_cost}</p>
      <p className="mt-2"><strong>Type:</strong> {cardDetails.type_line}</p>
      <p className="mt-2"><strong>Description:</strong> {cardDetails.oracle_text}</p>
      <p className="mt-2"><strong>Price (USD):</strong> {cardDetails.prices.usd || 'N/A'}</p>
    </div>
  );
};

export default CardDetailPage;
