"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ModalSlider from "@/app/components/ModalSlider";
import { eventsData } from "../eventsData";
import { Separator } from "@/app/components/ui/Separator";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // delay between each child
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function EventDetailPage() {
  const params = useParams();
  const event = eventsData.find((e) => e.id === params.id);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  if (!event) return <div>Event not found</div>;

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4 relative pt-40"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-bold"
        variants={itemVariants}
      >
        {event.title}
      </motion.h1>

  <Separator className="w-[80%] h-px bg-gray-500 mt-10 mb-20" />



      <motion.img
        src={event.image}
        alt={event.title}
        className="w-full max-w-4xl rounded-xl mb-6"
        variants={itemVariants}
      />

      <motion.p
        className="max-w-3xl text-lg mb-8"
        variants={itemVariants}
      >
        {event.description}
      </motion.p>

      <motion.button
        className="h-[46px] w-[240px] bg-white text-black rounded-full text-sm px-10"
        onClick={() => setIsSliderOpen(true)}
        variants={itemVariants}
      >
        view more
      </motion.button>

      {isSliderOpen && (
        <ModalSlider
          images={event.gallery}
          onClose={() => setIsSliderOpen(false)}
        />
      )}
    </motion.div>
  );
}

export default EventDetailPage;
