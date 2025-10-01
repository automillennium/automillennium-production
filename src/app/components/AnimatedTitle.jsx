// import { gsap } from "gsap";
// import { useEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import clsx from "clsx";

// gsap.registerPlugin(ScrollTrigger);

// const AnimatedTitle = ({ title, containerClass }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const titleAnimation = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "100 bottom",
//           end: "center bottom",
//           toggleActions: "play none none reverse",
//         },
//       });

//       titleAnimation.to(
//         ".animated-word",
//         {
//           opacity: 1,
//           transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
//            duration: 1.5, // slower
//         ease: "power4.out", // smoother easing
//         stagger: 0.05, // slightly more spacing between letters
//         },
//         0
//       );
//     }, containerRef);

//     return () => ctx.revert(); // Clean up on unmount
//   }, []);

//   return (
//     <div ref={containerRef} className={clsx("animated-title", containerClass)}>
//       {title.split("<br />").map((line, index) => (
//         <div
//           key={index}
//           className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
//         >
//           {line.split(" ").map((word, idx) => (
//             <span
//               key={idx}
//               className="animated-word"
//               dangerouslySetInnerHTML={{ __html: word }}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AnimatedTitle;


"use client"

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animated-word",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",      // when top of element hits 80% of viewport
            end: "bottom 20%",     // when bottom of element hits 20% of viewport
            scrub: true,           // links animation progress to scroll
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
