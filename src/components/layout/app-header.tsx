
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Moon, Sun, Grid, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { QuickAddMenu } from '@/components/tasks/quick-add-menu';

interface AppHeaderProps {
  toggleSidebar: () => void;
}

export function AppHeader({ toggleSidebar }: AppHeaderProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/app/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center text-primary font-bold text-xl">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="h-6 w-6 mr-1.5 text-primary"
          >
            <rect 
              x="4" 
              y="4" 
              width="16" 
              height="16" 
              rx="2" 
              className="fill-primary/20"
            />
            <path 
              d="M9 12l2 2 4-4" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          DoIt
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isSearching ? (
          <form onSubmit={handleSearch} className="relative animate-fade-in">
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-64 pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              onBlur={() => {
                if (!searchQuery) {
                  setIsSearching(false);
                }
              }}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </Button>
          </form>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearching(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <QuickAddMenu />

        <Button variant="ghost" size="icon">
          <Grid className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
