import React from "react";
import AccordiansNext from "../components/AccordiansNext";
import NavbarUI from "../components/HomePage/NavbarUI";
import React3dEarth from "../components/React3dEarth";
// import React3dEarth from "react-3d-earth";

const HomePage = () => {
  return (
    <div>
      <NavbarUI />
      <div className="mx-[7vw]">
        <AccordiansNext />
      </div>
      <React3dEarth />
      {/* <React3dEarth
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          zIndex: "0",
        }}
      /> */}
    </div>
  );
};

export default HomePage;
