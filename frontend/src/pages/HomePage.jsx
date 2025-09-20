import React from "react";
import NavbarUI from "../components/HomePage/NavbarUI";
import React3dEarth from "../components/HomePage/React3dEarth";
import BentoGrid from "../components/HomePage/BentoGrid";
import Suggestions from "../components/HomePage/Suggestions";
import HeroSection from "../components/HomePage/HeroSection";
import Footer from "../components/HomePage/Footer";

const HomePage = () => {
  return (
    <div className=" relative">
      <div className="absolute w-full h-screen top-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] z-0"></div>
      <NavbarUI />
      <div className="mx-[7vw] font-sans">
        <HeroSection />
        <BentoGrid />
        <br />
        <React3dEarth />
        <br />

        <Suggestions />
      </div>
      <div className="relative">
        <div className="relative h-96">
          <div className="absolute inset-0 -z-1 items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#0A0A0A_40%,#391d86_100%)]"></div>
        </div>
        <div className="absolute bottom-[3vw] left-1/2 -translate-x-1/2">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
