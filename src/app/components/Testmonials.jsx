"use client";

import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll"; // 👈 using AutoScroll instead of Autoplay

// --- 1. Demo Data ---
const DEMO_TESTIMONIALS = [
  {
    quote:
      "Switching to this system was the easiest decision we made all year. The clean interface and seamless integration are exactly what we needed to simplify our workflow.",
    author: "Alex Thompson",
    title: "Chief Innovation Officer, TechNova",
  },
  {
    quote:
      "The attention to detail in the design is truly remarkable. It feels premium, effortless, and is a joy to use. It raises the bar for all our internal tools. This is a longer quote to test the height consistency.",
    author: "Dr. Evelyn Reed",
    title: "Lead UX Designer, Zenith Labs",
  },
  {
    quote:
      "Our productivity has soared since implementing this platform. It just works—without any fuss or complicated setups.",
    author: "Marcus Chen",
    title: "Director of Product, Solstice AI",
  },
  {
    quote:
      "Absolutely blown away by the performance and thoughtful design. It’s rare to find a tool that genuinely enhances my daily workflow.",
    author: "Sarah Kim",
    title: "Product Manager, Innovate Inc.",
  },
];

// --- 2. Testimonial Card Component ---
const TestimonialCard = ({ quote, author, title }) => (
  <div className="embla__slide testmonial w-80 flex-shrink-0 p-8 md:p-10 bg-black rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/30 h-full min-h-[25rem] flex flex-col justify-between">
    <blockquote className="text-xl md:text-2xl font-semibold italic text-white leading-snug tracking-tight">
      “{quote}”
    </blockquote>
    <div className="mt-8 pt-6 border-t border-gray-700 flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-100 tracking-wider">
          {author}
        </p>
        <p className="text-sm font-light text-gray-400 tracking-widest uppercase mt-1">
          {title}
        </p>
      </div>
    </div>
  </div>
);

// --- 3. Main Carousel Section ---
const TestimonialsSection = ({ testimonials = DEMO_TESTIMONIALS }) => {
  const sectionRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Initialize Embla with AutoScroll plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "keepSnaps",
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 1.5, // 👈 controls scroll speed (increase for faster)
        stopOnInteraction: false,
        stopOnMouseEnter: true, // 👈 will pause on hover
      }),
    ]
  );

  // --- Visibility Observer ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  // --- Start/Stop scrolling based on visibility ---
  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;

    if (isIntersecting && !isHovering) {
      autoScroll.play();
    } else {
      autoScroll.stop();
    }
  }, [emblaApi, isIntersecting, isHovering]);

  return (
    <section
      ref={sectionRef}
      className="py-2 md:py-6 bg-black overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white text-center tracking-tighter">
Built for people who love great design.        </h2>
        <p className="mt-4 text-xl text-gray-400 text-center font-light tracking-wide max-w-3xl mx-auto">
          Don’t just take our word for it. Hear from those who use our product
          every day.
        </p>

        {/* Embla Carousel */}
        <div className="mt-16 relative">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex space-x-8 lg:px-8 pb-6 items-stretch">
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} {...t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
