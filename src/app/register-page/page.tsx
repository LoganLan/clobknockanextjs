// components/Header.tsx
"use client"; // Mark it as a client-side component

import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // State to store form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <>
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

      {/* Registration Form Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-White_Colors-Jet">
        <div className="w-full max-w-md p-8 bg-White_Colors-anti-flash-white shadow-lg shadow-White_Colors-silver rounded-md">
          <h1 className="text-2xl font-bold text-center text-White_Colors-outer-space mb-6">Register</h1>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm text-White_Colors-outer-space font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-Yellow_Colors-old-gold rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm text-White_Colors-outer-space font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-Blue_Colors-Blue_(Crayola) rounded-md"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm text-White_Colors-outer-space font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-White_Colors-Jet rounded-md"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-sm text-White_Colors-outer-space font-semibold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-Red_Colors-Red rounded-md"
                required
              />
            </div>

           {/* Submit Button */}
<div>
  <button
    type="submit"
    className="w-full bg-White_Colors-white text-White_Colors-outer-space p-2 rounded-md hover:bg-Green_Colors-India_Green hover:text-White_Colors-anti-flash-white"
  >
    Register
  </button>
</div>

{/* Account-related links */}
<div className="mt-6 text-center">
  <p className="text-sm text-White_Colors-outer-space">
    Already have an account?{" "}
    <Link href="/login-page" className="text-White_Colors-outer-space hover:text-Blue_Colors-Persian_Blue">
      Sign In
    </Link>
  </p>
  <p className="text-sm text-White_Colors-outer-space">
    Forgot your password?{" "}
    <Link href="/reset-password" className="text-White_Colors-outer-space hover:text-Blue_Colors-Persian_Blue">
      Reset it here.
    </Link>
  </p>
</div>
</form>
</div>
</div>

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


{/* Footer */}
<footer className="bg-White_Colors-Dim-Gray text-center text-White_Colors-white py-6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p className="text-sm">&copy; 2024 ClobKnocka. All rights reserved.</p>
  </div>
</footer>



</>
);
};

export default Header;
