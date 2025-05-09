"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { atmImg } from '@/staticData';

const ATMZone = () => {
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (transitioning) return;
    setTransitioning(true);
    
    setTimeout(() => {
      router.push('/atm-area');
    }, 2200); // Adjusted for this animation sequence
  };
  
  // Grid dimensions for the pixel effect
  const gridSize = { cols: 20, rows: 12 };
  
  return (
    <>
      {/* ATM component with floating animation */}
      <motion.div
        className="absolute left-[10%] bottom-[15%] cursor-pointer bg-black/10 rounded-2xl overflow-hidden"
        onClick={handleClick}
        animate={{ y: transitioning ? 0 : [0, -5, 0] }}
        transition={{ repeat: transitioning ? 0 : Infinity }}
        whileHover={!transitioning ? { scale: 1.05 } : {}}
      >
        <Image
          src={atmImg}
          alt="ATM"
          width={180}
          height={180}
          className="drop-shadow-lg"
        />
        <p className="text-white text-sm text-center mt-1">ATM Area</p>
      </motion.div>

      {/* Cinematic transition elements */}
      <AnimatePresence>
        {transitioning && (
          <>
            {/* Initial purple pulse from ATM */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 0.7, 0] }}
              transition={{ duration: 1, times: [0, 0.5, 1] }}
              className="absolute left-[10%] bottom-[15%] z-10 rounded-full w-40 h-40 -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'radial-gradient(circle, rgba(147,51,234,0.8) 0%, rgba(109,40,217,0.4) 40%, rgba(67,56,202,0) 70%)',
                boxShadow: '0 0 80px 20px rgba(147,51,234,0.7)'
              }}
            />

            {/* Digital pixelation effect - creates a grid of pixels that reveal and then fade */}
            <div className="absolute inset-0 flex flex-wrap z-20 pointer-events-none">
              {Array.from({ length: gridSize.cols * gridSize.rows }).map((_, i) => {
                const col = i % gridSize.cols;
                const row = Math.floor(i / gridSize.cols);
                
                // Calculate distance from ATM position (approx 10% from left, 15% from bottom)
                const atmPosX = 0.1;
                const atmPosY = 0.85;
                const posX = col / gridSize.cols;
                const posY = row / gridSize.rows;
                const distance = Math.sqrt(Math.pow(posX - atmPosX, 2) + Math.pow(posY - atmPosY, 2));
                
                // Use distance to determine animation delay - closer pixels animate first
                const delayBase = 0.5; // Base delay before pixels start animating
                const delayFactor = 1.5; // Higher means bigger spread in timing
                const delay = delayBase + distance * delayFactor;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0],
                      rotateY: [0, 90, 90, 0]
                    }}
                    transition={{ 
                      duration: 1.2,
                      delay: delay,
                      times: [0, 0.2, 0.8, 1]
                    }}
                    style={{
                      width: `${100 / gridSize.cols}%`,
                      height: `${100 / gridSize.rows}%`,
                      background: `rgba(${88 + Math.random() * 50}, ${30 + Math.random() * 40}, ${150 + Math.random() * 90}, ${0.7 + Math.random() * 0.3})`
                    }}
                  />
                );
              })}
            </div>

            {/* Digital circuit lines */}
            <svg 
              className="absolute inset-0 z-30 pointer-events-none w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const endX = Math.random() * 100;
                const endY = Math.random() * 100;
                const midX1 = startX + (endX - startX) * 0.33;
                const midY1 = startY + (endY - startY) * 0.33;
                const midX2 = startX + (endX - startX) * 0.66;
                const midY2 = startY + (endY - startY) * 0.66;
                
                return (
                  <motion.path
                    key={i}
                    d={`M ${startX} ${startY} L ${midX1} ${midY1} L ${midX2} ${midY2} L ${endX} ${endY}`}
                    stroke="rgba(216, 180, 254, 0.8)"
                    strokeWidth="0.3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.8 + (i * 0.1),
                      times: [0, 0.4, 0.8, 1]
                    }}
                  />
                );
              })}
            </svg>

            {/* ATM hologram effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 0], y: [20, 0, -20] }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
            >
              <div className="relative">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1, 0.95] }}
                  transition={{ repeat: 2, duration: 0.5 }}
                  className="absolute -inset-8 rounded-full bg-purple-500 opacity-20 blur-xl"
                />
                <div className="text-purple-100 text-3xl font-bold tracking-wider">
                  ATM SYSTEM
                </div>
                <div className="text-purple-200 text-sm text-center mt-2 opacity-80">
                  ACCESSING SECURE BANKING INTERFACE
                </div>
              </div>
            </motion.div>

            {/* Digital scan lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="absolute inset-0 z-40 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(139, 92, 246, 0.2) 2px, rgba(139, 92, 246, 0.2) 4px)',
                boxShadow: 'inset 0 0 50px 10px rgba(139, 92, 246, 0.5)'
              }}
            />

            {/* Final transition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.3 }}
              className="absolute inset-0 bg-purple-900 z-50 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ATMZone;