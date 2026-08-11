'use client';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { MenuProvider, useMenu } from '../../contexts/MenuContext';

function WorkspaceLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { isSidebarOpen, setIsSidebarOpen } = useMenu();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--fg)]">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <main className="flex-1 overflow-auto bg-[var(--bg-outer)]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <WorkspaceLayoutContent>{children}</WorkspaceLayoutContent>
    </MenuProvider>
  );
}
