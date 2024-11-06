// components/Header.tsx
"use client"; // Mark it as a client-side component

import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // State to store form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    console.log('Form data submitted:', formData);
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-White_Colors-outer-space text-White_Colors-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-White_Colors-platinum">
                ClobKnocka
              </Link>
            </div>

            {/* Links for desktop */}
            <div className="hidden md:flex space-x-4">

            <Link href="/home" className="text-lg text-Green_Colors-India_Green bg-Yellow_Colors-old-gold hover:bg-White_Colors-Jet hover:text-Red_Colors-Red px-2 py-1 rounded-md">
                 Home
          </Link>
          <Link href="/explore" className="text-lg text-Yellow_Colors-Icterine bg-Blue_Colors-Zaffre hover:text-Green_Colors-Pakistan_Green hover:bg-Red_Colors-bittersweet px-2 py-1 rounded-md">
                 Explore
          </Link>
          <Link href="/help" className="text-lg  text-Blue_Colors-Cornflower_Blue bg-White_Colors-Jet hover:bg-Green_Colors-Dartmouth_Green hover:text-Red_Colors-bittersweet px-2 py-1 rounded-md">
                  Help
          </Link>
          <Link href="/register" className="text-lg text-Green_Colors-Green bg-Red_Colors-OU_crimson hover:text-Yellow_Colors-old-gold hover:bg-Blue_Colors-Persian_Blue px-2 py-1 rounded-md">
                 Register
          </Link>
          <Link href="/login" className="text-lg text-Yellow_Colors-Yellow bg-Green_Colors-India_Green hover:text-White_Colors-Jet hover:bg-Yellow_Colors-old-gold px-2 py-1 rounded-md">
                 Sign In
          </Link>

            </div>

            {/* Hamburger Icon for mobile */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-White_Colors-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>

{/* Mobile Menu */}
{isOpen && (
  <div className="md:hidden absolute top-0 right-0 px-4 py-2">
    {/* Close button */}
    <button
      onClick={toggleMenu} // This will close the menu when clicked
      className="absolute top-4 right-4 text-white focus:outline-none z-10"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        
      </svg>
    </button>

    <div className="flex flex-col space-y-2 mt-10">

      <Link href="/home" className="text-lg text-Green_Colors-India_Green bg-Yellow_Colors-old-gold hover:bg-White_Colors-Jet hover:text-Red_Colors-Red px-2 py-1 rounded-md">
        Home
      </Link>
      <Link href="/explore" className="text-lg text-Yellow_Colors-Icterine bg-Blue_Colors-Zaffre hover:text-Green_Colors-Pakistan_Green hover:bg-Red_Colors-bittersweet px-2 py-1 rounded-md">
        Explore
      </Link>
      <Link href="/help" className="text-lg  text-Blue_Colors-Cornflower_Blue bg-White_Colors-Jet hover:bg-Green_Colors-Dartmouth_Green hover:text-Red_Colors-bittersweet px-2 py-1 rounded-md">
        Help
      </Link>
      <Link href="/register" className="text-lg text-Green_Colors-Green bg-Red_Colors-OU_crimson hover:text-Yellow_Colors-old-gold hover:bg-Blue_Colors-Persian_Blue px-2 py-1 rounded-md">
        Register
      </Link>
      <Link href="/login" className="text-lg text-Yellow_Colors-Yellow bg-Green_Colors-India_Green hover:text-White_Colors-Jet hover:bg-Yellow_Colors-old-gold px-2 py-1 rounded-md">
        Sign In
      </Link>

    </div>
  </div>
)}





        </nav>
      </header>

      {/* Registration Form Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-White_Colors-Onyx">
        <div className="w-full max-w-md p-8 bg-White_Colors-platinum shadow-lg rounded-md">
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
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-White_Colors-outer-space text-White_Colors-white py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Footer links */}
            <div className="space-x-4">
              <Link href="/about" className="text-lg hover:text-Yellow_Colors-old-gold">
                About Us
              </Link>
              <Link href="/contact" className="text-lg hover:text-Yellow_Colors-old-gold">
                Contact
              </Link>
              <Link href="/privacy" className="text-lg hover:text-Yellow_Colors-old-gold">
                Privacy Policy
              </Link>
            </div>

            {/* Social Media Icons (can be customized later) */}
            <div className="space-x-4">
              <a href="#" className="text-lg hover:text-Yellow_Colors-old-gold">Facebook</a>
              <a href="#" className="text-lg hover:text-Yellow_Colors-old-gold">Twitter</a>
              <a href="#" className="text-lg hover:text-Yellow_Colors-old-gold">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Header;
