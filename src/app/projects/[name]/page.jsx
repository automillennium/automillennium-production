


// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import Image from "next/image";
// import { Poppins } from "next/font/google";
// import { useRouter } from "next/navigation";
// import { sliderData } from "../projectsData";

// // --- Font Configuration ---
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-poppins",
// });

// export default function Home() {
//   const router = useRouter();
//   const [activeItem, setActiveItem] = useState(0);
//   const [activeModel, setActiveModel] = useState(0); // start at 0
//   const countItem = sliderData.length;
//   const modelRef = useRef(null);

//   // Dynamic padding for centering thumbnails
//   const [centerPadding, setCenterPadding] = useState("0px");

//   // --- Swiping / Dragging state ---
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const [draggedDistance, setDraggedDistance] = useState(0);
//   const minSwipeDistance = 50;

//   // --- Main Slider Navigation ---
//   const nextSlide = useCallback(() => {
//     setActiveItem((prev) => (prev + 1) % countItem);
//     setActiveModel(0);
//   }, [countItem]);

//   const prevSlide = () => {
//     setActiveItem((prev) => (prev - 1 + countItem) % countItem);
//     setActiveModel(0);
//   };

//   // --- Bottom Slider Navigation ---
//   const nextModel = () => {
//     const currentModels = sliderData[activeItem].models;
//     setActiveModel((prev) => Math.min(prev + 1, currentModels.length - 1));
//   };

//   const prevModel = () => {
//     setActiveModel((prev) => Math.max(prev - 1, 0));
//   };

//   // Handle thumbnail click
//   const handleThumbnailClick = (idx) => {
//     if (Math.abs(draggedDistance) > 5) return;

//     if (idx !== activeModel) {
//       setActiveModel(idx);
//     } else {
//       const currentItem = sliderData[activeItem];
//       const dynamicRoute = `/projects/${currentItem.slug}/${idx}`;
//       router.push(dynamicRoute);
//     }
//   };

//   // --- Calculate dynamic padding ---
//   const calculatePadding = useCallback(() => {
//     if (modelRef.current) {
//       const container = modelRef.current;
//       const firstThumb = container.children[0];

//       if (firstThumb) {
//         const containerWidth = container.offsetWidth;
//         const thumbWidth = firstThumb.offsetWidth;

//         let padding;

//         if (container.children.length === 1) {
//           // Single thumbnail → center it
//           padding = (containerWidth - thumbWidth) / 2;
//         } else {
//           // Multiple thumbnails → same as before
//           padding = containerWidth / 2 - thumbWidth / 2;
//         }

//         setCenterPadding(`${padding}px`);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     calculatePadding();
//     window.addEventListener("resize", calculatePadding);
//     return () => window.removeEventListener("resize", calculatePadding);
//   }, [calculatePadding]);

//   // --- Centering logic ---
//   const centerThumbnail = useCallback(() => {
//     if (modelRef.current) {
//       const container = modelRef.current;
//       const activeThumb = container.children[activeModel];
//       const containerWidth = container.offsetWidth;

//       if (activeThumb) {
//         const scrollPosition =
//           activeThumb.offsetLeft -
//           containerWidth / 2 +
//           activeThumb.offsetWidth / 2;
//         container.scrollTo({ left: scrollPosition, behavior: "smooth" });
//       }
//     }
//   }, [activeModel]);

//   useEffect(() => {
//     centerThumbnail();
//   }, [activeModel, centerThumbnail]);

//   // --- Touch Handlers ---
//   const onTouchStart = (e) => {
//     setTouchEnd(null);
//     setTouchStart(e.targetTouches[0].clientX);
//     setDraggedDistance(0);
//   };

//   const onTouchMove = (e) => {
//     const currentTouchX = e.targetTouches[0].clientX;
//     setTouchEnd(currentTouchX);
//     setDraggedDistance(Math.abs(touchStart - currentTouchX));
//   };

//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
//     const distance = touchStart - touchEnd;
//     const currentModels = sliderData[activeItem].models;

//     if (Math.abs(distance) > minSwipeDistance) {
//       if (distance > 0) {
//         setActiveModel((prev) => Math.min(prev + 1, currentModels.length - 1));
//       } else {
//         setActiveModel((prev) => Math.max(prev - 1, 0));
//       }
//     }

//     setTouchStart(null);
//     setTouchEnd(null);
//     setDraggedDistance(0);
//   };

//   // --- Mouse Drag Handlers ---
//   const onMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.pageX - modelRef.current.offsetLeft);
//     setScrollLeft(modelRef.current.scrollLeft);
//     setDraggedDistance(0);
//     modelRef.current.style.cursor = "grabbing";
//     modelRef.current.style.userSelect = "none";
//   };

