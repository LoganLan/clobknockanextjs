"use client"; // Add this at the top

import Link from "next/link";
import React, { useState } from "react";

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

      {/* Header */}
      <header
        style={{
          display: "flex",
          backgroundColor: "black",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          flexWrap: "wrap", // Allows wrapping for smaller screens
        }}
      >
        <div className="flex items-center">
          <Link href="/landing-page" legacyBehavior>
            <a className="text-2xl text-white hover-rainbow" style={{ margin: 0 }}>
              Clobknocka
            </a>
          </Link>
          <div className="h-8 w-px bg-white ml-4 rounded-full"></div>
        </div>

        <nav className="flex items-center">
          <div className="flex items-center space-x-5 mx-2">
            <Link href="/landing-page" className="text-lg text-Blue_Colors-Palatinate_Blue bg-White_Colors-platinum hover:bg-White_Colors-Jet hover:text-Red_Colors-Red px-2 py-1 rounded-md">
              Home
            </Link>
            <Link href="/deck-builder" className="text-lg text-White_Colors-Jet bg-Blue_Colors-Zaffre hover:text-Red_Colors-Red hover:bg-Green_Colors-Pakistan_Green px-2 py-1 rounded-md">
              Explore
            </Link>
            <Link href="/help-page" className="text-lg  text-Red_Colors-Red bg-White_Colors-Jet hover:bg-Green_Colors-Dartmouth_Green hover:text-White_Colors-platinum px-2 py-1 rounded-md">
              Help
            </Link>
            <Link href="/register-page" className="text-lg text-Green_Colors-Green bg-Red_Colors-OU_crimson hover:text-White_Colors-platinum hover:bg-Blue_Colors-Persian_Blue px-2 py-1 rounded-md">
              Register
            </Link>
            <Link href="/login-page" className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md">
              Sign In
            </Link>
          </div>
        </nav>
      </header>

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
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#3d3d3d",
        }}
      >
        <p>&copy; Created by Logan, Nathan, and Soraya</p>
        <p>
          <a href="#home" style={{ marginRight: "15px" }}>
            Privacy Policy
          </a>
          <a href="#home">Terms of Service</a>
        </p>
      </footer>

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
