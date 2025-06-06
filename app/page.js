"use client";

import { useEffect } from "react";
import { NavBar, Header, MiniGame, TourSection, Intro } from "@/components";
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
      <Intro />
      <MiniGame />
      <TourSection />
    </main>
  );
};

export default Home;
