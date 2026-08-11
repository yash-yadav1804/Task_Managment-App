'use client';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      {/* Sidebar placeholder */}
      <div className="w-60 border-r border-[var(--border)] p-4 flex flex-col hidden lg:flex">
        <h2 className="font-semibold mb-6">Workspace</h2>
        <nav className="flex flex-col gap-2">
          <a href="/tasks" className="p-2 rounded bg-[var(--accent)]/10 text-[var(--accent)] font-medium">Tasks</a>
          <a href="/projects" className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/5">Projects</a>
        </nav>
      </div>

      {/* Main content placeholder */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-14 border-b border-[var(--border)] flex items-center px-4">
          <h1 className="font-semibold">App</h1>
        </header>
        <main className="flex-1 overflow-auto bg-[var(--bg-outer)]">
          {children}
        </main>
      </div>
    </div>
  );
}
