import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../../lib/middleware';

// Protected route handler with authentication middleware
const handler = withAuth(async (req, res, token) => {
  // Only respond to GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return protected data with user information
  return res.status(200).json({
    message: 'This is protected data that only authenticated users can access',
    user: {
      uid: token.uid,
      email: token.email,
      name: token.name || 'User',
    },
    timestamp: new Date().toISOString(),
  });
});

export default handler; 