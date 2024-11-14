"use client";

import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
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
          <Link href="/" className="text-lg text-Blue_Colors-Palatinate_Blue bg-White_Colors-platinum hover:bg-White_Colors-Jet hover:text-Red_Colors-Red px-2 py-1 rounded-md">
            Home
          </Link>
          <Link href="/deck-builder" className="text-lg text-White_Colors-Jet bg-Blue_Colors-Zaffre hover:text-Red_Colors-Red hover:bg-Green_Colors-Pakistan_Green px-2 py-1 rounded-md">
            Explore
          </Link>
          <Link href="/help" className="text-lg text-Red_Colors-Red bg-White_Colors-Jet hover:bg-Green_Colors-Dartmouth_Green hover:text-White_Colors-platinum px-2 py-1 rounded-md">
            Help
          </Link>
          <Link href="/register" className="text-lg text-Green_Colors-Green bg-Red_Colors-OU_crimson hover:text-White_Colors-platinum hover:bg-Blue_Colors-Persian_Blue px-2 py-1 rounded-md">
            Register
          </Link>
          <Link href="/login" className="text-lg text-White_Colors-platinum bg-Green_Colors-India_Green hover:text-Blue_Colors-Cornflower_Blue hover:bg-White_Colors-Jet px-2 py-1 rounded-md">
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;