

"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Page = ({ params }) => {
  const { lang } = params;
  const [dictionary, setDictionary] = useState(null);
  const [isDictionaryLoaded, setIsDictionaryLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // === Load dictionary dynamically ===
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const module = await import("@/app/lib/dictionaries");
        const dict = await module.getDictionary(lang);
        setDictionary(dict);
        setIsDictionaryLoaded(true);
      } catch (error) {
        console.error("Error loading dictionary:", error);
        setIsDictionaryLoaded(true);
      }
    };
    loadDictionary();
  }, [lang]);

  // === Video error handling ===
  const handleVideoError = () => setVideoError(true);
  const retryVideoLoad = () => {
    setVideoError(false);
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch((e) => console.error("Error playing video:", e));
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener("error", handleVideoError);
    return () => video.removeEventListener("error", handleVideoError);
  }, []);

  // === GSAP FADE-IN/OUT SCROLL ANIMATION ===
  useGSAP(() => {
    if (!isDictionaryLoaded) return;

    // fade in + fade out on scroll
    gsap.utils.toArray(".fade-scroll").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",   // starts fading in
            end: "bottom 20%",  // fades out when leaving
            scrub: true,
            toggleActions: "play reverse play reverse",
            onLeave: () => gsap.to(el, { opacity: 0, y: -30, duration: 0.8 }),
            onEnterBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8 }),
            onLeaveBack: () => gsap.to(el, { opacity: 0, y: 50, duration: 0.8 }),
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, [isDictionaryLoaded]);

  // === Loader ===
  if (!isDictionaryLoaded) {
    return (

        <div className="flex-center fixed z-[100] h-dvh w-screen top-0 left-0 bg-black">
          <div className="flex flex-col items-center gap-6">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="bg-black" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* === FULLSCREEN VIDEO === */}
      <section className="relative w-full h-screen">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/losso.mp4" type="video/mp4" />
          <p className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {dictionary?.globalBusiness?.browserSupport ||
              "Your browser doesn't support HTML5 video."}
          </p>
        </video>

        {videoError && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/video-poster.jpg')" }}
          />
        )}

        {videoError && (
          <div className="flex justify-center items-center fixed z-[100] h-dvh w-screen bg-black/80">
            <div className="text-center text-white max-w-md mx-4 p-8 rounded-xl bg-zinc-800 border border-zinc-700">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 
                      1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 
                      16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <h3 className="text-xl font-semibold mb-2">
                  {dictionary?.globalBusiness?.videoErrorTitle ||
                    "Video Failed to Load"}
                </h3>
                <p className="text-gray-300">
                  {dictionary?.globalBusiness?.videoErrorText ||
                    "There was a problem loading the video content."}
                </p>
              </div>
              <button
                onClick={retryVideoLoad}
                className="px-8 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors font-medium"
              >
                {dictionary?.globalBusiness?.retryButton || "Retry Loading"}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* === HERO SECTION === */}
      <section className="fade-scroll flex flex-col items-center justify-center pt-20 pb-20 px-6 md:px-10 text-center bg-black">
        <img
          src="/img/lusso-logo.webp"
          alt={dictionary?.globalBusiness?.logoAlt || "Lusso Logo"}
          className="h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain mb-10"
        />
        <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          {dictionary?.globalBusiness?.title || "Global Luxury Mobility Solutions"}
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto">
          {dictionary?.globalBusiness?.description ||
            "LUSSO offers a one-stop solution across the entire automotive spectrum—from Vehicle Transformation and mass customization to premium Bespoke Luxury and service."}
        </p>
      </section>

      {/* === STORY & PHILOSOPHY === */}
      <div className="max-w-7xl mx-auto py-24 px-6 lg:px-20">
        <section className="fade-scroll text-center text-white mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-400">
            {dictionary?.globalBusiness?.storyTitle || "OUR STORY"}
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 leading-snug">
            {dictionary?.globalBusiness?.story1 ||
              "LUSSO DESIGNS INDIA PVT LTD is a leading global luxury mobility solutions provider specializing in vehicle transformation and customization."}
          </p>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-snug">
            {dictionary?.globalBusiness?.story2 ||
              "With over 500,000 delighted customers worldwide, we redefine innovation, craftsmanship, and mobility."}
          </p>
        </section>

        <section className="fade-scroll text-center text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-400">
            {dictionary?.globalBusiness?.philosophyTitle || "PHILOSOPHY"}
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-snug">
            {dictionary?.globalBusiness?.philosophy ||
              "At LUSSO DESIGNS, we redefine luxury through precision, innovation, and artistry—where every creation reflects individuality and timeless elegance."}
          </p>
        </section>
      </div>

      {/* === KSA LOGO SECTION === */}
      <div className="fade-scroll flex flex-col md:flex-row justify-center items-center gap-6 mx-auto text-center py-20">
        <img
          src="/img/amg-new-logo.png"
          alt="AMG Logo"
          className="object-contain w-[250px] md:w-[400px]"
        />
        <h3 className="prompto text-4xl md:text-6xl italic font-bold outline-text">
          KSA
        </h3>
      </div>
    </div>
  );
};

export default Page;
