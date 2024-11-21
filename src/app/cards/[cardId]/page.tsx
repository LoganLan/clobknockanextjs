import { use } from 'react';
import { notFound } from 'next/navigation';

interface CardPageProps {
  params: {
    cardId: string;
  };
}

const fetchCardData = async (cardId: string) => {
  try {
    const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching card data:", error);
    return null;
  }
};

const CardPage: React.FC<CardPageProps> = ({ params }) => {
  const { cardId } = params;

  // Fetch card data using the cardId
  const cardData = use(() => fetchCardData(cardId));

  if (!cardData) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{cardData.name}</h1>
      <img src={cardData.image_uris?.normal} alt={cardData.name} className="rounded-lg" />
      <p className="mt-4">Mana Cost: {cardData.mana_cost || "N/A"}</p>
      <p>Type Line: {cardData.type_line}</p>
      <p>Oracle Text: {cardData.oracle_text}</p>
      <p>Price (USD): {cardData.prices?.usd || "N/A"}</p>
    </div>
  );
};

export default CardPage;
