
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface HeartAnimationProps {
  trigger: number;
  className?: string;
}

const HeartAnimation = ({ trigger, className = "" }: HeartAnimationProps) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    if (trigger > 0) {
      console.log("Hearts animation triggered:", trigger); // Debug log
      
      const newHearts = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: 20 + Math.random() * 60, // More centered distribution
        y: 20 + Math.random() * 60,
        delay: Math.random() * 0.8, // Stagger the animations
      }));
      
      setHearts(newHearts);
      
      const timer = setTimeout(() => {
        setHearts([]);
      }, 3000); // Longer duration
      
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-rose-500 animate-ping drop-shadow-lg"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDuration: '2s',
            animationDelay: `${heart.delay}s`,
            transform: 'scale(1.2)', // Make hearts bigger
          }}
          size={20}
          fill="currentColor"
        />
      ))}
    </div>
  );
};

export default HeartAnimation;
