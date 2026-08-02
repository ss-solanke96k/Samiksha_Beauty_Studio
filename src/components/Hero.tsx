import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../utils/SplitText';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isReady: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isReady }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect
    if (heroRef.current && imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    // Entrance animation when preloader completes
    if (isReady && textRef.current) {
      const words = textRef.current.querySelectorAll('.word-span');
      gsap.fromTo(
        words,
        { y: "120%", opacity: 0, rotate: 5 },
        { 
          y: "0%", 
          opacity: 1, 
          rotate: 0,
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power4.out" 
        }
      );
      
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
      );
    }
  }, [isReady]);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full flex flex-col lg:flex-row bg-cream text-charcoal overflow-hidden pt-24 lg:pt-20">
      {/* Left: Content Pane */}
      <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-16 xl:p-24 flex flex-col justify-center lg:border-r border-rosegold/20 relative z-10">
        <p className="hero-subtitle text-[10px] sm:text-[11px] md:text-sm uppercase tracking-[0.4em] text-rosegold font-bold mb-6 opacity-0">
          Refined Elegance & Care
        </p>
        <div ref={textRef}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.95] mb-8 max-w-[min(100%,720px)]">
            <SplitText text="Samiksha" />
            <br />
            <span className="italic text-rosegold"><SplitText text="Beauty Studio" /></span>
          </h1>
        </div>
        <p className="text-sm md:text-base text-charcoal/60 max-w-full sm:max-w-[38rem] leading-relaxed mb-10">
          Experience the pinnacle of luxury grooming and wellness in a space designed for tranquility and high-end aesthetic transformations.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-12 h-[1px] bg-charcoal"></div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Explore Our Collections</span>
        </div>
      </div>

      {/* Right: Visual Pane */}
      <div className="w-full lg:w-1/2 relative bg-blush flex items-center justify-center p-6 md:p-8 lg:p-12 min-h-[55vh] lg:min-h-[50vh]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-rosegold) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Main Visual Container */}
        <div className="relative w-full h-full min-h-[320px] lg:min-h-[400px] max-h-[80vh] border border-rosegold/40 rounded-[80px] lg:rounded-[100px] overflow-hidden flex flex-col items-center justify-center group">
          <div className="absolute inset-4 border border-white/50 rounded-[80px] z-10 pointer-events-none"></div>
          <img 
            ref={imageRef}
            src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Beauty Studio"
            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover opacity-80"
          />
          <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/60 text-center z-20 absolute">
            <p className="font-serif italic text-2xl mb-2">Premium Care</p>
            <div className="h-[1px] w-12 bg-rosegold mx-auto my-3"></div>
            <p className="text-[10px] uppercase tracking-widest font-bold">Est. 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
};
