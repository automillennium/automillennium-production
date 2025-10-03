"use client";

import React from "react";
import { useParams } from "next/navigation";
import { sliderData } from "../../projectsData";
import Image from "next/image"; // Import Next.js Image component for optimization

export default function ProjectPage() {
  const params = useParams(); // get { slug, id }

  // Convert id param to number
  const projectId = Number(params.id);

  // Find the project
  const event = sliderData.find((e) => e.id === projectId);

  if (!event) return <div>Project not found</div>;

  // The gallery data is expected to be in event.gallery
  const images = event.gallery;

  return (
    <div className="p-4 sm:p-8. bg-black">
      <h1 className="text-white text-4xl mb-6 font-bold text-center mt-32">{event.title} Gallery</h1>

      {images && images.length > 0 ? (
        // --- Image Grid Container ---
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[80%] mx-auto">
          {images.map((image, index) => (
            // --- Grid Item ---
            <div
              key={index}
              className="relative w-full aspect-square overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]"
            >
              {/* Using next/image for better performance */}
              <img
                src={image}
                alt={`${event.title} image ${index + 1}`}
                fill // Stretches the image to fill the parent div
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 23vw, 25vw"
                style={{
                  objectFit: "cover", // Ensures the image covers the area without distortion
                }}
                className="transition-opacity duration-500 hover:opacity-90 object-cover h-full"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-lg">No images found for this project.</p>
      )}
    </div>
  );
}