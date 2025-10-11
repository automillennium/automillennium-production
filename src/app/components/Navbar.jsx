

"use client"; 

import clsx from "clsx";
import gsap from "gsap";
import Link from "next/link"; 
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState, useMemo } from "react";
import { Separator } from "./ui/Separator"; 
import { motion, AnimatePresence } from "framer-motion";
// IMPORT THE GLOBE ICON
import { Menu, X, ChevronRight, Globe } from "lucide-react"; 

// Import the new Language Dropdown for desktop
import LanguageDropdown from './LanguageSwitcher'; 

// --- Data Definitions (Keeping the structured data) ---

const projectBrandsCategories = [
  {
    category: "Luxury Brands",
    links: [
      { nameEN: "Rolls Royce", nameAR: "رولز رويس", link: "/projects/rolls-royce" },
      { nameEN: "Bentley", nameAR: "بنتلي", link: "/projects/bentley" },
      { nameEN: "Mclaren", nameAR: "ماكلارين", link: "/projects/mclaren" },
      { nameEN: "Aston Martin", nameAR: "أستون مارتن", link: "/projects/aston-martin" },
      { nameEN: "Porsche", nameAR: "بورشه", link: "/projects/porsche" },
      { nameEN: "Mercedes", nameAR: "مرسيدس", link: "/projects/mercedes" },
      { nameEN: "Land Rover", nameAR: "لاند روفر", link: "/projects/land-rover" },
    ],
  },
  {
    category: "Premium Brands",
    links: [
      { nameEN: "Alfa Romeo", nameAR: "ألفا روميو", link: "/projects/alfa-romeo" },
      { nameEN: "Hummer", nameAR: "همر", link: "/projects/hummer" },
      { nameEN: "Tesla", nameAR: "تسلا", link: "/projects/tesla" },
      { nameEN: "Ineos", nameAR: "اينيوس", link: "/projects/ineos" },
      { nameEN: "Corvette", nameAR: "كورفيت", link: "/projects/corvette" },
      { nameEN: "Lexus", nameAR: "لكزس", link: "/projects/lexus" },
      { nameEN: "Genesis", nameAR: "جينيسيس", link: "/projects/genesis" },
    ],
  },
  {
    category: "Volume Brands",
    links: [
      { nameEN: "Kia", nameAR: "كيا", link: "/projects/kia" },
      { nameEN: "Hyundai", nameAR: "هيونداي", link: "/projects/hyundai" },
      { nameEN: "Mg", nameAR: "إم جي", link: "/projects/mg" },
      { nameEN: "Toyota", nameAR: "تويوتا", link: "/projects/toyota" },
      { nameEN: "Nissan", nameAR: "نيسان", link: "/projects/nissan" },
      { nameEN: "Ford", nameAR: "فورد", link: "/projects/ford" },
      { nameEN: "Jeep", nameAR: "جيب", link: "/projects/jeep" },
    ],
  },
];


const getAllCarBrandLinks = () => {
  return projectBrandsCategories.flatMap(category => category.links);
};
const allCarBrandLinks = getAllCarBrandLinks();


// --- MobileMenu Component (Using Globe Icon for language link) ---

