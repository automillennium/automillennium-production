
// "use client";

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// import { useState, useEffect, useRef, useCallback } from "react";

// gsap.registerPlugin(ScrollTrigger);

// const Page = ({ params }) => {
//   const { lang } = params;
//   const [dictionary, setDictionary] = useState(null);
//   const [isDictionaryLoaded, setIsDictionaryLoaded] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [videoError, setVideoError] = useState(false);

//   // === Load dictionary dynamically ===
//   useEffect(() => {
//     const loadDictionary = async () => {
//       try {
//         const module = await import("@/app/lib/dictionaries");
//         const dict = await module.getDictionary(lang);
//         setDictionary(dict);
//         setIsDictionaryLoaded(true);
//       } catch (error) {
//         console.error("Error loading dictionary:", error);
//         setIsDictionaryLoaded(true);
//       }
//     };
//     loadDictionary();
//   }, [lang]);


//   // ----------------------------------------------------
//   // REFS
//   // ----------------------------------------------------
//   const videoRef = useRef(null);
//   const pageContainer = useRef(null);
//   // Store ScrollTrigger instances for cleanup if using batch() (though not used here, it's good practice)
//   const scrollTriggerInstances = useRef([]); 

//   // ----------------------------------------------------
//   // VIDEO HANDLERS
//   // ----------------------------------------------------

//   // Success handler: Fades out the loader
//   const handleVideoReady = useCallback(() => {
//     // Small timeout to prevent immediate loader flicker if video is cached
//     setTimeout(() => {
//       setLoading(false);
//       ScrollTrigger.refresh(true); 
//     }, 500);
//   }, []);

//   // Error handler: Sets the error flag and removes the loader
//   const handleVideoError = useCallback(() => {
//     console.error("Video failed to load. Displaying fallback.");
//     setVideoError(true);
//     setLoading(false);
//     ScrollTrigger.refresh(true); 
//   }, []);

//   // Allows user to retry loading the video
//   const retryVideoLoad = () => {
//     setLoading(true);
//     setVideoError(false);
//     const video = videoRef.current;
//     if (video) video.load(); // Force reload attempt
//   };

//   // ----------------------------------------------------
//   // INITIAL VIDEO CHECK & EVENT LISTENERS
//   // ----------------------------------------------------
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     // Check if video is already ready (e.g., from cache)
//     if (video.readyState >= 3) {
//       handleVideoReady();
//     }

//     // Add event listeners
//     const readyEvents = ['loadeddata', 'canplay', 'canplaythrough'];
//     readyEvents.forEach(e => video.addEventListener(e, handleVideoReady));
//     video.addEventListener('error', handleVideoError);

//     // Fallback timeout in case video stalls and never triggers 'canplaythrough'
//     const loadTimeout = setTimeout(() => {
//       if (loading && !videoError) {
//         handleVideoError(); // Treat stall as an error/fallback case
//         console.warn("Video loading timed out (10s).");
//       }
//     }, 10000);

//     // Cleanup
//     return () => {
//       readyEvents.forEach(e => video.removeEventListener(e, handleVideoReady));
//       video.removeEventListener('error', handleVideoError);
//       clearTimeout(loadTimeout);
//     };
//   }, [loading, videoError, handleVideoReady, handleVideoError]);


//   // ----------------------------------------------------
//   // GSAP ANIMATIONS
//   // ----------------------------------------------------
//   useGSAP(() => {

//     if (!isDictionaryLoaded) return;


//     const context = gsap.context(() => {
//       // 1. Fade in logo/intro text on load
//       gsap.fromTo(
//         ".page-intro-element", 
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", stagger: 0.1, delay: 0.8 }
//       );

//       // 2. Video clip animation 
//       const clipAnimation = gsap.timeline({
//         scrollTrigger: {
//           trigger: "#clip-trigger", // Use a dedicated, invisible trigger element
//           start: "top center", // Start near the top of the viewport
//           end: "+=800", // Adjust this value to control the scrub length
//           scrub: 0.5,
//           pin: true,
//           pinSpacing: true,

//         },
//       });
//       // Corrected animation target to include the transform properties for proper clip-path usage
//       clipAnimation.to(".mask-clip-path", { 
//         width: "100%", 
//         height: "100%", 
//         borderRadius: 0, 
//         duration: 1
//       });

//       // 3. General Scroll Fade Animation (using toggleActions for smooth fade-in/out)
//       gsap.utils.toArray(".fade-scroll").forEach(el => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 30 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: el,
//               start: "top 90%", // Start fade-in when element is near the bottom of viewport
//               end: "bottom 10%", // End fade-out when element is near the top
//               toggleActions: "play reverse play reverse", // Play/Reverse/Play/Reverse for fade-in/out
//             }
//           }
//         );
//       });

