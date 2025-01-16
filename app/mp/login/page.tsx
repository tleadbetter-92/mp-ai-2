'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button onClick={() => signIn('github')} className="btn">
        Sign in with GitHub
      </button>
    </div>
  );
}

