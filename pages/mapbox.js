import React from 'react';
import Map, { GeolocateControl } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = () => {
  const Token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div className="w-[30rem] h-[30rem]">
      <Map
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
      </Map>
    </div>
  );
};

export default MapboxMap;
