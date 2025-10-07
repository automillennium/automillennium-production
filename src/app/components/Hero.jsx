

// "use client";

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// import { TiLocationArrow } from "react-icons/ti";
// import { useEffect, useState, useRef } from "react";

// import Button from "./Button";

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//   const [loading, setLoading] = useState(true);
//   const videoRef = useRef(null);

//   // Handle video fully loaded and can play
//   const handleVideoReady = () => {
//     // Fade in the video smoothly
//     if (videoRef.current) {
//       gsap.to(videoRef.current, {
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//         onComplete: () => setLoading(false),
//       });
//     } else {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const video = videoRef.current;

//     // In case the video is already cached and ready
//     if (video && video.readyState >= 3) {
//       handleVideoReady();
//     } else if (video) {
//       video.addEventListener("canplaythrough", handleVideoReady);
//     }

//     return () => {
//       if (video) {
//         video.removeEventListener("canplaythrough", handleVideoReady);
//       }
//     };
//   }, []);

//   useGSAP(() => {
//     gsap.set("#video-frame", {
//       clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
//       borderRadius: "0% 0% 40% 10%",
//     });
//     gsap.from("#video-frame", {
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       borderRadius: "0% 0% 0% 0%",
//       ease: "power1.inOut",
//       scrollTrigger: {
//         trigger: "#video-frame",
//         start: "center center",
//         end: "bottom center",
//         scrub: true,
//       },
//     });
//   }, []);

//   return (
//     <div className="relative h-dvh w-screen overflow-x-hidden">
//       {loading && (
//         <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
//           <div className="three-body">
//             <div className="three-body__dot"></div>
//             <div className="three-body__dot"></div>
//             <div className="three-body__dot"></div>
//           </div>
//         </div>
//       )}

//       <div
//         id="video-frame"
//         className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
//       >
//         <video
//           ref={videoRef}
//           src="/videos/amg-video.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//           style={{ opacity: 0 }} // start hidden, fade in when ready
//           className="absolute left-0 top-0 w-full h-full object-cover object-center"
//         />

//         <div className="absolute left-0 top-0 z-40 w-full h-full">
//           {/* Overlay content goes here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;




"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useGSAP(() => {
    // Initial clipPath
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    // Animate clipPath on scroll
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  // Intersection Observer → load video only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoadVideo(true);
            observer.disconnect(); // Load only once
          }
        });
      },
      { threshold: 0.25 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        ref={videoRef}
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black"
      >
        {loadVideo ? (
          <video
            src="/videos/amg-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 w-full h-full object-cover object-center"
          />
        ) : (
          // Show poster while video hasn't loaded
          <img
            src="/img/banner-img.png"
            alt="Loading video..."
            className="absolute left-0 top-0 w-full h-full object-cover object-center"
          />
        )}

        <div className="absolute left-0 top-0 z-40 w-full h-full">
          {/* Overlay content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
