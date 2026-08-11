import { Menu } from 'lucide-react';
import { ReactNode } from 'react';

export default function TopBar({ 
  title, 
  toolbar, 
  onMenuClick 
}: { 
  title: string, 
  toolbar?: ReactNode,
  onMenuClick: () => void 
}) {
  return (
    <header className="h-14 border-b border-[var(--border)] bg-[var(--bg)] flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button 
          className="lg:hidden p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-[var(--muted)]"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-[var(--fg)]">{title}</h1>
      </div>
      
      {toolbar && (
        <div className="flex items-center gap-2">
          {toolbar}
        </div>
      )}
    </header>
  );
}
