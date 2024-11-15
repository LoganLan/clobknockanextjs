"use client"; // Add this at the top

import React, { useState } from "react";
import Heading from "@/app/components/Heading";
import Footer from "@/app/components/Footer";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate login logic and error handling
    if (!username || !password) {
      setError("Both fields are required");
    } else {
      // Perform login logic
      console.log("Username:", username);
      console.log("Password:", password);
      setError(""); // Clear error on success
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-White_Colors-battleship-grey">

<Heading />

      {/* Main content (login form) */}
      <main className="flex flex-grow items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-lg font-bold mb-4 text-White_Colors-outer-space border-White_Colors-outer-space">
            Login
          </h2>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error if exists */}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-White_Colors-Jet" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-White_Colors-Onyx p-2 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-White_Colors-Jet" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-White_Colors-Onyx p-2 w-full rounded"
              required
            />
          </div>

          <button type="submit" className="w-full bg-Blue_Colors-Cornflower_Blue text-White_Colors-outer-space py-2 rounded hover:bg-Blue_Colors-Blue_(Crayola)">
            Login
          </button>
        </form>
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

export default LoginPage;
