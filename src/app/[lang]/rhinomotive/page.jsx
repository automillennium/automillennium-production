

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

  // Video Handlers (Kept original logic)
  const handleVideoError = () => {
    console.error("Video failed to load");
    setLoading(false);
    setVideoError(true);
  };
  const retryVideoLoad = () => {
    setLoading(true);
    setVideoError(false);
    const video = videoRef.current;
    if (video) video.load();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use a function to check readiness
    const onReady = () => {
        if (video.readyState >= 3) {
            setLoading(false);
        }
    };

    const readyEvents = ['loadeddata', 'canplay', 'canplaythrough'];
    readyEvents.forEach(e => video.addEventListener(e, onReady));
    video.addEventListener('error', handleVideoError);

    // Fallback timeout in case video stalls
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

  // GSAP Animations (Kept original logic and added fade-scroll to new content)
  useGSAP(() => {
    // 1. Fade in logo/intro text on load
    gsap.fromTo(
      ".page-intro-element", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", stagger: 0.1, delay: 0.8 }
    );

    // 2. Video clip animation (UNCHANGED)
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center", // Kept original end
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
    clipAnimation.to(".mask-clip-path", { width: "100vw", height: "100%", borderRadius: 0 });

    // 3. General Scroll Fade Animation
    gsap.utils.toArray(".fade-scroll").forEach(el => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // Kept original start
            end: "bottom 20%", // Kept original end
            scrub: true,
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
            src="/img/rhino-white.png" 
            alt="RHINOMOTIVE Logo" 
            className="page-intro-element  h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain" 
          />

          {/* Title and Intro Text */}
          <div className="text-center max-w-5xl mx-auto mt-10">
            <h1 className="page-intro-element text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Automotive Supremacy. <span className="text-gray-400">Pro-Series Solutions.</span>
            </h1>
            <p className="page-intro-element text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto">
              **RHINOMOTIVE** is the one-stop solution for all your automotive aftermarket products. Step into the world of automotive supremacy with our **game-changing** pro-series car care, bodyshop, and service solutions. Choosing us delivers exceptional quality and performance, setting you among the professionals.
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
            <video ref={videoRef} autoPlay loop muted playsInline preload="metadata" poster="/img/video-poster.jpg" className="absolute left-0 top-0 w-full h-full object-cover object-center">
              <source src="/videos/rhinomotive-brand.webm" type="video/webm" />
              <source src="https://automillennium.com/wp-content/uploads/2023/03/RHINOMOTIVE-BRAND.mp4" type="video/mp4" />
              <p className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Your browser doesn't support HTML5 video.
              </p>
            </video>
            {videoError && (
              <div className="absolute left-0 top-0 w-full h-full object-cover object-center bg-cover bg-center" style={{ backgroundImage: "url('/img/video-poster.jpg')" }} />
            )}
          </div>
        </div>
      </div>
      
      {/* === Divisions Section (Beautified Cards) === */}
      <section className="px-6 lg:px-20 py-24 max-w-7xl mx-auto">
        <h2 className="text-white text-center text-4xl md:text-6xl font-bold mb-16 fade-scroll">
          PRODUCT DIVISIONS
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "CAR CARE", text: "A wide range of the latest tech unbeatable car care products." },
            { title: "SERVICE", text: "World-class OEM-approved mechanical products and exceptionally detailed Minor & Major service packages." },
            { title: "BODYSHOP", text: "A comprehensive solution for collision repair, powered by advanced technology." },
            { title: "TYRE REPAIR", text: "Innovative materials and the latest technology to elevate your driving experience and extend tyre life." },
          ].map((div, i) => (
            <div 
              key={i} 
              className="fade-scroll rounded-3xl p-8 bg-zinc-900 border border-zinc-800 shadow-xl text-white transition duration-300 hover:bg-zinc-800/80 hover:shadow-cyan-500/10"
            >
              <h3 className="text-2xl font-bold mb-3 text-center text-cyan-400">
                {div.title}
              </h3>
              <p className="text-center text-gray-300">{div.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Vision / Mission / Values (Beautified Typography) === */}
      <div className="max-w-7xl mx-auto">
        {[
          {
            title: "OUR VISION",
            text: "Becoming the world’s number one brand that provides solutions for the automotive industry.",
          },
          {
            title: "OUR MISSION",
            text: "To provide superior quality products and services that exceeds our customer expectations.",
          },
          {
            title: "OUR VALUES",
            text: "We believe that our clients are our business partners, providing them the best possible products & services will benefit them and consequently reflect on our business.",
          },
        ].map((sec, i) => (
          <section
            key={i}
            className="px-6 lg:px-20 py-16 fade-scroll text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-400">
              {sec.title}
            </h2>
            <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-snug">
              {sec.text}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Page;