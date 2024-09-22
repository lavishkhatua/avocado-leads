'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // For accessing query parameters
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Import your initialized Supabase client

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const [transactionRecorded, setTransactionRecorded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // State to store user ID
  const [amount, setAmount] = useState<number | null>(null); // State to store the amount

  const sessionId = searchParams?.get('session_id'); // Retrieve the session ID from the query parameter
  const amountFromQuery = searchParams?.get('amount'); // Retrieve the amount from query parameters

  useEffect(() => {
    if (amountFromQuery) {
      setAmount(Number(amountFromQuery)); // Parse amount from query
    }
  }, [amountFromQuery]);

  useEffect(() => {
    let isMounted = true; // Flag to check if component is still mounted

    // Get the currently logged-in user
    const getUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw new Error('Unable to fetch user session');

        if (session?.user && isMounted) {
          setUserId(session.user.id); // Set the user ID if the user is logged in
        }
      } catch (err) {
        if (err instanceof Error && isMounted) {
          console.error('Error fetching session:', err);
          setError(err.message);
        }
      }
    };

    getUser();

    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const recordTransactionAndUpdateCredits = async () => {
      if (!userId || !amount || !sessionId) {
        console.error('User ID, amount, or session ID is missing');
        return;
      }

      const existingSession = localStorage.getItem('stripe_session_id');
      if (existingSession === sessionId) {
        console.log('Transaction already recorded for this session');
        return; // Don't proceed if the session has already been processed
      }

      try {
        // Record the transaction
        const transactionData = {
          date: new Date().toISOString().slice(0, 10),
          detail: 'Completed',
          price: amount,
          credits: amount,
          userId: userId,
        };

        const response = await fetch('/api/record-transaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transactionData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Transaction recording failed');
        }

        // Fetch current credits
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('credits')
          .eq('auth_user_id', userId)
          .single(); // Get a single user record

        if (userError) throw new Error(userError.message);

        // Calculate new credits
        const newCredits = (userData.credits || 0) + amount;

        // Update user's credits in the `users` table
        const { error: updateError } = await supabase
          .from('users')
          .update({ credits: newCredits })
          .eq('auth_user_id', userId);

        if (updateError) throw new Error(updateError.message);

        localStorage.setItem('stripe_session_id', sessionId);
        if (isMounted) {
          setTransactionRecorded(true);
          console.log('Transaction and credits updated successfully');
        }
      } catch (err) {
        if (err instanceof Error && isMounted) {
          console.error('Error recording transaction or updating credits:', err);
          setError(err.message); // Now safe to access err.message
        }
      }
    };

    if (sessionId && userId && amount) {
      recordTransactionAndUpdateCredits();
    }

    return () => {
      isMounted = false;
    };
  }, [sessionId, userId, amount]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-green-600">Payment Successful!</h1>
        {transactionRecorded ? (
          <p className="text-gray-700 my-4">
            Thank you for your payment. Your transaction has been recorded successfully, and your credits have been updated.
          </p>
        ) : error ? (
          <p className="text-red-600 my-4">Error: {error}</p>
        ) : (
          <p className="text-gray-700 my-4">Recording your transaction and updating credits...</p>
        )}
        <Link href="/dashboard">
          <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Dashboard
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
