import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";
import { BentoCard, BentoTilt } from "./Features";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        {/* <p className="font-general text-sm uppercase md:text-[10px]">
Automillennium group
        </p> */}

        <div className="relative size-full px-4 md:px-[84px] ">
          <AnimatedTitle
            title="the story of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

              <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] mt-10">
                <BentoCard
                  src="/videos/car-hero-1.mp4"
                  title={
         ""
                  }
                  description=""
                />
              </BentoTilt>

          {/* <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
     <video
  ref={frameRef}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  onMouseUp={handleMouseLeave}
  onMouseEnter={handleMouseLeave}
  src="/videos/car-hero-1.mp4"
  className="object-contain"
  autoPlay
  muted
  loop
  playsInline
  aria-label="Car Hero Video"
/>

              </div>
            </div>

            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div> */}
        </div>

        <div className="mt-6 flex w-full justify-center md:-mt-1  md:justify-center">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-center ">
AutoMillennium Group, where automotive dreams come to life. With three specialized divisions, we offer a comprehensive range of services and products to meet every requirement.
            </p>
<div className="w-full flex justify-center items-center">

            <Button
              id="realm-btn"
              title="discover more"
              containerClass="mt-5"
              
              />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
