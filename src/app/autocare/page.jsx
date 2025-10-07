"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useEffect, useRef } from "react";

import AnimatedTitle from "../components/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // Handle video ready
  const handleVideoReady = () => {
    setLoading(false);
  };

  // Handle video errors
  const handleVideoError = () => {
    console.error("Video failed to load");
    setLoading(false);
    setVideoError(true);
  };



  // Retry loading video
  const retryVideoLoad = () => {
    setLoading(true);
    setVideoError(false);
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  };

// Remove the useGSAP hook and the separate useEffect hook
// and replace them with a single useEffect hook
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleVideoReady = () => {
    // Check if video is truly ready before setting loading to false
    if (video.readyState >= 3) {
      setLoading(false);
    }
  };

  const handleVideoError = () => {
    console.error("Video failed to load");
    setLoading(false);
    setVideoError(true);
  };

  // Add event listeners for video loading
  const readyEvents = ['loadeddata', 'canplay', 'canplaythrough'];
  readyEvents.forEach(event => {
    video.addEventListener(event, handleVideoReady);
  });
  video.addEventListener('error', handleVideoError);

  // Check initial state
  if (video.readyState >= 3) {
    setLoading(false);
  } else {
    // Fallback timeout
    const loadTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        console.warn("Video loading timeout");
      }
    }, 10000);

    return () => {
      clearTimeout(loadTimeout);
    };
  }

  // Cleanup event listeners
  return () => {
    readyEvents.forEach(event => {
      video.removeEventListener(event, handleVideoReady);
    });
    video.removeEventListener('error', handleVideoError);
  };
}, [loading, videoError]); // Add dependencies

