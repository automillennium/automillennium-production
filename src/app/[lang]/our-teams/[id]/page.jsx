

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import executivesNew from "../team";
// Assuming 'executives' is correctly imported from "../team"
// import executives from "../team"; 



const BioText = ({ children, index }) => (
  <motion.p
    // Premium text styling: slightly larger, clean spacing
    className="mb-8 text-gray-300 text-lg md:text-xl leading-relaxed font-light"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + index * 0.15, duration: 0.7 }}
  >
    {children}
  </motion.p>
);

const ExecutiveProfile = () => {
  const params = useParams();
  const exec = executivesNew.find((e) => e.link === params.id);

  if (!exec) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>Executive not found. </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

        {/* Header */}
        <motion.header
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-gray-500 text-base md:text-lg font-medium tracking-[0.3em] uppercase mb-4">
            AUTOMILLENNIUM LEADERSHIP
          </h1>
          <hr className="w-16 h-1 bg-zinc-700/50 mx-auto my-6 rounded-full" />
        </motion.header>

        {/* Profile Section */}
        <motion.section
          className="flex flex-col md:flex-row-reverse items-center md:items-start md:space-x-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          
          {/* Image (Order 1 on mobile, 2 on desktop) */}
          <motion.div
            className="w-full md:w-1/3 flex justify-center order-1 mb-10 md:mb-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <img
              src={exec.image}
              alt={`Official photo of ${exec.name}`}
              // Premium Image Styling: large, rounded, subtle shadow
              className="w-full max-w-sm h-auto object-cover rounded-3xl shadow-2xl border border-zinc-800"
              style={{ aspectRatio: '4/5', objectPosition: "top center" }}
            />
          </motion.div>

          {/* Text Info (Order 2 on mobile, 1 on desktop) */}
          <div className="w-full md:w-2/3 order-2 md:order-1 pt-0 md:pt-4 text-center md:text-left">
            <motion.h2
              // Large, bold name
              className="text-white text-6xl md:text-8xl font-extrabold tracking-tight mb-2 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {exec.name}
            </motion.h2>
            <motion.h3
              // Subtitle
              className="text-cyan-400 text-2xl md:text-3xl font-medium mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {exec.title}
            </motion.h3>
          </div>

        </motion.section>

        {/* Separator */}
        <hr className="w-2/3 mx-auto my-20 border-zinc-700" />

        {/* Description / Bio */}
        <section className="mt-16 max-w-5xl mx-auto">
          <h4 className="text-gray-400 text-xl font-bold mb-8 uppercase tracking-widest text-center">
            Professional Biography
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {exec.description.map((text, i) => (
              <BioText key={i} index={i}>
                {text}
              </BioText>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExecutiveProfile;