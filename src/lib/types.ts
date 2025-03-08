
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  important: boolean;
  date: Date;
  dueDate?: Date;
  reminder?: Date;
  notes?: string;
  steps?: TaskStep[];
  repeat?: RepeatOption;
  list: string;
}

export interface TaskStep {
  id: string;
  title: string;
  completed: boolean;
}

export interface List {
  id: string;
  name: string;
}

export type RepeatOption = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom' | null;

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}
