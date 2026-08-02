import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Bridal Makeup',
    description: 'Bespoke bridal artistry ensuring you look radiant on your special day.',
    image: 'https://images.unsplash.com/photo-1595039572979-5db46b108502?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'Hair Styling',
    description: 'Precision cuts, coloring, and styling tailored to your unique features.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'Skincare',
    description: 'Rejuvenating treatments restoring your skin\'s natural glow and vitality.',
    image: 'https://images.unsplash.com/photo-1615397323145-12b23a9a20d2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '04',
    title: 'Everyday Glam',
    description: 'Subtle yet striking makeup for your everyday professional and social life.',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop'
  }
];

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeImage, setActiveImage] = useState(services[0].image);

  useEffect(() => {
    // Staggered entry
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Simplified animation for mobile
      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  const handleMouseEnter = (image: string) => {
    setActiveImage(image);
    
    // Clip-path inset animation
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: 'power3.inOut' }
      );
    }
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-4 md:px-12 max-w-7xl mx-auto bg-cream">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* Services List */}
        <div className="w-full md:w-1/2 flex flex-col gap-0 border-t border-charcoal/20">
          <div className="py-8">
            <span className="text-[11px] uppercase tracking-[0.4em] text-rosegold font-bold mb-4 block">The Art of Radiance</span>
            <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-4 italic">Our Services</h2>
          </div>
          {services.map((service, index) => (
            <div 
              key={service.id}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group cursor-none border-b border-charcoal/20 py-8 hover-target flex flex-col justify-between hover:bg-rosegold/10 transition-colors px-6"
              onMouseEnter={() => handleMouseEnter(service.image)}
            >
              <div className="flex items-baseline gap-6 mb-4">
                <span className="text-[10px] font-mono opacity-50 text-rosegold">{service.id}</span>
                <h3 className="text-2xl md:text-3xl font-serif text-charcoal group-hover:italic transition-all">{service.title}</h3>
              </div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-charcoal/60 pl-10 max-w-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Hover Image Display */}
        <div className="hidden md:block w-full md:w-1/2 relative h-[700px]">
          <div className="sticky top-24 w-full h-full p-6">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-rosegold) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="w-full h-full border border-rosegold/40 rounded-t-[200px] rounded-b-xl overflow-hidden relative bg-blush p-4 flex flex-col items-center justify-center">
              <div className="w-full h-full border border-white/50 rounded-t-[180px] rounded-b-lg overflow-hidden relative bg-white">
                <div ref={imageContainerRef} className="w-full h-full absolute inset-0">
                  <img 
                    ref={imageRef}
                    src={activeImage} 
                    alt="Service" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
