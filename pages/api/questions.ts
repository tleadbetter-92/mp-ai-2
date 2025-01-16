import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { questionText, responseText } = req.body;
    const flagged = !responseText;

    try {
      const client = await clientPromise;
      const db = client.db('mp-ai');
      const collection = db.collection('questions');

      const result = await collection.insertOne({
        questionText,
        responseText: responseText || null,
        flagged,
        createdAt: new Date(),
      });

      return res.status(200).json({ message: 'Question saved', id: result.insertedId });
    } catch (error) {
      console.error('Error saving question:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    const { query } = req.query;

    try {
      const client = await clientPromise;
      const db = client.db('mp-ai');
      const collection = db.collection('questions');

      const result = await collection.findOne({
        $text: { $search: query as string },
      });

      if (result) {
        return res.status(200).json({ response: result.responseText });
      } else {
        return res.status(404).json({ message: 'No similar question found' });
      }
    } catch (error) {
      console.error('Error retrieving question:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
} 