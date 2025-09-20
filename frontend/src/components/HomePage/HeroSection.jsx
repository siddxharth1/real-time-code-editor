import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 lg:my-20">
      <div className="grid lg:grid-cols-6 lg:gap-x-8 xl:gap-x-12 lg:items-center">
        <div className="lg:col-span-3">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
            Collaborate on Code in Real-Time with Developers
          </h1>
          <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
            An online code editor for collaboration, brainstorming, interviews,
            troubleshooting, teaching, and more…
          </p>

          <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <Button>
              <Link to="/join">Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-3 mt-10 lg:mt-0">
          <img
            className="w-full rounded-xl"
            src="https://images.unsplash.com/photo-1665686376173-ada7a0031a85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=700&q=80"
            alt="Image Description"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
