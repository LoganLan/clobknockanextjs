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
  const [artist, setArtist] = useState<string>(''); // State to store artist name
  const [type, setType] = useState<string>(''); // State to store card type
  const [loading, setLoading] = useState<boolean>(true);
  const [showLegality, setShowLegality] = useState<boolean>(false); // Default to showing description

  // Fetch card data from Scryfall API
  useEffect(() => {
    const fetchCardData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${title}`);
        const data = await response.json();
        setLegality(data.legalities || {});
        setArtist(data.artist || 'Unknown'); // Set the artist name
        setType(data.type_line || 'Unknown'); // Set the card type
      } catch (error) {
        console.error('Error fetching card data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [title]);

  // Filter and transform legalities
  const filteredLegalities = Object.entries(legality)
    .filter(([format, value]) => value !== 'Unknown') // Exclude "Unknown"
    .map(([format, value]) => ({
      format,
      status: value === 'legal' ? 'Legal' : 'Not legal', // Transform to "Legal" or "Not legal"
    }));

  return (
    <div className={`relative group border border-gray-300 rounded-lg p-2 ${className}`}>
      <img src={imageUrl} alt={title} className="w-full h-auto" />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      {price && <p className="text-sm font-medium text-green-500 mt-2">Price: {price}</p>}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center p-4 transition-opacity duration-300">
        <button
          onClick={() => setShowLegality(!showLegality)}
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          {showLegality ? 'Show Description' : 'Show Legality'}
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : showLegality ? (
          <div className="max-h-32 overflow-y-auto w-full px-4">
            <h4 className="text-lg font-semibold mb-2">Legality</h4>
            {filteredLegalities.map(({ format, status }) => (
              <p key={format} className="text-sm">
                {format}: <span>{status}</span>
              </p>
            ))}
          </div>
        ) : (
          <div className="max-h-50 overflow-y-auto w-full px-4">
            <h4 className="text-lg font-semibold mb-2">Description</h4>
            <p className="text-sm text-center">{description}</p>
          </div>
        )}
        
        {/* Display artist and card type in the hover */}
        <div className="mt-4 text-sm">
          {artist && <p>Artist: {artist}</p>}
          {type && <p>Type: {type}</p>}
        </div>
      </div>
    </div>
  );
};

export default Card;
