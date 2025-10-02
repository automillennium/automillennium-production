"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import executives from "./team";

// Fade-in animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const ProfileCard = ({ imageUrl, name, title, link, index }) => (
  <motion.div
    className="rounded-xl shadow-xl overflow-hidden text-left transition-all duration-300 hover:shadow-2xl"
    custom={index}
    initial="hidden"
    animate="visible"
    variants={fadeInUp}
  >
      <Link
        href={`/our-teams/${link}`}
        className="text-xl text-[#0070c9] hover:text-blue-800 font-normal inline-block mb-1 transition duration-150 ease-in-out"
      >
    <div className="bg-gray-50 rounded-t-xl flex justify-center items-center">
      <img
        className=" h-[192px] w-[230px] block  object-contain"
        src={imageUrl}
        alt={name}
      />
    </div>
    <div className="py-4 bg-transparent">
        {name}
      <p className="text-base text-white m-0">{title}</p>
    </div>
      </Link>
  </motion.div>
);

const TeamsPage = () => {
  return (
    <div className="bg-black min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10 pt-20 sm:pt-40">
        <div className="border-b border-gray-200">
          <h1 className="text-center text-[40px] font-semibold tracking-widest uppercase text-gray-500 pb-">
            Meet Our Leadership
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 md:mt-20">
          {executives.map((exec, idx) => (
            <ProfileCard
              key={idx}
              index={idx}
              imageUrl={exec.image}
              name={exec.name}
              title={exec.title}
              link={exec.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
