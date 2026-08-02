import React from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({ text, className = '', wordClassName = '' }) => {
  const words = text.split(' ');
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden pb-2 mr-[0.25em]">
          <span className={`inline-block word-span ${wordClassName}`}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};
