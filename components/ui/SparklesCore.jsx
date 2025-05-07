"use client";
import { useCallback } from "react";
import { Particles } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const SparklesCore = () => {
    const particlesInit = useCallback(async (engine) => {
        // Load full tsParticles package
        await loadFull(engine);
      }, []);
    

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#1A1C23",
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          number: {
            value: 80,
          },
          size: {
            value: 3,
          },
        },
      }}
    />
  );
};

export default SparklesCore;
