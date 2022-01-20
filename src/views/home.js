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

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [client, setClient] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([29.057074963280257, 40.96790426401776]);

  function handleLocationChange() {
    const {lng, lat} = markerRef.current.getLngLat();
    setCurrentLocation([lng, lat]);
  };

  async function initializeMap() {
    // Eğer mapRef null değilse
    if (mapRef.current != null) {
      // Haritayı oluştur
      map = await createMap({
        container: mapRef.current,
        center: [29.027333812492884, 40.986657335813845],
        zoom: 12,
      });
    };
  };

  async function createMarker() {
    // Oluştur
    markerRef.current = new Marker();
    // Ekle
    markerRef.current
      .setLngLat(currentLocation)
      .setDraggable(true)
      .on('dragend', handleLocationChange)
      .addTo(map)
  };

  async function createClient() {
    const credentials = await Auth.currentCredentials();
    const client = new AWS.Location({
      credentials,
      region: "eu-central-1"
    });
    setClient(client);
  };

  function updateDeviceLocation() {
    console.log('Location changed: ', currentLocation);
    //
    client.batchUpdateDevicePosition({
      TrackerName: 'lsdemotracker-dev',
      Updates: [{
        DeviceId: 'lsdemodevice',
        Position: currentLocation,
        SampleTime: new Date()
      }]
    });
  };

  useEffect(async () => {
    await initializeMap();
    await createMarker();
    await createClient();
  }, []);

  useEffect(() => {
    if (client !== null) {
      updateDeviceLocation();
    }
  }, [currentLocation]);

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