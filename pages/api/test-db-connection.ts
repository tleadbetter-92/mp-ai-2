import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('mp-ai');
    const collections = await db.listCollections().toArray();
    res.status(200).json({ message: 'Connected to MongoDB successfully', collections });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to connect to MongoDB', error: error.message });
    } else {
      res.status(500).json({ message: 'Failed to connect to MongoDB', error: 'Unknown error' });
    }
  }
} 