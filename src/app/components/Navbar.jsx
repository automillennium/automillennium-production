

// "use client";
// import clsx from "clsx";
// import gsap from "gsap";
// import { useWindowScroll } from "react-use";
// import { useEffect, useRef, useState } from "react";
// import { Separator } from "./ui/Separator";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react"; // Icons for mobile menu

// // --- Data definitions (kept as-is) ---
// const navItems = [
//   // { name: "VTX", link: "/vtx" },
//   { name: "ROX", link: "/rox" },
//   { name: "AutoCare 360", link: "/autocare" },
//   { name: "RhinoMotive", link: "/rhinomotive" },
//   { name: "Global Business", link: "/global-business" },
// ];

// const navItemsTwo = [
//   { name: "Car Brands", link: "/projects", dropdown: true },
//   { name: "Events", link: "/events" },
//   { name: "Our Teams", link: "/our-teams" },
// ];

// const projectBrandsCategories = [
//   {
//     category: "Luxury Brands",
//     links: [
//       { name: "Rolls Royce", link: "/projects/rolls-royce" },
//       { name: "Bentley", link: "/projects/bentley" },
//       { name: "Mclaren", link: "/projects/mclaren" },
//       { name: "Aston Martin", link: "/projects/aston-martin" },
//       { name: "Porsche", link: "/projects/porsche" },
//       { name: "Mercedes", link: "/projects/mercedes" },
//     ],
//   },
//   {
//     category: "Premium Brands",
//     links: [
//       { name: "Alfa Romeo", link: "/projects/alfa-romeo" },
//       { name: "Hummer", link: "/projects/hummer" },
//       { name: "Tesla", link: "/projects/tesla" },
//       { name: "Ineos", link: "/projects/ineos" },
//       { name: "Corvette", link: "/projects/corvette" },
//       { name: "Lexus", link: "/projects/lexus" },
//       { name: "Genesis", link: "/projects/genesis" },
//     ],
//   },
//   {
//     category: "Volume Brands",
//     links: [
//       { name: "Land Rover", link: "/projects/land-rover" },
//       { name: "Kia", link: "/projects/kia" },
//       { name: "Hyundai", link: "/projects/hyundai" },
//       { name: "Mg", link: "/projects/mg" },
//       { name: "Toyota", link: "/projects/toyota" },
//       { name: "Nissan", link: "/projects/nissan" },
//       { name: "Ford", link: "/projects/ford" },
//       { name: "Jeep", link: "/projects/jeep" },
//     ],
//   },
// ];
// // --- End of data definitions ---

// const MobileMenu = ({ isOpen, onClose }) => {
//   const [openMobileProjects, setOpenMobileProjects] = useState(false);

//   // Combine all nav items for mobile display
//   const allNavItems = [...navItems, ...navItemsTwo].map(item => ({
//     ...item,
//     // Add a key to help identify the 'Projects' item easily in the combined list
//     key: item.name
//   }));


//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop for click outside to close */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
//             onClick={onClose}
//           />
//           {/* Menu Panel */}
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "tween", duration: 0.3 }}
//             className="fixed right-0 top-0 h-full w-full max-w-sm bg-gray-900 shadow-2xl z-[10000] p-6 overflow-y-auto"
//           >
//             <div className="flex justify-between items-center mb-10">
//               <h2 className="text-xl font-bold text-white">Navigation</h2>
//               <button onClick={onClose} className="p-2 rounded-full text-white hover:bg-gray-700 transition">
//                 <X size={24} />
//               </button>
//             </div>

//             <nav className="flex flex-col gap-4">
//               {allNavItems.map((item, index) => (
//                 <div key={index}>
//                   {item.key === "Projects" ? (
//                     <>
//                       <button
//                         onClick={() => setOpenMobileProjects(!openMobileProjects)}
//                         className="w-full text-left text-2xl font-semibold text-white py-2 hover:text-gray-300 transition flex justify-start items-center "
//                       >
//                         {item.name}
//                         <span className="ml-2 inline-block transition-transform duration-300 transform  justify-center mt-2"
//                               style={{ transform: openMobileProjects ? 'rotate(90deg)' : 'rotate(0deg)'}}>
//                             {/* &gt; */}
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right-icon lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
//                         </span>
//                       </button>
//                       <AnimatePresence>
//                         {openMobileProjects && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="overflow-hidden pl-4 mt-2"
//                           >
//                             <div className="flex flex-col gap-4">
//                               {projectBrandsCategories.map(
//                                 (categoryData, catIndex) => (
//                                   <div key={catIndex} className="flex flex-col gap-2 border-l border-gray-700 pl-4">
//                                     <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
//                                       {categoryData.category}
//                                     </h3>
//                                     <div className="flex flex-col gap-1">
//                                       {categoryData.links.map(
//                                         (link, linkIndex) => (
//                                           <a
//                                             href={link.link}
//                                             key={linkIndex}
//                                             className="block text-lg font-medium py-1 text-white hover:text-orange-400 transition"
//                                             onClick={onClose} // Close menu on link click
//                                           >
//                                             {link.name}
//                                           </a>
//                                         )
//                                       )}
//                                     </div>
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </>
//                   ) : (
//                     <a href={item.link} className="block text-2xl font-semibold text-white py-2 hover:text-gray-300 transition" onClick={onClose}>
//                       {item.name}
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </nav>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };


