import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import SessionWrapper from '@/components/SessionWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MP AI Assistant',
  description: 'Ask questions to your MP\'s AI assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Navbar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}

