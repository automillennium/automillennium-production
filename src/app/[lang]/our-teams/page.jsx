// "use client";

// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import executives from "./team";

// // Fade-in animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.6 },
//   }),
// };

// const ProfileCard = ({ imageUrl, name, title, link, index }) => (
//   <motion.div
//     className="rounded-xl shadow-xl overflow-hidden text-left transition-all duration-300 hover:shadow-2xl"
//     custom={index}
//     initial="hidden"
//     animate="visible"
//     variants={fadeInUp}
//   >
//       <Link
//         href={`/our-teams/${link}`}
//         className="text-xl text-[#0070c9] hover:text-blue-800 font-normal inline-block mb-1 transition duration-150 ease-in-out"
//       >
//     <div className="bg-gray-50 rounded-t-xl flex justify-center items-center">
//       <img
//         className=" h-[192px] w-[230px] block  object-contain"
//         src={imageUrl}
//         alt={name}
//       />
//     </div>
//     <div className="py-4 bg-transparent">
//         {name}
//       <p className="text-base text-white m-0">{title}</p>
//     </div>
//       </Link>
//   </motion.div>
// );

// const TeamsPage = () => {
//   return (
//     <div className="bg-black min-h-screen font-sans">
//       <div className="max-w-6xl mx-auto px-4 py-10 pt-20 sm:pt-40">
//         <div className="border-b border-gray-200 pb-8">
//           <h1 className="text-center text-[40px] font-semibold tracking-widest uppercase text-gray-500 pb-">
//             Meet Our Leadership
//           </h1>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 md:mt-20">
//           {executives.map((exec, idx) => (
//             <ProfileCard
//               key={idx}
//               index={idx}
//               imageUrl={exec.image}
//               name={exec.name}
//               title={exec.title}
//               link={exec.link}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamsPage;






// "use client";

// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import  executives from "./team"; 
// import {  commentedExecutives } from "./team"; 

// // Fade-in animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
//   }),
// };

// const ProfileCard = ({ imageUrl, name, title, link, index }) => (
//   <motion.div
//     className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl overflow-hidden text-center transition-all duration-300 hover:shadow-cyan-500/10 hover:bg-zinc-800/80"
//     custom={index}
//     initial="hidden"
//     animate="visible"
//     variants={fadeInUp}
//   >
//     <Link
//       href={`/our-teams/${link}`}
//       className="block w-full h-full text-white"
//     >
//       {/* Image Area */}
//       <div className="bg-zinc-800/50 rounded-t-3xl flex justify-center items-center overflow-hidden">
//         <img
//           className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
//           src={imageUrl}
//           alt={name}
//         />
//       </div>
      
//       {/* Text Content */}
//       <div className="py-6 px-4">
//         <h3 className="text-xl font-bold mb-1 tracking-tight transition duration-150 ease-in-out group-hover:text-cyan-400">
//           {name}
//         </h3>
//         <p className="text-base text-gray-400 m-0 font-light">
//           {title}
//         </p>
//       </div>
//     </Link>
//   </motion.div>
// );

// const TeamsPage = () => {
//   return (
//     <div className="bg-black min-h-screen font-sans">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

//         {/* === Header Section === */}
//         <div className="text-center pb-16">
//           <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
//             Meet Our Leadership
//           </h1>
//           <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto">
//             Our vision is driven by a passionate team of experts dedicated to innovation and excellence.
//           </p>
//         </div>

//         {/* === Executives Grid === */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
//           {executives.map((exec, idx) => (
//             <ProfileCard
//               key={idx}
//               index={idx}
//               imageUrl={exec.image}
//               name={exec.name}
//               title={exec.title}
//               link={exec.link}
//             />
//           ))}
//         </div>

//         {/* === Optional Divider === */}
//         <div className="border-t border-zinc-800 mt-24 mb-12"></div>

//         {/* === Commented Executives Grid === */}
//         <div className="text-center mb-12">
//           <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
//             Our Team
//           </h2>
//           {/* <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
//             These executives also play a key role in driving our mission forward.
//           </p> */}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {commentedExecutives.map((exec, idx) => (
//             <ProfileCard
//               key={idx}
//               index={idx}
//               imageUrl={exec.image}
//               name={exec.name}
//               title={exec.title}
//               link={exec.link}
//             />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default TeamsPage;

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import executivesNew from "./team"; // Assuming this is where your team data is imported from

// Fade-in animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
};

const ProfileCard = ({ imageUrl, name, title, link, index }) => (
  <motion.div
    // Added 'mx-auto' to help center the card itself within a single grid cell if the cell is wider
    className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl overflow-hidden text-center transition-all duration-300 hover:shadow-cyan-500/10 hover:bg-zinc-800/80 w-[280px] h-[330px] mx-auto"
    custom={index}
    initial="hidden"
    animate="visible"
    variants={fadeInUp}
  >
    <Link
      href={`/our-teams/${link}`}
      className="block w-full h-full text-white"
    >
      <div className="bg-zinc-800/50 rounded-t-3xl flex justify-center items-center overflow-hidden">
        {/* The 'group-hover' class needs to be on an element that is 'group' for this to work, 
            which is the Link component in this structure. */}
        <img
          className="h-56 w-full object-cover transition-transform duration-500 hover:scale-[1.05]" // Removed 'group-hover' for simplicity unless 'group' is added
          src={imageUrl}
          alt={name}
        />
      </div>
      <div className="py-6 px-4">
        <h3 className="text-xl font-bold mb-1 tracking-tight transition duration-150 ease-in-out hover:text-cyan-400">
          {name}
        </h3>
        <p className="text-base text-gray-400 m-0 font-light">{title}</p>
      </div>
    </Link>
  </motion.div>
);

const TeamsPage = () => {
  // Split executives by section
  const primaryExecutives = executivesNew.filter((e) => e.section === "primary");
  const extendedExecutives = executivesNew.filter((e) => e.section === "extended");

  return (
    <div className="bg-black min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

        {/* Header */}
        <div className="text-center pb-16">
          <h1 className="text-white text-5xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Meet Our Leadership 
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto">
            Our vision is driven by a passionate team of experts dedicated to innovation and excellence.
          </p>
        </div>

        {/* Primary Executives */}
        {/*
          CORRECTION: Used 'justify-center' on the grid container.
          Also adjusted lg:grid-cols-2 to lg:grid-cols-3 and max-w-4xl to center a smaller group better.
        */}
        <div className="max-w-4xl mx-auto"> {/* Added max-width and mx-auto to center the section itself */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mt-12 justify-center">
            {primaryExecutives.map((exec, idx) => (
              <ProfileCard
                key={idx}
                index={idx}
                imageUrl={exec.image}
                name={exec.name}
                title={exec.title}
                link={exec.link}
              />
            ))}
          </div>
        </div>

        {/* --- */}
        {/* Divider */}
        <div className="border-t border-zinc-800 mt-24 mb-12"></div>
        {/* --- */}

        {/* Extended Executives */}
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Our Team 
          </h2>
        </div>

        {/*
          CORRECTION: Used 'justify-center' on the grid container.
          Added 'max-w-7xl mx-auto' to ensure the grid doesn't stretch too wide
          on extra large screens, which helps perceived centering.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
          {extendedExecutives.map((exec, idx) => (
            <ProfileCard
              key={idx}
              index={primaryExecutives.length + idx} // Continue index for animation delay
              imageUrl={exec.image}
              name={exec.name}
              title={exec.title}
              link={exec.link}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default TeamsPage;