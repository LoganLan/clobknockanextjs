"use client"; // Ensures this component is rendered on the client side

import React from 'react';
import Link from "next/link"
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

// Define the type for props (if needed)
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Reusable Button component with TypeScript
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
    >
      {label}
    </button>
  );
};

const App: React.FC = () => {
  // Function to handle button click
  const handleClick = (message: string) => {
    alert(message);
  };

  return (
    <div className="flex flex-col min-h-screen">

          {/* Responsive Header */}
  {/* Header */}
  <Header />

      {/* Main Content */}
      <main className="flex flex-grow justify-center items-center">
        <div className="space-x-4">
          <Button label="Create a deck" onClick={() => handleClick('Button 1 clicked!')} />
          <Button label="Copy a deck" onClick={() => handleClick('Button 2 clicked!')} />
          <Button label="Edit a deck " onClick={() => handleClick('Button 3 clicked!')} />
        </div>
      </main>

      {/* Footer */}
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

        .hover-rainbow:hover {
          animation: rainbow 5s infinite; /* Apply the animation */
        }
      `}</style>



    </div>
  );
};

export default App;
