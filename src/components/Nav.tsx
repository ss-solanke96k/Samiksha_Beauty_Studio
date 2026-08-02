import React, { useState } from 'react';

export const Nav: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <nav className="h-20 md:h-24 w-full flex items-center justify-between px-4 md:px-12 border-b border-rosegold/30 fixed top-0 left-0 z-50 bg-cream/90 backdrop-blur-md text-charcoal">
      <div className="hidden md:flex gap-6 md:gap-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium opacity-70">
        <a href="#" className="hover-target hover:text-rosegold transition-colors">Services</a>
        <a href="#" className="hover-target hover:text-rosegold transition-colors">Portfolio</a>
      </div>
      <div className="text-center flex-1 md:flex-none flex justify-center items-center">
        <a href="#" className="hover-target flex flex-col items-center justify-center">
          {!imgError ? (
            <img 
              src="/logo.png" 
              alt="Samiksha Beauty Studio" 
              className="h-16 w-auto object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <>
              <h1 className="font-serif text-2xl tracking-tighter italic">Samiksha</h1>
              <p className="text-[9px] uppercase tracking-[0.4em] -mt-1 text-rosegold font-bold">Beauty Studio</p>
            </>
          )}
        </a>
      </div>
      <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] font-medium items-center">
        <a href="#" className="hidden md:block hover-target opacity-70 hover:text-rosegold transition-colors">About</a>
        <a href="#" className="hover-target bg-charcoal text-cream px-6 py-2 rounded-full hover:bg-rosegold hover:text-white transition-colors">Book Now</a>
      </div>
    </nav>
  );
};

