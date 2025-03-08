
// Navigation items for the sidebar
export const NAVIGATION_ITEMS = [
  {
    id: 'all-tasks',
    label: 'All Tasks',
    icon: 'File',
    route: '/app',
  },
  {
    id: 'today',
    label: 'Today',
    icon: 'Calendar',
    route: '/app/today',
  },
  {
    id: 'important',
    label: 'Important',
    icon: 'Star',
    route: '/app/important',
  },
  {
    id: 'planned',
    label: 'Planned',
    icon: 'CalendarRange',
    route: '/app/planned',
  },
  {
    id: 'assigned',
    label: 'Assigned to me',
    icon: 'UserRound',
    route: '/app/assigned',
  }
];

// Mock user data
export const MOCK_USER = {
  id: '1',
  name: 'ABCD',
  email: 'user@example.com',
  avatar: '/lovable-uploads/5df54c7f-f701-450d-9fcc-ff4f9711cf5b.png',
};

// Mock tasks data
export const MOCK_TASKS = [
  {
    id: '1',
    title: 'Buy groceries',
    completed: false,
    important: false,
    date: new Date(),
    list: 'personal',
  },
  {
    id: '2',
    title: 'Finish project report',
    completed: false,
    important: true,
    date: new Date(),
    list: 'work',
  },
  {
    id: '3',
    title: 'Call the bank',
    completed: false,
    important: false,
    date: new Date(),
    list: 'personal',
  },
  {
    id: '4',
    title: 'Schedule dentist appointment',
    completed: false,
    important: false,
    date: new Date(),
    list: 'personal',
  },
  {
    id: '5',
    title: 'Plan weekend trip',
    completed: false,
    important: false,
    date: new Date(),
    list: 'personal',
  },
  {
    id: '6',
    title: 'Read a book',
    completed: true,
    important: false,
    date: new Date(),
    list: 'personal',
  },
  {
    id: '7',
    title: 'Clean the house',
    completed: true,
    important: false,
    date: new Date(),
    list: 'personal',
  },
  {
    id: '8',
    title: 'Prepare presentation',
    completed: true,
    important: false,
    date: new Date(),
    list: 'work',
  },
  {
    id: '9',
    title: 'Update blog',
    completed: true,
    important: false,
    date: new Date(),
    list: 'work',
  },
];

// Mock lists data
export const MOCK_LISTS = [
  {
    id: 'personal',
    name: 'Personal',
  },
  {
    id: 'work',
    name: 'Work',
  },
  {
    id: 'shopping',
    name: 'Shopping',
  },
];
