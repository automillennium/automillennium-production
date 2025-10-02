'use client'; // This component uses React Hooks, so it must be a Client Component

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';


// Data for the slides
const sliderData = [
  { id: 1, title: 'project 01', type: 'design', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.', image: '/img/projects/alfa.webp' },
  { id: 2, title: 'project 02', type: 'design', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.', image: '/img/projects/bentley.webp' },
  { id: 3, title: 'project 03', type: 'design', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.', image: '/img/projects/gac.webp' },
  { id: 4, title: 'project 04', type: 'design', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.', image: '/img/projects/hummer.webp' },
  { id: 5, title: 'project 05', type: 'design', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.', image: '/img/projects/rollys.webp' },
];


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});


export default function Home() {


  
  const [activeItem, setActiveItem] = useState(0);
  const countItem = sliderData.length;

  // Function to move to the next slide
  const nextSlide = useCallback(() => {
    setActiveItem((prev) => (prev + 1) % countItem);
  }, [countItem]);

  // Function to move to the previous slide
  const prevSlide = () => {
    setActiveItem((prev) => (prev - 1 + countItem) % countItem);
  };

  // Auto-run functionality
  useEffect(() => {
    const refreshInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(refreshInterval); // Cleanup on unmount
  }, [nextSlide]);

  return (
    <div className="min-h-screen">
      


      {/* --- Slider --- */}
      {/* <div className="slider h-screen -mt-[50px] relative">
        
        <div className="list">
          {sliderData.map((item, index) => (
            <div
              key={item.id}
              className={`slide-item absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 text-white ${index === activeItem ? 'opacity-100 z-10' : ''}`}
            >
              <Image 
                src={item.image} 
                alt={`Slider ${item.id}`}
                layout="fill"
                objectFit="cover"
                priority={index === activeItem} // Prioritize active image for faster loading
              />
              <div className="content absolute left-[10%] top-[20%] w-[500px] max-w-[80%] z-[1]">
                <p 
                  className={`uppercase tracking-[10px] ${index === activeItem ? 'animate-show-content-1' : ''} transform translate-y-[30px] filter blur-[20px] opacity-0`}
                >
                  {item.type}
                </p>
                <h2 
                  className={`text-[100px] m-0 max-[678px]:text-[60px] ${index === activeItem ? 'animate-show-content-2' : ''} transform translate-y-[30px] filter blur-[20px] opacity-0`}
                >
                  {item.title}
                </h2>
                <p 
                  className={`${index === activeItem ? 'animate-show-content-3' : ''} transform translate-y-[30px] filter blur-[20px] opacity-0`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows absolute top-[30%] right-[50px] z-50 max-[678px]:top-[10%]">
          <button 
            id="prev" 
            onClick={prevSlide}
            className="bg-white/30 border-none font-mono w-10 h-10 rounded-md text-xl text-white transition-colors duration-500 hover:bg-white hover:text-black"
          >
            {'<'}
          </button>
          <button 
            id="next" 
            onClick={nextSlide}
            className="ml-2 bg-white/30 border-none font-mono w-10 h-10 rounded-md text-xl text-white transition-colors duration-500 hover:bg-white hover:text-black"
          >
            {'>'}
          </button>
        </div>

        <div className="thumbnail absolute bottom-[50px] z-10 flex gap-[10px] w-full h-[220px] px-[50px] box-border overflow-x-auto justify-center [&::-webkit-scrollbar]:w-0 max-[678px]:justify-start">
          {sliderData.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(index)}
              className={`cursor-pointer w-[150px] h-full filter brightness-50 transition-all duration-500 flex-shrink-0 relative ${index === activeItem ? 'brightness-[1.5]' : ''}`}
            >
              <img
                src={item.image} 
                alt={`Thumbnail ${item.id}`}

                objectFit="cover"
                className="rounded-lg h-[200px] object-cover"
              />
              <div className="content absolute inset-x-[20px] bottom-[40px] text-white">
               Project Name 
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}