
"use client"
import About from "./components/About";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";

import 'react-whatsapp-widget/dist/index.css';
import OurBusiness from "./components/OurBusiness";


function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <About />
      <OurBusiness/>
      <Features />
      <Story />
      <Contact />

    </main>
  );
}

export default Home;
