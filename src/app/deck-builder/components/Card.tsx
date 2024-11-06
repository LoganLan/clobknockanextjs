// components/Card.tsx
const Card: React.FC<{ title: string; description: string; imageUrl: string; className?: string }> = ({ title, description, imageUrl, className }) => {
    return (
      <div className={`border border-gray-300 rounded-lg p-4 ${className}`}>
        <img src={imageUrl} alt={title} className="w-full h-auto mb-2" /> {/* Adjust the image size */}
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    );
  };
  
  export default Card;
  