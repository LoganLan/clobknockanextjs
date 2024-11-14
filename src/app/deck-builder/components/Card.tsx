import React, { useState, useEffect } from 'react';

// Update the CardProps interface to include legality information
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  price?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, price, className }) => {
  const [legality, setLegality] = useState<{ [format: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch card legality from Scryfall API
  useEffect(() => {
    const fetchCardData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${title}`);
        const data = await response.json();
        setLegality({
          Alchemy: data.legalities.Alchemy || 'Unknown',
          Brawl: data.legalities.Brawl || 'Unknown',
          Booster: data.legalities.Booster || 'Unknown',
          Canadian_EDH: data.legalities.Canadian_EDH || 'Unknown',
          Commander: data.legalities.commander || 'Unknown',
          Construct: data.legalities.Construct || 'Unknown',
          CubeDraft: data.legalities.CubeDraft || 'Unknown',
          Duel_Commander: data.legalities.Duel_Commander || 'Unknown',
          Extended: data.legalities.Extended || 'Unknown',
          Explorer: data.legalities.Explorer || 'Unknown',
          Frontier: data.legalities.Frontier || 'Unknown',
          Historic: data.legalities.Historic || 'Unknown',
          Historic_Brawl: data.legalities.Historic_Brawl || 'Unknown',
          Legacy: data.legalities.Legacy || 'Unknown',
          Limited: data.legalities.Limited || 'Unknown',
          Modern: data.legalities.Modern || 'Unknown',
          Oathbreaker: data.legalities.Oathbreaker || 'Unknown',
          Pauper: data.legalities.Pauper || 'Unknown',
          Pauper_EDH: data.legalities.Pauper_EDH || 'Unknown',
          Pioneer: data.legalities.Pioneer || 'Unknown',
          Premodern: data.legalities.Premodern || 'Unknown',
          Sealed_Deck: data.legalities.Sealed_Deck || 'Unknown',
          Singleton: data.legalities.Singleton || 'Unknown',
          Standard: data.legalities.standard || 'Unknown',
          Tiny_Leaders: data.legalities.Tiny_Leaders || 'Unknown',
          Two_Headed_Giant: data.legalities.Two_Headed_Giant || 'Unknown',
          Vintage: data.legalities.Vintage || 'Unknown',
        });
      } catch (error) {
        console.error('Error fetching card data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [title]);

  return (
    <div className={`border border-gray-300 rounded-lg p-2 ${className}`}>
      <img src={imageUrl} alt={title} className="w-full h-auto mb-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      {price && <p className="text-sm font-medium text-green-500 mt-2">Price: ${price}</p>}
      
      {/* Legality Information */}
      {loading ? (
        <p>Loading legality data...</p>
      ) : (
        <div className="mt-2">
          <p className="text-sm text-White_Colors-anti-flash-white">Alchemy: <span className={legality.Alchemy === 'Unknown' ? 'invisible' : ''}>{legality.Alchemy}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Brawl: <span className={legality.Brawl === 'Unknown' ? 'invisible' : ''}>{legality.Brawl}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Booster Draft: <span className={legality.Booster === 'Unknown' ? 'invisible' : ''}>{legality.Booster}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Canadian Highlander: <span className={legality.Canadian_EDH === 'Unknown' ? 'invisible' : ''}>{legality.Canadian_EDH}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Commander: <span className={legality.Commander === 'Unknown' ? 'invisible' : ''}>{legality.Commander}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Constructed: <span className={legality.Construct === 'Unknown' ? 'invisible' : ''}>{legality.Construct}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Cube Draft: <span className={legality.CubeDraft === 'Unknown' ? 'invisible' : ''}>{legality.CubeDraft}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Duel Commander: <span className={legality.Duel_Commander === 'Unknown' ? 'invisible' : ''}>{legality.Duel_Commander}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Extended: <span className={legality.Extended === 'Unknown' ? 'invisible' : ''}>{legality.Extended}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Explorer: <span className={legality.Explorer === 'Unknown' ? 'invisible' : ''}>{legality.Explorer}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Frontier: <span className={legality.Frontier === 'Unknown' ? 'invisible' : ''}>{legality.Frontier}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Historic: <span className={legality.Historic === 'Unknown' ? 'invisible' : ''}>{legality.Historic}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Historic Brawl: <span className={legality.Historic_Brawl === 'Unknown' ? 'invisible' : ''}>{legality.Historic_Brawl}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Legacy: <span className={legality.Legacy === 'Unknown' ? 'invisible' : ''}>{legality.Legacy}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Limited: <span className={legality.Limited === 'Unknown' ? 'invisible' : ''}>{legality.Limited}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Modern: <span className={legality.Modern === 'Unknown' ? 'invisible' : ''}>{legality.Modern}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Oathbreaker: <span className={legality.Oathbreaker === 'Unknown' ? 'invisible' : ''}>{legality.Oathbreaker}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Pauper: <span className={legality.Pauper === 'Unknown' ? 'invisible' : ''}>{legality.Pauper}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Pauper Commander: <span className={legality.Pauper_EDH === 'Unknown' ? 'invisible' : ''}>{legality.Pauper_EDH}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Pioneer: <span className={legality.Pioneer === 'Unknown' ? 'invisible' : ''}>{legality.Pioneer}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Premodern: <span className={legality.Premodern === 'Unknown' ? 'invisible' : ''}>{legality.Premodern}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Sealed Deck: <span className={legality.Sealed_Deck === 'Unknown' ? 'invisible' : ''}>{legality.Sealed_Deck}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Singleton: <span className={legality.Singleton === 'Unknown' ? 'invisible' : ''}>{legality.Singleton}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Standard: <span className={legality.Standard === 'Unknown' ? 'invisible' : ''}>{legality.Standard}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Tiny Leaders: <span className={legality.Tiny_Leaders === 'Unknown' ? 'invisible' : ''}>{legality.Tiny_Leaders}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Two-Headed Giant: <span className={legality.Two_Headed_Giant === 'Unknown' ? 'invisible' : ''}>{legality.Two_Headed_Giant}</span></p>
          <p className="text-sm text-White_Colors-anti-flash-white">Vintage: <span className={legality.Vintage === 'Unknown' ? 'invisible' : ''}>{legality.Vintage}</span></p>
        </div>
      )}
    </div>
  );
};

export default Card;
