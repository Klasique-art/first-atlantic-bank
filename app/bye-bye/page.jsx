'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ByeScreen = () => {
  const router = useRouter();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [particles, setParticles] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const containerRef = useRef(null);
  
  // Generate initial confetti particles
  useEffect(() => {
    // Create money notes and coins
    const generateParticles = () => {
      const newParticles = [];
      
      // Generate 100 money particles (increased from 60)
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          id: `particle-${i}`,
          x: Math.random() * 100, // Random starting position (percentage of screen width)
          y: -20 - Math.random() * 40, // Start above the screen at random heights
          scale: 0.5 + Math.random() * 1.5,
          rotation: Math.random() * 360,
          duration: 5 + Math.random() * 10,
          delay: Math.random() * 5, // More varied delays
          type: Math.random() > 0.5 ? 'note' : 'coin',
          variant: Math.floor(Math.random() * 3), // Different variants for visual interest
          horizontalMovement: Math.sin(Math.random() * Math.PI * 2) * 20 // Random sinusoidal horizontal movement
        });
      }
      
      setParticles(newParticles);
    };
    
    // Generate animated characters representing banking, finance, and Ghana
    const generateCharacters = () => {
      const characterTypes = [
        { type: 'banker', x: 15, scale: 1.2, delay: 0.5 },
        { type: 'customer', x: 85, scale: 1.2, delay: 0.8 },
        { type: 'kente', x: 35, scale: 0.9, delay: 1.2 },
        { type: 'adinkra', x: 65, scale: 0.9, delay: 1.5 },
        { type: 'bank', x: 50, scale: 1.4, delay: 0.2 }
      ];
      
      setCharacters(characterTypes);
    };
    
    // Generate floating bank-related icons
    const generateFloatingElements = () => {
      const elements = [];
      const iconTypes = ['credit-card', 'safe', 'mobile-banking', 'atm', 'savings', 'loan', 'banking', 'investment'];
      
      for (let i = 0; i < 15; i++) {
        elements.push({
          id: `floating-${i}`,
          type: iconTypes[Math.floor(Math.random() * iconTypes.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          scale: 0.5 + Math.random() * 0.5,
          rotation: Math.random() * 360,
          duration: 10 + Math.random() * 20,
          delay: Math.random() * 10
        });
      }
      
      setFloatingElements(elements);
    };
    
    // Generate sparkles effect
    const generateSparkles = () => {
      const newSparkles = [];
      for (let i = 0; i < 30; i++) {
        newSparkles.push({
          id: `sparkle-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 3 + Math.random() * 7,
          duration: 2 + Math.random() * 3,
          delay: Math.random() * 15
        });
      }
      setSparkles(newSparkles);
    };
    
    generateParticles();
    generateCharacters();
    generateFloatingElements();
    generateSparkles();
    
    // Show the home button after animations play
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      setTimeout(() => setShowButton(true), 1000);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to render bank-related icons
  const renderBankIcon = (type) => {
    switch (type) {
      case 'credit-card':
        return (
          <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-md flex flex-col justify-center items-center p-1">
            <div className="w-full h-2 bg-yellow-400 rounded-sm mt-1"></div>
            <div className="w-3/4 h-1 bg-gray-300 rounded-sm mt-1 self-end"></div>
          </div>
        );
      case 'safe':
        return (
          <div className="w-10 h-10 bg-gray-700 rounded-md flex justify-center items-center border-2 border-gray-500">
            <div className="w-6 h-6 rounded-full bg-gray-800 flex justify-center items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        );
      case 'mobile-banking':
        return (
          <div className="w-8 h-12 bg-black rounded-lg p-1 flex flex-col items-center border border-gray-700">
            <div className="w-full h-5 bg-blue-500 rounded-sm"></div>
            <div className="w-3/4 h-1 bg-green-400 rounded-sm mt-1"></div>
            <div className="w-3/4 h-1 bg-purple-400 rounded-sm mt-1"></div>
            <div className="flex justify-center mt-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        );
      case 'atm':
        return (
          <div className="w-12 h-14 bg-purple-800 rounded-md flex flex-col items-center p-1">
            <div className="w-8 h-4 bg-blue-200 rounded-sm"></div>
            <div className="w-full flex justify-around mt-1">
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="w-1 h-1 bg-red-400 rounded-full"></div>
              <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="w-6 h-1 bg-gray-300 rounded-sm mt-1"></div>
            <div className="w-4 h-3 bg-black rounded-b-sm mt-1"></div>
          </div>
        );
      case 'savings':
        return (
          <div className="w-10 h-10 bg-green-600 rounded-full flex justify-center items-center">
            <div className="text-white font-bold text-sm">GH₵</div>
          </div>
        );
      case 'loan':
        return (
          <div className="w-12 h-8 bg-yellow-600 rounded-md flex justify-center items-center p-1">
            <div className="text-white text-xs font-bold">LOAN</div>
          </div>
        );
      case 'banking':
        return (
          <div className="w-12 h-12 bg-indigo-800 rounded-md flex flex-col justify-center items-center">
            <div className="w-8 h-6 bg-gray-200 rounded-t-lg"></div>
            <div className="w-10 h-1 bg-gray-300 -mt-1"></div>
            <div className="w-12 h-4 bg-indigo-900 flex justify-center items-center">
              <span className="text-white text-xs">BANK</span>
            </div>
          </div>
        );
      case 'investment':
        return (
          <div className="w-10 h-10 bg-blue-700 rounded-md flex justify-center items-center p-1">
            <motion.div 
              className="w-8 h-5"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-full h-full flex items-end">
                <div className="w-1/4 h-1/4 bg-green-400"></div>
                <div className="w-1/4 h-2/4 bg-green-400"></div>
                <div className="w-1/4 h-3/4 bg-green-400"></div>
                <div className="w-1/4 h-full bg-green-400"></div>
              </div>
            </motion.div>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-purple-600 rounded-full flex justify-center items-center">
            <div className="text-white font-bold text-sm">FAB</div>
          </div>
        );
    }
  };
  
  // Random pulsing circles animation
  const renderPulsingCircles = () => {
    return [...Array(8)].map((_, i) => (
      <motion.div
        key={`pulse-circle-${i}`}
        className="absolute rounded-full opacity-0"
        style={{
          top: `${20 + Math.random() * 60}%`,
          left: `${20 + Math.random() * 60}%`,
          backgroundColor: [
            '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', 
            '#3b82f6', '#ef4444', '#14b8a6', '#8b5cf6'
          ][i % 8],
          width: `${30 + Math.random() * 100}px`,
          height: `${30 + Math.random() * 100}px`,
        }}
        animate={{
          scale: [0, 1, 1.5, 0],
          opacity: [0, 0.2, 0.1, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          repeatDelay: Math.random() * 5,
          delay: Math.random() * 5,
        }}
      />
    ));
  };
  
  // Spotlight effect
  const renderSpotlights = () => {
    return [...Array(3)].map((_, i) => (
      <motion.div
        key={`spotlight-${i}`}
        className="absolute w-24 h-80 opacity-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
          top: '-100px',
          left: `${(i * 30) + 20}%`,
          transformOrigin: 'center',
          transform: 'rotate(30deg)',
        }}
        animate={{
          left: [`${(i * 30) + 20}%`, `${(i * 30) + 30}%`, `${(i * 30) + 20}%`],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: i * 2,
        }}
      />
    ));
  };

  // Flying First Atlantic Bank logos
  const renderFlyingLogos = () => {
    return [...Array(5)].map((_, i) => (
      <motion.div
        key={`flying-logo-${i}`}
        className="absolute"
        style={{
          top: `${Math.random() * 80}%`,
          left: `-50px`,
        }}
        animate={{
          left: ['-50px', '110%'],
          y: [0, Math.sin(Math.random() * Math.PI) * 100, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          delay: i * 3 + Math.random() * 5,
        }}
      >
        <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
          <div className="text-white font-bold text-xl">FA</div>
        </div>
      </motion.div>
    ));
  };
  
  // Wave effect background animation
  const renderWaveEffect = () => {
    return [...Array(3)].map((_, i) => (
      <motion.div
        key={`wave-${i}`}
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${50 + (i * 10)}% ${50 - (i * 10)}%, rgba(139, 92, 246, 0.8) 0%, rgba(30, 64, 175, 0) 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: i * 2,
        }}
      />
    ));
  };
  
  // Rising bubbles effect
  const renderRisingBubbles = () => {
    return [...Array(15)].map((_, i) => (
      <motion.div
        key={`bubble-${i}`}
        className="absolute rounded-full"
        style={{
          bottom: '-20px',
          left: `${Math.random() * 100}%`,
          width: `${5 + Math.random() * 15}px`,
          height: `${5 + Math.random() * 15}px`,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
        }}
        animate={{
          y: [0, -600 - Math.random() * 400],
          x: [0, Math.sin(Math.random() * Math.PI * 2) * 100],
          opacity: [0, 0.6, 0],
          scale: [0.5, 1, 0.8],
        }}
        transition={{
          duration: 10 + Math.random() * 15,
          repeat: Infinity,
          delay: Math.random() * 20,
        }}
      />
    ));
  };
  
  // Fireworks effect
  const createFireworks = () => {
    if (!animationComplete) return null;
    
    return [...Array(5)].map((_, fireworkIndex) => {
      // Starting position for the firework
      const startX = 20 + Math.random() * 60; // % of screen width
      const startY = 70 + Math.random() * 20; // % of screen height
      const particles = 12 + Math.floor(Math.random() * 8); // 12-20 particles per firework
      const hue = Math.floor(Math.random() * 360); // Random HSL color
      const delay = fireworkIndex * 1.5 + Math.random() * 8; // Staggered firework launch
      
      return (
        <motion.div 
          key={`firework-${fireworkIndex}`} 
          className="absolute"
          initial={{ opacity: 0, x: `${startX}%`, y: '100%' }}
          animate={{
            opacity: [0, 1, 0],
            y: ['100%', `${startY}%`],
          }}
          transition={{
            duration: 0.8,
            delay: delay,
            repeat: Infinity,
            repeatDelay: 12 + Math.random() * 8
          }}
        >
          {/* Firework explosion particles */}
          {[...Array(particles)].map((_, i) => {
            const angle = (i / particles) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            
            return (
              <motion.div
                key={`spark-${fireworkIndex}-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: `hsl(${hue}, 100%, 70%)`,
                  boxShadow: `0 0 8px 1px hsl(${hue}, 100%, 70%)`,
                }}
                initial={{ scale: 0 }}
                animate={{
                  x: [0, Math.cos(angle) * distance],
                  y: [0, Math.sin(angle) * distance],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: delay + 0.8, // Start after the firework "launches"
                  repeat: Infinity,
                  repeatDelay: 12 + Math.random() * 8
                }}
              />
            );
          })}
        </motion.div>
      );
    });
  };
  
  // Animated background gradient
  const renderAnimatedGradient = () => (
    <motion.div 
      className="absolute inset-0 -z-10 opacity-30"
      animate={{
        background: [
          'radial-gradient(circle at 30% 20%, rgba(124, 58, 237, 0.5) 0%, rgba(31, 41, 55, 0) 40%)',
          'radial-gradient(circle at 70% 60%, rgba(124, 58, 237, 0.5) 0%, rgba(31, 41, 55, 0) 40%)',
          'radial-gradient(circle at 40% 80%, rgba(124, 58, 237, 0.5) 0%, rgba(31, 41, 55, 0) 40%)',
          'radial-gradient(circle at 60% 30%, rgba(124, 58, 237, 0.5) 0%, rgba(31, 41, 55, 0) 40%)',
          'radial-gradient(circle at 30% 20%, rgba(124, 58, 237, 0.5) 0%, rgba(31, 41, 55, 0) 40%)',
        ]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
  
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-900 to-purple-800" ref={containerRef}>
      {/* Animated background gradient */}
      {renderAnimatedGradient()}
      
      {/* Radial background glow with pulsing effect */}
      <div className="absolute inset-0 bg-black/30">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] rounded-full bg-purple-500/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      {/* Wave effect animation */}
      {renderWaveEffect()}
      
      {/* Rising bubbles animation */}
      {renderRisingBubbles()}
      
      {/* Spotlight effects */}
      {renderSpotlights()}
      
      {/* Random pulsing circles */}
      {renderPulsingCircles()}
      
      {/* Fireworks effect */}
      {createFireworks()}
      
      {/* Flying First Atlantic Bank logos */}
      {renderFlyingLogos()}
      
      {/* Animated patterns inspired by Ghanaian adinkra symbols with enhanced randomness */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(30)].map((_, i) => (
            <div 
              key={`pattern-${i}`}
              className="absolute opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 2})`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1.2, 0],
                  rotate: [0, 90, 180, 270],
                  borderColor: i % 3 === 0 ? 
                    ['#c4b5fd', '#818cf8', '#c4b5fd'] : 
                    i % 3 === 1 ? 
                    ['#fde68a', '#f59e0b', '#fde68a'] : 
                    ['#bfdbfe', '#60a5fa', '#bfdbfe']
                }}
                transition={{
                  duration: 15 + Math.random() * 20,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="w-24 h-24 border-4 rounded-full"
                style={{
                  borderRadius: i % 4 === 0 ? '50%' : i % 4 === 1 ? '38% 62% 63% 37% / 41% 44% 56% 59%' : i % 4 === 2 ? '50% 50% 33% 67% / 58% 42% 58% 42%' : '50% 80% 67% 33% / 58% 42% 58% 42%'
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Floating bank-related icons */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute pointer-events-none"
          initial={{ 
            x: `${element.x}vw`, 
            y: `${element.y}vh`, 
            rotate: element.rotation,
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            scale: [0, element.scale, element.scale, 0],
            opacity: [0, 0.7, 0.7, 0],
            rotate: [element.rotation, element.rotation + (Math.random() > 0.5 ? 180 : -180)],
          }}
          transition={{ 
            duration: element.duration, 
            delay: element.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 5 + 5,
          }}
        >
          {renderBankIcon(element.type)}
        </motion.div>
      ))}
      
      {/* Sparkles effect */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            x: `${sparkle.x}vw`,
            y: `${sparkle.y}vh`,
            boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)'
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 10,
            delay: sparkle.delay
          }}
        />
      ))}
      
      {/* Flying money particles with enhanced animations */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          initial={{ 
            x: `${particle.x}vw`, 
            y: `${particle.y}vh`, 
            rotate: particle.rotation,
            scale: 0
          }}
          animate={{ 
            x: [`${particle.x}vw`, `${particle.x + particle.horizontalMovement}vw`, `${particle.x + (Math.random() * 60 - 30)}vw`],
            y: [`${particle.y}vh`, '50vh', '120vh'],
            rotate: [particle.rotation, particle.rotation + (Math.random() > 0.5 ? 720 : -720)],
            scale: [0, particle.scale, particle.scale, particle.scale * 0.8]
          }}
          transition={{ 
            duration: particle.duration, 
            delay: particle.delay,
            ease: [0.1, 0.4, 0.7, 1],
            times: [0, 0.2, 0.8, 1]
          }}
        >
          {particle.type === 'note' ? (
            // Ghana Cedi notes with improved visual effects
            <motion.div 
              className={`relative rounded-md shadow-lg ${
                particle.variant === 0 ? 'bg-purple-600' : 
                particle.variant === 1 ? 'bg-green-600' : 'bg-blue-600'
              }`} 
              style={{ width: '40px', height: '20px' }}
              whileInView={{ 
                boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)'] 
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="absolute inset-1 rounded border border-white/30 flex items-center justify-center">
                <div className="text-xs font-bold text-white">GH₵</div>
              </div>
              <motion.div 
                className="absolute inset-0 bg-white opacity-0"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
          ) : (
            // Ghana Cedi coins with spinning effect
            <motion.div 
              className={`rounded-full flex items-center justify-center ${
                particle.variant === 0 ? 'bg-yellow-500' : 
                particle.variant === 1 ? 'bg-gray-300' : 'bg-yellow-600'
              }`} 
              style={{ width: '20px', height: '20px' }}
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="rounded-full border-2 border-white/30 w-4/5 h-4/5 flex items-center justify-center">
                <div className="text-[6px] font-bold text-white">GH₵</div>
              </div>
              <motion.div 
                className="absolute inset-0 rounded-full bg-white opacity-0"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
            </motion.div>
          )}
        </motion.div>
      ))}
      
      {/* Animated characters with more dynamic movements */}
      {characters.map((character) => (
        <motion.div
          key={character.type}
          className="absolute bottom-10"
          initial={{ y: 300, x: `${character.x}vw`, opacity: 0, scale: 0 }}
          animate={{ 
            y: [300, 0, 20, 0, 10, 0], 
            opacity: 1, 
            scale: character.scale,
            x: [`${character.x}vw`, `${character.x + (Math.random() * 6 - 3)}vw`],
          }}
          transition={{ 
            duration: 3,
            delay: character.delay,
            ease: "easeOut",
            times: [0, 0.6, 0.7, 0.8, 0.9, 1],
            x: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          {character.type === 'banker' && (
            <div className="relative w-32 h-48">
              {/* Banker character with enhanced animations */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
                {/* Head with blinking eyes */}
                <div className="relative z-20">
                  <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center">
                    <div className="w-12 h-5 bg-amber-800 rounded-full absolute bottom-3"></div>
                    <motion.div 
                      className="w-2 h-2 bg-white rounded-full absolute top-5 left-4"
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 1 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-white rounded-full absolute top-5 right-4"
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 1 }}
/>
                    <div className="w-3 h-1 bg-amber-900 rounded-full absolute bottom-5 left-6"></div>
                  </div>
                </div>
                
                {/* Body with suit */}
                <div className="w-20 h-28 bg-gray-800 rounded-lg relative -mt-4">
                  {/* Suit collar */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-r-[10px] border-t-white border-r-transparent"></div>
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[15px] border-l-[10px] border-t-white border-l-transparent"></div>
                  
                  {/* Tie with animation */}
                  <motion.div 
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-red-600"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  ></motion.div>
                  
                  {/* Arms with movement */}
                  <motion.div 
                    className="absolute -left-10 top-8 w-10 h-4 bg-gray-800 rounded-full origin-right"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  ></motion.div>
                  <motion.div 
                    className="absolute -right-10 top-8 w-10 h-4 bg-gray-800 rounded-full origin-left"
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  ></motion.div>
                  
                  {/* Badge */}
                  <div className="absolute top-2 right-2 w-5 h-3 bg-yellow-400 rounded-sm flex items-center justify-center">
                    <div className="text-black text-[5px] font-bold">FA</div>
                  </div>
                </div>
                
                {/* Legs */}
                <div className="flex space-x-2">
                  <motion.div 
                    className="w-5 h-12 bg-gray-700 rounded-b-lg"
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <motion.div 
                    className="w-5 h-12 bg-gray-700 rounded-b-lg"
                    animate={{ rotate: [3, -3, 3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </div>
              </div>
            </div>
          )}
          
          {character.type === 'customer' && (
            <div className="relative w-28 h-44">
              {/* Customer character with animations */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
                {/* Head with blinking eyes */}
                <div className="relative z-20">
                  <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center">
                    <motion.div 
                      className="w-2 h-2 bg-white rounded-full absolute top-4 left-3"
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, delay: 1.5 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-white rounded-full absolute top-4 right-3"
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, delay: 1.5 }}
                    />
                    <div className="w-4 h-1 bg-amber-800 rounded-full absolute bottom-3"></div>
                    {/* Smiling mouth with animation */}
                    <motion.div 
                      className="w-6 h-2 border-b-2 border-amber-800 rounded-b-full absolute bottom-3"
                      animate={{ scaleY: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  </div>
                </div>
                
                {/* Body */}
                <div className="w-18 h-24 bg-blue-500 rounded-lg relative -mt-3">
                  {/* Neck */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-amber-600 rounded-t-lg"></div>
                  
                  {/* Pattern */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-6 left-0 w-full h-4 bg-blue-600"></div>
                    <div className="absolute top-14 left-0 w-full h-4 bg-blue-600"></div>
                  </div>
                  
                  {/* Arms with movement */}
                  <motion.div 
                    className="absolute -left-8 top-6 w-8 h-4 bg-blue-500 rounded-full origin-right"
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  ></motion.div>
                  <motion.div 
                    className="absolute -right-8 top-6 w-8 h-4 bg-blue-500 rounded-full origin-left"
                    animate={{ rotate: [10, -10, 10] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  ></motion.div>
                </div>
                
                {/* Legs */}
                <div className="flex space-x-1">
                  <motion.div 
                    className="w-4 h-10 bg-amber-800 rounded-b-lg"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <motion.div 
                    className="w-4 h-10 bg-amber-800 rounded-b-lg"
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </div>
              </div>
            </div>
          )}
          
          {character.type === 'kente' && (
            <div className="relative w-24 h-32">
              {/* Kente cloth pattern with animations */}
              <motion.div 
                className="w-full h-full grid grid-cols-4 grid-rows-5 gap-1 opacity-80"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [-1, 1, -1] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={`kente-${i}`} 
                    className={`${
                      i % 4 === 0 ? 'bg-yellow-500' : 
                      i % 4 === 1 ? 'bg-green-600' : 
                      i % 4 === 2 ? 'bg-red-600' : 
                      'bg-black'
                    } relative`}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center ${
                      i % 5 === 0 ? 'bg-yellow-600/30' : 
                      i % 5 === 1 ? 'bg-green-700/30' : 
                      i % 5 === 2 ? 'bg-red-700/30' : 
                      i % 5 === 3 ? 'bg-black/30' :
                      'bg-blue-700/30'
                    }`}>
                      {i % 7 === 0 && (
                        <div className="w-3 h-3 border-2 border-yellow-200 rounded-full"></div>
                      )}
                      {i % 7 === 3 && (
                        <div className="w-3 h-3 border-2 border-yellow-200 transform rotate-45"></div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          )}
          
          {character.type === 'adinkra' && (
            <div className="relative w-28 h-36">
              {/* Adinkra symbols with animations */}
              <motion.div 
                className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [1, -1, 1] 
                }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                {/* Adinkra symbol: Sankofa */}
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-yellow-400 rounded-full"></div>
                  <div className="absolute w-4 h-4 border-r-2 border-t-2 border-yellow-400 transform rotate-45 top-1 right-1"></div>
                </div>
                
                {/* Adinkra symbol: Gye Nyame */}
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-purple-400 transform rotate-45"></div>
                  <div className="absolute w-3 h-3 bg-purple-400 rounded-full"></div>
                </div>
                
                {/* Adinkra symbol: Adinkrahene */}
                <div className="relative flex items-center justify-center">
                  <div className="w-7 h-7 border-2 border-red-400 rounded-full"></div>
                  <div className="absolute w-5 h-5 border-2 border-red-400 rounded-full"></div>
                  <div className="absolute w-3 h-3 border-2 border-red-400 rounded-full"></div>
                </div>
                
                {/* Adinkra symbol: Dwennimmen */}
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-blue-400 rounded-full"></div>
                  <div className="absolute w-2 h-4 border-l-2 border-r-2 border-blue-400"></div>
                </div>
                
                {/* Adinkra symbol: Aya */}
                <div className="relative flex items-center justify-center">
                  <div className="w-7 h-7 border-2 border-green-400 transform rotate-45"></div>
                  <div className="absolute w-4 h-4 border-2 border-green-400 transform rotate-45"></div>
                </div>
                
                {/* Adinkra symbol: Nea Onnim */}
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-yellow-400 rounded-full"></div>
                  <div className="absolute w-3 h-6 border-r-2 border-yellow-400"></div>
                  <div className="absolute w-6 h-3 border-b-2 border-yellow-400"></div>
                </div>
                
                {/* Adinkra symbol: Bese Saka */}
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-orange-400 transform rotate-45"></div>
                  <div className="absolute w-3 h-3 bg-orange-400"></div>
                </div>
                
                {/* Adinkra symbol: Funtunfunefu */}
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-3 border-2 border-indigo-400 rounded-t-full"></div>
                  <div className="w-6 h-3 border-2 border-indigo-400 rounded-b-full -mt-[2px]"></div>
                </div>
                
                {/* Adinkra symbol: Akoma */}
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-red-400 transform rotate-45"></div>
                  <div className="absolute w-3 h-3 border-2 border-red-400 rounded-full"></div>
                </div>
              </motion.div>
            </div>
          )}
          
          {character.type === 'bank' && (
            <div className="relative w-40 h-60">
              {/* Bank building with animations */}
              <motion.div 
                className="w-full h-full flex flex-col items-center"
                animate={{ 
                  y: [0, -5, 0],
                  filter: ['drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))', 'drop-shadow(0 0 16px rgba(139, 92, 246, 0.6))', 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))']
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {/* Roof */}
                <div className="w-36 h-12 bg-purple-800 rounded-t-lg"></div>
                
                {/* Bank name */}
                <div className="w-32 h-8 bg-purple-900 flex items-center justify-center">
                  <div className="text-white font-bold text-sm">FIRST ATLANTIC</div>
                </div>
                
                {/* Main building */}
                <div className="w-38 h-32 bg-indigo-900 relative">
                  {/* Windows with animations */}
                  <div className="absolute grid grid-cols-3 grid-rows-2 gap-2 p-3 inset-0">
                    {[...Array(6)].map((_, i) => (
                      <motion.div 
                        key={`window-${i}`}
                        className="bg-yellow-200"
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          backgroundColor: i % 2 === 0 ? 
                            ['#fef08a', '#fde047', '#fef08a'] : 
                            ['#fde047', '#fef08a', '#fde047']
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: i * 0.5 
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Entrance */}
                <div className="w-32 h-14 bg-purple-800 flex items-center justify-center">
                  <div className="w-16 h-10 bg-blue-300 rounded-t-lg relative">
                    <motion.div 
                      className="absolute w-8 h-10 bg-blue-400 left-1/2 -translate-x-1/2"
                      animate={{ scaleX: [1, 0.6, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </div>
                
                {/* Steps */}
                <div className="w-36 h-2 bg-purple-700"></div>
                <div className="w-38 h-2 bg-purple-600"></div>
                <div className="w-40 h-2 bg-purple-500"></div>
              </motion.div>
            </div>
          )}
        </motion.div>
      ))}
      
      {/* Main content with animations */}
      <div className="relative z-10 text-center px-6 py-12 max-w-2xl mx-auto">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12"
          >
            <motion.h1 
              className="text-5xl md:text-7xl uppercase font-bold text-white mb-4 leading-tight tracking-tight"
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(139, 92, 246, 0.5)', 
                  '0 0 20px rgba(139, 92, 246, 0.8)', 
                  '0 0 10px rgba(139, 92, 246, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Thank You!
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-purple-200 mb-8"
              animate={{ 
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.02, 1] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              For completing the First Atlantic Bank tour simulation.
            </motion.p>
            
            <motion.p 
              className="text-lg text-purple-100 max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              First Atlantic Bank: Where your money moves with power. Elevate your banking experience today.
            </motion.p>
          </motion.div>
          
          {/* Home button with enhanced animations */}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <motion.button
                onClick={() => router.push('/')}
                className="px-10 py-4 bg-gradient-to-br from-purple-600 to-purple-800 text-white font-bold text-xl rounded-full shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                
                {/* Button text with icon */}
                <div className="relative z-10 flex items-center space-x-2">
                  <span>Return Home</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </motion.svg>
                </div>
                
                {/* Button shadow effect */}
                <motion.div 
                  className="absolute -inset-1 rounded-full opacity-0 bg-purple-400"
                  animate={{ opacity: [0, 0.2, 0], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ByeScreen;