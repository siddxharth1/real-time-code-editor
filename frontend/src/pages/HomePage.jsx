import React from "react";
import AccordiansNext from "../components/AccordiansNext";
import NavbarUI from "../components/HomePage/NavbarUI";

const HomePage = () => {
  return (
    <div>
      <NavbarUI />
      <div className="mx-[7vw]">
        <AccordiansNext />
      </div>
    </div>
  );
};

export default HomePage;
