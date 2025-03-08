
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="max-w-3xl w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-2" />
            Effortless task management
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Simplify your day with <span className="text-primary">DoIt</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The elegant, intuitive task management app designed to help you focus on what matters most.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="text-base"
            onClick={() => navigate('/register')}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="text-base"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </div>
        
        <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border shadow-xl">
          <img
            src="/assets/8bf056d7-2a31-4526-9d96-65a3a5a040ef.png"
            alt="DoIt App Interface"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Organization</h3>
            <p className="text-muted-foreground">
              Organize tasks into custom lists and categories to fit your workflow.
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Powerful Reminders</h3>
            <p className="text-muted-foreground">
              Never miss a deadline with customizable reminders and due dates.
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Beautiful Design</h3>
            <p className="text-muted-foreground">
              Enjoy an elegant, minimalist interface inspired by modern design principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
