import React, { useRef, useEffect, useState} from 'react'
import {moveMarker} from './mapFunctions'

interface MapProps extends google.maps.MapOptions {
  style?: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) =>
{
  const mapRef: any = useRef(); //Reference for div#map to place map in.
  
  useEffect(() => {
    const map: google.maps.Map = new window.google.maps.Map(mapRef.current, {disableDefaultUI: true});  // Generate map on div#map element.
    map.setOptions(options) // Apply initial options for the map.
    const marker: google.maps.Marker = new google.maps.Marker({map: map}) // Create an only marker for the map (acting as a singleton).

    map.addListener('click', (e: any)=> moveMarker(e, marker)) // Handler for placing marker on the map.
  },[]);

  return <div ref={mapRef} id="map" />;
}

export default Map