import React, { useEffect, useState } from 'react';
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import ResizingContainer from '@/components/ResizingContainer';
import { FaMapMarkerAlt } from 'react-icons/fa';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = () => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [renderKey, setRenderKey] = useState(0);

  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapViewport, setMapViewport] = useState({
    longitude: 80.2337,
    latitude: 12.9915,
    zoom: 12,
  });

  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
    setRenderKey((prev) => prev + 1);
  };

  const Token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    const searchLocation = async () => {
      if (value.trim() === '') {
        setSearchResults([]);
        return;
      }

      const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json?access_token=${Token}&autocomplete=true`;

      try {
        const response = await fetch(geocodingUrl);
        const data = await response.json();

        if (response.ok && data?.features?.length > 0) {
          setSearchResults(data.features);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error searching location:', error);
      }
    };

    searchLocation();
  }, [value, Token]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setMapViewport({
      longitude: location.center[0],
      latitude: location.center[1],
      zoom: 14,
    });
    setValue('');
    setSearchResults([]);
  };

  return (
    <ResizingContainer
      width={width}
      height={height}
      key={renderKey}
      handleResize={handleResize}>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search location"
        />
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id} onClick={() => handleSelectLocation(result)}>
                {result.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Map
        width="100%"
        height="100%"
        mapboxAccessToken={Token}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        {...mapViewport}
        onViewportChange={setMapViewport}>
        <NavigationControl />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {selectedLocation && (
          <Marker
            longitude={selectedLocation.center[0]}
            latitude={selectedLocation.center[1]}
            anchor="bottom">
            <FaMapMarkerAlt size={30} className="text-red-500" />
          </Marker>
        )}
      </Map>
    </ResizingContainer>
  );
};

export default MapboxMap;
