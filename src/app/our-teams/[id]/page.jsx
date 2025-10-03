"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import executives from "../team";

const BioText = ({ children, index }) => (
  <motion.p
    className="mb-6 text-white text-base leading-relaxed font-normal"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
  >
    {children}
  </motion.p>
);

const ExecutiveProfile = () => {
  const params = useParams();
  const exec = executives.find((e) => e.link === params.id);

  if (!exec) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>Executive not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.header
          className="mb-16 border-b border-gray-200 pb-8 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-center text-[40px] font-semibold uppercase tracking-widest text-gray-500">
            Automillennium Leadership
          </h1>
        </motion.header>

        {/* Profile Section */}
        <motion.section
          className="flex flex-col md:flex-row items-start md:space-x-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-full md:w-2/3 order-2 md:order-1 pt-8 md:pt-0">
            <motion.h2
              className="text-5xl sm:text-6xl font-light text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {exec.name}
            </motion.h2>
            <motion.h3
              className="text-xl font-medium text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {exec.title}
            </motion.h3>
          </div>

          <motion.div
            className="w-full md:w-1/3 flex justify-center md:justify-end order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src={exec.image}
              alt={`Official photo of ${exec.name}`}
              className="w-full max-w-xs h-auto object-cover rounded-md shadow-lg"
              style={{ objectPosition: "top center" }}
            />
          </motion.div>
        </motion.section>

        <hr className="my-16 border-gray-200" />

        {/* Description / Bio */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          {exec.description.map((text, i) => (
            <BioText key={i} index={i}>
              {text}
            </BioText>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ExecutiveProfile;