// const NavBar = () => {
//   const [isNavVisible, setIsNavVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // New state for mobile menu

//   const navContainerRef = useRef(null);
//   const { y: currentScrollY } = useWindowScroll();

//   // Scroll animation (kept as-is)
//   useEffect(() => {
//     if (currentScrollY === 0) {
//       setIsNavVisible(true);
//       navContainerRef.current.classList.remove("floating-nav");
//     } else if (currentScrollY > lastScrollY) {
//       setIsNavVisible(false);
//       navContainerRef.current.classList.add("floating-nav");
//     } else if (currentScrollY < lastScrollY) {
//       setIsNavVisible(true);
//       navContainerRef.current.classList.add("floating-nav");
//     }
//     setLastScrollY(currentScrollY);
//   }, [currentScrollY, lastScrollY]);

//   useEffect(() => {
//     gsap.to(navContainerRef.current, {
//       y: isNavVisible ? 0 : -100,
//       opacity: isNavVisible ? 1 : 0,
//       duration: 0.2,
//     });
//   }, [isNavVisible]);

//   // Prevent scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [isMobileMenuOpen]);


//   return (
//     <>
//       <div
//         ref={navContainerRef}
//         className="fixed inset-x-0 top-4 z-[9999] border-none transition-all duration-700 sm:inset-x-6 h-[70px]"
//       >
//         <header className="absolute top-1/2 w-full -translate-y-1/2">
//           <nav className="flex size-full items-center justify-between p-4 !font-apple relative">
//             {/* Logo - Adjusted to be visible on all screens, moved to left of nav */}
//             <div className="flex items-center gap-7 absolute left-4 sm:left-20 top-1/2 -translate-y-1/2">
//               <a href="/">
//                 <img src="/img/amg-new-logo.png" alt="logo" className="w-24 sm:w-36" />
//               </a>
//             </div>

//             {/* Hamburger Menu Icon (Visible on small screens) */}
//             <div className="flex md:hidden absolute right-4 top-1/2 -translate-y-1/2">
//                 <button 
//                     onClick={() => setIsMobileMenuOpen(true)}
//                     className="p-2 rounded-full text-white hover:bg-gray-800 transition"
//                 >
//                     <Menu size={28} />
//                 </button>
//             </div>

//             {/* Desktop Nav Items (Hidden on small screens) */}
//             <div className="hidden md:flex h-full items-center justify-center gap-[35px] mx-auto">
              
//               {/* First group */}
//               <div className="flex justify-center items-center gap-[35px]">
// <div className="flex flex-col justify-center items-center gap-2">

//         <a  href="/vtx" className="nav-hover-btn">
//                     Retail
//                   </a>
//                               <Separator
//                               orientation={"horizontal"}
//                 className="h-[0.5px] w-10 bg-gray-400"
//               />
//       <a  href="/vtx" className="nav-hover-btn">
//                     VTX
//                   </a>
// </div>

// <div className="flex flex-col justify-center items-center gap-2">

//         <span className="nav-hover-btn">
//                     OMV Section
//                   </span>
//                               <Separator
//                               orientation={"horizontal"}
//                 className="h-[0.5px] w-[400px] bg-gray-400"
//               />

//               <div className="flex  justify-center items-center gap-[35px]">

//              {navItems.map((item, index) => (
//                <a key={index} href={item.link} className="nav-hover-btn">
//                     {item.name}
//                   </a>
//                 ))}
//                 </div>
// </div>

   
//               </div>

//               <Separator
//                 orientation="vertical"
//                 className="h-6 w-[0.5px] bg-gray-400"
//               />

