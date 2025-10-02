"use client";

import Image from "next/image";
import { Separator } from "../components/ui/Separator";

const executives = [
  { name: "Tim Cook", title: "CEO", image: "/placeholder1.png" },
  { name: "Katherine Adams", title: "Senior VP and General Counsel", image: "/placeholder2.png" },
  { name: "Eddy Cue", title: "Senior VP Services", image: "/placeholder3.png" },
  { name: "Craig Federighi", title: "Senior VP Software Engineering", image: "/placeholder4.png" },
  { name: "John Giannandrea", title: "Senior VP Machine Learning and AI", image: "/placeholder5.png" },
  { name: "Greg Joswiak", title: "Senior VP Worldwide Marketing", image: "/placeholder6.png" },
  { name: "Sabih Khan", title: "Chief Operating Officer", image: "/placeholder7.png" },
  { name: "Deirdre O’Brien", title: "Senior VP Retail + People", image: "/placeholder8.png" },
];

export default function Executives() {
  return (
    <div className="bg-black h-[100vh]">

    <div className="max-w-6xl mx-auto px-4 py-10 pt-40">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">Our Team</h1>
      <Separator/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-20">
        {executives.map((exec, idx) => (
          <div key={idx} className="bg-gray-100 p-4 rounded-lg text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <Image 
                src={exec.image} 
                alt={exec.name} 
                fill
                className="object-cover rounded-lg"
                />
            </div>
            <h2 className="text-blue-600 font-semibold">{exec.name}</h2>
            <p className="text-gray-700 text-sm">{exec.title}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
