"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import EmblaCarousel from "@/app/components/EmblaCarousal";
import TestimonialsSection from "@/app/components/Testmonials";

// --- GSAP Setup ---
gsap.registerPlugin(ScrollTrigger);

// --- Data Constants ---
const PROJECT_BRANDS_CATEGORIES = [
  {
    category: "Luxury Brands",
    links: [
      { name: "Rolls Royce", link: "/projects/rolls-royce" },
      { name: "Bentley", link: "/projects/bentley" },
      { name: "Mclaren", link: "/projects/mclaren" },
      { name: "Aston Martin", link: "/projects/aston-martin" },
      { name: "Porsche", link: "/projects/porsche" },
      { name: "Mercedes", link: "/projects/mercedes" },
      { name: "Jeep", link: "/projects/jeep" },
    ],
  },
  {
    category: "Premium Brands",
    links: [
      { name: "Alfa Romeo", link: "/projects/alfa-romeo" },
      { name: "Hummer", link: "/projects/hummer" },
      { name: "Tesla", link: "/projects/tesla" },
      { name: "Ineos", link: "/projects/ineos" },
      { name: "Corvette", link: "/projects/corvette" },
      { name: "Lexus", link: "/projects/lexus" },
      { name: "Genesis", link: "/projects/genesis" },
    ],
  },
  {
    category: "Volume Brands",
    links: [
      { name: "Land Rover", link: "/projects/land-rover" },
      { name: "Kia", link: "/projects/kia" },
      { name: "Hyundai", link: "/projects/hyundai" },
      { name: "Mg", link: "/projects/mg" },
      { name: "Toyota", link: "/projects/toyota" },
      { name: "Nissan", link: "/projects/nissan" },
      { name: "Ford", link: "/projects/ford" },
    ],
  },
];

const EMBLA_OPTIONS = { loop: true };
const EMBLA_SLIDES = [
  "/videos/delivery-one.mp4",
  "/videos/delivery-one.mp4",
  "/videos/delivery-one.mp4",
  "/videos/delivery-one.mp4",
  "/videos/delivery-one.mp4",
  "/videos/delivery-one.mp4",
];
const VIDEO_URL = "https://automillennium.com/wp-content/uploads/2022/03/RetroFit-Final.mp4";
const FALLBACK_POSTER_URL = "/img/vtx-fallback-poster.jpg";
const LOGO_URL = "/img/rox-white.png";