//               {/* Second group with mega menu */}
//               <div className="flex justify-end items-center gap-[35px] relative">
//                 {navItemsTwo.map((item, index) => (
//                   <div
//                     key={index}
//                     className="relative"
//                     onMouseEnter={() =>
//                       item.name === "Projects" && setOpenDropdown(true)
//                     }
//                     onMouseLeave={() =>
//                       item.name === "Projects" && setOpenDropdown(false)
//                     }
//                   >
//                     {/* Only Projects becomes hover-only, remove href */}
//                     {item.name === "Projects" ? (
//                       <span className="nav-hover-btn cursor-pointer">
//                         {item.name}
//                       </span>
//                     ) : (
//                       <a href={item.link} className="nav-hover-btn">
//                         {item.name}
//                       </a>
//                     )}

                    
//                     {/* Mega Menu Overlay only for Projects */}
//                     {item.name === "Projects" && (
//                       <AnimatePresence>
//                         {openDropdown && (
//                           <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.25 }}
//                             className="
//                               fixed inset-x-0 top-0 pt-[80px] h-screen bg-white/5 backdrop-blur-xl z-[99999] overflow-hidden w-full
//                               before:content-[''] before:absolute before:inset-0
//                               before:from-black before:to-transparent before:bg-gradient-to-b
//                               before:pointer-events-none
//                             "
//                             style={{
//                               top: `${navContainerRef.current ? navContainerRef.current.offsetHeight + 10 : 0}px`,
//                               height: `calc(100vh - ${navContainerRef.current ? navContainerRef.current.offsetHeight + 10 : 0}px)`,
//                             }}
//                             onClick={() => {
//                               setOpenDropdown(false);
//                             }}
//                           >
//                             <motion.div
//                               initial={{ opacity: 0, y: -10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               exit={{ opacity: 0, y: -10 }}
//                               transition={{ duration: 0.25, delay: 0.05 }}
//                               className="relative w-full max-w-[980px] mx-auto bg-black shadow-xl rounded-b-lg p-8"
//                               style={{ borderRadius: "0 0 12px 12px" }}
//                             >
//                               <div className="grid grid-cols-4 gap-6">
//                                 {/* Note: The original had 3 categories and 4 columns, which is fine, 
//                                     but consider if you want this to change on smaller desktop/tablet sizes.
//                                     For simplicity, I've kept it as-is for the desktop mega menu. */}
//                                 {projectBrandsCategories.map(
//                                   (categoryData, catIndex) => (
//                                     <div
//                                       key={catIndex}
//                                       className="flex flex-col gap-2"
//                                     >
//                                       <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
//                                         {categoryData.category}
//                                       </h3>
//                                       <div className="flex flex-col gap-1">
//                                         {categoryData.links.map(
//                                           (link, linkIndex) => (
//                                             <a
//                                               href={link.link}
//                                               key={linkIndex}
//                                               className="block text-lg font-medium py-1 -mx-2 px-2 rounded-md transition-colors text-white hover:text-black hover:bg-gray-100 cursor-pointer"
//                                             >
//                                               {link.name}
//                                             </a>
//                                           )
//                                         )}
//                                       </div>
//                                     </div>
//                                   )
//                                 )}
//                               </div>
//                             </motion.div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </nav>
//         </header>
//       </div>
//       {/* Mobile Menu Component */}
//       <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
//     </>
//   );
// };

// export default NavBar;

"use client";
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { Separator } from "./ui/Separator";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

// --- Data definitions (kept as-is) ---
const navItems = [
  // { name: "VTX", link: "/vtx" },
  { name: "ROX", link: "/rox" },
  { name: "AutoCare 360", link: "/autocare" },
  { name: "RhinoMotive", link: "/rhinomotive" },
  { name: "Global Business", link: "/global-business" },
];

const navItemsTwo = [
  { name: "Car Brands", link: "/projects", dropdown: true },
  { name: "Events", link: "/events" },
  { name: "Our Teams", link: "/our-teams" },
];

const projectBrandsCategories = [
  // All links are flattened for mobile, but keeping the source data structure
  {
    category: "Luxury Brands",
    links: [
      { name: "Rolls Royce", link: "/projects/rolls-royce" },
      { name: "Bentley", link: "/projects/bentley" },
      { name: "Mclaren", link: "/projects/mclaren" },
      { name: "Aston Martin", link: "/projects/aston-martin" },
      { name: "Porsche", link: "/projects/porsche" },
      { name: "Mercedes", link: "/projects/mercedes" },
      { name: "Land Rover", link: "/projects/land-rover" },

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
      { name: "Kia", link: "/projects/kia" },
      { name: "Hyundai", link: "/projects/hyundai" },
      { name: "Mg", link: "/projects/mg" },
      { name: "Toyota", link: "/projects/toyota" },
      { name: "Nissan", link: "/projects/nis`san" },
      { name: "Ford", link: "/projects/ford" },
      { name: "Jeep", link: "/projects/jeep" },
    ],
  },
];
// --- End of data definitions ---

