// "use client";

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// import { useState, useEffect, useRef } from "react";

// import AnimatedTitle from "../components/AnimatedTitle";

// gsap.registerPlugin(ScrollTrigger);

// const Page = () => {
//   const [loading, setLoading] = useState(true);
//   const [videoError, setVideoError] = useState(false);
//   const videoRef = useRef(null);

//   // Handle video ready
//   const handleVideoReady = () => {
//     setLoading(false);
//   };

//   // Handle video errors
//   const handleVideoError = () => {
//     console.error("Video failed to load");
//     setLoading(false);
//     setVideoError(true);
//   };

//   // Retry loading video
//   const retryVideoLoad = () => {
//     setLoading(true);
//     setVideoError(false);
//     const video = videoRef.current;
//     if (video) {
//       video.load();
//     }
//   };

// // Remove the useGSAP hook and the separate useEffect hook
// // and replace them with a single useEffect hook
// useEffect(() => {
//   const video = videoRef.current;
//   if (!video) return;

//   const handleVideoReady = () => {
//     // Check if video is truly ready before setting loading to false
//     if (video.readyState >= 3) {
//       setLoading(false);
//     }
//   };

//   const handleVideoError = () => {
//     console.error("Video failed to load");
//     setLoading(false);
//     setVideoError(true);
//   };

//   // Add event listeners for video loading
//   const readyEvents = ['loadeddata', 'canplay', 'canplaythrough'];
//   readyEvents.forEach(event => {
//     video.addEventListener(event, handleVideoReady);
//   });
//   video.addEventListener('error', handleVideoError);

//   // Check initial state
//   if (video.readyState >= 3) {
//     setLoading(false);
//   } else {
//     // Fallback timeout
//     const loadTimeout = setTimeout(() => {
//       if (loading) {
//         setLoading(false);
//         console.warn("Video loading timeout");
//       }
//     }, 10000);

//     return () => {
//       clearTimeout(loadTimeout);
//     };
//   }

//   // Cleanup event listeners
//   return () => {
//     readyEvents.forEach(event => {
//       video.removeEventListener(event, handleVideoReady);
//     });
//     video.removeEventListener('error', handleVideoError);
//   };
// }, [loading, videoError]); // Add dependencies

// // Now, use a separate useGSAP hook that has no dependencies.
// // This hook will be called after the initial render.
// useGSAP(() => {
//   // Fade in logo
//   gsap.fromTo(
//     ".page-logo",
//     { opacity: 0, y: 50 },
//     { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
//   );

//   // Set up the ScrollTrigger animation
//   const clipAnimation = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#clip",
//       start: "center center",
//       end: "+=800 center",
//       scrub: 0.5,
//       pin: true,
//       pinSpacing: true,
//     },
//   });

//   clipAnimation.to(".mask-clip-path", {
//     width: "100vw",
//     height: "100%",
//     borderRadius: 0,
//   });

//   // Call ScrollTrigger.refresh() on render
//   ScrollTrigger.refresh(true);
// });
//   return (

// <div className="bg-black">


//     <div id="about" className="min-h-screen w-screen bg-black">
//       <div className="relative mb-8 flex flex-col items-center gap-3 pt-36">
//         {/* Logo with fade-in animation */}
//         <img
//           src="/img/rhino-white.png"
//           alt="VTX Logo"
//           className="page-logo h-[300px] w-[400px] object-contain"
//           />

//         <div className="text-center text-white text-[20px] pb-10 max-w-[800px]">
//           <p className="page-logo">
//      RHINOMOTIVE, The one-stop solution for all your automotive aftermarket products. Step into the world of automotive supremacy with RHINOMOTIVE,
// The game-changers in the industry. Offering pro series car care to bodyshop and service solutions. Choosing us delivers exceptional quality and performance, setting you among the professionals.
//           </p>
//         </div>
//       </div>

