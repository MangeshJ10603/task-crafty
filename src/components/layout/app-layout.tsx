
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MainSidebar } from './main-sidebar';
import { AppHeader } from './app-header';

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Hidden on mobile by default */}
      <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <MainSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-auto bg-muted/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
