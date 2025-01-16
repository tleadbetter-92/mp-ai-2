'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">MP AI Assistant</Link>
        <div>
          <Link href="/" className="text-white mr-4 hover:text-blue-100">Home</Link>
          {session ? (
            <>
              <Link href="/mp/dashboard" className="text-white mr-4 hover:text-blue-100">MP Dashboard</Link>
              <button onClick={() => signOut()} className="text-white hover:text-blue-100">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/mp/login" className="text-white hover:text-blue-100">MP Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 