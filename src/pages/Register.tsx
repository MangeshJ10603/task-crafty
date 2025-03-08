
import { RegisterForm } from '@/components/auth/register-form';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/20">
      <div className="flex justify-center mb-8">
        <div className="flex items-center text-primary font-bold text-2xl">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="h-7 w-7 mr-2 text-primary"
          >
            <rect 
              x="4" 
              y="4" 
              width="16" 
              height="16" 
              rx="2" 
              className="fill-primary/20"
            />
            <path 
              d="M9 12l2 2 4-4" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          DoIt
        </div>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
