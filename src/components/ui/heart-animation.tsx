
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface HeartAnimationProps {
  trigger: number;
  className?: string;
}

const HeartAnimation = ({ trigger, className = "" }: HeartAnimationProps) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (trigger > 0) {
      const newHearts = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      
      setHearts(newHearts);
      
      const timer = setTimeout(() => {
        setHearts([]);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-rose-500 animate-ping"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDuration: '1.5s',
            animationDelay: `${Math.random() * 0.5}s`,
          }}
          size={16}
        />
      ))}
    </div>
  );
};

export default HeartAnimation;
