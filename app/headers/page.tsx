"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

function Headers() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = "/login"; // Redirect to login page after signing out
    } else {
      console.log("Sign out error:", error.message);
    }
  };

  return (
    <header className="flex justify-center bg-white shadow">
      <div className="flex items-center justify-between p-4 w-full bg-white max-w-7xl md:w-[80%] w-[100%]">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 focus:outline-none"
        >
          {!menuOpen ? ( 
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>) : (
                    <img
                    src="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-cross-icon-png-image_925896.jpg"
                    alt="Logo"
                    width={30}
                    height={40}
                    className="rounded-full"
                  />
          )
          }
        </button>
        <div className="flex">
        <img
          src="https://avocadoleads.com/icon.png?4f785256337a424f"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-lg font-semibold text-green-900 p-2">AvocadoLeads</span>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <button
          style={{backgroundColor:'black'}}
          className="text-lg font-medium text-white hover:text-black rounded-lg w-full p-2"
        >
          Dashboard
        </button>
        <a
          href="#"
          className="text-lg font-medium text-gray-700 hover:text-black"
        >
          Billing
        </a>
      </nav>
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-2 focus:outline-none"
        >
          <img
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-10 border">
            <div className="px-4 py-2 text-sm text-gray-700">
              Ram Sharma <br />
              Credits: 0
            </div>
            <button
              onClick={handleSignOut}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-5"
            >
              Sign out
            </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute left-0 w-full bg-white shadow-lg z-10 md:hidden" style={{top:'89px'}}>
          <nav className="flex flex-col items-start p-4 space-y-2">
            <button
              style={{backgroundColor:'black', fontSize:'20px'}}
              className="text-lg font-medium text-white hover:text-black rounded w-full p-1"
            >
              <div style={{display:'flex',justifyContent:'start'}}>
                Dashboard
              </div>
            </button>
            <a
              href="#"
              className="text-lg font-medium text-gray-700 hover:text-black"
            >
              Billing
            </a>
          </nav>
        </div>
      )}
      </div>
    </header>
  );
}

export default Headers;
