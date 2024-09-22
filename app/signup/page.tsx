"use client";

import { useState } from 'react';
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

    // Step 1: Sign up the user with Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Step 2: After successful signup, insert into the custom users table
    const userId = data.user?.id;  // This is the UUID from Supabase Auth

    const { error: insertError } = await supabase
      .from('users')  // Your custom users table
      .insert({
        auth_user_id: userId,  // Insert UUID from the auth system
        email: email,  // Use the same email from signup
        first_name: firstName,
        last_name: lastName,
        // Add any additional fields you want to store in the custom table
      });

    if (insertError) {
      console.error(insertError.message);
      setError('Error inserting into custom users table.');
      setLoading(false);
      return;
    }

    // Handle successful signup
    alert('Signup successful! Please check your email to confirm your account.');
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full" style={{ width: '600px' }}>
        <h1 className="text-center text-2xl font-semibold text-green-700 mb-6">Signup</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First name:</label>
            <input
              style={{ color: 'black' }}
              type="text"
              id="firstName"
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last name:</label>
            <input
              style={{ color: 'black' }}
              type="text"
              id="lastName"
              placeholder="Your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              style={{ color: 'black' }}
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              style={{ color: 'black' }}
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
