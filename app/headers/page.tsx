"use client"
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

function Headers() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = '/login'; // Redirect to login page after signing out
    } else {
      console.log('Sign out error:', error.message);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex">
        <div className="flex items-center space-x-3">
          <img
            src="https://avocadoleads.com/icon.png?4f785256337a424f"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-lg font-semibold text-green-700">AvocadoLeads</span>
        </div>
        <nav className="flex items-center space-x-6" style={{ marginLeft: '100px' }}>
          <a href="#" className="text-lg font-medium text-gray-700 hover:text-black">Dashboard</a>
          <a href="#" className="text-lg font-medium text-gray-700 hover:text-black">Billing</a>
        </nav>
      </div>
      <div className="relative">
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="p-2">
          <img
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-10">
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
    </header>
  );
}

export default Headers;
