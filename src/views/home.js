// React
import {useRef, useEffect, useState} from 'react';

// Map
import { Marker } from 'maplibre-gl';
import { createMap } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";

// Location
import {Auth} from 'aws-amplify';
import * as AWS from "@aws-sdk/client-location";

const Home = () => {

  const credentials = Auth.currentCredentials();
  const client = new AWS.Location({
    credentials,
    region: "eu-central-1"
  });

  const marker = new Marker();

  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState([29.057074963280257, 40.96790426401776]);

  function handleLocationChange() {
    const {lng, lat} = marker.getLngLat();
    console.log('Current location changed!', [lng, lat]);
    setCurrentLocation([lng, lat]);
  };

  useEffect(() => {
    async function initializeMap() {
      if (mapRef.current != null) {
        map = await createMap({
          container: mapRef.current,
          center: [29.027333812492884, 40.986657335813845],
          zoom: 12,
        });
        marker
          .setLngLat(currentLocation)
          .setDraggable(true)
          .on('dragend', handleLocationChange)
          .addTo(map)
      }
    }
    initializeMap();
  }, []);

  useEffect(async () => {
    // Log
    console.log('Current location', currentLocation);
    // Send track data
    client.batchUpdateDevicePosition({
      TrackerName: 'lsdemotracker-dev',
      Updates: [{
        DeviceId: 'lsdemodevice',
        Position: currentLocation,
        SampleTime: new Date()
      }]
    });
  },[currentLocation]);

  return (
    <div className="bg-gray-50">
      <div className="container w-full h-screen">
        <h1 className="text-gray-800 font-bold">AWS Location Service Demo</h1>
        <p className="text-gray-900 font-normal">React, TailwindCSS and Parcel</p>
        <div ref={mapRef} id="map" className="w-[600px] h-[400px]"/>
      </div>
    </div>
  )
};

export default Home;