// Now, use a separate useGSAP hook that has no dependencies.
// This hook will be called after the initial render.
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

  // Call ScrollTrigger.refresh() on render
  ScrollTrigger.refresh(true);
});
  return (
    <div id="about" className="min-h-screen w-screen bg-black">
      <div className="relative mb-8 flex flex-col items-center gap-3 pt-36">
        {/* Logo with fade-in animation */}
        <img
          src="/img/autocare-white.png"
          alt="VTX Logo"
            className="page-logo h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain" 
        />

<section class="page-logo py-24 px-4 md:px-8 text-center bg-black">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-snug">
            Welcome to <span class="text-cyan-400">Auto Care 360</span>
        </h1>
        <p class="text-gray-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-10">
            Premium Automotive Services. Trusted Partnerships. Total Care.
        </p>

        <p class="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            Auto Care 360 is a leading automotive service and solutions company known for its **quality, reliability, and customer satisfaction**. We partner with car dealerships to deliver a wide range of services, from **detailing and paint protection to full vehicle preparation**, ensuring every car meets the highest standards before it reaches the customer.
        </p>
    </div>
</section>


      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-black">
          <div className="flex flex-col items-center gap-6">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
            <p className="text-white text-lg font-light">Loading experience...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {videoError && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-gray-900">
          <div className="text-center text-white max-w-md mx-4">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Video Failed to Load</h3>
              <p className="text-gray-300">There was a problem loading the video content.</p>
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

      {/* Video Section */}
      <div className="h-dvh w-screen relative bg-black" id="clip">
        <div className="mask-clip-path about-image">
          {/* Optimized Video with Multiple Sources */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata" // Changed from "auto" to "metadata"
            poster="/img/video-poster.jpg"
            className="absolute left-0 top-0 w-full h-full object-cover object-center"
          >
            {/* Add multiple sources for better browser compatibility */}
            <source 
              src="/videos/rhinomotive-brand.webm" 
              type="video/webm" 
            />
            <source 
              src="https://automillennium.com/wp-content/uploads/2023/08/AUTO-CARE-360-01.mp4" 
              type="video/mp4" 
            />
            {/* Fallback for very old browsers */}
            <p className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Your browser doesn't support HTML5 video. 
            </p>
          </video>
          
          {/* Fallback image if video fails completely */}
          {videoError && (
            <div 
              className="absolute left-0 top-0 w-full h-full object-cover object-center bg-cover bg-center"
              style={{ backgroundImage: "url('/img/video-poster.jpg')" }}
            />
          )}
        </div>
      </div>


<div class="bg-black min-h-screen">
  
  <header class="pt-40 pb-20 px-4 md:px-8 text-center bg-zinc-900/50 backdrop-blur-sm">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-white text-6xl md:text-8xl font-extrabold tracking-tight mb-4 leading-none">
        Driven by <span class="text-gray-400">Excellence.</span>
      </h1>
      <p class="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto mt-8">
        At **Auto Care 360**, our commitment to excellence is at the core of everything we do. We provide premium automotive care through a blend of **innovation, precision, and trust**, extending our expertise across multiple markets and supporting some of the region’s largest dealership networks.
      </p>
    </div>
  </header>

  <section class="py-24 px-4 md:px-8 max-w-7xl mx-auto">
    <h2 class="text-white text-4xl md:text-6xl font-bold text-center mb-16">
      Our Services
    </h2>

    <div class="grid lg:grid-cols-1 gap-8">
      <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl transition duration-300 hover:shadow-cyan-500/10">
        <h3 class="text-3xl font-bold text-white mb-6">
          Complete Car Care Solutions for Dealership Operations
        </h3>
        <p class="text-lg text-gray-400 mb-8 max-w-3xl">
          We add real value by ensuring vehicles are delivered in flawless condition, enhancing customer experience and brand perception. Our services include:
        </p>

        <ul class="grid md:grid-cols-2 gap-x-12 gap-y-4 list-none p-0">
          <li class="text-xl text-white flex items-start group">
            <svg class="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Pre-Delivery Inspection (PDI)
          </li>
          <li class="text-xl text-white flex items-start group">
            <svg class="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Paint Protection Film (PPF) Installation
          </li>
          <li class="text-xl text-white flex items-start group">
            <svg class="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Ceramic Coating & Advanced Protection
          </li>
          <li class="text-xl text-white flex items-start group">
            <svg class="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Interior & Exterior Detailing
          </li>
          <li class="text-xl text-white flex items-start group">
            <svg class="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Custom Finishing and Restoration
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="py-24 px-4 md:px-8 max-w-7xl mx-auto">
    <div class="grid lg:grid-cols-2 gap-10">
      
      <div class="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8 md:p-12 transition duration-300 hover:bg-zinc-800/80">
        <div class="mb-8">
          <span class="text-5xl md:text-7xl font-extrabold text-cyan-400 block leading-none">
            1,000+
          </span>
          <p class="text-xl text-gray-400 font-medium mt-1">
            Skilled Professionals
          </p>
        </div>

        <h3 class="text-4xl font-bold text-white mb-6">
          Powered by People
        </h3>

        <p class="text-lg text-gray-300 mb-8">
          Our team under the Auto Millennium Group umbrella brings together expertise in Automotive Detailing, Bodywork, Quality Control, and Customer Service. This enables us to take on large-scale projects, serving multiple dealerships simultaneously with speed and consistencywithout ever compromising on quality.
        </p>

        <div class="flex flex-wrap gap-2">
          <span class="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Automotive Detailing</span>
          <span class="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Bodywork & Paint</span>
          <span class="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Quality Control</span>
        </div>
      </div>

      <div class="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8 md:p-12 transition duration-300 hover:bg-zinc-800/80">
        <div class="mb-8">
          <span class="text-5xl md:text-7xl font-extrabold text-cyan-400 block leading-none">
            360°
          </span>
          <p class="text-xl text-gray-400 font-medium mt-1">
            Care Philosophy
          </p>
        </div>

        <h3 class="text-4xl font-bold text-white mb-6">
          What Sets Us Apart
        </h3>

        <p class="text-lg text-gray-300 mb-8">
          Our integrated approach aligns seamlessly with dealership operations to deliver long-term value. We don’t just offer services; we create solutions that enhance customer satisfaction, maintain vehicle condition, and strengthen brand reputation.
        </p>

        <div class="flex flex-wrap gap-2">
          <span class="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Enhance Customer Satisfaction</span>
          <span class="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Maintain Vehicle Condition</span>
          <span class="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Strengthen Brand Reputation</span>
        </div>
      </div>
    </div>
  </section>

  <section class="py-24 px-4 md:px-8 text-center">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-white text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
        Built on <span class="text-gray-400">Integrity.</span> Driven by <span class="text-gray-400">Passion.</span>
      </h2>
      <p class="text-gray-300 text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        Auto Care 360 shares the same core values as Auto Millennium: **integrity, teamwork, and excellence**. Our journey is powered by a passion for cars, for service, and for perfection in every detail.
      </p>
    </div>
  </section>
</div>
    </div>
  );
};

export default Page;