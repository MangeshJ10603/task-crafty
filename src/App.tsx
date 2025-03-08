
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "@/contexts/auth-context";
import { TaskProvider } from "@/contexts/task-context";
import { ThemeProvider } from "@/hooks/use-theme";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AppHome from "./pages/AppHome";
import TodayTasks from "./pages/TodayTasks";
import ImportantTasks from "./pages/ImportantTasks";
import PlannedTasks from "./pages/PlannedTasks";
import AssignedTasks from "./pages/AssignedTasks";
import ListTasks from "./pages/ListTasks";
import SearchTasks from "./pages/SearchTasks";

// Layouts
import { AppLayout } from "./components/layout/app-layout";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public route component (redirect if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
    
    <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route index element={<AppHome />} />
      <Route path="today" element={<TodayTasks />} />
      <Route path="important" element={<ImportantTasks />} />
      <Route path="planned" element={<PlannedTasks />} />
      <Route path="assigned" element={<AssignedTasks />} />
      <Route path="list/:listId" element={<ListTasks />} />
      <Route path="search" element={<SearchTasks />} />
    </Route>
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <TaskProvider>
              <AppRoutes />
            </TaskProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
