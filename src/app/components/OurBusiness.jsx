

"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurBusiness = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const businessData = [
    {
      image: "/img/business/vtx.png",
      text: "<b>Vehicle Transformation Experts</b> customize entry level vehicles, transforming them into premium trims, in our state-of-the-art modification factories located in the UAE, India and soon to open in the Kingdom of Saudi Arabia (KSA).",
    },
    {
      image: "/img/business/rhino.png",
      text: "<b>Rhinomotive</b> is a global brand, the only ONE-STOP SOLUTION brand with over 500+ products for all automotive care and aftermarket requirements.",
    },
    {
      image: "/img/business/auto-care.png",
      text: "<b>Autocare360</b> is the Heart of the Automotive industry by providing its dealers with additional incremental profit opportunities for their Service and Sales departments by offering them numerous value-added products and services which will greatly enhance their revenues. These products primarily focus on window tint options, paint protection film, nano ceramic, polishing & detailing along with 20+ additional products and services.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (businessData.length + 0.5)}`,
          scrub: 1,
          pin: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        tl.fromTo(
          card,
          { y: 50, scale: 0.9, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
          i * 0.8
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[100vh] w-full bg-black flex items-center justify-center"
    >
      {businessData.map((card, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="absolute w-[75vw] h-[65vh] flex flex-col md:flex-row justify-center items-center
                     !bg-white text-black shadow-2xl rounded-2xl overflow-hidden opacity-0"
        >
          {/* Text Section */}
          <div className="md:w-1/2 p-8 md:pr-12 text-center md:text-left">
            <p
              className="text-gray-800 text-[13px] md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: card.text }}
            />
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center md:justify-end p-6">
            <img
              src={card?.image}
              alt={`Business ${index + 1}`}
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurBusiness;
