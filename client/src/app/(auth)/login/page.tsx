'use client';

import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckSquare } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] p-4 font-sans">
      <div className="w-full max-w-[380px] bg-[#171717] rounded-lg border border-[#2a2a2a] p-8 shadow-2xl flex flex-col items-center">
        
        <div className="w-10 h-10 bg-white rounded flex items-center justify-center mb-6">
          <CheckSquare className="text-black w-6 h-6" />
        </div>
        
        <h1 className="text-xl font-semibold text-white mb-2 tracking-tight">Let's get back on track</h1>
        
        <p className="text-sm text-[#888888] text-center mb-8">
          Enter your email below to log in to your account
        </p>

        <div className="w-full space-y-3">
          <button
            onClick={handleGuestLogin}
            disabled={isLoggingIn}
            className="w-full h-10 bg-white text-black font-medium text-[14px] rounded hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoggingIn ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoggingIn ? 'Logging in...' : 'Continue as Guest'}
          </button>
        </div>

        <p className="mt-8 text-[13px] text-[#888888] text-center leading-relaxed max-w-[280px]">
          By making continue, you agree to our{' '}
          <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
