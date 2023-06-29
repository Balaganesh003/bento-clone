import React, { useEffect, useState } from 'react';
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import ResizingContainer from '@/components/ResizingContainer';
import { FaMapMarkerAlt } from 'react-icons/fa';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = () => {
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [renderKey, setRenderKey] = useState(0);

  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapViewport, setMapViewport] = useState({
    longitude: 80.2337,
    latitude: 12.9915,
    zoom: 8,
  });
  const [isViewportFixed, setIsViewportFixed] = useState(true);

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

  useEffect(() => {
    if (selectedLocation) {
      setMapViewport({
        longitude: selectedLocation.center[0],
        latitude: selectedLocation.center[1],
        zoom: 8,
      });
      setIsViewportFixed(true);
      setInterval(() => {
        setIsViewportFixed(false);
      }, 1000);
    } else {
      setIsViewportFixed(false);
    }
  }, [selectedLocation]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setValue('');
    setSearchResults([]);
  };

  const handleViewportChange = (newViewport) => {
    if (!selectedLocation) {
      setMapViewport(newViewport);
    }
  };

  return (
    <ResizingContainer
      width={width}
      height={height}
      key={renderKey}
      handleResize={handleResize}>
      <div className="absolute bottom-[-3rem] left-0 z-[100] ">
        <input
          className="w-[12rem] hidden bg-black text-white p-2 rounded-lg placeholder:text-white"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search location"
        />
        {searchResults.length > 0 && (
          <ul className="absolute bottom-0 bg-black text-white mb-[2.75rem] ml-[5rem] max-h-[7rem] overflow-y-auto scrollbar-hide w-[12rem] p-2 rounded-lg ">
            {searchResults.map((result) => (
              <li
                className="truncate text-ellipsis p-1 cursor-pointer hover:bg-gray-700 rounded-lg"
                key={result.id}
                onClick={() => handleSelectLocation(result)}>
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
        {...(isViewportFixed && { ...mapViewport })}
        onViewportChange={handleViewportChange}>
        <NavigationControl />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        <Marker
          longitude={selectedLocation?.center[0] || mapViewport.longitude}
          latitude={selectedLocation?.center[1] || mapViewport.latitude}
          anchor="bottom">
          <FaMapMarkerAlt size={30} className="text-red-500" />
        </Marker>
      </Map>
    </ResizingContainer>
  );
};

export default MapboxMap;
