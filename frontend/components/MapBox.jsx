import React, { useEffect, useState } from 'react';
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import ResizingContainer from '@/components/ResizingContainer';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import MapLogo from '@/assets/map.png';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = ({ item }) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [renderKey, setRenderKey] = useState(0);
  const Token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [isViewportFixed, setIsViewportFixed] = useState(true);

  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
    setRenderKey((prev) => prev + 1);
  };

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
      console.log(selectedLocation.center[0], selectedLocation.center[1]);
      dispatch(
        profileActions.updateItem({
          ...item,
          location: {
            longitude: selectedLocation.center[0],
            latitude: selectedLocation.center[1],
            zoom: 4,
          },
        })
      );

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
    setIsSearchOpen(false);
    setValue('');
    setSearchResults([]);
  };

  const handleLocation = () => {
    dispatch(
      profileActions.updateItem({
        ...item,
        location: {
          latitude: 20.5937,
          longitude: 78.9629,
          zoom: 4,
        },
      })
    );
    setIsViewportFixed(true);

    setInterval(() => {
      setIsViewportFixed(false);
    }, 1000);
  };

  const handleViewportChange = (newViewport) => {
    if (!selectedLocation) {
      dispatch(profileActions.updateItem({ ...item, location: newViewport }));
    }
  };

  useEffect(() => {
    if (item.location) {
      dispatch(profileActions.updateItem({ ...item, location: item.location }));
    }

    setIsViewportFixed(true);

    setInterval(() => {
      setIsViewportFixed(false);
    }, 1000);
  }, [renderKey]);

  return (
    <div>
      {item.location ? (
        <ResizingContainer
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          width={width}
          height={height}
          item={item}
          type={item.type}
          key={renderKey}
          handleResize={handleResize}>
          <Map
            width="100%"
            height="100%"
            style={{ borderRadius: '1.5rem' }}
            mapboxAccessToken={Token}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            {...(isViewportFixed && { ...item.location })}
            onViewportChange={handleViewportChange}>
            <NavigationControl />

            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />

            <Marker
              longitude={
                selectedLocation?.center[0] || item.location?.longitude
              }
              latitude={selectedLocation?.center[1] || item.location?.latitude}
              anchor="bottom">
              <FaMapMarkerAlt size={30} className="text-red-500" />
            </Marker>
          </Map>
          {isSearchOpen && (
            <div
              onBlur={() => setIsSearchOpen(false)}
              className="absolute bottom-[1rem] left-[7rem] z-[100]  ">
              {searchResults.length > 0 && (
                <ul className=" bg-black text-white   max-h-[7rem] overflow-y-auto scrollbar-hide w-[12rem] p-2 rounded-t-lg ">
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
              <input
                className={`w-[12rem]  bg-black text-white p-2 focus:outline-none ${
                  value.length > 0 ? 'rounded-b-lg' : 'rounded-lg'
                }  placeholder:text-white`}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search location"
              />
            </div>
          )}
        </ResizingContainer>
      ) : (
        <div
          onClick={handleLocation}
          className={`flex-shrink-0 bg-[#f7f7f7] h-[175px] w-[175px] border-gray-border rounded-[1.5rem] border-dashed  text-center  cursor-pointer relative border-2 `}>
          <div className="w-full h-full flex items-center  justify-center absolute top-0 left-0 flex-col">
            <Image
              src={MapLogo}
              alt="Drag and drop"
              width={64}
              height={64}
              className={`w-[1.5rem] h-[1.5rem] rounded-md `}
            />
            <p className={`mt-1 font-bold text-[14px] `}>Add Map</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxMap;