//   const onMouseMove = (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const x = e.pageX - modelRef.current.offsetLeft;
//     const walk = (x - startX) * 1.5;
//     modelRef.current.scrollLeft = scrollLeft - walk;
//     setDraggedDistance(Math.abs(scrollLeft - modelRef.current.scrollLeft));
//   };

//   const onMouseUp = () => {
//     if (!isDragging) return;
//     setIsDragging(false);

//     const container = modelRef.current;
//     const children = Array.from(container.children);
//     let closestIndex = activeModel;
//     let minDiff = Infinity;
//     const scrollCenter = container.scrollLeft + container.offsetWidth / 2;

//     children.forEach((child, index) => {
//       const childCenter = child.offsetLeft + child.offsetWidth / 2;
//       const diff = Math.abs(childCenter - scrollCenter);

//       if (diff < minDiff) {
//         minDiff = diff;
//         closestIndex = index;
//       }
//     });

//     setActiveModel(closestIndex);
//     container.style.cursor = "grab";
//     container.style.userSelect = "auto";
//   };

//   const onMouseLeave = () => {
//     if (isDragging && modelRef.current) {
//       setIsDragging(false);
//       modelRef.current.style.cursor = "grab";
//       modelRef.current.style.userSelect = "auto";
//     }
//   };

//   return (
//     <div className={`min-h-screen bg-black ${poppins.variable} font-poppins`}>
//       {/* Main Slider */}
//       <div className="slider h-screen -mt-[50px] relative">
//         <div className="list">
//           {sliderData.map((item, index) => (
//             <div
//               key={item.id}
//               className={`slide-item absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 ${
//                 index === activeItem ? "opacity-100 z-10" : ""
//               }`}
//             >
//               <Image
//                 src={item.models[activeModel]}
//                 alt={`Slider ${item.id}`}
//                 layout="fill"
//                 objectFit="cover"
//                 priority={index === activeItem}
//               />
//               <div className="content absolute left-[10%] top-[20%] w-[500px] max-w-[80%] z-[1] text-white">
//                 <p
//                   className={`${
//                     index === activeItem ? "animate-show-content-1" : ""
//                   } uppercase tracking-[10px] transform translate-y-[30px] opacity-0`}
//                 >
//                   {item.type}
//                 </p>
//                 <h2
//                   className={`${
//                     index === activeItem ? "animate-show-content-2" : ""
//                   } text-[100px] m-0 max-[678px]:text-[60px] transform translate-y-[30px] opacity-0`}
//                 >
//                   {item.title}
//                 </h2>
//                 <p
//                   className={`${
//                     index === activeItem ? "animate-show-content-3" : ""
//                   } transform translate-y-[30px] opacity-0`}
//                 >
//                   {item.description}
//                 </p>
//               </div>
//               <div className="absolute inset-0 bg-black/50 z-0"></div>
//             </div>
//           ))}
//         </div>

//         {/* Main Slider Arrows */}
//         <div className="arrows absolute top-[30%] right-[50px] z-50 max-[678px]:top-[10%]">
//           <button
//             onClick={prevSlide}
//             className="bg-white/30 w-10 h-10 rounded-md text-xl text-white hover:bg-white hover:text-black transition-colors"
//           >
//             {"<"}
//           </button>
//           <button
//             onClick={nextSlide}
//             className="ml-2 bg-white/30 w-10 h-10 rounded-md text-xl text-white hover:bg-white hover:text-black transition-colors"
//           >
//             {">"}
//           </button>
//         </div>

//         {/* Thumbnails */}
//         <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2 z-10 w-[1050px] max-w-[95%] flex items-center justify-between">
//           <button
//             onClick={prevModel}
//             disabled={activeModel === 0}
//             className="z-20 bg-white/30 w-10 h-10 rounded-full text-xl text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             &lt;
//           </button>

//           <div
//             ref={modelRef}
//             onTouchStart={onTouchStart}
//             onTouchMove={onTouchMove}
//             onTouchEnd={onTouchEnd}
//             onMouseDown={onMouseDown}
//             onMouseMove={onMouseMove}
//             onMouseUp={onMouseUp}
//             onMouseLeave={onMouseLeave}
//             style={{ paddingLeft: centerPadding, paddingRight: centerPadding }}
//             className={`flex gap-4 w-[950px] h-[240px] py-4 box-border overflow-x-scroll scroll-smooth items-center snap-x snap-mandatory [&::-webkit-scrollbar]:hidden cursor-grab`}
//           >
//             {sliderData[activeItem].models.map((model, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => handleThumbnailClick(idx)}
//                 className={`cursor-pointer transition-all duration-500 flex-shrink-0 relative w-[340px] h-[200px] rounded-xl overflow-hidden snap-center ${
//                   idx === activeModel
//                     ? "scale-110 brightness-110 shadow-2xl ring-4 ring-white/80 z-20"
//                     : "scale-90 brightness-50"
//                 }`}
//               >
//                 <Image
//                   src={model}
//                   alt={`Model ${idx}`}
//                   layout="fill"
//                   objectFit="cover"
//                   className="object-cover w-full h-full pointer-events-none"
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={nextModel}
//             disabled={
//               activeModel === sliderData[activeItem].models.length - 1
//             }
//             className="z-20 bg-white/30 w-10 h-10 rounded-full text-xl text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { sliderData } from "../projectsData";
import { Poppins } from "next/font/google";

