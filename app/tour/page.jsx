"use client";
import React, { useState } from "react";
import { Welcome, Lobby } from "@/components/tour";
import { AnimatePresence } from "framer-motion";

const TourPage = () => {
  const [currentScreen, setCurrentScreen] = useState("welcome");

  const handleContinue = () => {
    setCurrentScreen("lobby");
  };

  return (
    <div className="min-h-screen bg-[url('https://www.financialafrik.com/wp-content/uploads/2017/09/Banque-1.jpg')] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && <Welcome onContinue={handleContinue} />}
        {currentScreen === "lobby" && <Lobby />}
      </AnimatePresence>
    </div>
  );
};

export default TourPage;
