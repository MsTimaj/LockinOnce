
import { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    console.log('Assessment component mounted - scrolling to top (mobile optimized)');
    
    const scrollToTop = () => {
      // Primary scroll method
      window.scrollTo(0, 0);
      
      // Backup methods for mobile browsers
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };

    // Execute immediately
    scrollToTop();
    
    // Execute after React renders
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 0);
    
    // Cleanup timeout
    return () => clearTimeout(timeoutId);
  }, []);
};
