
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useEffect, useRef } from "react";
import EmblaCarousel from "@/app/components/EmblaCarousal";
// Removed motion and AnimatePresence imports as they are no longer needed
// import { motion, AnimatePresence } from "framer-motion";

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


const projectBrandsCategories = [
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

const OPTIONS = { loop: true  }
const SLIDES = ["/videos/PPF.mp4","/videos/PPF.mp4","/videos/PPF.mp4","/videos/PPF.mp4","/videos/PPF.mp4","/videos/PPF.mp4"]

  return (
    <div id="about" className="min-h-screen w-screen bg-black">
      {/* Revised Hero Section for Apple-like Alignment and Sizing */}
      <div className="relative mb-0 flex flex-col items-center gap-4 pt-48 pb-20"> {/* Increased padding, reduced margin */}
        
        {/* Logo with fade-in animation - Made significantly smaller */}
        <img
          src="/img/rox-white.png"
          alt="VTX Logo"
          // Reduced size of the logo for a more elegant, subtle presentation
            className="page-logo  h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain" 
        />



        {/* Descriptive Text - Smaller, Thinner, and more spaced out */}
        <div className="text-center text-white text-2xl font-light leading-snug pb-10 max-w-[600px] px-4">
            <p className="page-logo text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto">
             {/* Thinner font and slightly smaller size */}
             Fix accessories not fixed by the manufacturer such as wireless chargers,
             parking sensors, rear entertainment systems, etc.
             for added value and comfort.
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
              src="https://automillennium.com/wp-content/uploads/2022/03/RetroFit-Final.mp4" 
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



<section className="py-32 px-4 sm:px-6 lg:px-8 bg-black"> {/* True black background like Apple */}
  <div className="max-w-7xl mx-auto">
    
    {/* Apple-style typography: Ultra-thin, tight tracking, perfect hierarchy */}
    <h2 className="text-5xl sm:text-7xl lg:text-8xl font-thin text-white mb-20 text-center tracking-tight leading-[1.1]">
      Explore Our Innovations
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projectBrandsCategories.map((categoryData, catIndex) => (
        <div
          key={catIndex}
          // Apple card aesthetic: Subtle dark gradient, perfect border, refined shadows
          className="p-6 bg-gradient-to-b from-[#1D1D1F] to-[#0F0F0F] rounded-3xl border border-[#2C2C2E] shadow-lg hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:translate-y-[-4px]"
        >
          <div className="flex flex-col">
            {categoryData.links.map((link, linkIndex) => (
              <a
                href={link.link}
                key={linkIndex}
                // Apple link styling: Perfect spacing, subtle interactions, premium feel
                className={`
                  group relative flex items-center justify-between w-full text-[17px] font-light py-5 px-4
                  text-white/90 hover:text-white transition-all duration-300 ease-out
                  ${linkIndex > 0 ? 'border-t border-white/[0.08]' : ''}
                  hover:bg-white/[0.05] rounded-xl
                `}
              >
                {/* Apple-style text with perfect kerning */}
                <span className="tracking-tight">{link.name}</span>
                
                {/* Apple chevron - subtle but precise */}
                <span className="text-white/50 group-hover:text-white/80 text-lg font-light transition-all duration-300 ease-out group-hover:translate-x-0.5">
                  ›
                </span>
                
                {/* Subtle hover background effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* ------------------------------------------------------------------- */}


{/* --- Apple-Style Premium Featured Projects Section --- */}
<section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
  <div className="max-w-7xl mx-auto">
    
    {/* Apple Heading: Large, thin, crisp, high-contrast. */}
    <h2 className="text-5xl sm:text-7xl font-normal text-white mb-20 text-center tracking-tighter leading-none">
      From Vision to Reality
    </h2>




    <EmblaCarousel slides={SLIDES} options={OPTIONS} />


  </div>
</section>
    </div>
  );
};

export default Page;