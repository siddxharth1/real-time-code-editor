import React from "react";

const GridPattern = () => {
  return (
    <div className="-z-0">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      >
        <defs>
          <pattern
            id=":r29:"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path d="M.5 20V.5H20" fill="none" strokeDasharray="0"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#:r29:)"
        ></rect>
      </svg>
    </div>
  );
};

export default GridPattern;
