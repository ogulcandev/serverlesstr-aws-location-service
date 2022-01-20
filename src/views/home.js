// React
import {useRef, useEffect} from 'react';

// Map
import { createMap } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";

// Location
import {Auth} from 'aws-amplify';
import * as AWS from "@aws-sdk/client-location";

const Home = () => {

  const mapRef = useRef(null);

  useEffect(() => {
    async function initializeMap() {
      //
      if (mapRef.current != null) {
        map = await createMap({
          container: mapRef.current,
          center: [29.027333812492884, 40.986657335813845],
          zoom: 13,
        });
      }
    }
    initializeMap();
  }, []);

  useEffect(async () => {
    // Set Client
    const credentials = await Auth.currentCredentials();
    const client = new AWS.Location({
      credentials,
      region: "eu-central-1"
    });

    // Route
    const exampleRoute = [
      [29.057074963280257, 40.96790426401776], // Caddebostan
      [29.04382986814383, 40.97390463095644], // Fenerbahçe
      [29.03617714651068, 40.98879207313138], // Söğütlüçeşme
      [29.02543390267789, 40.98868098526151], // Çarşı
      [29.00455815351762, 40.99730780737562] // Vapur
    ]

    for(let s=0; s<exampleRoute.length; s++) {
      setTimeout(() => {
        console.log(exampleRoute[s]);
        client.batchUpdateDevicePosition({
          TrackerName: 'lsdemotracker-dev',
          Updates: [{
            DeviceId: 'lsdemodevice',
            Position: exampleRoute[s],
            SampleTime: new Date()
          }]
        });
      }, s * 5000);
    }
  },[]);

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