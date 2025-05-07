import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { SparklesCore, ConfettiFall, Hero1 } from "..";
import { FaTrophy } from "react-icons/fa";

const Header = () => {
  const [fireConfetti, setFireConfetti] = useState(false);
  const heroRef = useRef(null);

  const handleScroll = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setFireConfetti(true);
    const stopRecycle = setTimeout(() => {
      setFireConfetti(false);
    }, 3000);

    return () => clearTimeout(stopRecycle);
  }, []);

  return (
    <>
      <section className="h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-4 bg-[var(--color-accent)] text-white">
        {/* Background Sparkles */}
        <SparklesCore className="absolute inset-0 z-0" />

        {/* Floating Gradient Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-3xl animate-float-slow z-0" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl animate-float-slower z-0" />

        {/* Confetti */}
        <ConfettiFall fire={fireConfetti} numberOfPieces={1000} recycle={fireConfetti} />

        {/* Award Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="z-10 flex items-center space-x-2 text-yellow-400 mb-4 text-lg md:text-xl"
        >
          <FaTrophy className="text-2xl md:text-3xl" />
          <span>2025 Award Winner</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold glassmorphic-text relative z-10 max-w-4xl leading-tight"
        >
          Celebrating 2× Digital Bank of the Year
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-base md:text-lg max-w-2xl text-white/80 z-10"
        >
          Recognized for innovation and customer experience.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleScroll}
          className="mt-10 px-8 py-3 bg-gradient-to-r from-primary-100 to-primary text-secondary font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Take the Tour
        </motion.button>

        {/* Down arrow indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 z-10 text-white/70"
        >
          ↓
        </motion.div>
      </section>

      <Hero1 heroRef={heroRef} />
    </>
  );
};

export default Header;
