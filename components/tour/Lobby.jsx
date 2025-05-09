"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ATMZone, DeskZone, OfficeZone, ExitButton } from ".";
import { bankLobbyImg } from "@/staticData";

const Lobby = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-14 rounded-b-2xl w-[70%] bg-primary z-10 flex justify-center items-center">
        {/* Overlay title */}
        <h1 className=" text-purple-200 text-2xl uppercase font-extrabold drop-shadow-lg">
          Welcome to First Atlantic Bank's Lobby
        </h1>
      </div>
      {/* Bank Lobby Background */}
      <Image
        src={bankLobbyImg}
        alt="Bank Lobby"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* Overlayed Zones */}
      <div className="absolute inset-0 z-10">
        <ATMZone />
        <DeskZone />
        <OfficeZone />
        <ExitButton />
      </div>
    </motion.div>
  );
};

export default Lobby;
