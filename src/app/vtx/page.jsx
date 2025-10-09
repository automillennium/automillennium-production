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

               <div className="relative flex flex-col items-center pt-40 pb-20 px-4 md:px-8">
          
          {/* Logo */}
          <img
            src="/img/vtx-white.png"
            alt="VTX Logo"
            className="page-logo  h-[150px] w-[200px] lg:h-[300px] lg:w-[400px] object-contain" 
          />

          {/* Title and Intro Text */}
          <div className="text-center max-w-5xl mx-auto mt-10">
            <h1 className="page-logo text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Premium Protection. Advanced Technology.
            </h1>
            <p className="page-logo text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto">
              **VTX** is Auto Millennium’s premium line of vehicle protection solutions,
              designed to keep your car looking brand-new while safeguarding it from
              harsh weather, road debris, and everyday wear. Our products combine
              advanced technology with professional application, ensuring your vehicle
              maintains its **value, shine, and performance** over time.
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


        {/* === Services Section (Beautified Cards) === */}
        <section className="py-24 px-4 md:px-8 max-w-[90%] mx-auto">
       <h2 className="fade-scroll text-white text-center text-5xl md:text-6xl font-bold mb-16">
            Our Protection Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-10 justify-center">
           {[
              {
                title: "Paint Protection Film (PPF)",
                imagePlaceholder: "bg-cyan-500/20",
                videoUrl:"/videos/PPF.mp4",
                items: [
                  "Invisible shield against chips, scratches, and debris.",
                  "High gloss finish & Self-healing technology.",
                  "Custom-cut for precision fit.",
                ],
              },
              {
                title: "Ceramic Coating",
                imagePlaceholder: "bg-blue-500/20",
                                videoUrl:"/videos/CERAMIC.mp4",

                items: [
                  "Long-lasting hydrophobic protective layer.",
                  "Maximum UV resistance & deep gloss shine.",
                  "Easy maintenance with anti-dirt properties.",
                ],
              },
              {
                title: "Window Tinting",
                imagePlaceholder: "bg-indigo-500/20",
                                videoUrl:"/videos/TINT.mp4",

                items: [
                  "Superior heat rejection for cabin comfort.",
                  "Full UV protection for occupants.",
                  "Stylish, privacy-enhancing, and legally compliant shades.",
                ],
              },
              {
                title: "Interior & Exterior Detailing",
                imagePlaceholder: "bg-violet-500/20",
                                videoUrl:"/videos/TINT.mp4",

                items: [
                  "Deep cleaning and material restoration.",
                  "Leather, fabric, and dashboard long-term protection.",
                  "Keeps your vehicle fresh inside-out.",
                ],
              },
              {
                title: "Tailored Protection (Custom Packages)",
                imagePlaceholder: "bg-purple-500/20",
                                videoUrl:"/videos/TINT.mp4",

                items: [
                  "Protection packages customized for your vehicle's needs.",
                  "Combine PPF, coating, tinting & detailing for total coverage.",
                  "Expert consultation to choose the optimal package.",
                ],
              },
            ].map((service, i) => (
              <div key={i} className="flex flex-col fade-scroll group w-[300px]">
                {/* Placeholder Image/Icon Area (Apple-style visual element) */}
      <div className={`h-[300px] ${service.imagePlaceholder} rounded-t-3xl border border-zinc-700 flex items-center justify-center overflow-hidden`}>
  <video
    src={service?.videoUrl}
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  >
    Your browser does not support the video tag.
  </video>
</div>


                {/* Service Details Card */}
                <div
                  className="service-item p-6 bg-zinc-900 border border-zinc-800 rounded-b-3xl shadow-xl transition duration-300 group-hover:shadow-cyan-500/20 group-hover:bg-zinc-800/80 h-[260px]"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  
                  {/* Clean List with Bullet Points */}
                  <ul className="list-disc text-gray-400 pl-5 text-sm space-y-1"> 
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