//       {/* Loading Overlay */}
//       {loading && (
//         <div className="flex-center absolute z-[100] h-dvh w-screen bg-black">
//           <div className="flex flex-col items-center gap-6">
//             <div className="three-body">
//               <div className="three-body__dot"></div>
//               <div className="three-body__dot"></div>
//               <div className="three-body__dot"></div>
//             </div>
//             <p className="text-white text-lg font-light">Loading experience...</p>
//           </div>
//         </div>
//       )}

//       {/* Error State */}
//       {videoError && (
//         <div className="flex-center absolute z-[100] h-dvh w-screen bg-gray-900">
//           <div className="text-center text-white max-w-md mx-4">
//             <div className="mb-6">
//               <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//               <h3 className="text-xl font-semibold mb-2">Video Failed to Load</h3>
//               <p className="text-gray-300">There was a problem loading the video content.</p>
//             </div>
//             <button
//               onClick={retryVideoLoad}
//               className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               >
//               Retry Loading
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Video Section */}
//       <div className="h-dvh w-screen relative bg-black" id="clip">
//         <div className="mask-clip-path about-image">
//           {/* Optimized Video with Multiple Sources */}
//           <video
//             ref={videoRef}
//             autoPlay
//             loop
//             muted
//             playsInline
//             preload="metadata" // Changed from "auto" to "metadata"
//             poster="/img/video-poster.jpg"
//             className="absolute left-0 top-0 w-full h-full object-cover object-center"
//             >
//             {/* Add multiple sources for better browser compatibility */}
//             <source
//               src="/videos/rhinomotive-brand.webm"
//               type="video/webm"
//               />
//             <source
//               src="https://automillennium.com/wp-content/uploads/2023/03/RHINOMOTIVE-BRAND.mp4"
//               type="video/mp4"
//               />
//             {/* Fallback for very old browsers */}
//             <p className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               Your browser doesn't support HTML5 video.
//             </p>
//           </video>

//           {/* Fallback image if video fails completely */}
//           {videoError && (
//             <div
//             className="absolute left-0 top-0 w-full h-full object-cover object-center bg-cover bg-center"
//             style={{ backgroundImage: "url('/img/video-poster.jpg')" }}
//             />
//           )}
//         </div>

//       </div>
//     </div>



//           {/* Divisions */}
//       <section className="px-6 lg:px-20 py-16">
//         <h2 className="text-4xl font-bold mb-10 text-center section-block">
//           DIVISIONS
//         </h2>
//         <div className="grid gap-10 md:grid-cols-2">
//           {[
//             {
//               title: "1. CAR CARE",
//               text: "A wide range of the latest tech unbeatable car care products",
//             },
//             {
//               title: "2. SERVICE",
//               text: "A world-class OEM-approved wide range of mechanical products, in addition to exceptionally detailed Minor & Major service package",
//             },
//             {
//               title: "3. BODYSHOP",
//               text: "A comprehensive advanced technology collision repair solution",
//             },
//             {
//               title: "4. TYRE REPAIR",
//               text: "Our products are made with innovative materials and the latest technology. Trust us to elevate your driving experience and get the most out of your tyres",
//             },
//           ].map((div, i) => (
//             <div
//               key={i}
//               className="section-block rounded-2xl p-6 bg-neutral-900 shadow-lg text-white"
//             >
//               <h3 className="text-xl font-semibold mb-2 text-center">
//                 {div.title}
//               </h3>
//               <p className="text-center">{div.text}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Vision / Mission / Values */}
//       {[
//         {
//           title: "OUR VISION",
//           text: "Becoming the world’s number one brand that provides solutions for the automotive industry.",
//         },
//         {
//           title: "OUR MISSION",
//           text: "To provide superior quality products and services that exceeds our customer expectations.",
//         },
//         {
//           title: "OUR VALUES",
//           text: "We believe that our clients are our business partners, providing them the best possible products & services will benefit them and consequently reflect on our business.",
//         },
//       ].map((sec, i) => (
//         <section
//           key={i}
//           className="px-6 lg:px-20 py-16 section-block text-center text-white"
//         >
//           <h2 className="text-3xl font-bold mb-4">{sec.title}</h2>
//           <p className="text-[24px]">{sec.text}</p>
//         </section>
//       ))}
//           </div>
//   );
// };

