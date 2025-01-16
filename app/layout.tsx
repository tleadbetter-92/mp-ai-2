import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react";

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
  const { data: session } = useSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">MP AI Assistant</Link>
            <div>
              <Link href="/" className="text-white mr-4 hover:text-blue-100">Home</Link>
              {session ? (
                <button onClick={() => signOut()} className="text-white hover:text-blue-100">
                  Sign Out
                </button>
              ) : (
                <Link href="/mp/login" className="text-white hover:text-blue-100">MP Login</Link>
              )}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

