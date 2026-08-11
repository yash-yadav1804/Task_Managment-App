import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { LayoutList, Folder, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutList, exact: true },
    { name: 'Tasks', href: '/tasks', icon: LayoutList },
    { name: 'Projects', href: '/projects', icon: Folder },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar Container */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-60 bg-[var(--bg)] border-r border-[var(--border)] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        
        {/* Mobile Close */}
        <button 
          className="lg:hidden absolute top-4 right-4 text-[var(--muted)]"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Section */}
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-semibold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-[var(--muted)] truncate">Workspace</p>
          </div>
          <ChevronDown className="w-4 h-4 text-[var(--muted)]" />
        </div>

        {/* Navigation */}
        <div className="p-2 flex-1 overflow-y-auto">
          <div className="text-xs font-medium text-[var(--muted)] px-3 mb-2 uppercase tracking-wider">Workspace</div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = (item as any).exact ? pathname === item.href : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-l-2 border-[var(--accent)]' 
                      : 'text-[var(--fg)] hover:bg-black/5 dark:hover:bg-white/5 border-l-2 border-transparent'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
