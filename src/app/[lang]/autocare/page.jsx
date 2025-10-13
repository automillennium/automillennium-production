

"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const pageContainer = useRef(null);

  // Reset loading when navigating to this page
  useEffect(() => {
    setLoading(true);
    setVideoError(false);

    if (videoRef.current) {
      videoRef.current.load(); // Reload video to trigger events
    }

    // Fallback in case video never fires ready event
    const fallback = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(fallback);
  }, []);

  // Video ready handler
  const handleVideoReady = () => {
    setTimeout(() => setLoading(false), 500); // Slight delay to ensure smooth transition
  };

  // Video error handler
  const handleVideoError = () => {
    console.error("Video failed to load");
    setLoading(false);
    setVideoError(true);
  };

  // Retry video loading
  const retryVideoLoad = () => {
    setLoading(true);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  // GSAP animations
  useGSAP(() => {
    if (loading) return; // Wait until loading finishes

    // Initial Fade-in Logo
    gsap.fromTo(
      ".page-logo-img",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
    );

    // Fade-in main text
    gsap.fromTo(
      ".page-main-text > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1, delay: 1.5 }
    );

    // Scroll-triggered fade animations
    const textElements = gsap.utils.toArray(".fade-in-text");

    ScrollTrigger.batch(textElements, {
      interval: 0.1,
      batchMax: 5,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out", overwrite: true }),
      onLeave: (batch) =>
        gsap.to(batch, { opacity: 0, y: -50, duration: 0.75, stagger: 0.1, ease: "power1.in", overwrite: true }),
      onEnterBack: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out", overwrite: true }),
      onLeaveBack: (batch) =>
        gsap.to(batch, { opacity: 0, y: 50, duration: 0.75, stagger: 0.1, ease: "power1.in", overwrite: true }),
      start: "top 95%",
      end: "bottom 5%",
      onUpdate: (self) => {
        if (self.progress === 0 && self.direction === 1) {
          gsap.set(textElements, { opacity: 0, y: 50 });
        }
      },
    });

    // Initial state for text
    gsap.set(textElements, { opacity: 0, y: 50 });

    ScrollTrigger.refresh(true);
  }, [loading]);

  return (
    <div id="about" ref={pageContainer} className="min-h-screen w-screen bg-black">
      {/* Video Section */}
      <div className="relative w-full h-screen">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={handleVideoReady} // Use onCanPlay instead of onLoadedData
          onError={handleVideoError}
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://automillennium.com/wp-content/uploads/2023/08/AUTO-CARE-360-01.mp4" type="video/mp4" />
          <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Your browser doesn't support HTML5 video.
          </p>
        </video>

        {videoError && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/video-poster.jpg')" }}
          />
        )}
      </div>

      {/* Intro Content */}
      <div className="relative mb-8 flex flex-col items-center gap-3 pt-20">
        <img
          src="/img/autocare-white.png"
          alt="VTX Logo"
          className="page-logo-img h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain opacity-0"
        />

        <section className="page-main-text py-20 px-4 md:px-8 text-center bg-black">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-snug">
              Welcome to <span className="text-cyan-400">Auto Care 360</span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-10">
              Premium Automotive Services. Trusted Partnerships. Total Care.
            </p>

            <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
              Auto Care 360 is a leading automotive service and solutions company known for its quality, reliability, and customer satisfaction. We partner with car dealerships to deliver a wide range of services, from detailing and paint protection to full vehicle preparation, ensuring every car meets the highest standards before it reaches the customer.
            </p>
          </div>
        </section>
      </div>

      {/* --- SCROLL-TRIGGERED CONTENT STARTS HERE --- */}
      <div className="bg-black min-h-screen">

        {/* Header Section */}
        <header className="pt-20 pb-20 px-4 md:px-8 text-center bg-zinc-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h1 className="fade-in-text text-white text-6xl md:text-8xl font-extrabold tracking-tight mb-4 leading-none">
              Driven by <span className="text-gray-400">Excellence.</span>
            </h1>
            <p className="fade-in-text text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto mt-8">
              At Auto Care 360, our commitment to excellence is at the core of everything we do. We provide premium automotive care through a blend of innovation, precision, and trust, extending our expertise across multiple markets and supporting some of the region’s largest dealership networks.
            </p>
          </div>
        </header>

        {/* Services Section */}
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="fade-in-text text-white text-4xl md:text-6xl font-bold text-center mb-16">
            Our Services
          </h2>

          <div className="grid lg:grid-cols-1 gap-8">
            <div className="fade-in-text bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl transition duration-300 hover:shadow-cyan-500/10">
              <h3 className="fade-in-text text-3xl font-bold text-white mb-6">
                Complete Car Care Solutions for Dealership Operations
              </h3>
              <p className="fade-in-text text-lg text-gray-400 mb-8 max-w-3xl">
                We add real value by ensuring vehicles are delivered in flawless condition, enhancing customer experience and brand perception. Our services include:
              </p>

              <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4 list-none p-0">
                <li className="fade-in-text text-xl text-white flex items-start group">
                  <svg className="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Pre-Delivery Inspection (PDI)
                </li>
                <li className="fade-in-text text-xl text-white flex items-start group">
                  <svg className="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Paint Protection Film (PPF) Installation
                </li>
                <li className="fade-in-text text-xl text-white flex items-start group">
                  <svg className="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Ceramic Coating & Advanced Protection
                </li>
                <li className="fade-in-text text-xl text-white flex items-start group">
                  <svg className="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Interior & Exterior Detailing
                </li>
                <li className="fade-in-text text-xl text-white flex items-start group">
                  <svg className="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Custom Finishing and Restoration
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stats and Philosophy Section */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Powered by People Card */}
            <div className="fade-in-text bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8 md:p-12 transition duration-300 hover:bg-zinc-800/80">
              <div className="mb-8">
                <span className="fade-in-text text-5xl md:text-7xl font-extrabold text-cyan-400 block leading-none">
                  1,000+
                </span>
                <p className="fade-in-text text-xl text-gray-400 font-medium mt-1">
                  Skilled Professionals
                </p>
              </div>

              <h3 className="fade-in-text text-4xl font-bold text-white mb-6">
                Powered by People
              </h3>

              <p className="fade-in-text text-lg text-gray-300 mb-8">
                Our team under the Auto Millennium Group umbrella brings together expertise in Automotive Detailing, Bodywork, Quality Control, and Customer Service. This enables us to take on large-scale projects, serving multiple dealerships simultaneously with speed and consistencywithout ever compromising on quality.
              </p>

              <div className="fade-in-text flex flex-wrap gap-2">
                <span className="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Automotive Detailing</span>
                <span className="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Bodywork & Paint</span>
                <span className="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Quality Control</span>
              </div>
            </div>

            {/* What Sets Us Apart Card */}
            <div className="fade-in-text bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8 md:p-12 transition duration-300 hover:bg-zinc-800/80">
              <div className="mb-8">
                <span className="fade-in-text text-5xl md:text-7xl font-extrabold text-cyan-400 block leading-none">
                  360°
                </span>
                <p className="fade-in-text text-xl text-gray-400 font-medium mt-1">
                  Care Philosophy
                </p>
              </div>

              <h3 className="fade-in-text text-4xl font-bold text-white mb-6">
                What Sets Us Apart
              </h3>

              <p className="fade-in-text text-lg text-gray-300 mb-8">
                Our integrated approach aligns seamlessly with dealership operations to deliver long-term value. We don’t just offer services; we create solutions that enhance customer satisfaction, maintain vehicle condition, and strengthen brand reputation.
              </p>

              <div className="fade-in-text flex flex-wrap gap-2">
                <span className="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Enhance Customer Satisfaction</span>
                <span className="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Maintain Vehicle Condition</span>
                <span className="px-4 py-2 text-sm font-medium bg-zinc-700 text-white rounded-full">Strengthen Brand Reputation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer/Call to Action Section */}
        <section className="py-24 px-4 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="fade-in-text text-white text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Built on <span className="text-gray-400">Integrity.</span> Driven by <span className="text-gray-400">Passion.</span>
            </h2>
            <p className="fade-in-text text-gray-300 text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Auto Care 360 shares the same core values as Auto Millennium: integrity, teamwork, and excellence. Our journey is powered by a passion for cars, for service, and for perfection in every detail.
            </p>
          </div>
        </section>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="flex-center fixed z-[100] h-dvh w-screen top-0 left-0 bg-black">
          <div className="flex flex-col items-center gap-6">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {videoError && (
        <div className="flex-center fixed z-[100] h-dvh w-screen top-0 left-0 bg-gray-900">
          <div className="text-center text-white max-w-md mx-4">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-red-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
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
    </div>
  );
};

export default Page;
