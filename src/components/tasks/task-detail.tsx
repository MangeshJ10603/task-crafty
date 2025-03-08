
import { useState } from 'react';
import { useTasks } from '@/contexts/task-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { X, Plus, Calendar as CalendarIcon, Bell, RotateCcw, Trash } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export function TaskDetail() {
  const {
    selectedTask,
    selectTask,
    updateTask,
    deleteTask,
    addTaskStep,
    updateTaskStep,
    deleteTaskStep,
    setTaskDueDate,
    setTaskReminder,
    setTaskRepeat,
    setTaskNotes,
  } = useTasks();

  const [newStep, setNewStep] = useState('');
  const [notes, setNotes] = useState(selectedTask?.notes || '');

  if (!selectedTask) return null;

  const handleClose = () => {
    selectTask(null);
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      addTaskStep(selectedTask.id, newStep.trim());
      setNewStep('');
    }
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setTaskNotes(selectedTask.id, value);
  };

  const handleDeleteTask = () => {
    deleteTask(selectedTask.id);
    selectTask(null);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-background border-l shadow-lg z-20 flex flex-col animate-slide-in-right">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selectedTask.completed}
            onCheckedChange={() => updateTask(selectedTask.id, { completed: !selectedTask.completed })}
          />
          <h2 className="font-medium">{selectedTask.title}</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Steps section */}
        <div>
          <h3 className="text-sm font-medium mb-2">Steps</h3>
          <div className="flex items-center mb-3">
            <Input
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              placeholder="Add a step"
              className="flex-1 mr-2 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddStep();
                }
              }}
            />
            <Button onClick={handleAddStep} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {selectedTask.steps?.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                <Checkbox
                  checked={step.completed}
                  onCheckedChange={(checked) => updateTaskStep(selectedTask.id, step.id, !!checked)}
                />
                <span className={cn('text-sm flex-1', step.completed && 'line-through text-muted-foreground')}>
                  {step.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={() => deleteTaskStep(selectedTask.id, step.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Reminder */}
        <div>
          <h3 className="text-sm font-medium mb-2">Set Reminder</h3>
          <Button variant="outline" className="w-full justify-start text-sm" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            {selectedTask.reminder
              ? format(selectedTask.reminder, 'PPp')
              : 'Add a reminder'}
          </Button>
        </div>

        {/* Due date */}
        <div>
          <h3 className="text-sm font-medium mb-2">Add Due Date</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                size="sm"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                {selectedTask.dueDate
                  ? format(selectedTask.dueDate, 'PPP')
                  : 'Select a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedTask.dueDate}
                onSelect={(date) => setTaskDueDate(selectedTask.id, date || undefined)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Repeat */}
        <div>
          <h3 className="text-sm font-medium mb-2">Repeat</h3>
          <Button variant="outline" className="w-full justify-start text-sm" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            {selectedTask.repeat || 'Does not repeat'}
          </Button>
        </div>

        {/* Notes */}
        <div>
          <h3 className="text-sm font-medium mb-2">Add Notes</h3>
          <Textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Add notes here..."
            className="min-h-[100px] text-sm"
          />
        </div>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Created {format(selectedTask.date, 'PPp')}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteTask}
          className="text-destructive hover:text-destructive/90"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
