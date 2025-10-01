
"use client"
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsappWidget from "./components/WhatsappWidget";
import 'react-whatsapp-widget/dist/index.css';
import OurBusiness from "./components/OurBusiness";


function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <OurBusiness/>
      <Features />
      <Story />
      <Contact />
      <Footer />
      <WhatsappWidget/>
    </main>
  );
}

export default Home;