const MobileMenu = ({ isOpen, onClose, dictionary, lang }) => {
  const [openMobileProjects, setOpenMobileProjects] = useState(false);

const mobileGroups = useMemo(() => [
  {
    title: dictionary.retail_section || "Retail",
    isGroup: true,
    items: [
      { name:dictionary.rox || "ROX", link: `/${lang}/rox` },
    ],
  },
  {
    title: dictionary.omv_section || "OMV Solutions",
    isGroup: true,
    items: [
      { name: dictionary.vtx || "VTX", link: `/${lang}/vtx` },
      { name: dictionary.autocare || "AutoCare 360", link: `/${lang}/autocare` },
      { name: dictionary.rhinomotive || "RhinoMotive", link: `/${lang}/rhinomotive` },
      { name: dictionary.car_brands || "Global Business", link: `/${lang}/global-business` },
    ],
  },
  {
    title: dictionary.company_section || "Company",
    isGroup: false,
    items: [
      { name: dictionary.car_brands || "Bespoke Projects", link: `/${lang}/projects`, dropdown: true },
      { name: dictionary.events || "Events", link: `/${lang}/events` },
      { name: dictionary.our_teams || "Meet the Family", link: `/${lang}/our-teams` },
      { 
        name: `${dictionary.language || "Language"} (${lang.toUpperCase()})`, 
        href: lang === 'en' ? `/ar` : `/en`, 
        icon: Globe 
      },
    ],
  },
], [dictionary, lang]);


  const DROPDOWN_ITEM_NAME = dictionary.car_brands || "Car Brands";
  const linkClassName = "block text-3xl font-semibold text-white py-3 px-2 -mx-2 hover:text-gray-300 transition";
  const subLinkClassName = "block text-xl font-medium text-gray-300 py-2 px-2 -mx-2 hover:text-white transition";


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[9999]"
            onClick={onClose}
          />
          {/* Menu Panel */}
          <motion.div
            initial={{ x: lang === 'ar' ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: lang === 'ar' ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className={clsx(
                "fixed top-0 h-full w-full max-w-md bg-black/80 backdrop-blur-xl shadow-2xl z-[10000] p-6 overflow-y-auto",
                lang === 'ar' ? "left-0 text-right" : "right-0 text-left"
            )}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className={clsx("flex items-center mb-8", lang === 'ar' ? "justify-start" : "justify-end")}>
              <button onClick={onClose} className="p-2 rounded-full text-white transition hover:bg-white/10">
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col">
              {mobileGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-2">
                  
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
                       if (item.name === DROPDOWN_ITEM_NAME) {
                          // ... (Car Brands Dropdown rendering logic remains the same)
                          return (
                             <div key={`${groupIndex}-${itemIndex}`}>
                                <button
                                   onClick={() => setOpenMobileProjects(!openMobileProjects)}
                                   className={clsx(
                                     "w-full text-left flex justify-between items-center",
                                     linkClassName
                                   )}
                                   style={{ direction: 'ltr' }} 
                                >
                                   <span>{item.name}</span>
                                   <ChevronRight size={24} className={clsx("transition-transform duration-300", { "rotate-90": openMobileProjects })} />
                                </button>
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
                                            {allCarBrandLinks.map((link, linkIndex) => (
                                                   <div key={linkIndex}>
                                                    <Link href={link.link} className={subLinkClassName} onClick={onClose}>
                                                       {lang === "en" ? link?.nameEN : link?.nameAR}
                                                    </Link>
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
                       const IconComponent = item.icon;
                       return (
                          <div key={`${groupIndex}-${itemIndex}`}>
                            <Link 
                               href={item.link || item.href} 
                               className={clsx(linkClassName, "flex items-center justify-between")} 
                               onClick={onClose}
                            >
                               {item.name}
                               {IconComponent && <IconComponent size={24} className="text-gray-400" />}
                            </Link>
                            <Separator orientation="horizontal" className="h-[1px] bg-white/10" />
                          </div>
                       );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


// --- NavBar Component (Apple Style, Integrated LanguageDropdown) ---
export default function NavBar({ dictionary, lang }) {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  // New state for Retail and OMV hover dropdowns
  const [openRetailDropdown, setOpenRetailDropdown] = useState(false);
  const [openOmvDropdown, setOpenOmvDropdown] = useState(false);


  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Desktop Nav Items based on i18n (logic remains the same)
  // Re-define for clarity and easy use in the new structure
const retailSubItems = useMemo(() => [
      { name:dictionary.rox || "ROX", link: `/${lang}/rox` },
], [lang]);

const omvSubItems = useMemo(() => [
  { name: dictionary.vtx || "VTX", link: `/${lang}/vtx` },
  { name: dictionary.autocare || "AutoCare 360", link: `/${lang}/autocare` },
  { name: dictionary.rhinomotive || "RhinoMotive", link: `/${lang}/rhinomotive` },
  { name: dictionary.car_brands || "Global Business", link: `/${lang}/global-business` },
], [dictionary, lang]);

const companyNavItems = useMemo(() => [
  { name: dictionary.car_brands || "Bespoke Projects", link: `/${lang}/projects`, dropdown: true },
  { name: dictionary.events || "Events", link: `/${lang}/events` },
  { name: dictionary.our_teams || "Meet the Family", link: `/${lang}/our-teams` },
], [dictionary, lang]);


  // Scroll and GSAP logic remains the same...
  useEffect(() => {
    // ... (Scroll logic)
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
    // ... (GSAP animation logic)
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
      onComplete: () => {
          if (!isNavVisible) {
              navContainerRef.current.style.pointerEvents = 'none';
          }
      },
      onStart: () => {
          if (isNavVisible) {
              navContainerRef.current.style.pointerEvents = 'auto';
          }
      }
    });
  }, [isNavVisible]);

  useEffect(() => {
    // ... (Prevent scroll logic)
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
        className="fixed inset-x-4 top-4 z-[9999] border-none transition-all duration-700 px-2 md:px-6 h-[45px] md:h-[55px]"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4 !font-apple relative">
            
            {/* Logo */} 
            <div 
                className={clsx(
                    "flex items-center gap-7 absolute top-1/2 -translate-y-1/2",
                    lang === 'ar' ? 'right-4 sm:right-20' : 'left-4 sm:left-20'
                )}
            >
              <Link href={`/${lang}`}>
                <img src="/img/amg-new-logo.png" alt="logo" className="w-24 sm:w-52" /> 
              </Link>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex h-full items-center justify-center gap-[35px] mx-auto text-white">
              
              {/* --- 1. Retail Group (On Hover: VTX) --- */}
              <div 
                  className="relative flex flex-col justify-center items-center"
                  onMouseEnter={() => setOpenRetailDropdown(true)}
                  onMouseLeave={() => setOpenRetailDropdown(false)}
              >
                  {/* Main Link/Title */}
                  <Link  href={`/${lang}/vtx`} className="nav-section  py-1">
                    {dictionary.retail_section || "Retail"}
                  </Link>
                  <Separator orientation={"horizontal"} className="h-[0.5px] w-full bg-gray-400"/>

                  {/* VTX Dropdown */}
                  <AnimatePresence>
                      {openRetailDropdown && (
                          <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              transition={{ duration: 0.2 }}
                              className={clsx(
                                  "absolute top-full mt-4 p-3 bg-black/80 backdrop-blur-md rounded-lg shadow-xl",
                                  lang === 'ar' ? 'right-0' : 'left-0'
                              )}
                          >
                              {retailSubItems.map((item, index) => (
                                  <Link key={index} href={item.link} className="nav-hover-btn block whitespace-nowrap px-4 py-2 hover:bg-white/10 rounded-md">
                                      {item.name}
                                  </Link>
                              ))}
                          </motion.div>
                      )}
                  </AnimatePresence>
              </div>

              {/* Separator between groups 1 and 2 */}
              <Separator orientation="vertical" className="h-6 w-[0.5px] bg-gray-400"/>


              {/* --- 2. OMV Group (On Hover: ROX, AutoCare 360, etc.) --- */}
              <div 
                  className="relative flex flex-col justify-center items-center"
                  onMouseEnter={() => setOpenOmvDropdown(true)}
                  onMouseLeave={() => setOpenOmvDropdown(false)}
              >
                  {/* Main Title/Section Name */}
                  <span className="nav-section   py-1">
                    {dictionary.omv_section || "OMV Solutions"}
                  </span>
                  <Separator orientation={"horizontal"} className="h-[0.5px] w-full bg-gray-400"/>
                  
                  {/* OMV Sub-Items Dropdown */}
                  <AnimatePresence>
                      {openOmvDropdown && (
                          <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              transition={{ duration: 0.2 }}
                              className={clsx(
                                  "absolute top-full mt-4 p-3 bg-black/80 backdrop-blur-md rounded-lg shadow-xl flex flex-col gap-1",
                                  lang === 'ar' ? 'right-0' : 'left-0'
                              )}
                          >
                              {omvSubItems.map((item, index) => (
                                  <Link key={index} href={item.link} className="nav-hover-btn block whitespace-nowrap px-4 py-2 hover:bg-white/10 rounded-md">
                                      {item.name}
                                  </Link>
                              ))}
                          </motion.div>
                      )}
                  </AnimatePresence>

              </div>

              {/* Separator between groups 2 and 3 */}
              <Separator orientation="vertical" className="h-6 w-[0.5px] bg-gray-400"/>

              {/* --- 3. Company Group (Car Brands Mega Menu & Links) --- */}
              <div className="flex justify-center items-center gap-[35px] relative">
                {companyNavItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => item.dropdown && setOpenDropdown(true)}
                    onMouseLeave={() => item.dropdown && setOpenDropdown(false)}
                  >
                    {item.dropdown ? (
                      <span className="nav-hover-btn cursor-pointer">
                        {item.name}
                      </span>
                    ) : (
                      <Link href={item.link} className="nav-hover-btn">
                        {item.name}
                      </Link>
                    )}

                    {/* Mega Menu Overlay (logic remains the same) */}
                    {item.dropdown && (
                      <AnimatePresence>
                       {/* ... (Mega Menu rendering logic remains the same) */}
                        {openDropdown && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-x-0 top-0 pt-[80px] h-screen bg-white/5 backdrop-blur-xl z-[99999] overflow-hidden w-full before:content-[''] before:absolute before:inset-0 before:from-black/70 before:to-transparent before:bg-gradient-to-b before:pointer-events-none"
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
                  
                                      <div className="flex flex-col gap-1">
                                        {categoryData.links.map(
                                          (link, linkIndex) => (
                                            <Link
href={`/${lang}/${link.link}`}
                                              key={linkIndex}
                                              className="block text-lg font-medium py-1 -mx-2 px-2 rounded-md transition-colors text-white hover:text-black hover:bg-gray-100 cursor-pointer"
                                            >
                                                       {lang === "en" ? link?.nameEN : link?.nameAR}
                                            </Link>
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
            
            {/* Language Switcher (Desktop) - NOW USES LanguageDropdown */}
            <div 
                className={clsx(
                    "hidden md:block absolute top-1/2 -translate-y-1/2",
                    lang === 'ar' ? 'left-4 sm:left-20' : 'right-4 sm:right-20'
                )}
            >
                <LanguageDropdown currentLang={lang} />
            </div>

            {/* Hamburger Menu Icon (Visible on small screens) */}
            <div 
                className={clsx(
                    "flex md:hidden absolute top-1/2 -translate-y-1/2",
                    lang === 'ar' ? 'left-4' : 'right-4'
                )}
            >
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-full text-white transition"
                >
                    <Menu size={28} />
                </button>
            </div>

          </nav>
        </header>
      </div>
      {/* Mobile Menu Component (Pass i18n props) */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        dictionary={dictionary}
        lang={lang}
      />
    </>
  );
}