
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useTasks } from '@/contexts/task-context';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Plus, File, Calendar, Star, CalendarRange, UserRound, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function MainSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const { getTodayTasks, lists, addList } = useTasks();
  const [newListName, setNewListName] = useState('');
  const [isAddListDialogOpen, setIsAddListDialogOpen] = useState(false);

  // Calculate tasks statistics
  const todayTasks = getTodayTasks();
  const completedTasks = todayTasks.filter(task => task.completed);
  const progress = todayTasks.length > 0 ? (completedTasks.length / todayTasks.length) * 100 : 0;

  const handleCreateList = () => {
    if (newListName.trim()) {
      addList(newListName.trim());
      setNewListName('');
      setIsAddListDialogOpen(false);
    }
  };

  return (
    <aside className="w-64 border-r bg-background h-screen flex flex-col animate-fade-in">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="h-12 w-12 rounded-full border">
            <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
            <AvatarFallback className="bg-secondary text-primary font-medium">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Hey, {user?.name || 'User'}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>

        <nav className="space-y-1">
          {NAVIGATION_ITEMS.map((item) => {
            // Map the icon name to the actual icon component
            let Icon;
            switch (item.icon) {
              case 'File':
                Icon = File;
                break;
              case 'Calendar':
                Icon = Calendar;
                break;
              case 'Star':
                Icon = Star;
                break;
              case 'CalendarRange':
                Icon = CalendarRange;
                break;
              case 'UserRound':
                Icon = UserRound;
                break;
              default:
                Icon = File;
            }

            return (
              <Link
                key={item.id}
                to={item.route}
                className={cn(
                  'sidebar-item',
                  location.pathname === item.route && 'sidebar-item-active'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        <Dialog open={isAddListDialogOpen} onOpenChange={setIsAddListDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start sidebar-item" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add list
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create a new list</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="List name"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateList();
                  }
                }}
              />
              <Button type="submit" size="sm" onClick={handleCreateList}>
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {lists.length > 0 && (
          <div className="mt-2 space-y-1">
            {lists.map((list) => (
              <Link
                key={list.id}
                to={`/app/list/${list.id}`}
                className={cn(
                  'sidebar-item',
                  location.pathname === `/app/list/${list.id}` && 'sidebar-item-active'
                )}
              >
                <File className="h-4 w-4" />
                <span className="flex-1 truncate">{list.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto p-4 border-t">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-sm font-medium">Today Tasks: {todayTasks.length}</h3>
          <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="relative h-24 w-24 mx-auto my-3">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-secondary stroke-current"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className="text-primary stroke-current"
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
              transform="rotate(-90 50 50)"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-sm font-medium">{completedTasks.length}/{todayTasks.length}</div>
          </div>
        </div>
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-secondary"></span>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            <span>Done</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
