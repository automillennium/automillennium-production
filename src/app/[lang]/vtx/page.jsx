"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useEffect, useRef, useCallback } from "react";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  // ----------------------------------------------------
  // STATE MANAGEMENT
  // ----------------------------------------------------
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // ----------------------------------------------------
  // REFS
  // ----------------------------------------------------
  const videoRef = useRef(null);
  const pageContainer = useRef(null);
  const scrollTriggerInstances = useRef([]); // To store and clean up batch ScrollTriggers

  // ----------------------------------------------------
  // VIDEO HANDLERS
  // ----------------------------------------------------

  // Handles video loading success (when it can play without buffering)
  const handleVideoReady = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
      ScrollTrigger.refresh(true);
    }, 500);
  }, []);

  // Handles video loading failure
  const handleVideoError = useCallback(() => {
    console.error("Main video failed to load. Falling back.");
    setVideoError(true);
    setLoading(false);
    ScrollTrigger.refresh(true);
  }, []);

  // Allows user to retry loading the video (in case of error)
  const retryVideoLoad = () => {
    setVideoError(false);
    setLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };


  // ----------------------------------------------------
  // INITIAL VIDEO CHECK (for cached videos)
  // ----------------------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 3) {
        handleVideoReady();
      } else {
        video.addEventListener("canplaythrough", handleVideoReady);
        video.addEventListener("error", handleVideoError);
      }
    }

    return () => {
      if (video) {
        video.removeEventListener("canplaythrough", handleVideoReady);
        video.removeEventListener("error", handleVideoError);
      }
    };
  }, [handleVideoReady, handleVideoError]);


  // ----------------------------------------------------
  // GSAP ANIMATIONS
  // ----------------------------------------------------
  useGSAP(() => {
    const context = gsap.context(() => {
      // Ensure all previous ScrollTriggers are killed
      scrollTriggerInstances.current.forEach(t => t.kill());
      scrollTriggerInstances.current = [];

      // --- Initial Animations (Logo & Intro Text) ---
      gsap.fromTo(
        ".page-logo-img",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
      );
      // Ensure intro text also fades in initially
      gsap.fromTo(
        ".page-intro-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1, delay: 1.5 }
      );


      // --- SCROLL ANIMATIONS (Fade in when scroll and fade out also) ---

      // Target all elements marked for scroll animation
      const textElements = gsap.utils.toArray(".fade-scroll");

      // Set initial state for scroll-triggered elements
      gsap.set(textElements, { opacity: 0, y: 50 });

      ScrollTrigger.batch(textElements, {
        interval: 0.1, 
        batchMax: 5,   
        onEnter: (batch) => {
          // Fade in: Animate the batch group when scrolling down
          gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out", overwrite: true });
        },
        onLeave: (batch) => {
          // Fade out on leaving viewport downwards
          gsap.to(batch, { opacity: 0, y: -50, duration: 0.75, stagger: 0.1, ease: "power1.in", overwrite: true });
        },
        onEnterBack: (batch) => {
          // Fade in when scrolling back up
          gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out", overwrite: true });
        },
        onLeaveBack: (batch) => {
          // Fade out on leaving viewport upwards
          gsap.to(batch, { opacity: 0, y: 50, duration: 0.75, stagger: 0.1, ease: "power1.in", overwrite: true });
        },
        // Store the ScrollTrigger instances for cleanup
        onInit: (trigger) => scrollTriggerInstances.current.push(trigger),
        // Settings for the ScrollTrigger instance attached to each batch
        start: "top 95%", 
        end: "bottom 5%",
      });

      // Ensure ScrollTrigger refreshes after state changes or content loads
      ScrollTrigger.refresh(true);

    }, pageContainer); // Scope animations to the container

    return () => context.revert(); // Robust cleanup on unmount
  }, [loading]);


  // ----------------------------------------------------
  // RENDER LOGIC
  // ----------------------------------------------------
  const services = [
    {
      title: "Paint Protection Film (PPF)",
      imagePlaceholder: "bg-cyan-500/20",
      videoUrl:"/videos/PPF.mp4",
      items: [
        "Invisible shield against chips, scratches, and debris.",
        "High gloss finish & Self-healing technology.",
        "Custom-cut for precision fit.",
      ],
    },
    {
      title: "Ceramic Coating",
      imagePlaceholder: "bg-blue-500/20",
      videoUrl:"/videos/CERAMIC.mp4",
      items: [
        "Long-lasting hydrophobic protective layer.",
        "Maximum UV resistance & deep gloss shine.",
        "Easy maintenance with anti-dirt properties.",
      ],
    },
    {
      title: "Window Tinting",
      imagePlaceholder: "bg-indigo-500/20",
      videoUrl:"/videos/TINT.mp4",
      items: [
        "Superior heat rejection for cabin comfort.",
        "Full UV protection for occupants.",
        "Stylish, privacy-enhancing, and legally compliant shades.",
      ],
    },
    {
      title: "Interior & Exterior Detailing",
      imagePlaceholder: "bg-violet-500/20",
      videoUrl:"/videos/TINT.mp4",
      items: [
        "Deep cleaning and material restoration.",
        "Leather, fabric, and dashboard long-term protection.",
        "Keeps your vehicle fresh inside-out.",
      ],
    },
    {
      title: "Tailored Protection (Custom Packages)",
      imagePlaceholder: "bg-purple-500/20",
      videoUrl:"/videos/TINT.mp4",
      items: [
        "Protection packages customized for your vehicle's needs.",
        "Combine PPF, coating, tinting & detailing for total coverage.",
        "Expert consultation to choose the optimal package.",
      ],
    },
  ];

  return (
    <div className="bg-black" ref={pageContainer}>
      <div id="about" className="min-h-screen w-screen bg-black ">

        {/* Video Section */}
        <div className="relative w-full h-screen">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={handleVideoError}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          >
            <source
              src="https://automillennium.com/wp-content/uploads/2023/08/VTX.mp4"
              type="video/mp4" />
            <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Your browser doesn't support HTML5 video.
            </p>
          </video>

          {/* Fallback Image */}
          {videoError && (
             <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/img/vtx-fallback-poster.jpg')" }}
            />
          )}
        </div>


        {/* Main Content - Fades in once loading is complete */}
        <div className={`relative ${loading ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity duration-500`}>

          <div className="relative flex flex-col items-center pt-40 pb-20 px-4 md:px-8">
            
            {/* Logo (Used for initial animation) */}
            <img
              src="/img/vtx-white.png"
              alt="VTX Logo"
              className="page-logo-img h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain opacity-0" 
            />

            {/* Title and Intro Text (Uses 'page-intro-text' for initial, non-scroll animation) */}
            <div className="text-center max-w-5xl mx-auto mt-10">
              <h1 className="page-intro-text text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Premium Protection. Advanced Technology.
              </h1>
              <p className="page-intro-text text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto">
                VTX is Auto Millennium’s premium line of vehicle protection solutions,
                designed to keep your car looking brand-new while safeguarding it from
                harsh weather, road debris, and everyday wear. Our products combine
                advanced technology with professional application, ensuring your vehicle
                maintains its value, shine, and performance over time.
              </p>
            </div>
          </div>

          {/* === Services Section === */}
          <section className="py-24 px-4 md:px-8 max-w-[90%] mx-auto">
            {/* The Section Header is tagged */}
            <h2 className="fade-scroll text-white text-center text-5xl md:text-6xl font-bold mb-16">
              Our Protection Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-10 justify-center">
              {services.map((service, i) => (
              <div key={i} className="flex flex-col group w-full max-w-[300px] mx-auto"> 
                
                {/* Visual Element (The video container itself is tagged for animation) */}
                <div className={`h-[300px] ${service.imagePlaceholder} rounded-t-3xl border border-zinc-700 flex items-center justify-center overflow-hidden fade-scroll`}>
                  <video
                    src={service?.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>


                {/* Service Details Card (The card body is NOT tagged, but its contents are) */}
                <div
                  className="service-item p-6 bg-zinc-900 border border-zinc-800 rounded-b-3xl shadow-xl transition duration-300 group-hover:shadow-cyan-500/20 group-hover:bg-zinc-800/80 h-[260px]"
                >
                  <h3 className="text-xl font-bold text-white mb-3 fade-scroll">{service.title}</h3>
                  
                  {/* List items are tagged */}
                  <ul className="list-disc text-gray-400 pl-5 text-sm space-y-1"> 
                      {service.items.map((item, j) => (
                        <li key={j} className="fade-scroll">{item}</li> // Tagged LI
                      ))}
                  </ul>
                </div>
              </div>
              ))}
            </div>
          </section>
        </div>


        {/* Loader (Only visible while loading and no video error) */}
        {loading && !videoError && (
          <div className="flex justify-center items-center fixed z-[100] h-dvh w-screen top-0 left-0 bg-black">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        )}

        {/* Error State (Visible only if the video failed to load) */}
        {videoError && (
          <div className="flex justify-center items-center fixed z-[100] h-dvh w-screen top-0 left-0 bg-gray-900">
            <div className="text-center text-white max-w-md mx-4">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Video Failed to Load</h3>
                <p className="text-gray-300">There was a problem loading the video content. Displaying fallback image.</p>
              </div>
              <button
                onClick={retryVideoLoad}
                className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Retry Loading
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Page;