// File: /pages/api/verify-session.js

export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { session_id } = req.query;
  
      if (!session_id) {
        return res.status(400).json({ error: 'Session ID is required' });
      }
  
      // Handle the session ID, e.g., verify payment or process the transaction
      // Replace the following with your actual logic
      try {
        // Example: Verify session ID with a payment service or database
        const result = await someService.verifySession(session_id);
        
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  