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
    // Fade in logo on page load
    gsap.fromTo(
      ".page-logo",
      { opacity: 0, y: 50 }, // start hidden and slightly down
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 } // fade in nicely
    );

    // Clip scroll animation
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
      height: "100%",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen bg-black ">
      <div className="relative mb-8 flex flex-col items-center gap-3 pt-36">
        {/* Logo with fade-in animation */}
        <img
          src="/img/vtx-white.png"
          alt="VTX Logo"
          className="page-logo h-[300px] w-[400px] object-contain"
        />

        <div className="text-center text-white text-[20px] pb-10">
          <p className="page-logo">Automotive Upgrades & customization Factory

</p>
          {/* <p className="text-gray-500">
            Automillennium unites every enthusiast from countless garages and streets,
            both digital and real, into a unified Car Culture
          </p> */}
        </div>
      </div>

      {/* Loader while video loads */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-black">
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
