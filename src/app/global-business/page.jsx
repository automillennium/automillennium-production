"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useEffect, useRef } from "react";

// import AnimatedTitle from "../components/AnimatedTitle";

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
          src="/img/global-white.png"
          alt="VTX Logo"
          className="page-logo h-[300px] w-[400px] object-contain"
        />

        <div className="text-center text-white text-[20px] pb-10 max-w-[800px]">
          <p className="page-logo">
Visit our Car Care Clinic today!
Our services include, window tinting, interior & exterior detailing,
paint protection film, ceramic coating, rust-proofing, water printing,
vinyl wrapping, etc. using the best quality products
          </p>
        </div>
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
            <p className="text-white text-lg font-light">Loading ...</p>
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
              src="https://automillennium.com/wp-content/uploads/2022/02/Autoclinic_Web_Video.mp4" 
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
    </div>
  );
};

export default Page;