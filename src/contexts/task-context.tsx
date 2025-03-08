
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { List, Task, TaskStep, RepeatOption } from '@/lib/types';
import { MOCK_TASKS, MOCK_LISTS } from '@/lib/constants';

interface TaskContextType {
  tasks: Task[];
  lists: List[];
  selectedTask: Task | null;
  selectedList: string;
  addTask: (task: Omit<Task, 'id' | 'date'>) => void;
  updateTask: (taskId: string, task: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  toggleTaskImportance: (taskId: string) => void;
  selectTask: (taskId: string | null) => void;
  setSelectedList: (listId: string) => void;
  addList: (name: string) => void;
  deleteList: (listId: string) => void;
  addTaskStep: (taskId: string, stepTitle: string) => void;
  updateTaskStep: (taskId: string, stepId: string, completed: boolean) => void;
  deleteTaskStep: (taskId: string, stepId: string) => void;
  setTaskDueDate: (taskId: string, dueDate: Date | undefined) => void;
  setTaskReminder: (taskId: string, reminder: Date | undefined) => void;
  setTaskRepeat: (taskId: string, repeat: RepeatOption) => void;
  setTaskNotes: (taskId: string, notes: string) => void;
  getTodayTasks: () => Task[];
  getImportantTasks: () => Task[];
  getPlannedTasks: () => Task[];
}

const TaskContext = createContext<TaskContextType | null>(null);

// Local storage keys
const TASKS_KEY = 'doit_tasks';
const LISTS_KEY = 'doit_lists';

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedList, setSelectedList] = useState<string>('all');
  const { toast } = useToast();

  // Initialize with mock data or load from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    const storedLists = localStorage.getItem(LISTS_KEY);

    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        // Convert string dates back to Date objects
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          date: new Date(task.date),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          reminder: task.reminder ? new Date(task.reminder) : undefined,
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error('Failed to parse tasks from localStorage', error);
        setTasks(MOCK_TASKS);
      }
    } else {
      setTasks(MOCK_TASKS);
    }

    if (storedLists) {
      try {
        setLists(JSON.parse(storedLists));
      } catch (error) {
        console.error('Failed to parse lists from localStorage', error);
        setLists(MOCK_LISTS);
      }
    } else {
      setLists(MOCK_LISTS);
    }
  }, []);

  // Save to localStorage whenever tasks or lists change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
    }
  }, [lists]);

  const addTask = (task: Omit<Task, 'id' | 'date'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      date: new Date(),
    };
    
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    
    toast({
      title: 'Task added',
      description: 'Your task has been added successfully',
    });
  };

  const updateTask = (taskId: string, updateData: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updateData } : task
      )
    );
    
    // Update selected task if it's the one being updated
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => prev ? { ...prev, ...updateData } : null);
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    
    // Deselect if the deleted task was selected
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
    
    toast({
      title: 'Task deleted',
      description: 'Your task has been deleted',
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    
    // Update selected task if it's the one being toggled
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => prev ? { ...prev, completed: !prev.completed } : null);
    }
  };

  const toggleTaskImportance = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, important: !task.important } : task
      )
    );
    
    // Update selected task if it's the one being toggled
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => prev ? { ...prev, important: !prev.important } : null);
    }
  };

  const selectTask = (taskId: string | null) => {
    if (!taskId) {
      setSelectedTask(null);
      return;
    }
    
    const task = tasks.find((t) => t.id === taskId) || null;
    setSelectedTask(task);
  };

  const addList = (name: string) => {
    const newList: List = {
      id: Date.now().toString(),
      name,
    };
    
    setLists((prevLists) => [...prevLists, newList]);
    
    toast({
      title: 'List added',
      description: `Your list "${name}" has been created`,
    });
  };

  const deleteList = (listId: string) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    
    // Set tasks that were in this list to the default list
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.list === listId ? { ...task, list: 'personal' } : task
      )
    );
    
    // If the deleted list was selected, reset to 'all'
    if (selectedList === listId) {
      setSelectedList('all');
    }
    
    toast({
      title: 'List deleted',
      description: 'The list has been deleted',
    });
  };

  const addTaskStep = (taskId: string, stepTitle: string) => {
    const newStep: TaskStep = {
      id: Date.now().toString(),
      title: stepTitle,
      completed: false,
    };
    
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              steps: [...(task.steps || []), newStep],
            }
          : task
      )
    );
    
    // Update selected task if it's the one being modified
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) =>
        prev
          ? {
              ...prev,
              steps: [...(prev.steps || []), newStep],
            }
          : null
      );
    }
  };

  const updateTaskStep = (taskId: string, stepId: string, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId && task.steps
          ? {
              ...task,
              steps: task.steps.map((step) =>
                step.id === stepId ? { ...step, completed } : step
              ),
            }
          : task
      )
    );
    
    // Update selected task if it's the one being modified
    if (selectedTask && selectedTask.id === taskId && selectedTask.steps) {
      setSelectedTask((prev) =>
        prev
          ? {
              ...prev,
              steps: prev.steps?.map((step) =>
                step.id === stepId ? { ...step, completed } : step
              ),
            }
          : null
      );
    }
  };

  const deleteTaskStep = (taskId: string, stepId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId && task.steps
          ? {
              ...task,
              steps: task.steps.filter((step) => step.id !== stepId),
            }
          : task
      )
    );
    
    // Update selected task if it's the one being modified
    if (selectedTask && selectedTask.id === taskId && selectedTask.steps) {
      setSelectedTask((prev) =>
        prev
          ? {
              ...prev,
              steps: prev.steps?.filter((step) => step.id !== stepId),
            }
          : null
      );
    }
  };

  const setTaskDueDate = (taskId: string, dueDate: Date | undefined) => {
    updateTask(taskId, { dueDate });
  };

  const setTaskReminder = (taskId: string, reminder: Date | undefined) => {
    updateTask(taskId, { reminder });
  };

  const setTaskRepeat = (taskId: string, repeat: RepeatOption) => {
    updateTask(taskId, { repeat });
  };

  const setTaskNotes = (taskId: string, notes: string) => {
    updateTask(taskId, { notes });
  };

  // Filter helpers
  const getTodayTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  };

  const getImportantTasks = () => {
    return tasks.filter((task) => task.important);
  };

  const getPlannedTasks = () => {
    return tasks.filter((task) => task.dueDate !== undefined);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        lists,
        selectedTask,
        selectedList,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        toggleTaskImportance,
        selectTask,
        setSelectedList,
        addList,
        deleteList,
        addTaskStep,
        updateTaskStep,
        deleteTaskStep,
        setTaskDueDate,
        setTaskReminder,
        setTaskRepeat,
        setTaskNotes,
        getTodayTasks,
        getImportantTasks,
        getPlannedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
