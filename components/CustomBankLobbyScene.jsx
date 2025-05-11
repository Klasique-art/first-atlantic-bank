'use client';
import React from 'react';
import { OrbitControls, Environment, ContactShadows, Float, Text } from '@react-three/drei';

const CustomBankLobbyScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#f3f3ff" metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Walls */}
      {[[-10, 2.5, 0], [10, 2.5, 0], [0, 2.5, -10]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={i === 2 ? [20, 5, 0.5] : [0.5, 5, 20]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Bank Desks */}
      {[[-5, 1, 3], [0, 1, 3], [5, 1, 3]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[3, 2, 1.5]} />
          <meshStandardMaterial color="#5a189a" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}

      {/* Lobby Bench */}
      <Float floatIntensity={2} speed={1.5}>
        <mesh position={[0, 0.5, -3]} castShadow>
          <boxGeometry args={[6, 1, 1.5]} />
          <meshStandardMaterial color="#dcd6f7" metalness={0.4} roughness={0.4} />
        </mesh>
      </Float>

      {/* Reception Sign (Using Text component from @react-three/drei) */}
      <Text
        position={[0, 3.5, -9.9]}
        fontSize={0.8}
        color="#7b2cbf"
        anchorX="center"
        anchorY="middle"
        maxWidth={20}
        lineHeight={1}
      >
        FIRST ATLANTIC BANK
      </Text>

      {/* Contact Shadows for realism */}
      <ContactShadows position={[0, 0, 0]} opacity={0.3} width={40} height={40} blur={1.5} far={10} />

      {/* Fancy Controls */}
      <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2.2} />

      {/* Environment */}
      <Environment preset="city" />
    </>
  );
}

export default CustomBankLobbyScene;
