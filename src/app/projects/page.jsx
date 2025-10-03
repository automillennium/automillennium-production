'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

// --- Data ---
const sliderData = [
  { 
    id: 1, 
    title: 'Alfa Romeo', 
    type: 'design', 
    description: 'Experience the perfect blend of Italian passion and performance.', 
    models: [
      '/img/projects/alfa.webp',
      '/img/projects/bentley.webp',
      '/img/projects/gac.webp',
      '/img/projects/hummer.webp',
    ] 
  },
  { 
    id: 2, 
    title: 'Bentley Azure', 
    type: 'luxury', 
    description: 'Unparalleled craftsmanship and effortless power redefined.', 
    models: [
      '/img/projects/bentley.webp',
      '/img/projects/gac.webp',
      '/img/projects/hummer.webp',
      '/img/projects/rollys.webp',
      '/img/projects/bentley.webp',
      '/img/projects/gac.webp',
      '/img/projects/hummer.webp',
      '/img/projects/rollys.webp',
    ] 
  },
  { 
    id: 3, 
    title: 'GAC Trumpchi', 
    type: 'innovation', 
    description: 'Cutting-edge technology meets futuristic automotive design.', 
    models: [
      '/img/projects/gac.webp',
      '/img/projects/hummer.webp',
      '/img/projects/rollys.webp',
      '/img/projects/alfa.webp',
    ] 
  },
];

// --- Font Configuration ---
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-poppins',
});

