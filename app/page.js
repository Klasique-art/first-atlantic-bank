"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { NavBar, Header } from "@/components";
import Aos from "aos";
import "aos/dist/aos.css"

const Home = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Aos.init({
        offset: 100,
        duration: 600,
        easing: "ease-in-sine",
        delay: 100,
      });

      Aos.refresh()
    }
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <NavBar />
      <Header />
    </main>
  );
};

export default Home;
