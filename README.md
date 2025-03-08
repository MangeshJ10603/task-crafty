# 📝 Task Crafty

Task Crafty is a modern task management application designed to help users efficiently organize their daily tasks. Built with React (TypeScript) and Tailwind CSS, it provides an intuitive and clean interface for managing tasks effectively.

## 📂 Project Structure

```
task-crafty/
│── node_modules/          # Project dependencies
│── public/                # Static assets (e.g., icons, images)
│── src/                   # Main source code
│   ├── components/        # Reusable UI components
│   ├── contexts/          # Context API for global state management
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and helpers
│   ├── pages/             # Application pages
│   ├── App.css            # Global styles
│   ├── App.tsx            # Root component
│   ├── index.css          # Tailwind CSS imports
│   ├── main.tsx           # Entry point for React app
│   ├── vite-env.d.ts      # Vite environment configurations
│── .gitignore             # Files to ignore in version control
│── components.json        # Component metadata
│── eslint.config.js       # ESLint configuration
│── index.html             # Main HTML template
│── package-lock.json      # Dependency lock file
│── package.json           # Project metadata and dependencies
│── postcss.config.js      # PostCSS configuration
│── README.md              # Project documentation
│── tailwind.config.ts     # Tailwind CSS configuration
│── tsconfig.app.json      # TypeScript configuration for the app
│── tsconfig.json          # TypeScript global configuration
│── tsconfig.node.json     # TypeScript configuration for Node
```

## ✨ Features

✅ Task Management: Create, update, and delete tasks easily.  
✅ Task Categories: Organize tasks into different categories (Today, Important, Planned, etc.).  
✅ Dark Mode Support: Toggle between light and dark modes.  
✅ Search Functionality: Quickly find tasks using the search bar.  
✅ Task Completion Tracking: Track pending and completed tasks.  
✅ Responsive UI: Optimized for all screen sizes using Tailwind CSS.  
✅ State Management: Uses React Context API for smooth state handling.  

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS  
- **State Management:** Context API, Hooks  
- **Build Tool:** Vite  

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/MangeshJ10603/task-crafty.git
cd task-crafty
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Run the development server
```sh
npm run dev
```

### 4️⃣ Open in browser
Go to [http://localhost:5173/](http://localhost:5173/) (or the port specified by Vite)

## 📸 UI Overview

### 1️⃣ Sidebar Layout

- **Profile Section** (Top left corner)  
- **Task Categories:** (All Tasks, Today, Important, Planned, Assigned to Me)  
- **"Add List" button** to create custom lists  
- **Task Progress Chart** (Bottom left corner)  

### 2️⃣ Main Task Section

- **Search Bar** (Top right corner)  
- **Settings and Profile Icons** (Top right corner)  
- **Task Input Field** with "Add Task" Button  
- **Task List** with Completion Status & Star Marking for Importance  
- **Completed Tasks Section** (Below the active tasks)  

## 🖼️ Screenshots

### Dashboard View:
![dashboard_view](https://github.com/user-attachments/assets/02db76ed-46c2-4c89-afe9-c6e65b9b0811)


### Task Creation:
![task_creation](https://github.com/user-attachments/assets/a23b6a16-bd70-423c-9f25-58256481af08)


### Dark Mode:
![dark_mode](https://github.com/user-attachments/assets/edaa8f98-9ec2-4ae5-8a17-f9693e23c60f)


---

Enjoy using **Task Crafty**! 🚀✨

