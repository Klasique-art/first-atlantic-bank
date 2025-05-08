import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const Level6 = ({ onNext }) => {
  const [windowSize, setWindowSize] = useState({ width: 300, height: 300 });
  const [clicks, setClicks] = useState([]);
  const [easterEgg, setEasterEgg] = useState(false);
  const easterTimeout = useRef(null);

  // Get viewport size for confetti
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-80 overflow-hidden px-4 text-center glass rounded-2xl">
      {/* Confetti 🎉 */}
      <Confetti width={windowSize.width} height={windowSize.height} recycle={!easterEgg} />

      {/* Main Text */}
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 1 }}
        className="text-4xl font-bold mb-4 text-white"
      >
        Transaction Complete!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg text-white max-w-xl"
      >
        Digital banking made fun and easy. <br /> That’s <strong>First Atlantic Bank</strong>.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        href="https://github.com/your-github-or-portfolio"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="mt-6 px-8 py-3 bg-primary text-white rounded-xl font-semibold shadow-md transition"
      >
        Done
      </motion.button>

    </div>
  );
};

export default Level6;
