
import { useState } from 'react';
import { useTasks } from '@/contexts/task-context';
import { TaskCard } from './task-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, RotateCcw, CalendarDays, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface TaskListProps {
  title?: string;
  tasks: ReturnType<typeof useTasks>['tasks'];
  emptyMessage?: string;
}

export function TaskList({ title = 'Tasks', tasks, emptyMessage = 'No tasks found' }: TaskListProps) {
  const { addTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        completed: false,
        important: false,
        list: 'personal',
      });
      setNewTaskTitle('');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        
        <div className="bg-white rounded-md shadow-sm p-4 mb-6">
          <div className="mb-4">
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a task"
              className="border-0 shadow-none text-base px-0 focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask();
                }
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <CalendarDays className="h-4 w-4" />
              </Button>
            </div>
            
            <Button onClick={handleAddTask} size="sm" className="bg-brand-green hover:bg-brand-green/90">
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{emptyMessage}</p>
          <Button
            onClick={() => setNewTaskTitle('New task')}
            variant="outline"
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add your first task
          </Button>
        </div>
      ) : (
        <>
          {/* Pending tasks */}
          {pendingTasks.length > 0 && (
            <div className="mb-8">
              <div className="grid gap-2">
                {pendingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Completed tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h2 className="font-medium text-base mb-4">Completed</h2>
              <div className="grid gap-2">
                {completedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
