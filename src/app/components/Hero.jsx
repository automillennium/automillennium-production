

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useState } from "react";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
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

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <video
          // src="/videos/car-hero-1.mp4"
          src={"https://automillennium.com/wp-content/uploads/2025/07/amg-video-1920x1080-1.mp4"}
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        <div className="absolute left-0 top-0 z-40 size-full">
          {/* <div className="mt-24 px-5 sm:px-10">
            <p className="mb-5 max-w-96 font-robert-regular text-blue-100 !text-[30px]">
              Built for You
              <br /> Designed for the Drive
            </p>

            <Button
              id="watch-trailer"
              title="Consult US"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;

