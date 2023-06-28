import React, { useEffect, useState } from 'react';
import Map, { GeolocateControl, Marker } from 'react-map-gl';
import ResizingContainer from '@/components/ResizingContainer';
import { FaMapMarkerAlt } from 'react-icons/fa';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = () => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [renderKey, setRenderKey] = useState(0);

  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
    setRenderKey((prev) => prev + 1);
  };

  const Token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {}, [width, height]);

  return (
    <ResizingContainer
      width={width}
      height={height}
      key={renderKey}
      handleResize={handleResize}>
      <Map
        width="100%"
        height="100%"
        mapboxAccessToken={Token}
        initialViewState={{
          longitude: 80.2337,
          latitude: 12.9915,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12">
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <Marker longitude={80.2337} latitude={12.9915} anchor="bottom">
          <FaMapMarkerAlt size={30} className="text-red-500" />
        </Marker>
      </Map>
    </ResizingContainer>
  );
};

export default MapboxMap;
