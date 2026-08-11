import { Search, Menu } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { useMenu } from '../../contexts/MenuContext';

export default function TopBar({ 
  title, 
  toolbar,
  onSearch
}: { 
  title?: string, 
  toolbar?: ReactNode,
  onSearch?: (query: string) => void
}) {
  const { setIsSidebarOpen } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <header className="h-14 border-b border-[var(--border)] bg-[var(--bg)] flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button 
          className="lg:hidden p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-[var(--muted)]"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-[var(--fg)] hidden sm:block">{title || 'Workspace'}</h1>
        
        <div className="relative w-64 ml-2 group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" />
          <input 
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full h-8 bg-[var(--bg-muted)] border border-transparent rounded-md pl-9 pr-4 text-sm focus:outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--muted)]"
          />
        </div>
      </div>
      
      {toolbar && (
        <div className="flex items-center gap-2">
          {toolbar}
        </div>
      )}
    </header>
  );
}
