import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const TypingText = ({ text }) => {
  const [startTyping, setStartTyping] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once when it comes into view
    threshold: 0.2, // Adjust the threshold if needed (e.g., when 20% is visible)
  });

  // Trigger typing animation when the element is in view
  useEffect(() => {
    if (inView) {
      setStartTyping(true);
    }
  }, [inView]);

  return (
    <h1
      ref={ref}
      className="text-3xl uppercase font-extrabold mb-8"
    >
      <span className={`typing ${startTyping ? 'start' : ''}`}>
        {text}
      </span>
    </h1>
  );
};

export default TypingText;
