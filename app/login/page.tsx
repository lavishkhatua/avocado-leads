"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (!router?.isReady) return;
  }, [router.isReady]);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    // Perform Supabase login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Redirect to dashboard or another page after successful login
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
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
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              style={{ color: 'black' }}
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
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
              style={{ color: 'black' }}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded focus:outline-none focus:ring"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600">
          No account yet?{' '}
          <Link href="/signup" legacyBehavior>
            <a className="text-blue-500">Create account for free</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
