"use client"; // Add this at the top

import Link from "next/link"
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="flex flex-col min-h-screen bg-White_Colors-Battleship-grey">

            {/* Header */}
            <header
      style={{
        display: 'flex',
        backgroundColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        flexWrap: 'wrap', // Allows wrapping for smaller screens
      }}
    >
      <div className="flex items-center">
    <Link href="/landing_page" legacyBehavior>
        <a className="text-2xl" style={{ margin: 0 }}>
            Clobknocka
        </a>
    </Link>
    <div
        className="h-8 w-px bg-white ml-4 rounded-full"
    ></div>
</div>
      <nav>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            margin: 0,
            padding: 0,
            flexWrap: 'wrap', // Allows wrapping for small screens
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                margin: '10px',
                padding: '4px',
                backgroundColor: 'gray',
                cursor: 'pointer',
                borderRadius: '8px',
              }}
            >
              Explore
            </div>
            <div
              style={{
                margin: '10px',
                padding: '4px',
                backgroundColor: 'gray',
                cursor: 'pointer',
                borderRadius: '8px',
              }}
            >
              Help
            </div>
            <div
              style={{
                margin: '10px',
                padding: '4px',
                backgroundColor: 'gray',
                cursor: 'pointer',
                borderRadius: '8px',
              }}
            >
              Sign in
            </div>
            <div
              style={{
                margin: '10px',
                padding: '4px',
                backgroundColor: 'gray',
                cursor: 'pointer',
                borderRadius: '8px',
              }}
            >
              Register
            </div>
          </div>
        </ul>
      </nav>
    </header>

            {/* Main content (login form) */}
            <main className="flex flex-grow items-center justify-center">
                <form 
                    onSubmit={handleSubmit} 
                    className="bg-white p-6 rounded shadow-md w-96"
                >
                    <h2 className="text-lg font-bold mb-4 text-White_Colors-outer-space  border-White_Colors-outer-space">Login</h2>
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
                    <button 
                        type="submit" 
                        className="w-full bg-Blue_Colors-Cornflower_Blue text-White_Colors-outer-space py-2 rounded hover:bg-Blue_Colors-Blue_(Crayola)"
                    >
                        Login
                    </button>
                </form>
            </main>

            {/* Footer */}
            <footer
      style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#3d3d3d',
      }}
    >
      <p>&copy; Created by Logan,Nathan and Soraya </p>
      <p>
        <a href="#home" style={{ marginRight: '15px' }}>
          Privacy Policy
        </a>
        <a href="#home">Terms of Service</a>
      </p>
    </footer>
        </div>
    );
};

export default LoginPage;