// Helper function to flatten all car brand links
const getAllCarBrandLinks = () => {
  return projectBrandsCategories.flatMap(category => category.links);
};
const allCarBrandLinks = getAllCarBrandLinks();

const MobileMenu = ({ isOpen, onClose }) => {
  const [openMobileProjects, setOpenMobileProjects] = useState(false);

  // Grouped data structure for mobile navigation
  const mobileGroups = [
    {
      title: "Retail",
      isGroup: true,
      items: [
        { name: "VTX", link: "/vtx" }, // VTX is the only link under Retail
      ],
    },
    {
      title: "OMV Section",
      isGroup: true,
      items: navItems,
    },
    {
      title: "Company",
      isGroup: false,
      items: navItemsTwo,
    },
  ];

  const DROPDOWN_ITEM_KEY = "Car Brands";

  // New Apple-style classes
  const linkClassName = "block text-3xl font-semibold text-white py-3 px-2 -mx-2 hover:text-gray-300 transition";
  const subLinkClassName = "block text-xl font-medium text-gray-300 py-2 px-2 -mx-2 hover:text-white transition";
  const groupTitleClassName = "text-xl font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6";


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Darker for contrast) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[9999]"
            onClick={onClose}
          />
          {/* Menu Panel - Apple Aesthetic: background-blur and semi-transparent black */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/80 backdrop-blur-xl shadow-2xl z-[10000] p-6 overflow-y-auto"
          >
            <div className="flex justify-end items-center mb-8">
              {/* Close button at the top right */}
              <button onClick={onClose} className="p-2 rounded-full text-white transition hover:bg-white/10">
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col">
              {mobileGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-2">
                  
                  {/* Apple Style Group Title */}
                  {group.isGroup && (
                    <div className="py-4 border-b border-white/20">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        {group.title}
                      </h3>
                    </div>
                  )}

                  <div className="flex flex-col">
                    {group.items.map((item, itemIndex) => {

                       // Special logic for the dropdown item ("Car Brands")
                       if (item.name === DROPDOWN_ITEM_KEY) {
                          return (
                             <div key={`${groupIndex}-${itemIndex}`}>
                                <button
                                   onClick={() => setOpenMobileProjects(!openMobileProjects)}
                                   className={clsx(
                                     "w-full text-left flex justify-between items-center",
                                     linkClassName
                                   )}
                                >
                                   <span>{item.name}</span>
                                   <ChevronRight
                                      size={24}
                                      className={clsx(
                                         "transition-transform duration-300",
                                         { "rotate-90": openMobileProjects }
                                      )}
                                   />
                                </button>
                                {/* Separator under the main item */}
                                <Separator orientation="horizontal" className="h-[1px] bg-white/10" />

                                <AnimatePresence>
                                   {openMobileProjects && (
                                      <motion.div
                                         initial={{ height: 0, opacity: 0 }}
                                         animate={{ height: "auto", opacity: 1 }}
                                         exit={{ height: 0, opacity: 0 }}
                                         transition={{ duration: 0.3 }}
                                         className="overflow-hidden"
                                      >
                                         <div className="flex flex-col pt-2 pl-4">
                                            {/* Renders ALL car links as a flat list, no categories */}
                                            {allCarBrandLinks.map(
                                               (link, linkIndex) => (
                                                  <div key={linkIndex}>
                                                    <a
                                                       href={link.link}
                                                       className={subLinkClassName}
                                                       onClick={onClose}
                                                    >
                                                       {link.name}
                                                    </a>
                                                     {/* Separator under sub-link */}
                                                     <Separator orientation="horizontal" className="h-[1px] bg-white/10" />
                                                  </div>
                                               )
                                            )}
                                         </div>
                                      </motion.div>
                                   )}
                                </AnimatePresence>
                             </div>
                          );
                       }

                       // Default link rendering
                       return (
                          <div key={`${groupIndex}-${itemIndex}`}>
                            <a 
                               href={item.link} 
                               className={linkClassName} 
                               onClick={onClose}
                            >
                               {item.name}
                            </a>
                            {/* Separator under the main item */}
                            <Separator orientation="horizontal" className="h-[1px] bg-white/10" />
                          </div>
                       );
                    })}
                  </div>

                  {/* No extra separators between groups for the minimal Apple look */}
                </div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


// --- NavBar Component (Updated Hamburger Icon Color) ---
const NavBar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Scroll visibility logic (kept as-is)
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
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

  // Prevent scroll when mobile menu is open (kept as-is)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-[9999] border-none transition-all duration-700 inset-x-6 h-[45px] md:h-[70px]"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4 !font-apple relative">
            {/* Logo */}
            <div className="flex items-center gap-7 absolute left-4 sm:left-20 top-1/2 -translate-y-1/2">
              <a href="/">
                <img src="/img/amg-new-logo.png" alt="logo" className="w-24 sm:w-44" />
              </a>
            </div>

            {/* Hamburger Menu Icon (Visible on small screens) */}
            <div className="flex md:hidden absolute right-4 top-1/2 -translate-y-1/2">
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    // Ensure the button itself is visible on the dark background
                    className="p-2 rounded-full text-white transition"
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Desktop Nav Items (Hidden on small screens) - Logic kept for desktop view */}
            <div className="hidden md:flex h-full items-center justify-center gap-[35px] mx-auto">
              
              {/* First group (Retail and VTX) */}
              <div className="flex justify-center items-center gap-[35px]">
                  <div className="flex flex-col justify-center items-center gap-2">
                        <a  href="/vtx" className="nav-section">
                          Retail
                        </a>
                        <Separator orientation={"horizontal"} className="h-[0.5px] w-10 bg-gray-400"/>
                        <a  href="/vtx" className="nav-hover-btn">
                          VTX
                        </a>
                  </div>

                  {/* Second group (OMV Section and navItems) */}
                  <div className="flex flex-col justify-center items-center gap-2">
                        <span className="nav-section">
                          OMV Section
                        </span>
                        <Separator orientation={"horizontal"} className="h-[0.5px] w-[400px] bg-gray-400"/>
                        <div className="flex  justify-center items-center gap-[35px]">
                          {navItems.map((item, index) => (
                            <a key={index} href={item.link} className="nav-hover-btn">
                              {item.name}
                            </a>
                          ))}
                        </div>
                  </div>
              </div>

              <Separator
                orientation="vertical"
                className="h-6 w-[0.5px] bg-gray-400"
              />

              {/* Third group (navItemsTwo) */}
              <div className="flex justify-end items-center gap-[35px] relative">
                {navItemsTwo.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() =>
                      item.name === "Car Brands" && setOpenDropdown(true) 
                    }
                    onMouseLeave={() =>
                      item.name === "Car Brands" && setOpenDropdown(false) 
                    }
                  >
                    {item.name === "Car Brands" ? (
                      <span className="nav-hover-btn cursor-pointer">
                        {item.name}
                      </span>
                    ) : (
                      <a href={item.link} className="nav-hover-btn">
                        {item.name}
                      </a>
                    )}

                    {/* Mega Menu Overlay (kept as-is) */}
                    {item.name === "Car Brands" && (
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
                              before:from-black/70 before:to-transparent before:bg-gradient-to-b
                              before:pointer-events-none
                            "
                            style={{
                              top: `${navContainerRef.current ? navContainerRef.current.offsetHeight + 10 : 0}px`,
                              height: `calc(100vh - ${navContainerRef.current ? navContainerRef.current.offsetHeight + 10 : 0}px)`,
                            }}
                            onClick={() => {
                              setOpenDropdown(false);
                            }}
                          >
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.25, delay: 0.05 }}
                              className="relative w-full max-w-[980px] mx-auto bg-black shadow-xl rounded-b-lg p-8"
                              style={{ borderRadius: "0 0 12px 12px" }}
                            >
                              <div className="grid grid-cols-3 gap-6"> 
                                {projectBrandsCategories.map(
                                  (categoryData, catIndex) => (
                                    <div
                                      key={catIndex}
                                      className="flex flex-col gap-2"
                                    >
                                      {/* <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                        {categoryData.category}
                                      </h3> */}
                                      <div className="flex flex-col gap-1">
                                        {categoryData.links.map(
                                          (link, linkIndex) => (
                                            <a
                                              href={link.link}
                                              key={linkIndex}
                                              className="block text-lg font-medium py-1 -mx-2 px-2 rounded-md transition-colors text-white hover:text-black hover:bg-gray-100 cursor-pointer"
                                            >
                                              {link.name}
                                            </a>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
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
      {/* Mobile Menu Component */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default NavBar;