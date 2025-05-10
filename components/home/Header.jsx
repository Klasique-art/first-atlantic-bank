import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import confetti from "canvas-confetti";
import { ConfettiFall, Hero1 } from "..";

const Header = () => {
  const [fireConfetti, setFireConfetti] = useState(false);
  const imageRef = useRef(null);
  const heroRef = useRef(null);
  const hasExploded = useRef(false);
  const [hideImage, setHideImage] = useState(false);

  const handleScroll = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setFireConfetti(true);
    const timer = setTimeout(() => setFireConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (!hasExploded.current && imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const imageInView = rect.top < window.innerHeight;

        if (imageInView) {
          triggerExplosion();
          hasExploded.current = true;
        }
      }
    };

    const triggerExplosion = () => {
      const rect = imageRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // Launch confetti from image position
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x, y },
      });

      setHideImage(true);
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <>
      <section className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-4 bg-[var(--color-accent)] text-white">
        {/* Floating Gradient Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-3xl animate-float-slow z-0" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl animate-float-slower z-0" />

        {/* Confetti on load */}
        <ConfettiFall fire={fireConfetti} numberOfPieces={1000} recycle={fireConfetti} />

        {/* Trophy */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="z-10 flex items-center space-x-2 text-yellow-400 mb-4 text-lg md:text-xl"
        >
          <FaTrophy className="text-2xl md:text-3xl" />
          <span>2x Digital Bank of the Year Award Winner</span>
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

        {/* Logo (to "explode") */}
        {!hideImage && (
          <figure
            ref={imageRef}
            className="w-40 absolute bottom-20 right-10 rounded-2xl overflow-hidden z-20 transition-opacity duration-500"
          >
            <img src="/assets/logo.jpg" alt="FAB logo" />
          </figure>
        )}

        {/* CTA */}
        <motion.button
          onClick={handleScroll}
          className="mt-10 px-8 py-3 bg-gradient-to-r from-primary-100 to-primary text-secondary font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn more about FAB
        </motion.button>

        {/* Down Arrow */}
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
