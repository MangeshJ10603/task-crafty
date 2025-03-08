
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AuthUser } from '@/lib/types';
import { MOCK_USER } from '@/lib/constants';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Local storage keys
const USER_KEY = 'doit_user';
const AUTH_TOKEN_KEY = 'doit_auth_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session when the app loads
    const storedUser = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // For demo purposes, accept any valid-looking email with any password
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      // Create mock user based on email (or use predefined mock user)
      const authUser = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      
      // Store user in localStorage
      localStorage.setItem(USER_KEY, JSON.stringify(authUser));
      localStorage.setItem(AUTH_TOKEN_KEY, 'mock-auth-token');
      
      setUser(authUser);
      toast({
        title: 'Login successful',
        description: `Welcome back, ${authUser.name}!`,
      });
      
      navigate('/app');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
      };
      
      // Store user in localStorage
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      localStorage.setItem(AUTH_TOKEN_KEY, 'mock-auth-token');
      
      setUser(newUser);
      toast({
        title: 'Registration successful',
        description: `Welcome, ${name}!`,
      });
      
      navigate('/app');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate('/login');
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
