import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from './firebase';
import { DecodedIdToken } from 'firebase-admin/auth';

// Type for the handler function with user token
export type AuthenticatedHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  token: DecodedIdToken
) => Promise<void | NextApiResponse>;

// Middleware to check if a user is authenticated
export const withAuth = (handler: AuthenticatedHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Get the auth token from the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token format' });
      }

      const token = authHeader.split('Bearer ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
      }

      try {
        // Verify the token
        const decodedToken = await auth.verifyIdToken(token);
        
        // Call the handler with the verified token
        return handler(req, res, decodedToken);
      } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};

// Middleware to check if a user has admin role
export const withAdmin = (handler: AuthenticatedHandler) => {
  return withAuth(async (req, res, token) => {
    try {
      // Check if user has admin role (stored in custom claims)
      if (!token.admin) {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
      }
      
      // Call the handler if user is an admin
      return handler(req, res, token);
    } catch (error) {
      console.error('Admin check error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
}; 