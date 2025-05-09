import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ExitButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [pulseState, setPulseState] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();
  
  // Continuous orbit animation
  useEffect(() => {
    const orbitInterval = setInterval(() => {
      setOrbitAngle(prevAngle => (prevAngle + 1) % 360);
    }, 40);
    
    return () => clearInterval(orbitInterval);
  }, []);
  
  // Continuous pulse animation cycle (0-100)
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseState(prev => (prev + 1) % 100);
    }, 50);
    
    return () => clearInterval(pulseInterval);
  }, []);

  // Handle exit click with animation
  const handleExit = () => {
    if (transitioning) return;
    setTransitioning(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      router.push('/bye-bye');
    }, 2500);
  };

  // Calculate values for animations based on pulse state
  const isPulsingStrongly = pulseState > 80 || pulseState < 20;
  const pulseScale = 1 + (Math.sin(pulseState / 100 * Math.PI * 2) * 0.05);
  const glowOpacity = 0.3 + (Math.sin(pulseState / 100 * Math.PI * 2) * 0.2);

  // Grid dimensions for pixel disintegration effect
  const gridSize = { cols: 12, rows: 6 };
  const totalCells = gridSize.cols * gridSize.rows;

  return (
    <div className="relative">
      <button
        className="absolute top-4 right-4 flex items-center justify-center w-40 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-800 text-white text-lg font-bold shadow-lg overflow-hidden"
        style={{
          boxShadow: `0 8px 24px rgba(147, 51, 234, ${glowOpacity})`,
          transform: transitioning ? 'scale(1)' : `scale(${pulseScale})`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleExit}
        disabled={transitioning}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-40 h-40 rounded-full bg-white/30"
              style={{
                left: `${20 + Math.sin((orbitAngle + i * 120) * Math.PI / 180) * 60}%`,
                top: `${50 + Math.cos((orbitAngle + i * 120) * Math.PI / 180) * 60}%`,
                filter: 'blur(20px)',
                opacity: 0.7,
                transform: `scale(${1 + Math.sin((orbitAngle + i * 120) * Math.PI / 180) * 0.2})`,
              }}
            />
          ))}
        </div>
        
        {/* Pulsing border */}
        <div 
          className="absolute inset-0 rounded-2xl border-2 border-purple-300"
          style={{
            opacity: isPulsingStrongly ? 0.8 : 0.2,
          }}
        />
        
        {/* Orbiting particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-purple-200"
            style={{
              left: `${50 + Math.cos((orbitAngle + i * 60) * Math.PI / 180) * 40}%`,
              top: `${50 + Math.sin((orbitAngle + i * 60) * Math.PI / 180) * 40}%`,
              opacity: 0.6 + (i % 3) * 0.1,
              transform: `scale(${0.5 + (i % 3) * 0.5})`,
            }}
          />
        ))}
        
        {/* Flickering star effect */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + ((i * 13) % 60)}%`,
              opacity: Math.random() > 0.7 ? 0.8 : 0.3,
            }}
          />
        ))}
        
        {/* X icon with pulse animation */}
        <X 
          size={24} 
          className={`
            mr-2
            ${isHovered ? 'animate-spin' : ''}
            ${isPulsingStrongly ? 'opacity-100' : 'opacity-80'}
          `}
          style={{
            filter: isPulsingStrongly ? 'drop-shadow(0 0 3px rgba(255,255,255,0.8))' : 'none',
          }}
        />
        
        {/* Text with hover effect */}
        <span className={`
          transition-all duration-300
          ${isHovered ? 'scale-110' : 'scale-100'}
        `}>
          Exit
        </span>
        
        {/* Shine effect line that moves across button */}
        <div 
          className="absolute h-full w-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          style={{
            left: `${(pulseState * 2) - 100}%`,
            transform: 'skewX(-20deg)',
          }}
        />

        {/* Corner decorative elements */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-purple-300 opacity-70"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-purple-300 opacity-70"></div>
      </button>

      {/* Exit Transition Animation */}
      <AnimatePresence>
        {transitioning && (
          <>
            {/* Initial implosion effect from button */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 6], opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.2, times: [0, 0.3, 1] }}
              className="absolute top-12 right-24 z-10 rounded-full w-40 h-40"
              style={{
                background: 'radial-gradient(circle, rgba(147,51,234,0.8) 0%, rgba(109,40,217,0.4) 40%, rgba(67,56,202,0) 70%)',
                boxShadow: '0 0 80px 20px rgba(147,51,234,0.7)'
              }}
            />

            {/* Button disintegration effect */}
            <div className="absolute top-4 right-4 w-40 h-16 z-20 flex flex-wrap overflow-hidden rounded-2xl pointer-events-none">
              {Array.from({ length: totalCells }).map((_, i) => {
                const col = i % gridSize.cols;
                const row = Math.floor(i / gridSize.cols);
                const cellWidth = 100 / gridSize.cols;
                const cellHeight = 100 / gridSize.rows;
                
                // Calculate distance from center for timing sequence
                const centerCol = gridSize.cols / 2;
                const centerRow = gridSize.rows / 2;
                const distX = col - centerCol;
                const distY = row - centerRow;
                const dist = Math.sqrt(distX * distX + distY * distY);
                const maxDist = Math.sqrt(centerCol * centerCol + centerRow * centerRow);
                const distRatio = dist / maxDist;
                
                // Direction for particle movement
                const angleRad = Math.atan2(distY, distX);
                const targetX = Math.cos(angleRad) * 1000; // Far outside the button
                const targetY = Math.sin(angleRad) * 1000;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, x: 0, y: 0, rotateZ: 0 }}
                    animate={{ 
                      opacity: [1, 1, 0],
                      x: [0, 0, targetX],
                      y: [0, 0, targetY],
                      rotateZ: [0, 0, Math.random() * 360 - 180]
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: 0.2 + distRatio * 0.5,
                      times: [0, 0.3, 1],
                      ease: "easeOut"
                    }}
                    style={{
                      position: 'absolute',
                      width: `${cellWidth}%`,
                      height: `${cellHeight}%`,
                      left: `${col * cellWidth}%`,
                      top: `${row * cellHeight}%`,
                      background: `rgba(${120 + Math.random() * 50}, ${30 + Math.random() * 40}, ${180 + Math.random() * 70}, 1)`,
                      boxShadow: '0 0 8px rgba(147,51,234,0.8)'
                    }}
                  />
                );
              })}
            </div>

            {/* Digital vortex portal effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.9, 0.9, 0], scale: [0, 1, 1.2, 4] }}
              transition={{ duration: 2, delay: 0.5, times: [0, 0.3, 0.7, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-40 h-40 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, rgba(126,34,206,0), rgba(139,92,246,0.8), rgba(196,181,253,1), rgba(139,92,246,0.8), rgba(126,34,206,0))',
                filter: 'blur(8px)',
                boxShadow: 'inset 0 0 40px 20px rgba(147,51,234,0.8), 0 0 80px 40px rgba(147,51,234,0.6)'
              }}
            />

            {/* Energy beams */}
            <svg className="absolute inset-0 z-40 pointer-events-none w-full h-full">
              {Array.from({ length: 15 }).map((_, i) => {
                const startAngle = (i / 15) * Math.PI * 2;
                const startRadius = 30;
                const startX = 50 + Math.cos(startAngle) * startRadius;
                const startY = 50 + Math.sin(startAngle) * startRadius;
                
                return (
                  <motion.line
                    key={i}
                    x1="50%" 
                    y1="50%" 
                    x2={`${startX}%`} 
                    y2={`${startY}%`}
                    stroke="rgba(216, 180, 254, 0.8)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 1], 
                      opacity: [0, 0.8, 0], 
                      strokeWidth: [0.5, 3, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.8 + (i * 0.05), 
                      times: [0, 0.5, 1] 
                    }}
                  />
                );
              })}
            </svg>

            {/* Floating text goodbye effect */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: [0, -20, -40] }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-center"
            >
              <div className="text-purple-100 text-3xl font-bold tracking-widest">
                GOODBYE
              </div>
              <div className="text-purple-200 text-sm mt-8 opacity-80">
                THANK YOU FOR VISITING
              </div>
            </motion.div>

            {/* Digital circuit lines */}
            <svg 
              className="absolute inset-0 z-30 pointer-events-none w-full h-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {Array.from({ length: 10 }).map((_, i) => {
                const centerX = 50;
                const centerY = 50;
                const radius = 40;
                const angle = (i / 10) * Math.PI * 2;
                
                const startX = centerX;
                const startY = centerY;
                const endX = centerX + Math.cos(angle) * radius;
                const endY = centerY + Math.sin(angle) * radius;
                
                const controlX1 = centerX + Math.cos(angle) * (radius * 0.3);
                const controlY1 = centerY + Math.sin(angle) * (radius * 0.3);
                const controlX2 = centerX + Math.cos(angle) * (radius * 0.6);
                const controlY2 = centerY + Math.sin(angle) * (radius * 0.6);
                
                return (
                  <motion.path
                    key={i}
                    d={`M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`}
                    stroke="rgba(216, 180, 254, 0.8)"
                    strokeWidth="0.4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: 1.8, 
                      delay: 0.6 + (i * 0.08),
                      times: [0, 0.7, 1]
                    }}
                  />
                );
              })}
            </svg>

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

            {/* Final purple flash transition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1] }}
              transition={{ delay: 2, duration: 0.4, times: [0, 0.3, 1] }}
              className="absolute inset-0 bg-purple-900 z-50 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExitButton;