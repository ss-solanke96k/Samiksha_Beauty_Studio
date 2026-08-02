import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/gallery-5.png",
  "/gallery-1.png",
  "/gallery-8.png",
  "/gallery-2.png",
  "/gallery-4.png",
  "/gallery-7.png",
  "/gallery-3.png",
  "/gallery-6.png",
];

export const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollContainer = scrollContainerRef.current;
      if (!sectionRef.current || !scrollContainer) return;

      const totalScroll = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-charcoal text-cream py-24 lg:py-0 lg:h-screen flex flex-col justify-center relative">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(var(--color-rosegold) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="px-4 md:px-12 mb-12 lg:absolute lg:top-24 lg:left-0 z-10 w-full pointer-events-none">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-rosegold"></div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-rosegold font-bold">Curated Collections</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif italic">Portfolio</h2>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 md:gap-12 px-4 md:px-12 lg:w-max lg:flex-nowrap flex-wrap relative z-10"
      >
        {images.map((src, idx) => (
          <div 
            key={idx} 
            className="w-[calc(100vw-2rem)] md:w-[400px] lg:w-[30vw] h-[60vh] lg:h-[60vh] shrink-0 overflow-hidden group hover-target border p-2 border-white/10 rounded-[40px]"
          >
            <div className="w-full h-full rounded-[30px] overflow-hidden relative">
              <img 
                src={src} 
                alt={`Gallery ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
