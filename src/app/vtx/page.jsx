"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  // Handle video loading state
  const handleVideoReady = () => {
    setLoading(false);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video && video.readyState >= 3) {
      setLoading(false);
    } else if (video) {
      video.addEventListener("canplaythrough", handleVideoReady);
    }

    return () => {
      if (video) {
        video.removeEventListener("canplaythrough", handleVideoReady);
      }
    };
  }, []);

  useGSAP(() => {
    // Fade in logo on page load
    gsap.fromTo(
      ".page-logo",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
    );

    // Clip scroll animation
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

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100%",
      borderRadius: 0,
    });

    // Fade in/out on scroll for all elements with .fade-scroll
    gsap.utils.toArray(".fade-scroll").forEach((el) => {
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
          },
        }
      );
    });
  });

  return (
    <div className="bg-black">
      <div id="about" className="min-h-screen w-screen bg-black ">
        <div className="relative mb-8 flex flex-col items-center gap-3 pt-36">
          {/* Logo */}
          <img
            src="/img/vtx-white.png"
            alt="VTX Logo"
            className="page-logo h-[300px] w-[400px] object-contain fade-scroll"
          />

          <div className="text-center text-white text-[20px] pb-10 fade-scroll">
            <p className="max-w-[1100px]">
              VTX is Auto Millennium’s premium line of vehicle protection solutions,
              designed to keep your car looking brand-new while safeguarding it from
              harsh weather, road debris, and everyday wear. Our products combine
              advanced technology with professional application, ensuring your vehicle
              maintains its value, shine, and performance over time.
            </p>
          </div>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex-center absolute z-[100] h-dvh w-screen bg-black">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        )}

        {/* Video */}
        <div className="h-dvh w-screen relative bg-black" id="clip">
          <div className="mask-clip-path about-image">
            <video
              ref={videoRef}
              src="https://automillennium.com/wp-content/uploads/2023/08/VTX.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute left-0 top-0 size-full object-cover object-center"
            />
          </div>
        </div>

        {/* Services Section */}
        <section className="py-20 px-10 max-w-[1800px] mx-auto">
          <h1 className="fade-scroll text-white text-center text-[34px] ">
            Our Services
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mt-1 text-white">
            {[
              {
                title: "Paint Protection Film (PPF)",
                items: [
                  "Invisible shield that protects against stone chips, scratches, and road debris.",
                  "High gloss & self-healing technology.",
                  "Custom-cut for precision fit.",
                ],
              },
              {
                title: "Ceramic Coating",
                items: [
                  "Long-lasting hydrophobic layer.",
                  "UV resistance & high gloss finish.",
                  "Easy maintenance with anti-dirt technology.",
                ],
              },
              {
                title: "Window Tinting",
                items: [
                  "Heat rejection for comfort.",
                  "UV protection for passengers.",
                  "Stylish shades with legal compliance.",
                ],
              },
              {
                title: "Interior & Exterior Detailing",
                items: [
                  "Deep cleaning and restoration.",
                  "Leather, fabric, and dashboard protection.",
                  "Keeps your car fresh inside-out.",
                ],
              },
              {
                title: "Tailored Protection (Custom Packages)",
                items: [
                  "Customized protection packages designed for your vehicle.",
                  "Combine PPF, ceramic coating, tinting & detailing for full coverage.",
                  "Professional consultation to choose the perfect package.",
                ],
              },
            ].map((service, i) => (

<div className="flex flex-col pt-20 flex-wrap">
<div className="h-[300px] w-full bg-white rounded-t-2xl">

</div>

   <div
    key={i}
    // Added 'text-left' to the container and removed 'list-inside' 
    // to ensure the bullet points start right at the edge of the padding.
    className="service-item p-6 bg-neutral-900 rounded-lg shadow-lg fade-scroll text-left h-[230px] rounded-b-2xl"
>
    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
    
    {/* Use 'list-disc' and 'pl-5' for margin, which often creates better alignment */}
    <ul className="list-disc text-gray-300 pl-5 text-sm "> 
        {service.items.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
    </ul>
</div>
        </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
