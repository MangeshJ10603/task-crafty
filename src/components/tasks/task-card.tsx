
import { useState } from 'react';
import { useTasks } from '@/contexts/task-context';
import { cn } from '@/lib/utils';
import { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Star } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { toggleTaskCompletion, toggleTaskImportance, selectTask, selectedTask } = useTasks();
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = selectedTask?.id === task.id;

  const handleTaskClick = (e: React.MouseEvent) => {
    // Don't select the task if clicking on the checkbox or star
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    selectTask(task.id);
  };

  return (
    <div
      className={cn(
        'task-card group',
        isSelected && 'task-card-active',
        task.completed && 'border-green-200',
        'transition-all hover:shadow-md hover:border-primary/40'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTaskClick}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskCompletion(task.id);
          }}
          className={cn(
            'flex-shrink-0 h-5 w-5 rounded-md border transition-colors',
            task.completed 
              ? 'bg-brand-green border-brand-green text-white' 
              : 'border-gray-300 hover:border-primary'
          )}
        >
          {task.completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mx-auto my-0.5"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </button>

        <span
          className={cn(
            'flex-1 truncate text-sm',
            task.completed && 'text-muted-foreground line-through',
            isSelected && 'font-medium'
          )}
        >
          {task.title}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskImportance(task.id);
          }}
          className={cn(
            'flex-shrink-0 text-gray-400 transition-colors',
            task.important ? 'text-yellow-500' : (isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')
          )}
        >
          <Star
            className={cn('h-5 w-5', task.important && 'fill-yellow-500')}
          />
        </button>
      </div>
    </div>
  );
}
