"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaFacebook, FaTiktok, FaLinkedin, FaYoutube, FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // For X (Twitter new logo)

gsap.registerPlugin(ScrollTrigger);



const Footer = () => {
  const containerRef = useRef(null);

  

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      animation.to(
        ".animated-block",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          duration: 1,
          ease: "power4.out",
          stagger: 0.5,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="w-screen bg-black text-white" ref={containerRef}>
      <div className="w-full bg-black py-16 px-4 border-t border-gray-200">
        <h2 className="prompto text-2xl md:text-3xl text-center font-bold italic mb-10 animated-block opacity-0 translate-y-8">
          3 GLOBAL FACTORY LOCATIONS
        </h2>

        <div className="flex flex-col-reverse md:flex-row justify-center gap-10 h-[250px] px-10 md:px-20">
          <div className="flex flex-1  md:flex-col justify-center items-start gap-3 ">
            <h3 className="prompto text-2xl md:text-6xl italic font-bold outline-text mb-2 animated-block opacity-0 translate-y-8">
              UAE
            </h3>
            <h3 className="prompto text-2xl md:text-6xl italic font-bold outline-text mb-2 animated-block opacity-0 translate-y-8">
              INDIA
            </h3>
            <h3 className="prompto text-2xl md:text-6xl italic font-bold outline-text mb-2 animated-block opacity-0 translate-y-8">
              SAUDI
            </h3>
          </div>

          <div className="flex-2 flex justify-center items-center animated-block opacity-0 translate-y-8">
            <img
              src="/img/map-w.png"
              alt="Map image"
              className="object-cover w-full md:w-[800px] h-[300px]"
            />
          </div>


        </div>
        
<div className="flex flex-col justify-start">
  {/* <h2 className="!lacto text-2xl md:text-3xl text-left mb-10 animated-block opacity-0 translate-y-8 uppercase">
    Partnership
  </h2>
  <p className="text-2xl md:text-[14px] text-left mb-10 animated-block opacity-0 translate-y-8 !lacto uppercase">
    Become a Dealer
  </p> */}

  {/* Social Icons Section */}
</div>
  <div className="flex gap-4 mt-16 justify-center">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="text-1xl md:text-3xl hover:text-pink-500 transition" />
    </a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <FaFacebook className="text-1xl md:text-3xl hover:text-blue-600 transition" />
    </a>
    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
      <FaTiktok className="text-1xl md:text-3xl hover:text-black transition" />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="text-1xl md:text-3xl hover:text-blue-500 transition" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <FaXTwitter className="text-1xl md:text-3xl hover:text-black transition" />
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
      <FaYoutube className="text-1xl md:text-3xl hover:text-red-600 transition" />
    </a>
    <a href="tel:+1234567890">
      <FaPhone className="text-1xl md:text-3xl hover:text-green-600 transition" />
    </a>
  </div>
      </div>

  

    </footer>
  );
};

export default Footer;
