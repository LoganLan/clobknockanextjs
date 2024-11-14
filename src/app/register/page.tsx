// components/Header.tsx
"use client"; // Mark it as a client-side component

import React, { useState } from "react";
import Link from "next/link";
import Heading from "@/app/components/Heading";
import Footer from "@/app/components/Footer";

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
<Heading />

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
<Footer />



</>
);
};

export default Header;
