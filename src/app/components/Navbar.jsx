"use client";
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { Separator } from "./ui/Separator";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "VTX", link: "/vtx" },
  { name: "ROX", link: "/rox" },
  { name: "AutoCare 360", link: "/autocare" },
  { name: "RhinoMotive", link: "/rhinomotive" },
  { name: "Global Business", link: "/global-business" },
];

const navItemsTwo = [
  { name: "Projects", link: "/projects", dropdown: true },
  { name: "Events", link: "/events" },
  { name: "Our Teams", link: "/our-teams" },
];
const projectBrandsCategories = [

  {
    category: "Luxury Brands",
    links: [
      { name: "Rolls Royce", link: "/projects/rolls-royce" },
      { name: "Bentley", link: "/projects/bentley" },
      { name: "Mclaren", link: "/projects/mclaren" },
      { name: "Aston Martin", link: "/projects/aston-martin" },
      { name: "Porsche", link: "/projects/porsche" },
      { name: "Mercedes", link: "/projects/mercedes" },
    ],
  },
  {
    category: "Premium Brands",
    links: [
      { name: "Alfa Romeo", link: "/projects/alfa-romeo" },
      { name: "Hummer", link: "/projects/hummer" },
      { name: "Tesla", link: "/projects/tesla" },
      { name: "Ineos", link: "/projects/ineos" },
      { name: "Corvette", link: "/projects/corvette" },
      { name: "Lexus", link: "/projects/lexus" },
      { name: "Genesis", link: "/projects/genesis" },
    ],
  },
  {
    category: "Volume Brands",
    links: [
      { name: "Land Rover", link: "/projects/land-rover" },
      { name: "Kia", link: "/projects/kia" },
      { name: "Hyundai", link: "/projects/hyundai" },
      { name: "Mg", link: "/projects/mg" },
      { name: "Toyota", link: "/projects/toyota" },
      { name: "Nissan", link: "/projects/nissan" },
      { name: "Ford", link: "/projects/ford" },
      { name: "Jeep", link: "/projects/jeep" },
    ],
  },
];

const NavBar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);

  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Scroll animation (kept as-is)
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
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
      className="fixed inset-x-0 top-4 z-[9999] border-none transition-all duration-700 sm:inset-x-6 h-[45px]"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-center p-4 !font-apple gap-[35px] relative">
          {/* Logo */}
          <div className="absolute left-20 top-4 flex items-center gap-7">
            <img src="/img/amg-new-logo.png" alt="logo" className="w-36" />
          </div>

          {/* Nav Items */}
          <div className="flex h-full items-center gap-[35px]">
            {/* First group (kept as-is) */}
            <div className="hidden md:flex justify-center items-center gap-[35px]">
              {navItems.map((item, index) => (
                <a key={index} href={item.link} className="nav-hover-btn">
                  {item.name}
                </a>
              ))}
            </div>

            <Separator orientation="vertical" className="h-6 w-[0.5px] bg-gray-400" />

      {/* Second group with mega menu */}
<div className="hidden md:flex justify-center items-center gap-[35px] relative">
  {navItemsTwo.map((item, index) => (
    <div
      key={index}
      className="relative"
      onMouseEnter={() => item.name === "Projects" && setOpenDropdown(true)}
      onMouseLeave={() => item.name === "Projects" && setOpenDropdown(false)}
    >
      {/* Only Projects becomes hover-only, remove href */}
      {item.name === "Projects" ? (
        <span className="nav-hover-btn cursor-pointer">
          {item.name}
        </span>
      ) : (
        <a href={item.link} className="nav-hover-btn">
          {item.name}
        </a>
      )}

      {/* Mega Menu Overlay only for Projects */}
      {item.name === "Projects" && (
        <AnimatePresence>
          {openDropdown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="
                fixed inset-x-0 top-0 pt-[80px] h-screen bg-white/5 backdrop-blur-xl z-[99999] overflow-hidden w-full
                before:content-[''] before:absolute before:inset-0
                before:from-black before:to-transparent before:bg-gradient-to-b
                before:pointer-events-none
              "
              style={{
                top: `${navContainerRef.current ? navContainerRef.current.offsetHeight + 10 : 0}px`, 
                height: `calc(100vh - ${navContainerRef.current ? navContainerRef.current.offsetHeight + 10 : 0}px)`
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="relative w-full max-w-[980px] mx-auto bg-black shadow-xl rounded-b-lg p-8"
                style={{ borderRadius: '0 0 12px 12px' }}
              >
                <div className="grid grid-cols-4 gap-6">
                  {projectBrandsCategories.map((categoryData, catIndex) => (
                    <div key={catIndex} className="flex flex-col gap-2">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        {categoryData.category}
                      </h3>
                      <div className="flex flex-col gap-1">
                        {categoryData.links.map((link, linkIndex) => (
                          <a
                          href={link.link}
                            key={linkIndex}
                            className="block text-lg font-medium py-1 -mx-2 px-2 rounded-md transition-colors text-white hover:text-black hover:bg-gray-100 cursor-pointer"
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  ))}
</div>

          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;