"use client"

import { useState, useEffect, SetStateAction } from "react";
import { supabase } from "@/lib/supabase";
import Link from 'next/link'; // Import Link from Next.js
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter for App Router

function Headers() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard'); // Added state for active page

  // Get current pathname using usePathname hook
  const pathname = usePathname();

  // Update active page based on the current path
  useEffect(() => {
    if(pathname != null)
    if (pathname.includes('dashboard')) {
      setActivePage('dashboard');
    } else if (pathname.includes('billing')) {
      setActivePage('billing');
    }
  }, [pathname]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = "/login"; // Use a simple redirect for sign out
    } else {
      console.log("Sign out error:", error.message);
    }
  };

  const handleSetActivePage = (page: SetStateAction<string>) => {
    setActivePage(page);
  };

  return (
    <header className="flex justify-center bg-white shadow">
      <div className="flex items-center p-4 w-full bg-white max-w-7xl md:w-[80%] w-[100%]">
        <div className="flex items-center space-x-3 mr-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 focus:outline-none"
          >
            {/* Simplified Menu Icons */}
            {menuOpen ? (
              <span>Close Icon</span> // Simplify for brevity
            ) : (
              <span>Menu Icon</span> // Simplify for brevity
            )}
          </button>
          <div className="flex">
            {/* Logo and company name */}
            <img
              src="https://avocadoleads.com/icon.png?4f785256337a424f"
              alt="Logo"
              width={40}
              height={40}
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard">
            <button
              style={{ backgroundColor: activePage === 'dashboard' ? 'black' : 'white', color: activePage === 'dashboard' ? 'white' : 'black' }}
              className="text-lg font-medium text-black rounded-lg w-full p-2"
              onClick={() => handleSetActivePage('dashboard')}
            >
              Dashboard
            </button>
          </Link>
          <Link href="/billing">
            <button
              style={{ backgroundColor: activePage === 'billing' ? 'black' : 'white', color: activePage === 'billing' ? 'white' : 'black'  }}
              className="text-lg font-medium text-black rounded-lg w-full p-2"
              onClick={() => handleSetActivePage('billing')}
            >
              Billing
            </button>
          </Link>
        </nav>
      </div>

      {/* User profile and sign-out */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-2 focus:outline-none"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
            alt="Profile"
            width={40}
            height={40}
          />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-10 border">
            <div className="px-4 py-2 text-sm text-gray-700">
              User Details
            </div>
            <button
              onClick={handleSignOut}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-5"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Headers;
