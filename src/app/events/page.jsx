"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { eventsData } from "./eventsData";
import { Separator } from "@radix-ui/react-separator";
// import Button from "../../components/Button";


function EventsPage() {
  const [visibleCount, setVisibleCount] = useState(3);
  const router = useRouter();

  const handleSeeMore = () => setVisibleCount(eventsData.length);
  const handleEventClick = (id) => router.push(`/events/${id}`);

  return (
    <div className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 mt-20">
          <h1 className="text-4xl font-bold text-white mb-4">Events</h1>
<Separator className="w-full h-px bg-gray-500 my-8" />

          <p className="text-white text-lg max-w-2xl mx-auto">
            Discover upcoming events and experiences crafted for memorable moments.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {eventsData.slice(0, visibleCount).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
              onClick={() => handleEventClick(event.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
                  <div className="text-2xl font-bold text-gray-900">{event.date}</div>
                  <div className="text-sm text-gray-600 font-medium">{event.month}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < eventsData.length && (
          <div className="text-center">
            <button
              onClick={handleSeeMore}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 shadow-sm"
            >
              <span>See more events</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
