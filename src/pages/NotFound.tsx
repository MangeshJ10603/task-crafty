
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center animate-fade-in">
      <div className="max-w-lg">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          onClick={() => navigate(-1)} 
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
        <div className="mt-2">
          <Button 
            variant="link" 
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
