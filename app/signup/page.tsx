"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setError('');
      // Handle successful signup, e.g., redirect or display a success message
      alert('Signup successful! Please check your email to confirm your account.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full" style={{width:'600px'}}>
        <div className="flex justify-center mb-6">
          <img
            src="https://avocadoleads.com/icon.png?4f785256337a424f"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <h1 className="text-center text-2xl font-semibold text-green-700 mb-6">AvocadoLeads</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First name:</label>
            <input
              style={{color:'black'}}
              type="text"
              id="firstName"
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last name:</label>
            <input
              style={{color:'black'}}
              type="text"
              id="lastName"
              placeholder="Your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              style={{color:'black'}}
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              style={{color:'black'}}
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded focus:outline-none focus:ring"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Create Account'}
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" legacyBehavior>
            <a className="text-blue-500">Login</a>
          </Link>
        </div>
        <div className="text-center mt-4 text-gray-600 text-sm">
          By continuing you agree to the{' '}
          <Link href="/terms" legacyBehavior>
            <a className="text-blue-500">Terms of use</a>
          </Link>{' '}
          and{' '}
          <Link href="/privacy" legacyBehavior>
            <a className="text-blue-500">Privacy Policy</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
