// pages/api/record-transaction.js
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { date, detail, price, credits, userId } = req.body;

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        { date, detail, price, credits, user_id: userId }
      ]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
