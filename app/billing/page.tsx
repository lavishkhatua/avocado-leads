'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing useRouter for redirection
import Headers from '../headers/page';
import { supabase } from '@/lib/supabase'; // Import Supabase client

const BillingPage = () => {
  const [currency, setCurrency] = useState('INR');
  const [amount, setAmount] = useState(5000);
  const [transactions, setTransactions] = useState<any[]>([]); // State to store transactions
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<number | null>(null); // State to store user credits
  const router = useRouter();

  // Function to fetch transactions from Supabase
  const fetchTransactions = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId); // Filter by the logged-in user

    if (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
      return;
    }

    setTransactions(data || []); // Set fetched transactions
    setLoading(false);
  };

  // Function to fetch user credits from custom users table
  const fetchUserCredits = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')  // Your custom users table
      .select('credits')
      .eq('auth_user_id', userId)
      .single(); // Expect only one record for the user

    if (error) {
      console.error('Error fetching user credits:', error);
      return;
    }

    setCredits(data?.credits || 0); // Set user credits or default to 0
  };

  // Fetch the current user, their credits, and transactions
  useEffect(() => {
    const getUserData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session?.user) {
        const userId = session.user.id;
        fetchTransactions(userId); // Fetch transactions
        fetchUserCredits(userId);  // Fetch user credits from custom table
      } else {
        console.error('User not logged in', error);
      }
    };

    getUserData();
  }, []);

  const recordTransaction = async (amount: string | number) => {
    const transactionData = {
      date: new Date().toISOString().slice(0, 10), // Use ISO string for the date
      detail: 'Completed',
      price: parseInt(amount.toString()), // Convert amount to integer
      credits: parseInt(amount.toString()), // Example conversion, modify as per your credit calculation logic
      userId: 'user_id_from_session_or_auth', // Include logic to get user ID from session or auth context
    };

    const response = await fetch('/api/record-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      console.error('Failed to record transaction');
    }
  };

  // Function to handle Stripe Checkout redirection
  const handleCheckout = async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseInt(amount.toString()), // Ensure amount is an integer
        currency: currency, // Currency for the transaction
      }),
    });

    const session = await response.json();
    if (response.ok) {
      await recordTransaction(amount);
      router.push(session.url); // Redirect to Stripe checkout
    } else {
      console.error('Failed to start checkout:', session.error); // Log error if checkout fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Headers />
      <div className='container mx-auto p-4'>
      <div className="bg-white shadow-md rounded-lg p-6 my-6">
        <div className="flex justify-between items-center">
          <div>
            <div className='flex'>
            <div className='h-[30px] w-[30px] bg-yellow-200 mr-2 rounded-full'/>
            <h2 className="text-[20px] font-[800] text-[#31512c]">Pay as you go</h2>
            </div>
            <p className="text-slate-400 p-2">You only pay for the credits you want</p>
            <button className="bg-slate-200 p-2 px-4 rounded-lg text-blue-500 font-bold ">🚀Get 10X more leads enriched</button>
          </div>
          <select
            className="border rounded p-2 text-black"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option className="text-black" value="INR">
              INR
            </option>
            <option className="text-black" value="USD">
              USD
            </option>
          </select>
        </div>
        <div className="flex justify-between items-center mt-4">
          <select
           style={{backgroundColor: "rgb(226 232 240)",
            color: "rgb(148 163 184 / var(--tw-text-opacity"}}
            className="border rounded text-black p-2 mr-2 flex-grow"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          >
            <option value="1000">1000</option>
            <option value="5000">5000</option>
            <option value="10000">10000</option>
            <option value="20000">20000</option>
          </select>
        </div>
        <div className="flex items-center justify-end mt-4">
          <span className="text-black font-bold" style={{marginRight:'40px'}}>Credits:{" "}
            <span className='text-red-700 font-bold'>
              {credits ?? 'Loading...'}
            </span>
          </span>
          <span className="text-black font-bold" style={{marginRight:'40px'}}>Total amount:{" "} 
          <span className='text-red-700 font-bold'>
          {amount} {currency}
          </span>
          </span>
          <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={handleCheckout}>
            Pay Now
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 my-6">
        <div className='flex'>
        <div className='h-[25px] w-[25px] bg-blue-300 mr-2 rounded-full'/>
        <h2 className="ftext-[20px] font-[800] text-[#31512c] mb-4">Transactions</h2>
        </div>
        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 font-[700] text-slate-500 border-y-[1px]">
                <tr>
                  <th className="text-left p-2 ">Date</th>
                  <th className="text-left p-2 ">Detail</th>
                  <th className="text-left p-2 ">Price</th>
                  <th className="text-left p-2 ">Credits</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id} className={`${index % 2 ? 'bg-slate-100 border-y-[1px]' : 'bg-white'}`}>
                    <td className="p-2 text-black">{transaction.date}</td>
                    <td className="p-2 text-black">{transaction.detail}</td>
                    <td className="p-2 text-black">{transaction.price}</td>
                    <td className="p-2 text-black">{transaction.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default BillingPage;
