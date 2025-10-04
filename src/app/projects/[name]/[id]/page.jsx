"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { sliderData } from "../../projectsData";
import Image from "next/image";

export default function ProjectPage() {
  const params = useParams(); // { slug }
  const projectSlug = params.name;

  const project = sliderData.find((p) => p.slug === projectSlug);

  const [activeModel, setActiveModel] = useState(0);

  if (!project) return <div className="text-white p-4">Project not found</div>;

  const model = project.models[activeModel];

  const renderGallery = (title, images) => {
    if (!images || images.length === 0) return null;

    return (
      <div className="mb-12 px-40">
        <h2 className="text-white text-center text-3xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-square overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]"
            >
              <img
                src={img}
                alt={`${model.name} ${title} ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 23vw, 25vw"
                style={{ objectFit: "cover" }}
                className="transition-opacity duration-500 hover:opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-8 bg-black min-h-screen">
      <h1 className="text-white text-4xl mb-8 font-bold text-center mt-32">
        {project.title} - {model.name} Gallery
      </h1>

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

      {/* Interior Gallery */}
      {renderGallery("Interior", model.interior)}

      {/* Exterior Gallery */}
      {renderGallery("Exterior", model.exterior)}

      {/* General Gallery */}
      {renderGallery("Gallery", model.gallery)}
    </div>
  );
}