//       ScrollTrigger.refresh(true); // Always refresh at the end
//     }, pageContainer);

//     return () => context.revert(); // Essential cleanup
//   }, [loading]); // Re-run when loading resolves to ensure animations are set up correctly

//   // ----------------------------------------------------
//   // RENDER LOGIC
//   // ----------------------------------------------------



//     // === Loader ===
//   if (!isDictionaryLoaded) {
//     return (

//         <div className="flex-center fixed z-[100] h-dvh w-screen top-0 left-0 bg-black">
//           <div className="flex flex-col items-center gap-6">
//             <div className="three-body">
//               <div className="three-body__dot"></div>
//               <div className="three-body__dot"></div>
//               <div className="three-body__dot"></div>
//             </div>
//           </div>
//         </div>
//     );
//   }

//   return (
//     <div className="bg-black" ref={pageContainer}>

//       {/* === Hero/Intro Section === */}
//       <div id="about" className="min-h-screen w-screen bg-black">

//         {/* Video Section - Use conditional class to fade in video */}
//         <div className="relative w-full h-screen">
//           {/* Clip trigger for GSAP (added dedicated div) */}
//           <div id="clip-trigger" className="absolute top-0 w-full h-px" /> 

//           <video
//             ref={videoRef}
//             autoPlay
//             loop
//             muted
//             playsInline
//             preload="metadata"
//             onError={handleVideoError}
//             className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
//                 loading ? "opacity-0" : "opacity-100" // Video fade-in
//             }`}
//           >
//             <source 
//                  src="https://automillennium.com/wp-content/uploads/2023/03/RHINOMOTIVE-BRAND.mp4"
//              type="video/mp4" />
//             <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//               Your browser doesn't support HTML5 video.
//             </p>
//           </video>

//           {/* Fallback Image */}
//           {videoError && (
//             <div
//               className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
//               style={{ backgroundImage: "url('/img/video-poster.jpg')" }}
//             />
//           )}
//         </div>

//         {/* Main Content Container - Fades in once loaded */}
//         <div className={`relative ${loading ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity duration-500`}>

//           <div className="relative flex flex-col items-center pt-40 pb-20 px-4 md:px-8">

//             {/* Logo */}
//             <img 
//               src="/img/rhino-white.png" 
//               alt="RHINOMOTIVE Logo" 
//               className="page-intro-element h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain" 
//             />

//             {/* Title and Intro Text */}
//             <div className="text-center max-w-5xl mx-auto mt-10">
//               <h1 className="page-intro-element text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
//                 Automotive Supremacy. <span className="text-gray-400">Pro-Series Solutions.</span>
//               </h1>
//               <p className="page-intro-element text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto">
//                 **RHINOMOTIVE** is the one-stop solution for all your automotive aftermarket products. Step into the world of automotive supremacy with our **game-changing** pro-series car care, bodyshop, and service solutions. Choosing us delivers exceptional quality and performance, setting you among the professionals.
//               </p>
//             </div>
//           </div>
        

//           {/* === Divisions Section (Beautified Cards) === */}
//           <section className="px-6 lg:px-20 py-24 max-w-7xl mx-auto">
//             <h2 className="text-white text-center text-4xl md:text-6xl font-bold mb-16 fade-scroll">
//               PRODUCT DIVISIONS
//             </h2>
            
//             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//               {[
//                 { title: "CAR CARE", text: "A wide range of the latest tech unbeatable car care products." },
//                 { title: "SERVICE", text: "World-class OEM-approved mechanical products and exceptionally detailed Minor & Major service packages." },
//                 { title: "BODYSHOP", text: "A comprehensive solution for collision repair, powered by advanced technology." },
//                 { title: "TYRE REPAIR", text: "Innovative materials and the latest technology to elevate your driving experience and extend tyre life." },
//               ].map((div, i) => (
//                 <div 
//                   key={i} 
//                   className="fade-scroll rounded-3xl p-8 bg-zinc-900 border border-zinc-800 shadow-xl text-white transition duration-300 hover:bg-zinc-800/80 hover:shadow-cyan-500/10"
//                 >
//                   <h3 className="text-2xl font-bold mb-3 text-center text-cyan-400">
//                     {div.title}
//                   </h3>
//                   <p className="text-center text-gray-300">{div.text}</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* === Vision / Mission / Values (Beautified Typography) === */}
//           <div className="max-w-7xl mx-auto">
//             {[
//               {
//                 title: "OUR VISION",
//                 text: "Becoming the world’s number one brand that provides solutions for the automotive industry.",
//               },
//               {
//                 title: "OUR MISSION",
//                 text: "To provide superior quality products and services that exceeds our customer expectations.",
//               },
//               {
//                 title: "OUR VALUES",
//                 text: "We believe that our clients are our business partners, providing them the best possible products & services will benefit them and consequently reflect on our business.",
//               },
//             ].map((sec, i) => (
//               <section
//                 key={i}
//                 className="px-6 lg:px-20 py-16 fade-scroll text-center text-white"
//               >
//                 <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-400">
//                   {sec.title}
//                 </h2>
//                 <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-snug">
//                   {sec.text}
//                 </p>
//               </section>
//             ))}
//           </div>