// --- Font Configuration ---
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-poppins",
});

export default function ProjectPage() {
  const params = useParams();
  const projectSlug = params.name;
  const router = useRouter();

  const project = sliderData.find((p) => p.slug === projectSlug);
  const [activeModel, setActiveModel] = useState(0);
  const modelRef = useRef(null);
  const [centerPadding, setCenterPadding] = useState("0px");

  if (!project) return <p className="text-white">Project not found</p>;

  // --- Model Navigation ---
  const nextModel = () =>
    setActiveModel((prev) => Math.min(prev + 1, project.models.length - 1));
  const prevModel = () =>
    setActiveModel((prev) => Math.max(prev - 1, 0));

  // --- Thumbnail click ---
  const handleThumbnailClick = (idx) => {
    if (idx !== activeModel) {
      setActiveModel(idx);
    } else {
      // Navigate using slug
      const dynamicRoute = `/projects/${project.slug}/${project.models[idx].slug}`;
      router.push(dynamicRoute);
    }
  };

  // --- Center padding calculation ---
  const calculatePadding = useCallback(() => {
    if (modelRef.current) {
      const container = modelRef.current;
      const firstThumb = container.children[0];
      if (firstThumb) {
        const containerWidth = container.offsetWidth;
        const thumbWidth = firstThumb.offsetWidth;
        const padding =
          container.children.length === 1
            ? (containerWidth - thumbWidth) / 2
            : containerWidth / 2 - thumbWidth / 2;
        setCenterPadding(`${padding}px`);
      }
    }
  }, []);

  useEffect(() => {
    calculatePadding();
    window.addEventListener("resize", calculatePadding);
    return () => window.removeEventListener("resize", calculatePadding);
  }, [calculatePadding]);

  // --- Center active thumbnail ---
  const centerThumbnail = useCallback(() => {
    if (modelRef.current) {
      const container = modelRef.current;
      const activeThumb = container.children[activeModel];
      const containerWidth = container.offsetWidth;
      if (activeThumb) {
        const scrollPosition =
          activeThumb.offsetLeft - containerWidth / 2 + activeThumb.offsetWidth / 2;
        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [activeModel]);

  useEffect(() => {
    centerThumbnail();
  }, [activeModel, centerThumbnail]);

  return (
    <div className={`min-h-screen bg-black ${poppins.variable} font-poppins`}>
      {/* Main Slider */}
      <div className="slider h-screen -mt-[50px] relative">
        <div className="slide-item absolute inset-0 overflow-hidden opacity-100 z-10">
          <Image
            src={project.bannerImg}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="content absolute left-[10%] top-[20%] w-[500px] max-w-[80%] z-[1] text-white">
            <p className="uppercase tracking-[10px]">{project.type}</p>
            <h2 className="text-[100px] max-[678px]:text-[60px]">{project.title}</h2>
            <p>{project.description}</p>
          </div>
          <div className="absolute inset-0 bg-black/50 z-0"></div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2 z-10 w-[1050px] max-w-[95%] flex items-center justify-between">
          <button
            onClick={prevModel}
            disabled={activeModel === 0}
            className="z-20 bg-white/30 w-10 h-10 rounded-full text-xl text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>

          <div
            ref={modelRef}
            style={{ paddingLeft: centerPadding, paddingRight: centerPadding }}
            className="flex gap-4 w-[950px] h-[240px] py-4 box-border overflow-x-scroll scroll-smooth items-center snap-x snap-mandatory [&::-webkit-scrollbar]:hidden cursor-grab"
          >
            {project.models.map((model, idx) => (
              <div
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`cursor-pointer transition-all duration-500 flex-shrink-0 relative w-[340px] h-[200px] rounded-xl overflow-hidden snap-center ${
                  idx === activeModel
                    ? "scale-110 brightness-110 shadow-2xl ring-4 ring-white/80 z-20"
                    : "scale-90 brightness-50"
                }`}
              >
                <Image
                  src={model.image}
                  alt={model.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="pointer-events-none"
                />
              </div>
            ))}
          </div>

          <button
            onClick={nextModel}
            disabled={activeModel === project.models.length - 1}
            className="z-20 bg-white/30 w-10 h-10 rounded-full text-xl text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
