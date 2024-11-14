import Image from 'next/image';

const Card: React.FC<{ title: string; description: string; imageUrl: string; className?: string }> = ({ title, description, imageUrl, className }) => {
    return (
      <div className={`border border-gray-300 rounded-lg p-2 ${className}`}>
        <Image 
          src={imageUrl || '/default-image.jpg'} // Fallback image if imageUrl is undefined
          alt={title} 
          width={488} 
          height={680} 
          className="w-full h-auto mb-2" 
          placeholder="blur" 
          blurDataURL="/path-to-blur-placeholder.jpg" // Optional low-res placeholder image
        />
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    );
};

export default Card;
