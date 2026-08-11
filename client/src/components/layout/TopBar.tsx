import { Search, Menu, Settings, Sun, Moon } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { useMenu } from '../../contexts/MenuContext';
import { useTheme } from 'next-themes';
import { useAccentTheme, ACCENT_COLORS } from '../../contexts/ThemeContext';

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
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {toolbar}
      </div>
    </header>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { accentColor, setAccentColor } = useAccentTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded hover:bg-[var(--bg-muted)] text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
      >
        <Settings className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--bg)] border border-[var(--border)] rounded-md shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-[var(--border)]">
            <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">Theme</p>
            <div className="flex gap-2">
              <button onClick={() => setTheme('light')} className={`p-1.5 rounded-md ${theme === 'light' ? 'bg-[var(--bg-muted)] text-[var(--accent)]' : 'text-[var(--muted)]'}`}>
                <Sun className="w-4 h-4" />
              </button>
              <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-md ${theme === 'dark' ? 'bg-[var(--bg-muted)] text-[var(--accent)]' : 'text-[var(--muted)]'}`}>
                <Moon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="px-4 py-3">
            <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">Accent</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(ACCENT_COLORS).map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color as any)}
                  className={`w-5 h-5 rounded-full ${accentColor === color ? 'ring-2 ring-offset-1 ring-[var(--accent)] ring-offset-[var(--bg)]' : ''}`}
                  style={{ backgroundColor: ACCENT_COLORS[color as keyof typeof ACCENT_COLORS] }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
