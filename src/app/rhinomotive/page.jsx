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

  // Handle video ready (first frame loaded)
  const handleVideoReady = () => {
    setLoading(false);
  };

  useEffect(() => {
    const video = videoRef.current;

    // If video already has enough data
    if (video && video.readyState >= 2) {
      setLoading(false);
    } else if (video) {
      video.addEventListener("loadeddata", handleVideoReady);
    }

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleVideoReady);
      }
    };
  }, []);

  useGSAP(() => {
    // Fade in logo on page load
    gsap.fromTo(
      ".page-logo",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
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
    <div id="about" className="min-h-screen w-screen bg-black">
      <div className="relative mb-8 flex flex-col items-center gap-3 pt-36">
        {/* Logo with fade-in animation */}
        <img
          src="/img/rhino-white.png"
          alt="VTX Logo"
          className="page-logo h-[300px] w-[400px] object-contain"
        />

        <div className="text-center text-white text-[20px] pb-10 max-w-[800px]">
          <p className="page-logo">
            RHINOMOTIVE is an industry GAME CHANGER and the only automotive brand
            in the world that offers a one-stop automotive solution with 1000+ products.
            What makes RHINOMOTIVE the best brand in the market is that it offers an
            extensive high-quality automotive aftermarket product portfolio and a complete
            integrated, efficient workflow system that reduces cost, increases profit margins,
            productivity & efficiency.
          </p>
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
            src="https://automillennium.com/wp-content/uploads/2023/07/rhinomotive-brand-mp4-2.mp4"
            poster="/img/video-poster.jpg" // fallback image while loading
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute left-0 top-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
