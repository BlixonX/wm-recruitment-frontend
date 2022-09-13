import React, { useRef, useEffect, useContext} from 'react'
import {moveMarker} from './mapFunctions'
import { CoordinateContext } from './Context'


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
  const setCoordinates = useContext(CoordinateContext)

  useEffect(() => {
    const map: google.maps.Map = new window.google.maps.Map(mapRef.current, {disableDefaultUI: true});  // Generate map on div#map element.
    map.setOptions(options) // Apply initial options for the map.
    const marker: google.maps.Marker = new google.maps.Marker({map: map}) // Create an only marker for the map (acting as a singleton).

    map.addListener('click', function(e: any)
    {
      const latLng = moveMarker(e, marker);
      setCoordinates(latLng);
    }) // Handler for placing marker on the map.
  },[]);

  return <div ref={mapRef} id="map" />;
}

export default Map