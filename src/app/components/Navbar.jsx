import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { _vertical } from "gsap/Observer";
import { Separator } from "./ui/Separator";


// import Button from "./Button";


 

const navItems = [
  { name: "VTX", link: "vtx" },
  { name: "ROX", link: "rox" },
  { name: "AutoCare 360", link: "autocare" },
  { name: "RhinoMotive", link: "rhinomotive" },
  { name: "Global Business", link: "global-business" },
];
const navItemsTwo = [
  { name: "Project", link: "project" },
  { name: "Events", link: "events" },
  { name: "Our Teams", link: "our-teams" },
];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // // Manage audio playback
  // useEffect(() => {
  //   if (isAudioPlaying) {
  //     audioElementRef.current.play();
  //   } else {
  //     audioElementRef.current.pause();
  //   }
  // }, [isAudioPlaying]);


  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 border-none transition-all duration-700 sm:inset-x-6 h-[45px]"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
<nav className="flex size-full items-center justify-center p-4 !font-apple gap-[35px] relative">
          {/* Logo and Product button */}
          <div className="absolute left-32 top-4 flex items-center gap-7">
            <img src="/img/amg-new-logo.png" alt="logo" className="w-36" />

            {/* <Button
              id="product-button"
              title="OUR BUSINESSES"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            /> */}

          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center gap-[35px]">
            <div className="hidden md:flex justify-center items-center gap-[35px]">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`${item.link.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item.name}
                </a>
              ))}
            </div>

                  <Separator orientation="vertical" className="h-6 w-[0.5px] bg-gray-400" />

            <div className="hidden md:flex justify-center items-center gap-[35px]">
              {navItemsTwo.map((item, index) => (
                <a
                  key={index}
                  href={`${item.link.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item.name}
                </a>
              ))}
            </div>

{/* 
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button> */}





          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
