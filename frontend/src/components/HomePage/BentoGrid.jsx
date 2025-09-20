import React from "react";
import JoinRoom from "../../assets/joinroom.png";
import DrawBoard from "../../assets/draw.png";
import Chat from "../../assets/chat.png";
import Codepage from "../../assets/codepage.png";
import GridPattern from "./GridPattern";

const BentoGrid = () => {
  return (
    <div className="relative">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className=" flex items-center justify-between gap-8 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">
            Features
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-5">
          <div className="group relative border-1 border-neutral-500 flex h-48 items-end overflow-hidden rounded-2xl md:h-80 ">
            <img
              src={JoinRoom}
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-400 group-hover:scale-105"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black  to-transparent  opacity-50"></div>

            <div className="relative m-4">
              <h3 className="font-semibold text-xl text-neutral-400">
                Join Room and Start Collaborating
              </h3>
              <p className="text-neutral-500 ">
                Create or join a room to start coding and collaborating in
                real-time. Instantly share your workspace with others.
              </p>
            </div>
          </div>
          <div className="group relative flex h-48 border-1 border-neutral-500 items-end overflow-hidden rounded-2xl  shadow-lg md:col-span-2 md:h-80">
            <GridPattern />
            <img
              src={DrawBoard}
              loading="lazy"
              alt="Photo by Magicle"
              className="absolute h-5/6 top-5 right-5  z-[1] transition duration-400 group-hover:scale-105"
            />

            <div className=" z-[2]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black  to-transparent opacity-50"></div>

              <div className="relative m-4">
                <h2 className="font-semibold text-xl text-neutral-400">
                  Drawing Board and Code Overlay
                </h2>
                <p className="text-neutral-500 ">
                  Enhance your collaboration with a drawing board that overlays
                  on your code. Illustrate concepts, plan architecture, and
                  annotate directly on the code.
                </p>
              </div>
            </div>
          </div>
          <div className="group relative flex h-48 items-end border-1 border-neutral-500 overflow-hidden rounded-2xl shadow-lg md:col-span-2 md:h-80">
            <GridPattern />
            <img
              src={Codepage}
              loading="lazy"
              className="absolute h-5/6 top-5 left-5  z-[1] transition duration-400 group-hover:scale-105"
            />
            <img
              src={Codepage}
              loading="lazy"
              className="absolute h-5/6 top-12 left-36  z-[1] transition duration-400 group-hover:scale-105"
            />

            <div className=" z-[2]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black  to-transparent  opacity-50"></div>

              <div className="relative m-4">
                <h2 className="font-semibold text-xl text-neutral-400">
                  Collaborative Coding
                </h2>
                <p className="text-neutral-500 ">
                  Work on code together with features that support real-time
                  edits, syntax highlighting, and version control. Perfect for
                  pair programming and team projects.
                </p>
              </div>
            </div>
          </div>
          <div className="group relative flex h-48 items-end border-1 border-neutral-500 overflow-hidden rounded-2xl shadow-lg md:h-80">
            <GridPattern />
            <img
              src={Chat}
              loading="lazy"
              alt="Photo by Lorenzo Herrera"
              className="absolute h-5/6 top-6 right-5 z-[1] transition duration-400 group-hover:scale-105"
            />

            <div className=" z-[2]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black  to-transparent opacity-50"></div>

              <div className="relative m-4">
                <h2 className="font-semibold text-xl text-neutral-400">
                  Live chat
                </h2>
                <p className="text-neutral-500 ">
                  Use the built-in chat feature to communicate with your team
                  while coding. Discuss, troubleshoot, and plan together without
                  leaving the editor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
