import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import gsap from 'gsap';
import preloaderData from '../assets/preloader.json';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Artificial delay to show preloader then animate out
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
      delay: 2 // Show lottie for a bit
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-blush"
    >
      <div className="w-32 h-32 opacity-80">
        <Lottie animationData={preloaderData} loop={true} />
      </div>
    </div>
  );
};
