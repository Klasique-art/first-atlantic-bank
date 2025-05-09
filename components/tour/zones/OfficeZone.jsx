"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { officeImg } from '@/staticData';
import { useRouter } from 'next/navigation';

const OfficeZone = () => {
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (transitioning) return;
    setTransitioning(true);
    
    setTimeout(() => {
      router.push('/customer-service');
    }, 2000); 
  };

  // Number of panels for the shutter effect
  const panels = 12;
  
  return (
    <>
      {/* The office component with floating animation */}
      <motion.div
        className="absolute right-[10%] bottom-[15%] cursor-pointer bg-black/20 rounded-2xl overflow-hidden"
        onClick={handleClick}
        animate={{ y: transitioning ? 0 : [0, -5, 0] }}
        transition={{ repeat: transitioning ? 0 : Infinity, delay: 1.5, repeatDelay: 1 }}
        whileHover={!transitioning ? { scale: 1.05 } : {}}
      >
        <Image
          src={officeImg}
          alt="Office"
          width={180}
          height={180}
          className="drop-shadow-lg"
        />
        <p className="text-white text-sm text-center mt-1">Customer service</p>
      </motion.div>

      {/* Cinematic transition elements */}
      <AnimatePresence>
        {transitioning && (
          <>
            {/* Golden light rays emanating from the button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.5, times: [0, 0.3, 1] }}
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 90% 85%, rgba(90, 27, 76,0.7) 0%, rgba(78, 22, 66, 0.2) 30%, transparent 70%)'
              }}
            />

            {/* Venetian blinds/shutter effect */}
            <div className="absolute inset-0 z-20 flex flex-col pointer-events-none overflow-hidden">
              {Array.from({ length: panels }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + (i * 0.03),
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  className="w-full bg-primary-100"
                  style={{ 
                    height: `${100/panels}%`,
                    transformOrigin: i % 2 === 0 ? 'left' : 'right',
                    opacity: 0.95 - (i * 0.02)
                  }}
                />
              ))}
            </div>

            {/* Customer service icon appearance */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: [0, 1, 0] }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8,
                times: [0, 0.5, 1],
                ease: "easeOut" 
              }}
              className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            >
              <div className="relative w-32 h-32 text-primary">
                {/* Simple customer service icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10V8A8 8 0 1 0 4 8v2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v-8H4v4h2a6 6 0 0 0 12 0h2v-4h-2v8h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM12 18a4 4 0 0 1-4-4h8a4 4 0 0 1-4 4zm6-10h-2V8a6 6 0 1 0-12 0v0H6V8a4 4 0 1 1 8 0v0h-2v0a2 2 0 0 0-4 0v0h8z"/>
                </svg>
              </div>
            </motion.div>

            {/* Typewriter text effect */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              <div className="bg-amber-50 px-8 py-4 rounded shadow-lg">
                <motion.h2
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="text-amber-900 text-xl font-semibold overflow-hidden whitespace-nowrap"
                  style={{ 
                    borderRight: "3px solid #b45309",
                    display: "inline-block"
                  }}
                >
                  Welcome to Customer Service
                </motion.h2>
              </div>
            </motion.div>

            {/* Final fade out */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.3 }}
              className="absolute inset-0 bg-amber-50 z-50 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfficeZone;