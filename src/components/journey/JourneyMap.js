import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CustomPin from './CustomPin';

// Dynamic imports for Leaflet (client-side only)
let MapContainer, TileLayer, Marker, Polyline, useMap, L;

if (typeof window !== 'undefined') {
  const leaflet = require('react-leaflet');
  MapContainer = leaflet.MapContainer;
  TileLayer = leaflet.TileLayer;
  Marker = leaflet.Marker;
  Polyline = leaflet.Polyline;
  useMap = leaflet.useMap;
  L = require('leaflet');
  require('leaflet/dist/leaflet.css');
}

const MapWrapper = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.green}30;
  box-shadow: 0 12px 48px ${props => props.theme.colors.shadowNavy};
  position: relative;
  
  @media (max-width: 768px) {
    height: 400px;
    border-radius: 8px;
  }
  
  .leaflet-container {
    background: #0F1729;
    font-family: ${props => props.theme.fonts.Calibre};
  }
  
  .leaflet-control-attribution {
    background: ${props => props.theme.colors.navy}cc !important;
    color: ${props => props.theme.colors.slate} !important;
    font-size: 10px !important;
    padding: 2px 6px !important;
    border-radius: 4px !important;
    
    a {
      color: ${props => props.theme.colors.green} !important;
    }
  }
  
  .leaflet-control-zoom {
    border: 1px solid ${props => props.theme.colors.lightestNavy}50 !important;
    border-radius: 8px !important;
    overflow: hidden;
    
    a {
      background: ${props => props.theme.colors.lightNavy}ee !important;
      color: ${props => props.theme.colors.lightestSlate} !important;
      border: none !important;
      
      &:hover {
        background: ${props => props.theme.colors.green}40 !important;
      }
    }
  }
`;

const MapControls = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
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
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.lightNavy};
    border-color: ${props => props.theme.colors.green}60;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.theme.colors.green}20;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Component to handle map animations
const MapController = ({ activeLocation, isPlaying, onPlayComplete }) => {
  const map = useMap();

  useEffect(() => {
    if (activeLocation) {
      map.flyTo(activeLocation.coordinates.reverse(), 10, {
        duration: 2,
      });
    }
  }, [activeLocation, map]);

  return null;
};

// Create custom Leaflet icon from React component
const createCustomIcon = (location, isActive) => {
  const iconHtml = renderToString(
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50% 50% 50% 0',
      background: location.color || '#00D9FF',
      transform: 'rotate(-45deg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '3px solid #fff',
      boxShadow: isActive 
        ? `0 0 0 8px ${location.color}40, 0 4px 12px rgba(0,0,0,0.4)`
        : '0 4px 12px rgba(0,0,0,0.4)',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ 
        transform: 'rotate(45deg)', 
        fontSize: '20px',
        lineHeight: '1'
      }}>
        {location.icon}
      </div>
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: 'custom-pin',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

const JourneyMap = ({ data, activeLocation, onLocationClick }) => {
  const mapRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  // Journey path coordinates
  const pathCoordinates = data.map(loc => [loc.coordinates[1], loc.coordinates[0]]);

  // Reset view to show all locations
  const resetView = () => {
    if (mapRef.current) {
      mapRef.current.fitBounds([
        [10, 70], // Southwest
        [45, -125], // Northeast
      ], {
        padding: [50, 50],
        duration: 2,
      });
    }
  };

  // Play journey animation
  const playJourney = () => {
    setIsPlaying(true);
    let index = 0;

    const playNext = () => {
      if (index < data.length) {
        onLocationClick(data[index]);
        index++;
        setTimeout(playNext, 4000);
      } else {
        setIsPlaying(false);
      }
    };

    playNext();
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapWrapper>
        <MapContainer
          ref={mapRef}
          center={[25, 50]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}>
          
          {/* Dark theme tiles from CartoDB */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            className="map-tiles"
          />

          {/* Journey path line */}
          <Polyline
            positions={pathCoordinates}
            pathOptions={{
              color: '#00D9FF',
              weight: 2,
              opacity: 0.6,
              dashArray: '8, 8',
            }}
          />

          {/* Location markers */}
          {data.map((location) => (
            <Marker
              key={location.id}
              position={[location.coordinates[1], location.coordinates[0]]}
              icon={createCustomIcon(location, activeLocation?.id === location.id)}
              eventHandlers={{
                click: () => onLocationClick(location),
              }}
            />
          ))}

          <MapController 
            activeLocation={activeLocation} 
            isPlaying={isPlaying}
          />
        </MapContainer>
      </MapWrapper>

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