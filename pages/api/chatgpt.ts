import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { message } = req.body

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are an assistant for MPs. Learn from MP-provided responses to answer questions intelligently. If unsure or the question is new, suggest that the MP review it.' },
            { role: 'user', content: message }
          ],
      }),
    })

    const data = await response.json()
    console.log('ChatGPT API response:', data)
    const reply = data.choices[0]?.message?.content || 'No response available'

    res.status(200).json({ reply })
  } catch (error) {
    console.error('Error calling ChatGPT API:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 