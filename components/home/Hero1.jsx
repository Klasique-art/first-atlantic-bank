"use client";
import { useRef } from "react";
import { Timeline } from "..";
import { evolution } from "@/staticData";

const Hero1 = ({ heroRef }) => {
  return (
    <section ref={heroRef} className="min-h-screen overflow-hidden max-w-7xl mx-auto bg-accent py-6">
      <h2 className="text-3xl font-bold text-center mb-6 uppercase" data-aos="zoom-in">
        The Evolution of Banking
      </h2>
      {evolution.map((item, index) => (
            <Timeline
              key={index}
              image={item.image}
              heading={item.title}
              description={item.description}
              reverse={index % 2 !== 0}
            />
        ))}
    </section>
  );
};

export default Hero1;
