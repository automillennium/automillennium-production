
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // Video Handlers (UNCHANGED)
  const handleVideoError = () => {
    console.error("Video failed to load");
    setLoading(false);
    setVideoError(true);
  };
  const retryVideoLoad = () => {
    setLoading(true);
    setVideoError(false);
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
        if (video.readyState >= 3) {
            setLoading(false);
        }
    };

    const readyEvents = ['loadeddata', 'canplay', 'canplaythrough'];
    readyEvents.forEach(e => video.addEventListener(e, onReady));
    video.addEventListener('error', handleVideoError);

    // Fallback timeout
    const loadTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        console.warn("Video loading timeout");
      }
    }, 10000);

    if (video.readyState >= 3) setLoading(false);

    // Cleanup
    return () => {
      readyEvents.forEach(e => video.removeEventListener(e, onReady));
      video.removeEventListener('error', handleVideoError);
      clearTimeout(loadTimeout);
    };
  }, [loading, videoError]);

  // GSAP Animations (UNCHANGED)
  useGSAP(() => {
    // Fade in logo
    gsap.fromTo(
      ".page-logo",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
    );

    // Set up the ScrollTrigger animation
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

    // Fade-in for scroll elements (to apply to new text sections)
    gsap.utils.toArray(".fade-scroll").forEach(el => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 1.5,
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });


    ScrollTrigger.refresh(true);
  });

  return (
    <div className="bg-black">
      {/* === Hero/Intro Section (Beautified) === */}
      <div id="about" className="min-h-screen w-screen bg-black">
        <div className="relative flex flex-col items-center pt-40 pb-20 px-4 md:px-8">
          
          {/* Logo */}
          <img
            src="/img/lusso-logo.webp"
            alt="Lusso Logo"
            className="page-logo  h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain" 
          />

          <div className="text-center max-w-5xl mx-auto mt-10">
            <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight page-logo">
                Global Luxury Mobility Solutions
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto page-logo">
              LUSSO offers a one-stop solution across the entire automotive spectrum—from Vehicle Transformation** and mass customization to premium Bespoke Luxury and service.
            </p>
          </div>
        </div>

        {/* === Loading Overlay (Beautified) === */}
        {loading && (
          <div className="flex justify-center items-center fixed z-[100] h-dvh w-screen bg-black transition-opacity duration-500">
            <div className="flex flex-col items-center gap-6">
              <div className="three-body">
                <div className="three-body__dot bg-white"></div>
                <div className="three-body__dot bg-white"></div>
                <div className="three-body__dot bg-white"></div>
              </div>
              <p className="text-white text-lg font-light">Loading experience...</p>
            </div>
          </div>
        )}

        {/* === Error State Overlay (Beautified) === */}
        {videoError && (
          <div className="flex justify-center items-center fixed z-[100] h-dvh w-screen bg-zinc-900">
            <div className="text-center text-white max-w-md mx-4 p-8 rounded-xl bg-zinc-800 border border-zinc-700">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Video Failed to Load</h3>
                <p className="text-gray-300">There was a problem loading the video content.</p>
              </div>
              <button onClick={retryVideoLoad} className="px-8 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors font-medium">
                Retry Loading
              </button>
            </div>
          </div>
        )}

        {/* === Video Section (UNCHANGED PER REQUEST) === */}
        <div className="h-dvh w-screen relative bg-black" id="clip">
          <div className="mask-clip-path about-image">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute left-0 top-0 w-full h-full object-cover object-center"
            >
              <source 
                src="/videos/rhinomotive-brand.webm" 
                type="video/webm" 
              />
              <source 
                src="/videos/losso.mp4" 
                type="video/mp4" 
              />
              <p className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Your browser doesn't support HTML5 video.
              </p>
            </video>
            
            {videoError && (
              <div 
                className="absolute left-0 top-0 w-full h-full object-cover object-center bg-cover bg-center"
                style={{ backgroundImage: "url('/img/video-poster.jpg')" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* === OUR STORY & PHILOSOPHY Sections (Beautified) === */}
      <div className="max-w-7xl mx-auto py-24 px-6 lg:px-20">
        
        {/* OUR STORY */}
        <section className="text-center text-white mb-20 fade-scroll">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-400">
            OUR STORY
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 leading-snug">
            LUSSO DESIGNS INDIA PVT LTD** is a leading global luxury mobility solutions provider specializing in vehicle transformation and customization. Lusso offers a one – stop solution across the entire automotive spectrum - from **vehicle transformation and mass customization to premium bespoke luxury and services** that exemplify excellence and sophistication.
          </p>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-snug">
            As a leading multinational corporation in the field of vehicle transformation, with over **500,000 delighted customers** across India, the Middle East, and Western Europe—and a legacy of **more than 50 years**—we continue to redefine innovation, craftsmanship, and mobility.
          </p>
        </section>

        {/* PHILOSOPHY */}
        <section className="text-center text-white fade-scroll">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-400">
            PHILOSOPHY
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-snug">
            At LUSSO DESIGNS, we redefine luxury through **precision, innovation, and artistry**. Each creation reflects individuality, blending cutting-edge technology with timeless elegance. Driven by a passion for craftsmanship—our state-of-the-art design studios, led by seasoned designers and supported by masterful craftsmen—ensure every creation reflects **precision, passion, and innovation**. For us, luxury is more than design; it is an experience of timeless elegance.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Page;