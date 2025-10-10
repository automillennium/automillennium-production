// components/LanguageDropdown.jsx (New component)
"use client";

import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Globe, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  // Add more languages as needed
];

export default function LanguageDropdown({ currentLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguageName = languages.find(l => l.code === currentLang)?.name || currentLang.toUpperCase();

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Styling based on Apple's aesthetic
  const dropdownVariants = {
    initial: { opacity: 0, y: 5, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 5, scale: 0.98, transition: { duration: 0.15 } },
  };

  return (
    <div className="relative z-[1000]" ref={dropdownRef}>
      {/* Globe Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-hover-btn flex items-center p-1 rounded transition-colors hover:bg-white/10"
        aria-label={`Current language: ${currentLanguageName}. Click to change.`}
      >
        <Globe size={18} className="text-white" />
        {/* Optional: Show current language code next to globe (like some Apple sites) */}
        {/* <span className="text-sm font-medium ml-1 uppercase">{currentLang}</span> */}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lang-dropdown"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={dropdownVariants}
            className={clsx(
                "absolute top-full mt-3 w-40 p-1 bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10",
                // Positioning the dropdown just below the icon
                currentLang === 'ar' ? 'left-0' : 'right-0'
            )}
            style={{ 
                // Using transform for precise positioning relative to the small icon
                transformOrigin: currentLang === 'ar' ? 'top left' : 'top right' 
            }}
          >
            <div className="flex flex-col">
              {languages.map((langItem) => (
                <Link
                  key={langItem.code}
                  href={`/${langItem.code}`}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "flex items-center justify-between text-sm py-2 px-3 rounded-lg transition-colors",
                    {
                      "bg-white/10 text-white font-semibold": langItem.code === currentLang,
                      "text-gray-300 hover:bg-white/5": langItem.code !== currentLang,
                    }
                  )}
                >
                  <span className={langItem.code === 'ar' ? 'font-arabic' : ''}>{langItem.name}</span>
                  {langItem.code === currentLang && <Check size={16} className="text-green-400" />}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// NOTE: You must ensure your global CSS defines 'nav-hover-btn' and 'font-arabic' if needed.