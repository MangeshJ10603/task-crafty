
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useTasks } from "@/contexts/task-context";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export function QuickAddMenu() {
  const { addTask } = useTasks();
  const { toast } = useToast();
  
  // Dialog states
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openReminderDialog, setOpenReminderDialog] = useState(false);
  const [openDueDateDialog, setOpenDueDateDialog] = useState(false);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  
  // Form states
  const [taskTitle, setTaskTitle] = useState("");
  const [reminderDate, setReminderDate] = useState<Date | undefined>(undefined);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [note, setNote] = useState("");
  
  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      toast({
        title: "Task title required",
        description: "Please enter a task title",
        variant: "destructive",
      });
      return;
    }
    
    addTask({
      title: taskTitle,
      completed: false,
      important: false,
      list: "personal",
      dueDate,
      reminder: reminderDate,
      notes: note,
    });
    
    // Reset form
    setTaskTitle("");
    setReminderDate(undefined);
    setDueDate(undefined);
    setNote("");
    
    // Close dialogs
    setOpenTaskDialog(false);
    setOpenReminderDialog(false);
    setOpenDueDateDialog(false);
    setOpenNoteDialog(false);
    
    toast({
      title: "Task added",
      description: "Your task has been added successfully",
    });
  };
  
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <Dialog open={openTaskDialog} onOpenChange={setOpenTaskDialog}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Add Task
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input
                  placeholder="Task title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="col-span-3"
                />
                
                {dueDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Due date:</span>
                    <span className="text-sm font-medium">
                      {format(dueDate, "PPP")}
                    </span>
                  </div>
                )}
                
                {reminderDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reminder:</span>
                    <span className="text-sm font-medium">
                      {format(reminderDate, "PPP p")}
                    </span>
                  </div>
                )}
                
                {note && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">Note:</span>
                    <span className="text-sm text-muted-foreground">
                      {note}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button onClick={handleAddTask}>Add Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={openReminderDialog} onOpenChange={setOpenReminderDialog}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Set Reminder
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Set Reminder</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Calendar
                  mode="single"
                  selected={reminderDate}
                  onSelect={setReminderDate}
                  className="rounded-md border"
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={() => setOpenReminderDialog(false)}>Done</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={openDueDateDialog} onOpenChange={setOpenDueDateDialog}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Add Due Date
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Due Date</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  className="rounded-md border"
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={() => setOpenDueDateDialog(false)}>Done</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={openNoteDialog} onOpenChange={setOpenNoteDialog}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Add Note
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="Enter your note here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button onClick={() => setOpenNoteDialog(false)}>Done</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
