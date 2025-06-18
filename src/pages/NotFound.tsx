
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4 sm:px-6">
      <div className="text-center max-w-md w-full space-y-6">
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-8xl font-bold text-rose-400">404</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Oops! Page not found</h2>
          <p className="text-sm sm:text-base text-gray-600">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full sm:w-auto border-rose-200 text-rose-600 hover:bg-rose-50 min-h-[48px] px-6 py-3"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white min-h-[48px] px-6 py-3"
          >
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
