// import React from 'react'

// function page() {

// // src="https://automillennium.com/wp-content/uploads/2023/08/VTX.mp4"

//   return (
//     <div>vtl</div>
//   )
// }

// export default page




"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useEffect, useRef } from "react";

import AnimatedTitle from "../components/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  // Handle video loading state
  const handleVideoReady = () => {
    setLoading(false);
  };

  useEffect(() => {
    const video = videoRef.current;

    // if already cached and ready
    if (video && video.readyState >= 3) {
      setLoading(false);
    } else if (video) {
      video.addEventListener("canplaythrough", handleVideoReady);
    }

    return () => {
      if (video) {
        video.removeEventListener("canplaythrough", handleVideoReady);
      }
    };
  }, []);

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "120vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen bg-black ">
      <div className="relative mb-8 flex flex-col items-center gap-5 pb-36">
      
        {/* <AnimatedTitle
          title="Discover the world’s <br /> largest shared <b>r</b>ide"
          containerClass="mt-5  text-center !text-white"
        /> */}

        <img src="/img/vtx-white.png" alt="" className="h-[200px] w-[400px] object-contain"/>

        <div className="about-subtext">
          <p>The Ride of Rides begins—your car, now an epic masterpiece</p>
          <p className="text-gray-500">
            Automillennium unites every enthusiast from countless garages and streets, both digital and real, into a unified Car Culture
          </p>
        </div>
      </div>

      {/* Loader while video loads */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div className="h-dvh w-screen relative bg-black" id="clip">
        <div className="mask-clip-path about-image">
          <video
            ref={videoRef}
            src="https://automillennium.com/wp-content/uploads/2023/08/VTX.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
