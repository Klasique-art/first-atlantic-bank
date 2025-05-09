"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { deskImg } from "@/staticData";
import { useRouter } from 'next/navigation';

const DeskZone = () => {
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (transitioning) return;
    setTransitioning(true);

    setTimeout(() => {
      router.push('/loan-area');
    }, 1800); // Extended time for the full animation sequence
  };

  return (
    <>
      {/* The desk component with floating animation */}
      <motion.div
        animate={{ y: transitioning ? 0 : [0, -5, 0] }}
        transition={{ 
          repeat: transitioning ? 0 : Infinity, 
          delay: 1, 
          repeatDelay: 0.5 
        }}
        className="absolute left-[45%] top-[15%] cursor-pointer bg-black/50 rounded-2xl overflow-hidden"
        onClick={handleClick}
        whileHover={!transitioning ? { scale: 1.05 } : {}}
      >
        <Image
          src={deskImg}
          alt="Desk"
          width={180}
          height={180}
          className="drop-shadow-lg"
        />
        <p className="text-white text-sm text-center mt-1 uppercase">Loan</p>
      </motion.div>

      {/* Cinematic transition elements */}
      <AnimatePresence>
        {transitioning && (
          <>
            {/* Circular reveal effect */}
            <motion.div
              initial={{ scale: 0, borderRadius: "100%" }}
              animate={{ 
                scale: 50,
                borderRadius: "0%",
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              className="absolute left-[45%] top-[15%] bg-primary/90 z-10 w-12 h-12 origin-center"
              style={{ translateX: "-50%", translateY: "-50%" }}
            />

            {/* Text flyby effect */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.h1
                initial={{ x: -1000 }}
                animate={{ x: 1000 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="text-4xl font-bold text-white tracking-widest"
              >
                LOAN DEPARTMENT
              </motion.h1>
            </motion.div>

            {/* Light flare effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 1,
                delay: 0.7,
                times: [0, 0.2, 1]
              }}
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 45% 15%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)'
              }}
            />

            {/* Final fade to black */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute inset-0 bg-black z-30 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeskZone;