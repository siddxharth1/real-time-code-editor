import React from "react";
import BackgroundBeams from "./BackgroundBeams";
import { Button, Input } from "@nextui-org/react";

const Suggestions = () => {
  return (
    <div className="relative border-1 border-neutral-700 rounded-md">
      <div className="absolute h-full w-full flex items-center justify-center">
        <div>
          <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b py-3 from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Any Suggestions
          </h1>
          <p className="text-neutral-500 mt-6 mb-3">
            We are always looking for ways to improve our platform. If you have
            any suggestions, please let us know.
          </p>
          <div className="flex">
            <Input
              variant="faded"
              size="lg"
              placeholder="Enter your suggestions"
              endContent={<Button variant="faded">Submit</Button>}
            />
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Suggestions;
