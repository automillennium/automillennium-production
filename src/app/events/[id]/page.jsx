"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import ModalSlider from "@/app/components/ModalSlider";
import Button from "@/app/components/Button";
import { eventsData } from "../eventsData";

function EventDetailPage() {
  const params = useParams();
  const event = eventsData.find((e) => e.id === params.id);
  const [isSliderOpen, setIsSliderOpen] = useState(false


  );

  if (!event) return <div>Event not found</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-20 px-4 relative pt-40">
      <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
      <img
        src={event.image}
        alt={event.title}
        className="w-full max-w-4xl rounded-xl mb-6"
      />
      <p className="max-w-3xl text-lg mb-8">{event.description}</p>
      <button className="h-[46px] w-[240] bg-white text-black rounded-full text-sm px-10"  onClick={() => setIsSliderOpen(true)} >
        view more
      </button>

      {/* Render modal slider in the same DOM tree */}
      {isSliderOpen && (
        <ModalSlider
          images={event.gallery}
          onClose={() => setIsSliderOpen(false)}
        />
      )}
    </div>
  );
}

export default EventDetailPage;
