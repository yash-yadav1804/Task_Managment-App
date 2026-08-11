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

          <button
            className="w-full h-10 bg-white text-black font-medium text-[14px] rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Login with Google
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