// --- Component ---
export default function Home() {
  const [activeItem, setActiveItem] = useState(0);
  const [activeModel, setActiveModel] = useState(1);
  const countItem = sliderData.length;
  const modelRef = useRef(null);

  // --- Swiping/Dragging State ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // New state for mouse dragging
  const [startX, setStartX] = useState(0); // Mouse X position on drag start
  const [scrollLeft, setScrollLeft] = useState(0); // Container scroll position on drag start
  const minSwipeDistance = 50; // Minimum distance for swipe/drag to register a model change

  // --- Main Slider Logic (Unchanged) ---
  const nextSlide = useCallback(() => {
    setActiveItem((prev) => (prev + 1) % countItem);
    setActiveModel(0);
  }, [countItem]);

  const prevSlide = () => {
    setActiveItem((prev) => (prev - 1 + countItem) % countItem);
    setActiveModel(0);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // --- Centering Logic for Thumbnails ---
  const centerThumbnail = useCallback(() => {
    if (modelRef.current) {
      const container = modelRef.current;
      const activeThumb = container.children[activeModel];
      
      if (activeThumb) {
        const containerWidth = container.offsetWidth;
        
        // Calculate scroll position to center the active thumbnail
        const scrollPosition = activeThumb.offsetLeft + activeThumb.offsetWidth / 2 - containerWidth / 2;
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [activeModel]);

  useEffect(() => {
    // Recenter when activeModel or activeItem changes
    centerThumbnail();
  }, [activeModel, activeItem, centerThumbnail]);


  // --- 1. Touch Swiping Handlers (Mobile) ---

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const currentModels = sliderData[activeItem].models;

    if (distance > minSwipeDistance) {
      // Swipe left (Show next model)
      setActiveModel((prev) => Math.min(prev + 1, currentModels.length - 1));
    } else if (distance < -minSwipeDistance) {
      // Swipe right (Show previous model)
      setActiveModel((prev) => Math.max(prev - 1, 0));
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // --- 2. Mouse Dragging Handlers (Desktop) ---

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - modelRef.current.offsetLeft);
    setScrollLeft(modelRef.current.scrollLeft);
    // Disable text selection during drag for a better UX
    modelRef.current.style.cursor = 'grabbing';
    modelRef.current.style.userSelect = 'none';
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - modelRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity multiplier
    modelRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Logic to snap to the closest thumbnail after drag ends (optional but good)
    const container = modelRef.current;
    const children = Array.from(container.children);
    let closestIndex = activeModel;
    let minDiff = Infinity;

    // Find the current scroll center
    const scrollCenter = container.scrollLeft + container.offsetWidth / 2;

    children.forEach((child, index) => {
        // Find the center of the thumbnail
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const diff = Math.abs(childCenter - scrollCenter);

        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
        }
    });

    setActiveModel(closestIndex); // Set the new active model based on the snap

    // Reset cursor/selection style
    container.style.cursor = 'grab';
    container.style.userSelect = 'auto';
  };
  
  // Note: onMouseLeave is important to stop dragging if the mouse leaves the container
  const onMouseLeave = () => {
    if (isDragging && modelRef.current) {
      setIsDragging(false);
      modelRef.current.style.cursor = 'grab';
      modelRef.current.style.userSelect = 'auto';
    }
  };


  return (
    <div className={`min-h-screen bg-black ${poppins.variable} font-poppins`}>
      
      {/* Main Slider Container */}
      <div className="slider h-screen -mt-[50px] relative">
        
        {/* List of Main Slides (Background Images) */}
        <div className="list">
          {sliderData.map((item, index) => (
            <div
              key={item.id}
              className={`slide-item absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 ${index === activeItem ? 'opacity-100 z-10' : ''}`}
            >
              <Image
                src={item.models[activeModel]} 
                alt={`Slider ${item.id}`}
                layout="fill"
                objectFit="cover"
                priority={index === activeItem}
              />
              {/* Overlay Content */}
              <div className="content absolute left-[10%] top-[20%] w-[500px] max-w-[80%] z-[1] text-white">
                <p className={`${index === activeItem ? 'animate-show-content-1' : ''} uppercase tracking-[10px] transform translate-y-[30px] opacity-0`}>
                  {item.type}
                </p>
                <h2 className={`${index === activeItem ? 'animate-show-content-2' : ''} text-[100px] m-0 max-[678px]:text-[60px] transform translate-y-[30px] opacity-0`}>
                  {item.title}
                </h2>
                <p className={`${index === activeItem ? 'animate-show-content-3' : ''} transform translate-y-[30px] opacity-0`}>
                  {item.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-black/50 z-0"></div> {/* Dark overlay */}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="arrows absolute top-[30%] right-[50px] z-50 max-[678px]:top-[10%]">
          <button onClick={prevSlide} className="bg-white/30 w-10 h-10 rounded-md text-xl text-white hover:bg-white hover:text-black transition-colors">
            {'<'}
          </button>
          <button onClick={nextSlide} className="ml-2 bg-white/30 w-10 h-10 rounded-md text-xl text-white hover:bg-white hover:text-black transition-colors">
            {'>'}
          </button>
        </div>

        {/* Centered Model Thumbnails (The three-item carousel) */}
        <div
          ref={modelRef}
          // Touch Handlers for Mobile Swiping
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          
          // Mouse Handlers for Desktop Click & Drag
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave} // Crucial to stop dragging if mouse leaves
          
          className={`absolute bottom-[50px] left-1/2 -translate-x-1/2 z-10 flex gap-4 w-[950px] 
                     h-[240px] px-2 py-4 box-border overflow-x-scroll scroll-smooth items-center
                     snap-x snap-mandatory [&::-webkit-scrollbar]:hidden cursor-grab`}
        >
          {sliderData[activeItem].models.map((model, idx) => (
            <div
              key={idx}
              onClick={() => {
                // Prevent click action from firing if the mouse was dragging
                if (Math.abs(modelRef.current.scrollLeft - scrollLeft) < 5) {
                    setActiveModel(idx)
                }
              }}
              className={`cursor-pointer transition-all duration-500 flex-shrink-0 relative 
                          w-[340px] h-[200px] rounded-xl overflow-hidden snap-center
                          ${idx === activeModel 
                            ? 'scale-110 brightness-110 shadow-2xl ring-4 ring-white/80 z-20' 
                            : 'scale-90 brightness-50'}`
              }
            >
              <Image
                src={model}
                alt={`Model ${idx}`}
                layout="fill"
                objectFit="cover"
                className="object-cover w-full h-full pointer-events-none" // Prevents image dragging
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}