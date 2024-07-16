import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import Countrie from "./countries.json";

const React3dEarth = () => {
  const arcsData = [
    {
      startLat: 37.7749,
      startLng: -122.4194,
      endLat: 40.7128,
      endLng: -74.006,
    },
    {
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 51.5074,
      endLng: -0.1278,
    },
    {
      startLat: 35.6895,
      startLng: 139.6917,
      endLat: 48.8566,
      endLng: 2.3522,
    },
    {
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 1.3521,
      endLng: 103.8198,
    },
    {
      startLat: 55.7558,
      startLng: 37.6173,
      endLat: 39.9042,
      endLng: 116.4074,
    },
    {
      startLat: 40.7128,
      startLng: -74.006,
      endLat: -22.9068,
      endLng: -43.1729,
    },
    {
      startLat: 51.5074,
      startLng: -0.1278,
      endLat: -33.9249,
      endLng: 18.4241,
    },
    {
      startLat: 48.8566,
      startLng: 2.3522,
      endLat: 55.7558,
      endLng: 37.6173,
    },
    {
      startLat: 28.6139,
      startLng: 28.6139,
      endLat: -13.9297,
      endLng: -60.7801,
    },
    {
      startLat: 77.209,
      startLng: 77.209,
      endLat: 34.0522,
      endLng: -118.2437,
    },
    {
      startLat: 31.2304,
      startLng: 121.4737,
      endLat: 37.7749,
      endLng: -122.4194,
    },
    {
      startLat: -26.2041,
      startLng: 28.0473,
      endLat: 19.076,
      endLng: 72.8777,
    },
    {
      startLat: 39.9042,
      startLng: 116.4074,
      endLat: 51.5074,
      endLng: -0.1278,
    },
  ];

  const arcColors = [
    "#FFD700",
    "#FF8C00",
    "#00CED1",
    "#32CD32",
    "#FF1493",
    "#1E90FF",
  ];

  const globeEl = useRef();

  useEffect(() => {
    globeEl.current.controls().enableZoom = false;
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 2;
  }, []);

  function getImageUrl(name) {
    return new URL(`./${name}.png`, import.meta.url).href;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        zIndex: "0",
      }}
    >
      <Globe
        ref={globeEl}
        globeImageUrl={getImageUrl("bg")}
        hexPolygonsData={Countrie.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.5}
        hexPolygonUseDots={true}
        hexPolygonColor={() => "gray"}
        arcsData={arcsData}
        arcDashLength={0.5}
        arcDashGap={4}
        arcDashInitialGap={() => Math.random() * 5}
        arcDashAnimateTime={1500}
        arcStroke={0.5}
        arcsTransitionDuration={1000}
        // arcColor={() => arcColors[Math.floor(Math.random() * arcColors.length)]}
        arcColor={() => "white"}
        controls={{ autoRotateSpeed: 50 }}
        pointsData={arcsData.flatMap((arc) => [
          { lat: arc.startLat, lng: arc.startLng },
          { lat: arc.endLat, lng: arc.endLng },
        ])}
        pointAltitude={0}
        pointRadius={0.5}
        pointColor={() => "white"} // Color for the points (gold)
      />
    </div>
  );
};

export default React3dEarth;
