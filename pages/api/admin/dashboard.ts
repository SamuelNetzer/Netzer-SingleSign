import { NextApiRequest, NextApiResponse } from 'next';
import { withAdmin } from '../../../lib/middleware';

// Admin-only route handler with admin authentication middleware
const handler = withAdmin(async (req, res, token) => {
  // Only respond to GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return admin-only dashboard data
  return res.status(200).json({
    message: 'Admin dashboard data',
    admin: {
      uid: token.uid,
      email: token.email,
      name: token.name || 'Admin',
    },
    stats: {
      totalUsers: 152,
      activeUsers: 87,
      newUsersToday: 12,
      revenue: "$12,345.67"
    },
    recentActions: [
      { action: "User Created", user: "user123", timestamp: new Date(Date.now() - 3600000).toISOString() },
      { action: "Content Updated", user: "admin456", timestamp: new Date(Date.now() - 7200000).toISOString() },
      { action: "Permission Changed", user: "user789", timestamp: new Date(Date.now() - 14400000).toISOString() },
    ],
    timestamp: new Date().toISOString(),
  });
});

export default handler; 