'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ATMZone, DeskZone, OfficeZone, ExitButton, BankLobbyScene } from '@/components/tour';
// import BankLobbyScene from './BankLobbyScene'; // Import the 3D bank scene

const LobbyPage = () => {   
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="relative w-full h-screen bg-gradient-to-b from-purple-50 to-white"
    >
      {/* 3D Bank Lobby Scene */}
      <div className="absolute inset-0">
        <BankLobbyScene />
      </div>
      
      {/* Header with glass effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-14 w-[70%] rounded-b-2xl bg-purple-800/90 backdrop-blur-sm z-20 flex justify-center items-center shadow-lg border border-purple-300">
        <h1 className="text-purple-100 text-2xl uppercase font-extrabold tracking-wider drop-shadow-lg">
          Welcome to First Atlantic Bank's Lobby
        </h1>
      </div>

      {/* Bank zones overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <ATMZone />
          <DeskZone />
          <OfficeZone />
          <ExitButton />
        </div>
      </div>
      
      {/* Purple gradient overlay at bottom for enhanced depth */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-900/20 to-transparent z-5"></div>
    </motion.div>
  );
};

export default LobbyPage;