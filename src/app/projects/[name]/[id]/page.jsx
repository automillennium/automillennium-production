"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { sliderData } from "../../projectsData";
import { motion } from "framer-motion";

export default function ProjectPage() {
  const params = useParams(); // { slug }
  const projectSlug = params.name;

  const project = sliderData.find((p) => p.slug === projectSlug);
  const [activeModel, setActiveModel] = useState(0);

  if (!project) return <div className="text-white p-4">Project not found</div>;

  const model = project.models[activeModel];

  // --- Animation Variants ---
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const renderGallery = (title, images, firstRow = false) => {
    if (!images || images.length === 0) return null;

    return (
      <motion.div
        className="mb-12 px-4 sm:px-8 lg:px-40"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: firstRow ? 1 : 0.3 }}
      >
        <motion.h2
          className="text-white text-center text-3xl font-bold mb-6"
          variants={textVariants}
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative w-full aspect-square overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]"
              variants={imageVariants}
            >
              <img
                src={img}
                alt={`${model.name} ${title} ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 23vw, 25vw"
                style={{ objectFit: "cover" }}
                className="transition-opacity duration-500 hover:opacity-90"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-4 sm:p-8 bg-black min-h-screen">
      <motion.h1
        className="text-white text-4xl mb-8 font-bold text-center mt-32"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {project.title} - {model.name} Gallery
      </motion.h1>

      {/* Model Navigation */}
      {project.models.length > 1 && (
        <div className="flex justify-center mb-12 gap-4 flex-wrap">
          {project.models.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveModel(idx)}
              className={`px-4 py-2 rounded-md font-medium ${
                idx === activeModel
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      )}

      {/* Interior Gallery (first row visible on load) */}
      {renderGallery("Interior", model.interior, true)}

      {/* Exterior Gallery (fade in on scroll) */}
      {renderGallery("Exterior", model.exterior)}

      {/* General Gallery (fade in on scroll) */}
      {renderGallery("Gallery", model.gallery)}
    </div>
  );
}
