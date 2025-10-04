

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { sliderData } from "../projectsData";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion"; // <-- Import Framer Motion

// --- Font Configuration ---
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-poppins",
});

export default function ProjectPage() {
  const params = useParams();
  const projectSlug = params.name;
  const router = useRouter();

  const project = sliderData.find((p) => p.slug === projectSlug);
  const [activeModel, setActiveModel] = useState(0);
  const modelRef = useRef(null);
  const [centerPadding, setCenterPadding] = useState("0px");

  if (!project) return <p className="text-white">Project not found</p>;

  const nextModel = () =>
    setActiveModel((prev) => Math.min(prev + 1, project.models.length - 1));
  const prevModel = () =>
    setActiveModel((prev) => Math.max(prev - 1, 0));

  const handleThumbnailClick = (idx) => {
    if (idx !== activeModel) {
      setActiveModel(idx);
    } else {
      const dynamicRoute = `/projects/${project.slug}/${project.models[idx].slug}`;
      router.push(dynamicRoute);
    }
  };

  const calculatePadding = useCallback(() => {
    if (modelRef.current) {
      const container = modelRef.current;
      const firstThumb = container.children[0];
      if (firstThumb) {
        const containerWidth = container.offsetWidth;
        const thumbWidth = firstThumb.offsetWidth;
        const padding =
          container.children.length === 1
            ? (containerWidth - thumbWidth) / 2
            : containerWidth / 2 - thumbWidth / 2;
        setCenterPadding(`${padding}px`);
      }
    }
  }, []);

  useEffect(() => {
    calculatePadding();
    window.addEventListener("resize", calculatePadding);
    return () => window.removeEventListener("resize", calculatePadding);
  }, [calculatePadding]);

  const centerThumbnail = useCallback(() => {
    if (modelRef.current) {
      const container = modelRef.current;
      const activeThumb = container.children[activeModel];
      const containerWidth = container.offsetWidth;
      if (activeThumb) {
        const scrollPosition =
          activeThumb.offsetLeft - containerWidth / 2 + activeThumb.offsetWidth / 2;
        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [activeModel]);

  useEffect(() => {
    centerThumbnail();
  }, [activeModel, centerThumbnail]);

  // --- Framer Motion variants ---
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8 },
    }),
  };

  return (
    <div className={`min-h-screen bg-black ${poppins.variable} font-poppins`}>
      {/* Main Slider */}
      <div className="slider h-screen -mt-[50px] relative">
        <div className="slide-item absolute inset-0 overflow-hidden opacity-100 z-10">
          <img
            src={project.bannerImg}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="content absolute left-[10%] top-[20%] w-[500px] max-w-[80%] z-[1] text-white">
            <motion.p
              className="uppercase tracking-[10px]"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {project.type}
            </motion.p>
            <motion.h2
              className="text-[100px] max-[678px]:text-[60px]"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              {project.title}
            </motion.h2>
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              {project.description}
            </motion.p>
          </div>
          <div className="absolute inset-0 bg-black/50 z-0"></div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2 z-10 w-[1050px] max-w-[95%] flex items-center justify-between">
          <button
            onClick={prevModel}
            disabled={activeModel === 0}
            className="z-20 bg-white/30 w-10 h-10 rounded-full text-xl text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>

          <div
            ref={modelRef}
            style={{ paddingLeft: centerPadding, paddingRight: centerPadding }}
            className="flex gap-4 w-[950px] h-[240px] py-4 box-border overflow-x-scroll scroll-smooth items-center snap-x snap-mandatory [&::-webkit-scrollbar]:hidden cursor-grab"
          >
            {project.models.map((model, idx) => (
              <div
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`cursor-pointer transition-all duration-500 flex-shrink-0 relative w-[340px] h-[200px] rounded-xl overflow-hidden snap-center ${
                  idx === activeModel
                    ? "scale-110 brightness-110 shadow-2xl ring-4 ring-white/80 z-20"
                    : "scale-90 brightness-50"
                }`}
              >
                <img
                  src={model.image}
                  alt={model.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="pointer-events-none"
                />
              </div>
            ))}
          </div>

          <button
            onClick={nextModel}
            disabled={activeModel === project.models.length - 1}
            className="z-20 bg-white/30 w-10 h-10 rounded-full text-xl text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
