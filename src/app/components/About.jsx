import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
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
      height: "120vh",
      borderRadius: 0,
    });
  });

  return (
    
    <div id="about" className="min-h-screen w-screen">
<div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
  {/* <p className="font-general text-sm uppercase md:text-[10px]">
    Welcome to Automillennium Group
  </p> */}

  <AnimatedTitle
    title="Discover the world’s <br /> largest shared <b>r</b>ide"
    containerClass="mt-5 !text-black text-center"
  />

  <div className="about-subtext">
    <p>The Ride of Rides begins—your car, now an epic masterpiece</p>
    <p className="text-gray-500">
      Automillennium unites every enthusiast from countless garages and streets, both digital and real, into a unified Car Culture
    </p>
  </div>
</div>


      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          {/* <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          /> */}


                <video
            src={"/videos/car-hero-1.mp4"}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

