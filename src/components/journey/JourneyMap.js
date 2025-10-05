import React, { useState, useCallback, useRef, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import styled from 'styled-components';
import CustomPin from './CustomPin';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainer = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.green}30;
  box-shadow: 0 12px 48px ${props => props.theme.colors.shadowNavy};
  
  @media (max-width: 768px) {
    height: 400px;
    border-radius: 8px;
  }
  
  .mapboxgl-canvas {
    cursor: grab !important;
  }
  
  .mapboxgl-ctrl-bottom-right,
  .mapboxgl-ctrl-bottom-left {
    display: none;
  }
`;

const MapControls = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ControlButton = styled.button`
  background: ${props => props.theme.colors.lightNavy}ee;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.green}30;
  border-radius: 8px;
  padding: 10px 16px;
  color: ${props => props.theme.colors.lightestSlate};
  font-family: ${props => props.theme.fonts.SFMono};
  font-size: ${props => props.theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${props => props.theme.colors.shadowNavy};
  
  &:hover {
    background: ${props => props.theme.colors.lightNavy};
    border-color: ${props => props.theme.colors.green}60;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.theme.colors.green}20;
  }
`;

// Create path data for journey lines
const createJourneyPath = (locations) => {
  const coordinates = locations.map(loc => loc.coordinates);
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coordinates,
    },
  };
};

const JourneyMap = ({ data, activeLocation, onLocationClick }) => {
  const mapRef = useRef();
  const [hoveredPin, setHoveredPin] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Use placeholder token for now - user will add their own
  const MAPBOX_TOKEN = process.env.GATSBY_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN_HERE';

  const [viewState, setViewState] = useState({
    longitude: 50,
    latitude: 25,
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  });

  // Fly to specific location
  const flyToLocation = useCallback((location) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: location.coordinates,
        zoom: 10,
        duration: 2000,
        essential: true,
      });
    }
  }, []);

  // Reset view to show all locations
  const resetView = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [50, 25],
        zoom: 1.5,
        pitch: 0,
        bearing: 0,
        duration: 2000,
      });
    }
  }, []);

  // Play journey animation
  const playJourney = useCallback(() => {
    setIsPlaying(true);
    let index = 0;

    const playNext = () => {
      if (index < data.length) {
        onLocationClick(data[index]);
        flyToLocation(data[index]);
        index++;
        setTimeout(playNext, 4000); // 4 seconds per location
      } else {
        setIsPlaying(false);
      }
    };

    playNext();
  }, [data, flyToLocation, onLocationClick]);

  // Fly to active location when it changes
  useEffect(() => {
    if (activeLocation) {
      flyToLocation(activeLocation);
    }
  }, [activeLocation, flyToLocation]);

  // Journey path data
  const journeyPath = createJourneyPath(data);

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer>
        <Map
          ref={mapRef}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: '100%', height: '100%' }}>
          
          {/* Journey path line */}
          <Source id="journey-path" type="geojson" data={journeyPath}>
            <Layer
              id="journey-line"
              type="line"
              paint={{
                'line-color': '#00D9FF',
                'line-width': 2,
                'line-opacity': 0.6,
                'line-dasharray': [2, 2],
              }}
            />
          </Source>

          {/* Location pins */}
          {data.map((location) => (
            <Marker
              key={location.id}
              longitude={location.coordinates[0]}
              latitude={location.coordinates[1]}
              anchor="bottom">
              <CustomPin
                data={location}
                isActive={activeLocation?.id === location.id}
                onClick={() => onLocationClick(location)}
                showLabel={hoveredPin === location.id}
                onMouseEnter={() => setHoveredPin(location.id)}
                onMouseLeave={() => setHoveredPin(null)}
              />
            </Marker>
          ))}
        </Map>
      </MapContainer>

      <MapControls>
        <ControlButton onClick={playJourney} disabled={isPlaying}>
          {isPlaying ? '⏸ Playing...' : '▶ Play Journey'}
        </ControlButton>
        <ControlButton onClick={resetView}>
          🔄 Reset View
        </ControlButton>
      </MapControls>
    </div>
  );
};

export default JourneyMap;