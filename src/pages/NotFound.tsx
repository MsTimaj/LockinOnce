
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
      {/* Mobile Layout */}
      <div className="lg:hidden px-4 w-full">
        <div className="text-center max-w-sm mx-auto space-y-6">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-rose-400">404</h1>
            <h2 className="text-xl font-semibold text-gray-800">Oops! Page not found</h2>
            <p className="text-sm text-gray-600">
              The page you're looking for doesn't exist or may have been moved.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 justify-center">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 min-h-[48px] px-6 py-3"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white min-h-[48px] px-6 py-3"
            >
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block px-8 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-8">
          <div className="space-y-6">
            <h1 className="text-8xl font-bold text-rose-400">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800">Oops! Page not found</h2>
            <p className="text-lg text-gray-600">
              The page you're looking for doesn't exist or may have been moved.
            </p>
          </div>
          
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="border-rose-200 text-rose-600 hover:bg-rose-50 min-h-[56px] px-8 py-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-rose-500 hover:bg-rose-600 text-white min-h-[56px] px-8 py-4"
            >
              <Home className="h-5 w-5 mr-2" />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
