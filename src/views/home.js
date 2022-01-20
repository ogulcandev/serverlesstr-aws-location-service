// React
import {useRef, useEffect} from 'react';

// Map
import { createMap } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";

const Home = () => {

  const mapRef = useRef(null);

  useEffect(() => {
    async function initializeMap() {
      //
      if (mapRef.current != null) {
        map = await createMap({
          container: mapRef.current,
          center: [-122.431297, 37.773972],
          zoom: 13,
        });
      }
    }
    initializeMap();
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="container w-full h-screen">
        <h1 className="text-gray-800 font-bold">AWS Location Service Demo</h1>
        <p className="text-gray-900 font-normal">React, TailwindCSS and Parcel</p>
        <div ref={mapRef} id="map" className="w-[600px] h-[400px]" />
      </div>
    </div>
  )
};

export default Home;