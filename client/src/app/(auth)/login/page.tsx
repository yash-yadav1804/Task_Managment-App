'use client';

import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, guestLogin, isLoggingIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/tasks');
    }
  }, [user, router]);

  const handleGuestLogin = async () => {
    try {
      await guestLogin();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white p-4">
      <div className="w-full max-w-[380px] bg-[#1a1a1a] p-8 rounded-lg border border-[#333] shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center mb-6">
            <span className="text-black font-bold text-xl">✓</span>
          </div>
          <h1 className="text-2xl font-semibold mb-2">Let's get back on track</h1>
          <p className="text-sm text-gray-400 text-center">
            Enter your email below to log in to your account
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGuestLogin}
            disabled={isLoggingIn}
            className="w-full h-10 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isLoggingIn ? 'Logging in...' : 'Continue as Guest'}
          </button>
          
          <button
            className="w-full h-10 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            Login with Google
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-500 text-center leading-relaxed">
          By making continue, you agree to our{' '}
          <a href="#" className="underline hover:text-gray-300">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
