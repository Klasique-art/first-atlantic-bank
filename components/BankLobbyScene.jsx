'use client';
import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Vector3 } from 'three';

// Bank Floor Component
const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial 
        color="#f3f4f6" 
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
};

// Bank Wall Component
const Wall = ({ position, rotation, width, height, color }) => {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[width, height, 0.2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Bank Counter Component
const Counter = () => {
  return (
    <group position={[0, 0, -8]}>
      {/* Main Counter */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 2, 2]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
      
      {/* Counter Top Purple Accent */}
      <mesh position={[0, 2.01, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 0.1, 2]} />
        <meshStandardMaterial color="#7e22ce" />
      </mesh>
      
      {/* Counter Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 1, 1.8]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
    </group>
  );
};

// Desk Stations
const DeskStations = () => {
  return (
    <group>
      {[-7, -3.5, 0, 3.5, 7].map((x, i) => (
        <group key={i} position={[x, 0, -8]}>
          {/* Computer */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <boxGeometry args={[1.2, 0.8, 0.05]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          
          {/* Monitor Stand */}
          <mesh position={[0, 2.1, 0]} castShadow>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="#4b5563" />
          </mesh>
          
          {/* Keyboard */}
          <mesh position={[0, 2.01, 0.5]} castShadow>
            <boxGeometry args={[1, 0.05, 0.3]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// ATM Machines
const ATMMachines = () => {
  return (
    <group position={[-12, 0, 0]}>
      {[0, 3, 6].map((z, i) => (
        <group key={i} position={[0, 0, z]}>
          {/* ATM Body */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[1, 3, 0.8]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
          
          {/* ATM Screen */}
          <mesh position={[0, 2, 0.41]} castShadow>
            <boxGeometry args={[0.8, 0.6, 0.05]} />
            <meshStandardMaterial color="#1e1b4b" emissive="#3b0764" emissiveIntensity={0.2} />
          </mesh>
          
          {/* ATM Keypad */}
          <mesh position={[0, 1.3, 0.41]} castShadow>
            <boxGeometry args={[0.6, 0.4, 0.05]} />
            <meshStandardMaterial color="#9ca3af" />
          </mesh>
          
          {/* ATM Card Slot */}
          <mesh position={[0, 1.8, 0.41]} castShadow>
            <boxGeometry args={[0.5, 0.05, 0.05]} />
            <meshStandardMaterial color="#4b5563" />
          </mesh>
          
          {/* ATM Cash Dispenser */}
          <mesh position={[0, 0.8, 0.41]} castShadow>
            <boxGeometry args={[0.6, 0.2, 0.05]} />
            <meshStandardMaterial color="#4b5563" />
          </mesh>
          
          {/* Purple Accent Line */}
          <mesh position={[0, 3.1, 0]} castShadow>
            <boxGeometry args={[1, 0.1, 0.8]} />
            <meshStandardMaterial color="#7e22ce" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Office Doors
const OfficeDoors = () => {
  return (
    <group position={[12, 0, 0]}>
      {[-2, 2, 6].map((z, i) => (
        <group key={i} position={[0, 0, z]}>
          {/* Door Frame */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[0.2, 3, 2]} />
            <meshStandardMaterial color="#d1d5db" />
          </mesh>
          
          {/* Door */}
          <mesh position={[-0.6, 1.5, 0]} castShadow>
            <boxGeometry args={[1, 2.8, 1.8]} />
            <meshStandardMaterial color="#f9fafb" />
          </mesh>
          
          {/* Door Handle */}
          <mesh position={[-1, 1.5, 0.5]} castShadow>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Office Sign */}
          <mesh position={[-0.6, 2.8, 0]} castShadow>
            <boxGeometry args={[0.8, 0.2, 0.05]} />
            <meshStandardMaterial color="#7e22ce" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Ceiling Lights
const CeilingLights = () => {
  return (
    <group position={[0, 7.8, 0]}>
      {[[-8, -4], [-8, 4], [0, -4], [0, 4], [8, -4], [8, 4]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Light Fixture */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[3, 0.1, 3]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
          
          {/* Light Source */}
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[2.8, 0.05, 2.8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
          </mesh>
          
          {/* Light Point */}
          <pointLight position={[0, -1, 0]} intensity={0.5} color="#ffffff" castShadow />
        </group>
      ))}
    </group>
  );
};

// Plants
const Plants = () => {
  return (
    <group>
      {[[10, 0, 10], [-10, 0, 10], [10, 0, -10], [-10, 0, -10]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          {/* Plant Pot */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.8, 1, 1, 16]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
          
          {/* Plant Base */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.4, 16]} />
            <meshStandardMaterial color="#047857" />
          </mesh>
          
          {/* Plant Leaves */}
          <mesh position={[0, 2, 0]} castShadow>
            <coneGeometry args={[1, 1.6, 16]} />
            <meshStandardMaterial color="#065f46" />
          </mesh>
          
          <mesh position={[0, 2.5, 0]} castShadow>
            <coneGeometry args={[0.8, 1.2, 16]} />
            <meshStandardMaterial color="#047857" />
          </mesh>
          
          <mesh position={[0, 3, 0]} castShadow>
            <coneGeometry args={[0.6, 1, 16]} />
            <meshStandardMaterial color="#065f46" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Decorative Floor Patterns
const FloorPatterns = () => {
  return (
    <group position={[0, -0.49, 0]}>
      {/* Center Circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[4, 6, 32]} />
        <meshStandardMaterial color="#7e22ce" opacity={0.1} transparent />
      </mesh>
      
      {/* Outer Circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[9, 10, 32]} />
        <meshStandardMaterial color="#7e22ce" opacity={0.1} transparent />
      </mesh>
      
      {/* Bank Logo in Center */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial color="#7e22ce" opacity={0.2} transparent />
      </mesh>
    </group>
  );
};

// Logo Sign
const LogoSign = () => {
  return (
    <group position={[0, 5, -14.8]}>
      {/* Logo Background */}
      <mesh castShadow>
        <boxGeometry args={[10, 2, 0.2]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
      
      {/* Logo Text */}
      <mesh position={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[9, 1, 0.1]} />
        <meshStandardMaterial color="#7e22ce" emissive="#7e22ce" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

// Ceiling Decoration
const CeilingDecoration = () => {
  return (
    <group position={[0, 7.9, 0]}>
      {/* Central Dome */}
      <mesh castShadow>
        <sphereGeometry args={[5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f3f4f6" side={2} />
      </mesh>
      
      {/* Central Light */}
      <pointLight position={[0, -2, 0]} intensity={0.8} color="#ffffff" castShadow />
      
      {/* Decorative Ring */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <torusGeometry args={[5, 0.2, 16, 64]} />
        <meshStandardMaterial color="#7e22ce" />
      </mesh>
    </group>
  );
};

// Bank Scene Camera
const BankCamera = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 4, 15);
    camera.lookAt(new Vector3(0, 2, 0));
  }, [camera]);
  
  return <PerspectiveCamera makeDefault position={[0, 4, 15]} fov={60} />;
};

// Main Bank Scene
const BankScene = () => {
  return (
    <group>
      {/* Floor */}
      <Floor />
      
      {/* Floor Patterns */}
      <FloorPatterns />
      
      {/* Walls */}
      <Wall position={[0, 4, -15]} rotation={[0, 0, 0]} width={30} height={8} color="#f3f4f6" />
      <Wall position={[-15, 4, 0]} rotation={[0, Math.PI / 2, 0]} width={30} height={8} color="#f3f4f6" />
      <Wall position={[15, 4, 0]} rotation={[0, Math.PI / 2, 0]} width={30} height={8} color="#f3f4f6" />
      
      {/* Ceiling */}
      <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
      
      {/* Purple Accent Wall */}
      <Wall position={[0, 4, 15]} rotation={[0, 0, 0]} width={30} height={8} color="#7e22ce" />
      
      {/* Purple Accent Strips on Side Walls */}
      <Wall position={[-15, 7.5, 0]} rotation={[0, Math.PI / 2, 0]} width={30} height={1} color="#7e22ce" />
      <Wall position={[15, 7.5, 0]} rotation={[0, Math.PI / 2, 0]} width={30} height={1} color="#7e22ce" />
      <Wall position={[0, 7.5, -15]} rotation={[0, 0, 0]} width={30} height={1} color="#7e22ce" />
      
      {/* Bank Counter */}
      <Counter />
      
      {/* Desk Stations */}
      <DeskStations />
      
      {/* ATM Machines */}
      <ATMMachines />
      
      {/* Office Doors */}
      <OfficeDoors />
      
      {/* Ceiling Lights */}
      <CeilingLights />
      
      {/* Ceiling Decoration */}
      <CeilingDecoration />
      
      {/* Plants */}
      <Plants />
      
      {/* Logo Sign */}
      <LogoSign />
      
      {/* Ambient Light */}
      <ambientLight intensity={0.4} />
      
      {/* Main Light */}
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      
      {/* Fill Light */}
      <directionalLight position={[-10, 10, -10]} intensity={0.2} />
      
      {/* Camera */}
      <BankCamera />
    </group>
  );
};

const BankLobbyScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows className="w-full h-full">
        <BankScene />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default BankLobbyScene;