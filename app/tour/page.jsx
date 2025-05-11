"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { Landmark, ChevronRight, HelpCircle, Star, Moon, Sun } from "lucide-react";
import * as THREE from 'three';

const TourPage = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dayNightCycle, setDayNightCycle] = useState(0); // 0-100, 0=night, 100=day
  const [showAssistant, setShowAssistant] = useState(false);
  
  const router = useRouter();
  const containerRef = useRef(null);
  const cityRef = useRef(null);
  const particlesRef = useRef(null);
  
  const bankControls = useAnimation();
  const customerControls = useAnimation();
  const executiveControls = useAnimation();
  const buttonControls = useAnimation();
  const assistantControls = useAnimation();
  const exitTransitionControls = useAnimation();
  
  // Track mouse position for particle interactions
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Day/night cycle effect
  useEffect(() => {
    if (animationPhase >= 1) {
      const cycleInterval = setInterval(() => {
        setDayNightCycle(prev => {
          const newValue = prev + 0.2;
          return newValue > 100 ? 100 : newValue;
        });
      }, 150);
      
      return () => clearInterval(cycleInterval);
    }
  }, [animationPhase]);
  
  // Animation sequence timeline management
  useEffect(() => {
    const timeline = [
      () => {
        // Dawn breaks over city skyline
        setAnimationPhase(1);
      },
      () => {
        // Bank building comes into focus
        setAnimationPhase(2);
        bankControls.start({
          scale: 1,
          opacity: 1,
          y: 0,
          transition: { duration: 1.5, ease: "easeOut" }
        });
      },
      () => {
        // Customer characters appear
        setAnimationPhase(3);
        customerControls.start({
          opacity: 1,
          x: 0,
          transition: { duration: 1, staggerChildren: 0.3 }
        });
      },
      () => {
        // Executive character appears with button
        setAnimationPhase(4);
        executiveControls.start({
          opacity: 1,
          x: 0,
          transition: { duration: 1 }
        });
      },
      () => {
        // Button is pushed into view
        setAnimationPhase(5);
        buttonControls.start({
          scale: 1,
          opacity: 1,
          x: 0,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 15 
          }
        });
      },
      () => {
        // Help assistant appears
        setAnimationPhase(6);
        setShowAssistant(true);
        assistantControls.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { 
            type: "spring", 
            stiffness: 200, 
            damping: 20 
          }
        });
      }
    ];

    // Execute timeline events with proper timing
    let timeouts = [];
    timeline.forEach((event, index) => {
      const timeout = setTimeout(event, index === 0 ? 500 : 2000 * index);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [bankControls, customerControls, executiveControls, buttonControls, assistantControls]);

  // City animation with three.js-like effect
  useEffect(() => {
    if (cityRef.current) {
      const cityCanvas = cityRef.current;
      const ctx = cityCanvas.getContext('2d');
      cityCanvas.width = window.innerWidth;
      cityCanvas.height = window.innerHeight;
      
      // Buildings data
      const buildings = [];
      const buildingCount = 30;
      
      for (let i = 0; i < buildingCount; i++) {
        const width = Math.random() * 80 + 40;
        const height = Math.random() * 200 + 100;
        const x = i * (window.innerWidth / buildingCount);
        buildings.push({
          x,
          y: window.innerHeight - height,
          width,
          height,
          color: `rgba(${30 + Math.random() * 20}, ${10 + Math.random() * 20}, ${50 + Math.random() * 30}, ${0.6 + Math.random() * 0.4})`,
          windows: []
        });
        
        // Generate windows for buildings
        const windowRows = Math.floor(height / 20);
        const windowCols = Math.floor(width / 15);
        
        for (let row = 0; row < windowRows; row++) {
          for (let col = 0; col < windowCols; col++) {
            if (Math.random() > 0.3) {
              buildings[i].windows.push({
                x: x + col * 15 + 5,
                y: window.innerHeight - height + row * 20 + 5,
                lit: Math.random() > 0.6,
                flickerRate: Math.random() * 0.01,
                lastUpdate: 0
              });
            }
          }
        }
      }
      
      // Animation function
      const animate = () => {
        ctx.clearRect(0, 0, cityCanvas.width, cityCanvas.height);
        
        // Draw sky gradient based on animation phase and day/night cycle
        const skyGradient = ctx.createLinearGradient(0, 0, 0, cityCanvas.height * 0.7);
        if (animationPhase === 0) {
          // Night sky
          skyGradient.addColorStop(0, '#0f0021');
          skyGradient.addColorStop(1, '#2d1159');
        } else {
          // Dawn to day transition based on dayNightCycle
          const dayProgress = dayNightCycle / 100;
          
          // Night colors (0% cycle)
          const nightTopColor = [15, 0, 33]; // #0f0021
          const nightBottomColor = [45, 17, 89]; // #2d1159
          
          // Day colors (100% cycle)
          const dayTopColor = [25, 82, 196]; // #1952c4
          const dayBottomColor = [86, 139, 230]; // #568be6
          
          // Calculate current colors
          const currentTopColor = nightTopColor.map((channel, i) => 
            Math.round(channel + (dayTopColor[i] - channel) * dayProgress)
          );
          
          const currentBottomColor = nightBottomColor.map((channel, i) => 
            Math.round(channel + (dayBottomColor[i] - channel) * dayProgress)
          );
          
          // Apply gradient
          skyGradient.addColorStop(0, `rgb(${currentTopColor[0]}, ${currentTopColor[1]}, ${currentTopColor[2]})`);
          skyGradient.addColorStop(1, `rgb(${currentBottomColor[0]}, ${currentBottomColor[1]}, ${currentBottomColor[2]})`);
        }
        
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, cityCanvas.width, cityCanvas.height);
        
        // Draw stars (fade out as day progresses)
        if (dayNightCycle < 70) {
          const starOpacity = Math.max(0, 0.5 - (dayNightCycle / 70) * 0.5);
          ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`;
          for (let i = 0; i < 100; i++) {
            const x = Math.random() * cityCanvas.width;
            const y = Math.random() * cityCanvas.height * 0.6;
            const radius = Math.random() * 1.5;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Draw sun or moon based on cycle
        if (dayNightCycle > 30) {
          // Draw sun rising
          const sunProgress = Math.max(0, (dayNightCycle - 30) / 70);
          const sunY = cityCanvas.height * 0.6 * (1 - sunProgress);
          
          // Sun glow
          const sunGradient = ctx.createRadialGradient(
            cityCanvas.width * 0.3, sunY, 10,
            cityCanvas.width * 0.3, sunY, 60
          );
          sunGradient.addColorStop(0, 'rgba(255, 235, 59, 1)');
          sunGradient.addColorStop(0.3, 'rgba(255, 177, 66, 0.7)');
          sunGradient.addColorStop(1, 'rgba(255, 177, 66, 0)');
          
          ctx.fillStyle = sunGradient;
          ctx.beginPath();
          ctx.arc(cityCanvas.width * 0.3, sunY, 60, 0, Math.PI * 2);
          ctx.fill();
          
          // Sun core
          ctx.fillStyle = 'rgba(255, 235, 59, 1)';
          ctx.beginPath();
          ctx.arc(cityCanvas.width * 0.3, sunY, 30, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw moon with lower opacity as dawn approaches
          const moonOpacity = Math.max(0.2, 1 - (dayNightCycle / 30) * 0.8);
          ctx.fillStyle = `rgba(255, 255, 245, ${moonOpacity})`;
          ctx.beginPath();
          ctx.arc(cityCanvas.width * 0.8, cityCanvas.height * 0.2, 40, 0, Math.PI * 2);
          ctx.fill();
          
          // Moon crater details
          ctx.fillStyle = `rgba(220, 220, 210, ${moonOpacity * 0.7})`;
          ctx.beginPath();
          ctx.arc(cityCanvas.width * 0.8 - 15, cityCanvas.height * 0.2 - 10, 10, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(cityCanvas.width * 0.8 + 10, cityCanvas.height * 0.2 + 15, 8, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(cityCanvas.width * 0.8 + 5, cityCanvas.height * 0.2 - 15, 5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw distant mountains with color adjustment based on time of day
        const mountainR = 61 + Math.min(40, dayNightCycle * 0.4);
        const mountainG = 33 + Math.min(70, dayNightCycle * 0.7);
        const mountainB = 106 + Math.min(40, dayNightCycle * 0.4);
        
        const mountainGradient = ctx.createLinearGradient(0, cityCanvas.height * 0.4, 0, cityCanvas.height * 0.6);
        mountainGradient.addColorStop(0, `rgb(${mountainR}, ${mountainG}, ${mountainB})`);
        mountainGradient.addColorStop(1, `rgb(${mountainR - 10}, ${mountainG - 10}, ${mountainB - 10})`);
        ctx.fillStyle = mountainGradient;
        
        ctx.beginPath();
        ctx.moveTo(0, cityCanvas.height * 0.6);
        for (let x = 0; x <= cityCanvas.width; x += 50) {
          const y = cityCanvas.height * 0.6 - Math.sin(x / 300) * 50 - Math.random() * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(cityCanvas.width, cityCanvas.height * 0.6);
        ctx.fill();
        
        // Draw buildings and windows
        buildings.forEach(building => {
          // Adjust building color based on time of day
          const buildingAlpha = 0.6 + Math.random() * 0.4;
          const buildingR = parseInt(building.color.split('(')[1].split(',')[0]) + (dayNightCycle * 0.2);
          const buildingG = parseInt(building.color.split(',')[1]) + (dayNightCycle * 0.2);
          const buildingB = parseInt(building.color.split(',')[2]) + (dayNightCycle * 0.1);
          
          // Draw building
          ctx.fillStyle = `rgba(${buildingR}, ${buildingG}, ${buildingB}, ${buildingAlpha})`;
          ctx.fillRect(building.x, building.y, building.width, building.height);
          
          // Draw windows
          const now = Date.now();
          building.windows.forEach(window => {
            // Randomly update window state
            if (now - window.lastUpdate > 2000 && Math.random() < window.flickerRate) {
              window.lit = !window.lit;
              window.lastUpdate = now;
            }
            
            // Adjust window lighting based on time of day
            let windowColor;
            if (window.lit) {
              // Lit windows get more yellow/white as day progresses
              windowColor = `rgba(255, ${255 - dayNightCycle * 0.5}, ${150 - dayNightCycle}, ${Math.max(0.3, 0.8 - dayNightCycle * 0.005)})`;
            } else {
              // Unlit windows get lighter as day progresses
              const lightLevel = Math.min(120, 30 + dayNightCycle);
              windowColor = `rgba(${lightLevel}, ${lightLevel}, ${lightLevel + 20}, 0.8)`;
            }
            
            // Draw window
            ctx.fillStyle = windowColor;
            ctx.fillRect(window.x, window.y, 8, 12);
          });
        });
        
        // Draw ground with color adjustment based on time of day
        const groundR = 50 + (dayNightCycle * 0.5);
        const groundG = 19 + (dayNightCycle * 0.7);
        const groundB = 97 + (dayNightCycle * 0.3);
        
        const groundGradient = ctx.createLinearGradient(0, cityCanvas.height - 50, 0, cityCanvas.height);
        groundGradient.addColorStop(0, `rgb(${groundR}, ${groundG}, ${groundB})`);
        groundGradient.addColorStop(1, `rgb(${groundR * 0.6}, ${groundG * 0.6}, ${groundB * 0.6})`);
        ctx.fillStyle = groundGradient;
        ctx.fillRect(0, cityCanvas.height - 50, cityCanvas.width, 50);
        
        // Draw road
        ctx.fillStyle = 'rgba(20, 20, 30, 0.8)';
        ctx.fillRect(cityCanvas.width * 0.1, cityCanvas.height - 40, cityCanvas.width * 0.8, 30);
        
        // Draw road markings
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        for (let x = cityCanvas.width * 0.1; x < cityCanvas.width * 0.9; x += 50) {
          ctx.fillRect(x, cityCanvas.height - 25, 30, 5);
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      // Cleanup animation frame on unmount
      return () => {
        cancelAnimationFrame(animate);
      };
    }
  }, [animationPhase, dayNightCycle]);
  
  // Interactive particles animation
  useEffect(() => {
    if (particlesRef.current) {
      const canvas = particlesRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particles = [];
      const particleCount = 50;
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: `rgba(${180 + Math.random() * 75}, ${180 + Math.random() * 75}, ${255}, ${0.2 + Math.random() * 0.5})`,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          wobble: Math.random() * 0.5
        });
      }
      
      // Animation function
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wobble effect
          particle.x += Math.sin(Date.now() * 0.001 + index) * particle.wobble;
          particle.y += Math.cos(Date.now() * 0.001 + index) * particle.wobble;
          
          // Mouse interaction - particles are attracted to mouse
          if (mousePosition.x && mousePosition.y) {
            const dx = mousePosition.x - particle.x;
            const dy = mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              const attractionStrength = (150 - distance) / 15000;
              particle.x += dx * attractionStrength;
              particle.y += dy * attractionStrength;
            }
          }
          
          // Wrap around screen
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          
          // Draw glow effect
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 4
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      // Cleanup
      return () => {
        cancelAnimationFrame(animate);
      };
    }
  }, [mousePosition]);
  
  // Handle redirect to lobby with transition
  useEffect(() => {
    if (redirect) {
      // Start exit transition animation
      exitTransitionControls.start({
        opacity: 1,
        scale: 5,
        transition: { duration: 2 }
      }).then(() => {
        // When animation completes, redirect
        const redirectTimer = setTimeout(() => {
          router.push("/lobby");
        }, 500);
        return () => clearTimeout(redirectTimer);
      });
    }
  }, [redirect, router, exitTransitionControls]);

  // Handle window resize for canvases
  useEffect(() => {
    const handleResize = () => {
      if (cityRef.current) {
        cityRef.current.width = window.innerWidth;
        cityRef.current.height = window.innerHeight;
      }
      if (particlesRef.current) {
        particlesRef.current.width = window.innerWidth;
        particlesRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Skip animation function for accessibility
  const skipIntro = () => {
    setDayNightCycle(70); // Set to dawn/day
    setAnimationPhase(6);
    setShowAssistant(true);
    
    // Trigger all animations to complete state
    bankControls.start({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
    customerControls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    });
    executiveControls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    });
    buttonControls.start({
      scale: 1,
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    });
    assistantControls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 }
    });
  };

  // Handle button click with animation
  const handleEnterLobby = () => {
    // Animate button press
    buttonControls.start({
      scale: 0.95,
      transition: { duration: 0.1 }
    }).then(() => {
      buttonControls.start({
        scale: 1.2,
        transition: { duration: 0.2 }
      }).then(() => {
        // Start transition animation and set redirect flag
        setRedirect(true);

        // Wait 2 seconds before routing
        setTimeout(() => {
          router.push('/lobby');
        }, 700);
      });
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-purple-900"
    >
      {/* Exit transition overlay */}
      <AnimatePresence>
        {redirect && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={exitTransitionControls}
            className="absolute inset-0 z-50 bg-yellow-400 flex items-center justify-center"
            style={{ 
              transformOrigin: `${mousePosition.x}px ${mousePosition.y}px` 
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-purple-900 text-4xl font-bold"
            >
              Entering First Atlantic Bank...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
      {/* Skip intro button for accessibility */}
      <button
        onClick={skipIntro}
        className="absolute top-4 right-4 px-4 py-2 bg-purple-800 text-white rounded-md opacity-50 hover:opacity-100 z-50 transition-opacity"
        aria-label="Skip introduction animation"
      >
        Skip Intro
      </button>

      {/* Background city skyline canvas */}
      <canvas 
        ref={cityRef} 
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      />
      
      {/* Interactive particles overlay */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Weather indicator based on day/night cycle */}
      <motion.div
        className="absolute top-8 left-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: dayNightCycle > 30 ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {dayNightCycle > 70 ? (
          <div className="flex items-center text-yellow-400">
            <Sun className="mr-2" size={24} />
            <span className="font-medium">Sunny Day</span>
          </div>
        ) : dayNightCycle > 30 ? (
          <div className="flex items-center text-amber-400">
            <Sun className="mr-2" size={24} />
            <span className="font-medium">Dawn Breaking</span>
          </div>
        ) : (
          <div className="flex items-center text-blue-400">
            <Moon className="mr-2" size={24} />
            <span className="font-medium">Night Time</span>
          </div>
        )}
      </motion.div>
      
      {/* Central bank building */}
      <motion.div 
        className="absolute left-1/2 bottom-1/4 w-1/2 h-1/2 transform -translate-x-1/2 z-20"
        initial={{ scale: 1.5, opacity: 0, y: 100 }}
        animate={bankControls}
      >
        {/* Main bank building structure */}
        <div className="relative w-full h-full">
          {/* Bank building facade */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-4/5 bg-gradient-to-b from-purple-800 to-purple-900 rounded-t-lg shadow-2xl">
            {/* Bank logo */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotateZ: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Landmark size={48} className="mx-auto text-yellow-400" />
              </motion.div>
              <motion.div 
                className="mt-2 text-xl font-bold text-white tracking-wide"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(250, 204, 21, 0.7)",
                    "0 0 15px rgba(250, 204, 21, 0.7)",
                    "0 0 5px rgba(250, 204, 21, 0.7)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <span className="text-yellow-400">FIRST ATLANTIC</span> BANK
              </motion.div>
            </div>
            
            {/* Bank windows - grid */}
            <div className="absolute top-32 left-0 right-0 bottom-0 grid grid-cols-5 gap-2 p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="bg-blue-900 bg-opacity-70 rounded-sm"
                  animate={{ 
                    opacity: [0.7, 0.9, 0.7],
                    backgroundColor: ['rgba(30, 64, 175, 0.7)', 'rgba(30, 58, 138, 0.7)']
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
            
            {/* Bank entrance with light beam */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-purple-700 rounded-t-lg border-t-2 border-yellow-500">
              {/* Entrance light cone */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 z-10"
                style={{
                  borderLeft: '40px solid transparent',
                  borderRight: '40px solid transparent',
                  borderBottom: '60px solid rgba(250, 204, 21, 0.2)',
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Steps */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-purple-600 rounded-sm"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-4 bg-purple-700 rounded-sm"></div>
            </div>
          </div>
          
          {/* Bank tower/spire */}
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-1/6 h-2/3 bg-gradient-to-b from-purple-700 to-purple-900 rounded-t-lg shadow-lg">
             {/* Bank crown with animating gleam */}
<motion.div
  className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16"
  animate={{
    y: [0, -2, 0],
    opacity: [0.8, 1, 0.8],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse",
  }}
>
  <div className="w-full h-full relative">
    <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full"></div>
    <Star size={36} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-100" />
  </div>
</motion.div>

{/* Tower windows */}
<div className="flex flex-col justify-center items-center h-full gap-4 pt-4">
  {Array.from({ length: 5 }).map((_, i) => (
    <motion.div
      key={i}
      className="w-4/5 h-4 bg-blue-900 bg-opacity-70 rounded-sm"
      animate={{ 
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{ 
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random()
      }}
    />
  ))}
</div>
</div>
</div>
</motion.div>

{/* Customer characters */}
<motion.div
  className="absolute bottom-16 right-16 z-30"
  initial={{ opacity: 0, x: 100 }}
  animate={customerControls}
>
  <div className="flex space-x-8">
    {/* Customer 1 */}
    <motion.div
      className="flex flex-col items-center"
      animate={{
        y: [0, -5, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.5
      }}
    >
      <div className="w-12 h-12 rounded-full bg-purple-300 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-purple-600"></div>
      </div>
      <div className="w-8 h-16 bg-purple-400 rounded-b-lg mt-1"></div>
      <div className="text-white text-xs mt-2 font-medium">Customer</div>
    </motion.div>
    
    {/* Customer 2 */}
    <motion.div
      className="flex flex-col items-center"
      animate={{
        y: [0, -5, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.75
      }}
    >
      <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-blue-600"></div>
      </div>
      <div className="w-8 h-16 bg-blue-400 rounded-b-lg mt-1"></div>
      <div className="text-white text-xs mt-2 font-medium">Client</div>
    </motion.div>
  </div>
</motion.div>

{/* Bank executive character */}
<motion.div
  className="absolute bottom-16 left-16 z-30"
  initial={{ opacity: 0, x: -100 }}
  animate={executiveControls}
>
  <motion.div
    className="flex flex-col items-center"
    animate={{
      y: [0, -5, 0],
      rotate: [0, 2, 0, -2, 0]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    <div className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-yellow-600"></div>
    </div>
    <div className="w-10 h-20 bg-yellow-400 rounded-b-lg mt-1"></div>
    <div className="text-white text-sm mt-2 font-bold">Executive</div>
  </motion.div>
</motion.div>

{/* Enter button */}
<motion.div
  className="absolute bottom-36 left-1/2 transform -translate-x-1/2 z-40"
  initial={{ scale: 0, opacity: 0, x: 200 }}
  animate={buttonControls}
>
  <motion.button
    onClick={handleEnterLobby}
    className="px-8 py-4 bg-yellow-400 text-purple-900 rounded-lg font-bold text-xl shadow-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-center">
      Enter Bank Lobby
      <ChevronRight className="ml-2" size={24} />
    </div>
  </motion.button>
</motion.div>

{/* Help assistant character */}
{showAssistant && (
  <motion.div
    className="absolute bottom-16 right-1/2 transform translate-x-1/2 z-30"
    initial={{ opacity: 0, y: 100, scale: 0.5 }}
    animate={assistantControls}
  >
    <motion.div
      className="flex flex-col items-center"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 3, 0, -3, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center">
          <HelpCircle size={32} className="text-yellow-400" />
        </div>
        
        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-400 -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="w-12 h-24 bg-blue-400 rounded-b-lg mt-1"></div>
      
      {/* Speech bubble */}
      <motion.div
        className="absolute -top-16 w-48 bg-white rounded-lg p-3 text-purple-900 text-sm"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -5, 0]
        }}
        transition={{
          delay: 0.5,
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <p className="font-medium">Welcome to First Atlantic Bank! Click the button to enter.</p>
        <div className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 rotate-45 w-4 h-4 bg-white"></div>
      </motion.div>
      
      <div className="text-white text-sm mt-2 font-bold">Bank Assistant</div>
    </motion.div>
  </motion.div>
)}

{/* Accessibility description for screen readers */}
<div className="sr-only">
  <h1>Welcome to First Atlantic Bank Virtual Experience</h1>
  <p>
    This page shows an animated scene of a bank building at dawn. 
    The bank is called First Atlantic Bank with a golden logo. 
    There are customers and a bank executive visible, with an 
    assistant ready to help. Press the "Enter Bank Lobby" button 
    to proceed to the main application.
  </p>
</div>
</div>
);
};

export default TourPage;