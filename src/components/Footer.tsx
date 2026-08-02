import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Footer: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - h;

      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <footer className="bg-cream text-charcoal py-32 px-4 md:px-12 flex flex-col items-center justify-center text-center relative border-t border-rosegold/30 overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-rosegold) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <span className="text-[11px] uppercase tracking-[0.4em] text-rosegold font-bold mb-8 relative z-10">The Art of Radiance</span>
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-16 relative z-10 leading-[0.9]">
        Let's Reveal Your <br/> <span className="italic text-rosegold">True Beauty</span>
      </h2>
      
      <div className="relative p-8 z-10">
        <div className="absolute inset-0 border border-rosegold/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-2 border border-rosegold/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        <button 
          ref={buttonRef}
          className="hover-target relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-full bg-charcoal text-cream flex items-center justify-center overflow-hidden group"
        >
          <span className="relative z-10 text-[11px] font-medium tracking-[0.2em] uppercase transition-transform duration-300 group-hover:scale-110">
            Book Appointment
          </span>
          {/* Ripple fill effect on hover */}
          <div className="absolute inset-0 bg-rosegold rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 origin-center ease-out z-0"></div>
        </button>
      </div>

      <div className="mt-32 w-full max-w-7xl border-t border-rosegold/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/60 relative z-10">
        <p>© 2026 Samiksha Beauty Studio</p>
        <div className="flex gap-8">
          <a href="https://www.instagram.com/samiksha_beauty_studio/?hl=en" target="_blank" rel="noopener noreferrer" className="hover-target hover:text-rosegold transition-colors">Instagram</a>
          <a href="#" className="hover-target hover:text-rosegold transition-colors">Facebook</a>
        </div>
      </div>
    </footer>
  );
};
