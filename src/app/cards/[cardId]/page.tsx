import React from 'react';
import Link from 'next/link';

interface CardDetails {
  id: string;
  name: string;
  image_uris?: {
    normal: string;
  };
  card_faces?: Array<{
    name: string;
    image_uris: {
      normal: string;
    };
  }>;
  oracle_text?: string;
}

const CardDetailPage = async ({ params }: { params: Promise<{ cardId: string }> }) => {
  const { cardId } = await params; // Await the params promise

  const fetchCardDetails = async () => {
    const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch card details');
    }
    return response.json();
  };

  const cardDetails: CardDetails = await fetchCardDetails();

  return (
    <div className="p-8">
        <Link
        href="/deck-builder"
        className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md"
      >
        Deck Builder
      </Link>
      <h1 className="text-3xl font-bold">{cardDetails.name}</h1>

      {/* Handle Dual-Faced Cards */}
      {cardDetails.card_faces ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {cardDetails.card_faces.map((face, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold">{face.name}</h2>
              <img
                src={face.image_uris.normal}
                alt={face.name}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        // Handle Single-Faced Cards
        <img
          src={cardDetails.image_uris?.normal}
          alt={cardDetails.name}
          className="mt-4 rounded-lg"
        />
      )}

      <p className="mt-4 text-lg">{cardDetails.oracle_text || 'No description available.'}</p>
    </div>
  );
};

export default CardDetailPage;