// --- Main Component ---
const Page = () => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const pageContainer = useRef(null);
  
  // Refs for the new scroll animations
  const heroTextRef = useRef(null);
  const categoriesTitleRef = useRef(null);
  const projectsTitleRef = useRef(null);

  /**
   * Effect for robust video loading state management. (Unchanged from previous version)
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReadyState = () => {
      if (video.readyState >= 4) {
        setIsVideoReady(true);
      }
    };

    const handleError = (e) => {
      console.error("Video failed to load or encountered an error:", e);
      setIsVideoReady(true);
      setVideoError(true);
    };

    const readyEvents = ['loadeddata', 'canplaythrough', 'error'];

    readyEvents.forEach((event) => {
      if (event === 'error') {
        video.addEventListener(event, handleError);
      } else {
        video.addEventListener(event, handleReadyState);
      }
    });

    if (video.readyState >= 4) {
      setIsVideoReady(true);
    }

    return () => {
      readyEvents.forEach((event) => {
        if (event === 'error') {
          video.removeEventListener(event, handleError);
        } else {
          video.removeEventListener(event, handleReadyState);
        }
      });
    };
  }, []);

  const retryVideoLoad = () => {
    setIsVideoReady(false);
    setVideoError(false);
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(e => console.error("Video play failed on retry:", e));
    }
  };

  /**
   * useGSAP for all animations.
   */
  useGSAP(() => {
    // 1. Initial Logo Fade-In (Not scroll-based)
    gsap.fromTo(
      ".page-logo",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
    );

    // 2. Hero Text Fade-Out on Scroll
    if (heroTextRef.current) {
        gsap.to(heroTextRef.current, {
            opacity: 0,
            y: -50,
            ease: "power1.in",
            scrollTrigger: {
                trigger: heroTextRef.current,
                start: "top top+=150", // Start fading as it hits near the top
                end: "bottom top",    // Fully faded out when the bottom leaves the top
                scrub: 1,             // Smoothly link the animation to the scroll position
            }
        });
    }

    // 3. Section Title Fade-In Animations
    const titles = [categoriesTitleRef.current, projectsTitleRef.current];
    titles.forEach(title => {
        if (title) {
            gsap.fromTo(title, {
                opacity: 0,
                y: 50,
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top bottom-=100", // Start animation when the element is 100px above the viewport bottom
                    toggleActions: "play none none none", // Play once
                }
            });
        }
    });

    // 4. Clip Animation (Unchanged)
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800",
        scrub: 0.5,
        pin: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100%",
      borderRadius: 0,
      ease: "power2.inOut",
    });

    ScrollTrigger.refresh(true);
  }, { scope: pageContainer });

  return (
    <div id="about" ref={pageContainer} className="min-h-screen w-screen bg-black">

      {/* Loading & Error States (Unchanged) */}
      {!isVideoReady && !videoError && (
        <div className="flex-center fixed inset-0 z-[100] h-dvh w-screen bg-black">
          <div className="flex flex-col items-center gap-6">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
            <p className="text-white text-lg font-light">Loading ...</p>
          </div>
        </div>
      )}

      {videoError && (
        <div className="flex-center fixed inset-0 z-[100] h-dvh w-screen bg-gray-900">
          <div className="text-center text-white max-w-md mx-4">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Video Failed to Load</h3>
              <p className="text-gray-300">There was a problem loading the background video.</p>
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

      {/* Video Section (Unchanged) */}
      <div className="relative w-full h-screen">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          poster={FALLBACK_POSTER_URL}
        >
          <source src={VIDEO_URL} type="video/mp4" />
          <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Your browser doesn't support HTML5 video.
          </p>
        </video>

        {videoError && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${FALLBACK_POSTER_URL})` }}
          />
        )}
      </div>

      {/* Hero Section with Fade-Out Text */}
      <div 
        ref={heroTextRef} // Ref to target the entire text block for fade-out
        className="relative mb-0 flex flex-col items-center gap-4 pt-48 pb-20"
      >
        
        {/* Logo with fade-in animation (Class: page-logo) */}
        <img
          src={LOGO_URL}
          alt="VTX Logo"
          className="page-logo h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain"
        />

        {/* Descriptive Text (Class: page-logo used for initial fade-in) */}
        <div className="text-center text-white text-2xl font-light leading-snug pb-10 max-w-[600px] px-4">
            <p className="page-logo text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto">
             Fix accessories not fixed by the manufacturer such as wireless chargers,
             parking sensors, rear entertainment systems, etc.
             for added value and comfort.
          </p>
        </div>
      </div>

      {/* Section Divider (Unchanged) */}
      <hr className="border-t border-gray-800" />

      {/* Project Brands Categories Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Categories Title with Fade-In Animation */}
          <h2 
            ref={categoriesTitleRef} // Ref for fade-in animation
            className="text-5xl sm:text-7xl text-white text-center md:text-[56px] leading-[1.0714285714] font-semibold tracking-[-0.005em] font-sans mb-16"
          >
            Explore Our Innovations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECT_BRANDS_CATEGORIES.map((categoryData, catIndex) => (
              <div
                key={catIndex}
                // Using a utility class 'scroll-fade-in' for all category cards
                className="scroll-fade-in p-6 bg-gradient-to-b from-[#1D1D1F] to-[#0F0F0F] rounded-3xl border border-[#2C2C2E] shadow-lg hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:translate-y-[-4px]"
              >
                <div className="flex flex-col">
                  {categoryData.links.map((link, linkIndex) => (
                    <a
                      href={link.link}
                      key={linkIndex}
                      className={`
                        group relative flex items-center justify-between w-full text-[17px] font-light py-5 px-4
                        text-white/90 hover:text-white transition-all duration-300 ease-out
                        ${linkIndex > 0 ? 'border-t border-white/[0.08]' : ''}
                        hover:bg-white/[0.05] rounded-xl
                      `}
                    >
                      <span className="tracking-tight">{link.name}</span>
                      <span className="text-white/50 group-hover:text-white/80 text-lg font-light transition-all duration-300 ease-out group-hover:translate-x-0.5">
                        ›
                      </span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider (Unchanged) */}
      <hr className="border-t border-gray-800" />

      {/* Premium Featured Projects Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Projects Title with Fade-In Animation */}
          <h2 
            ref={projectsTitleRef} // Ref for fade-in animation
            className="text-5xl sm:text-7xl text-white text-center md:text-[56px] leading-[1.0714285714] font-semibold tracking-[-0.005em] font-sans mb-16"
          >
            From Vision to Reality
          </h2>
          <EmblaCarousel slides={EMBLA_SLIDES} options={EMBLA_OPTIONS} />
        </div>
      {/* Premium Featured Projects Section */}
        <div className="max-w-7xl mx-auto">
          {/* Projects Title with Fade-In Animation */}
          <h2 
            ref={projectsTitleRef} // Ref for fade-in animation
            className="text-5xl sm:text-7xl text-white text-center md:text-[56px] leading-[1.0714285714] font-semibold tracking-[-0.005em] font-sans mb-16"
          >
            Testmonials
          </h2>
          <TestimonialsSection/>
        </div>
      </section>
    </div>
  );
};

export default Page;