// export default Page;





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

  // Handle video ready
  const handleVideoReady = () => setLoading(false);
  const handleVideoError = () => { console.error("Video failed to load"); setLoading(false); setVideoError(true); };
  const retryVideoLoad = () => { setLoading(true); setVideoError(false); const video = videoRef.current; if(video) video.load(); };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const readyEvents = ['loadeddata', 'canplay', 'canplaythrough'];
    const onReady = () => { if(video.readyState >= 3) setLoading(false); };
    readyEvents.forEach(e => video.addEventListener(e, onReady));
    video.addEventListener('error', handleVideoError);

    // Fallback timeout
    const loadTimeout = setTimeout(() => { if(loading) { setLoading(false); console.warn("Video loading timeout"); } }, 10000);

    if(video.readyState >= 3) setLoading(false);

    return () => {
      readyEvents.forEach(e => video.removeEventListener(e, onReady));
      video.removeEventListener('error', handleVideoError);
      clearTimeout(loadTimeout);
    };
  }, [loading, videoError]);

  // GSAP Animations
  useGSAP(() => {
    // Fade in logo
    gsap.fromTo(
      ".page-logo",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
    );

    // Video clip animation
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
    clipAnimation.to(".mask-clip-path", { width: "100vw", height: "100%", borderRadius: 0 });

    // Fade-in/out for all scrollable text elements
    gsap.utils.toArray(".fade-scroll").forEach(el => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
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

      {/* Hero Section */}
      <div id="about" className="min-h-screen w-screen bg-black">
        <div className="relative mb-8 flex flex-col items-center gap-3 pt-36">
          <img src="/img/rhino-white.png" alt="RHINOMOTIVE Logo" className="page-logo h-[300px] w-[400px] object-contain fade-scroll" />
          <div className="text-center text-white text-[20px] pb-10 max-w-[800px] fade-scroll">
            <p>
              RHINOMOTIVE, The one-stop solution for all your automotive aftermarket products. Step into the world of automotive supremacy with RHINOMOTIVE,
              The game-changers in the industry. Offering pro series car care to bodyshop and service solutions. Choosing us delivers exceptional quality and performance, setting you among the professionals.
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
              <p className="text-white text-lg font-light">Loading experience...</p>
            </div>
          </div>
        )}

        {/* Error Overlay */}
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
              <button onClick={retryVideoLoad} className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium">Retry Loading</button>
            </div>
          </div>
        )}

        {/* Video Section */}
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

      {/* Divisions Section */}
      <section className="px-6 lg:px-20 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center fade-scroll text-white">DIVISIONS</h2>
        <div className="grid gap-10 md:grid-cols-2">
          {[
            { title: "1. CAR CARE", text: "A wide range of the latest tech unbeatable car care products" },
            { title: "2. SERVICE", text: "A world-class OEM-approved wide range of mechanical products, in addition to exceptionally detailed Minor & Major service package" },
            { title: "3. BODYSHOP", text: "A comprehensive advanced technology collision repair solution" },
            { title: "4. TYRE REPAIR", text: "Our products are made with innovative materials and the latest technology. Trust us to elevate your driving experience and get the most out of your tyres" },
          ].map((div, i) => (
            <div key={i} className="fade-scroll rounded-2xl p-6 bg-neutral-900 shadow-lg text-white">
              <h3 className="text-xl font-semibold mb-2 text-center">{div.title}</h3>
              <p className="text-center">{div.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision / Mission / Values */}
      {[
        { title: "OUR VISION", text: "Becoming the world’s number one brand that provides solutions for the automotive industry." },
        { title: "OUR MISSION", text: "To provide superior quality products and services that exceeds our customer expectations." },
        { title: "OUR VALUES", text: "We believe that our clients are our business partners, providing them the best possible products & services will benefit them and consequently reflect on our business." },
      ].map((sec, i) => (
        <section key={i} className="px-6 lg:px-20 py-16 fade-scroll text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{sec.title}</h2>
          <p className="text-[24px]">{sec.text}</p>
        </section>
      ))}
    </div>
  );
};

export default Page;
