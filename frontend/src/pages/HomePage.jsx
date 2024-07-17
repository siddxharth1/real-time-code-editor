import React from "react";
import NavbarUI from "../components/HomePage/NavbarUI";
import React3dEarth from "../components/React3dEarth";
import { Button, Divider, Input } from "@nextui-org/react";
import AccordiansNext from "../components/AccordiansNext";
import BackgroundBeams from "../components/BackgroundBeams";
import BentoGrid from "../components/BentoGrid";
import Suggestions from "../components/Suggestions";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <div className=" relative">
      <div className="absolute w-full h-screen top-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] z-0"></div>
      <NavbarUI />
      <div className="mx-[7vw] font-sans">
        <HeroSection />
        <BentoGrid />
        <React3dEarth />

        <Suggestions />
      </div>
      <div className="relative h-96">
        <div className="absolute inset-0 -z-1 items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#391d86_100%)]"></div>
      </div>
    </div>
  );
};

export default HomePage;
