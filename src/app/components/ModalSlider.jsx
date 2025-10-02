"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ModalSlider({ images, onClose }) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]">
      {/* Close button */}
      <button
        className="absolute top-5 right-5 text-white text-4xl z-50"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Prev button */}
      <button
        className="absolute left-20 text-white text-4xl z-50"
        onClick={prev}
      >
        &#8592;
      </button>

      {/* Image container to control size */}
      <div className="relative w-[80vw] max-w-[80%] h-[80vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt="Gallery"
            className="rounded-xl object-contain w-full h-full"
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      {/* Next button */}
      <button
        className="absolute right-20 text-white text-4xl z-50"
        onClick={next}
      >
        &#8594;
      </button>
    </div>
  );
}

export default ModalSlider;