//         </div> {/* End Main Content Container */}


//       </div>
      
//       {/* === Loading Overlay === */}
//       {loading && !videoError && (
//         <div className="flex justify-center items-center fixed z-[100] h-dvh w-screen top-0 left-0 bg-black">
//           <div className="flex flex-col items-center gap-6">
//             <div className="three-body">
//               <div className="three-body__dot"></div>
//               <div className="three-body__dot"></div>
//               <div className="three-body__dot"></div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* === Error State Overlay === */}
//       {videoError && (
//         <div className="flex justify-center items-center fixed z-[100] h-dvh w-screen bg-zinc-900">
//           <div className="text-center text-white max-w-md mx-4 p-8 rounded-xl bg-zinc-800 border border-zinc-700">
//             <div className="mb-6">
//               <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//               <h3 className="text-xl font-semibold mb-2">Video Failed to Load</h3>
//               <p className="text-gray-300">There was a problem loading the video content. Displaying fallback image.</p>
//             </div>
//             <button onClick={retryVideoLoad} className="px-8 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors font-medium">
//               Retry Loading
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;


"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

gsap.registerPlugin(ScrollTrigger);

const Page = ({ params }) => {
  const { lang } = params;

// -----------------------------
// State Management
// -----------------------------
  const [dictionary, setDictionary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);
  const pageContainer = useRef(null);

  const isRTL = lang === 'ar';
  const textDirection = isRTL ? 'rtl' : 'ltr';

  // -----------------------------
  // Load dictionary dynamically
  // -----------------------------
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const module = await import("@/app/lib/dictionaries");
        const dict = await module.getDictionary(lang);
        setDictionary(dict?.rhinomotive || {});
      } catch (error) {
        console.error("Error loading dictionary:", error);
        setDictionary({});
      }
    };
    loadDictionary();
  }, [lang]);

  // -----------------------------
  // Video Handlers
  // -----------------------------
  const handleVideoReady = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
      ScrollTrigger.refresh(true);
    }, 500);
  }, []);

  const handleVideoError = useCallback(() => {
    console.error("Video failed to load. Displaying fallback.");
    setVideoError(true);
    setLoading(false);
    ScrollTrigger.refresh(true);
  }, []);

  const retryVideoLoad = () => {
    setLoading(true);
    setVideoError(false);
    videoRef.current?.load();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 3) handleVideoReady();

    const events = ["loadeddata", "canplay", "canplaythrough"];
    events.forEach(e => video.addEventListener(e, handleVideoReady));
    video.addEventListener("error", handleVideoError);

    const timeout = setTimeout(() => {
      if (loading && !videoError) handleVideoError();
    }, 10000);

    return () => {
      events.forEach(e => video.removeEventListener(e, handleVideoReady));
      video.removeEventListener("error", handleVideoError);
      clearTimeout(timeout);
    };
  }, [loading, videoError, handleVideoReady, handleVideoError]);

  // -----------------------------
  // Memoized dynamic content
  // -----------------------------
  const divisions = useMemo(() => [
    { 
      title: dictionary?.divisions?.carCare?.title || "CAR CARE", 
      text: dictionary?.divisions?.carCare?.description || "A wide range of the latest tech unbeatable car care products." 
    },
    { 
      title: dictionary?.divisions?.service?.title || "SERVICE", 
      text: dictionary?.divisions?.service?.description || "World-class OEM-approved mechanical products and exceptionally detailed Minor & Major service packages." 
    },
    { 
      title: dictionary?.divisions?.bodyshop?.title || "BODYSHOP", 
      text: dictionary?.divisions?.bodyshop?.description || "A comprehensive solution for collision repair, powered by advanced technology." 
    },
    { 
      title: dictionary?.divisions?.tyreRepair?.title || "TYRE REPAIR", 
      text: dictionary?.divisions?.tyreRepair?.description || "Innovative materials and the latest technology to elevate your driving experience and extend tyre life." 
    },
  ], [dictionary]);

  const visionMissionValues = useMemo(() => [
    {
      title: dictionary?.vision?.title || "OUR VISION",
      text: dictionary?.vision?.description || "Becoming the world's number one brand that provides solutions for the automotive industry.",
    },
    {
      title: dictionary?.mission?.title || "OUR MISSION",
      text: dictionary?.mission?.description || "To provide superior quality products and services that exceeds our customer expectations.",
    },
    {
      title: dictionary?.values?.title || "OUR VALUES",
      text: dictionary?.values?.description || "We believe that our clients are our business partners, providing them the best possible products & services will benefit them and consequently reflect on our business.",
    },
  ], [dictionary]);

  // -----------------------------
  // GSAP Animations
  // -----------------------------
  useGSAP(() => {
    if (!dictionary) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".page-intro-element", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", stagger: 0.1, delay: 0.8 }
      );

      gsap.utils.toArray(".fade-scroll").forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });

      ScrollTrigger.refresh(true);
    }, pageContainer);

    return () => ctx.revert();
  }, [dictionary]);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="bg-black" ref={pageContainer} dir={textDirection}>
      <div id="about" className="min-h-screen w-screen bg-black">

        {/* Video */}
        <div className="relative w-full h-screen">
          <div id="clip-trigger" className="absolute top-0 w-full h-px" />
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}
          >
            <source src="https://automillennium.com/wp-content/uploads/2023/03/RHINOMOTIVE-BRAND.mp4" type="video/mp4" />
            <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {dictionary?.video?.unsupported || "Your browser doesn't support HTML5 video."}
            </p>
          </video>

          {videoError && (
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/img/video-poster.jpg')" }} />
          )}
        </div>

        {/* Content */}
        <div className={`relative transition-opacity duration-500 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"} `}>
          <div className={`fade-scroll relative flex flex-col items-center pt-40 pb-20 px-4 md:px-8`}>
            <img src="/img/rhino-white.png" alt={dictionary?.brand?.logoAlt || "RHINOMOTIVE Logo"} className="page-intro-element h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain" />
            <div className="text-center max-w-5xl mx-auto mt-10">
              <h1 className="page-intro-element text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                {dictionary?.hero?.title || "Automotive Supremacy."} <span className="text-gray-400">{dictionary?.hero?.subtitle || "Pro-Series Solutions."}</span>
              </h1>
              <p className="page-intro-element text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto">
                {dictionary?.hero?.description || "RHINOMOTIVE is the one-stop solution for all your automotive aftermarket products. Step into the world of automotive supremacy with our **game-changing** pro-series car care, bodyshop, and service solutions. Choosing us delivers exceptional quality and performance, setting you among the professionals."}
              </p>
            </div>
          </div>

          {/* Divisions */}
          <section className="px-6 lg:px-20 py-24 max-w-7xl mx-auto">
            <h2 className="text-white text-center text-4xl md:text-6xl font-bold mb-16 fade-scroll">
              {dictionary?.sections?.divisions || "PRODUCT DIVISIONS"}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {divisions.map((div, i) => (
                <div key={i} className="fade-scroll rounded-3xl p-8 bg-zinc-900 border border-zinc-800 shadow-xl text-white transition duration-300 hover:bg-zinc-800/80 hover:shadow-cyan-500/10">
                  <h3 className="text-2xl font-bold mb-3 text-center text-cyan-400">{div.title}</h3>
                  <p className="text-center text-gray-300">{div.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Vision / Mission / Values */}
          <div className="max-w-7xl mx-auto">
            {visionMissionValues.map((sec, i) => (
              <section key={i} className="px-6 lg:px-20 py-16 fade-scroll text-center text-white">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-400">{sec.title}</h2>
                <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-snug">{sec.text}</p>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && !videoError && (
        <div className="flex justify-center items-center fixed z-[100] h-dvh w-screen top-0 left-0 bg-black">
          <div className="flex flex-col items-center gap-6">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {videoError && (
        <div className="flex justify-center items-center fixed z-[100] h-dvh w-screen bg-zinc-900">
          <div className="text-center text-white max-w-md mx-4 p-8 rounded-xl bg-zinc-800 border border-zinc-700">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">{dictionary?.error?.videoTitle || "Video Failed to Load"}</h3>
              <p className="text-gray-300">{dictionary?.error?.videoDescription || "There was a problem loading the video content. Displaying fallback image."}</p>
            </div>
            <button onClick={retryVideoLoad} className="px-8 py-3 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors font-medium">
              {dictionary?.error?.retryButton || "Retry Loading"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
