import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme, media } from '@styles';

const { colors, fontSizes, fonts } = theme;

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

const MapContainer_Styled = styled.div`
  position: sticky;
  top: 120px;
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid ${colors.green}30;
  box-shadow: 0 12px 48px ${colors.shadowNavy};
  background: ${colors.navy};
  
  ${media.desktop`
    height: 450px;
  `};
  
  ${media.tablet`
    position: relative;
    top: 0;
    height: 400px;
    margin-bottom: 40px;
  `};
  
  ${media.phone`
    height: 300px;
  `};
  
  .leaflet-container {
    background: #0a0e1a;
    font-family: ${fonts.Calibre};
    height: 100%;
    width: 100%;
  }
  
  .leaflet-control-attribution {
    background: ${colors.navy}ee !important;
    color: ${colors.slate} !important;
    font-size: 9px !important;
    padding: 2px 6px !important;
    border-radius: 4px !important;
    
    a {
      color: ${colors.green} !important;
    }
  }
  
  .leaflet-control-zoom {
    border: 1px solid ${colors.lightestNavy}50 !important;
    border-radius: 8px !important;
    overflow: hidden;
    
    a {
      background: ${colors.lightNavy}ee !important;
      color: ${colors.lightestSlate} !important;
      border: none !important;
      width: 32px !important;
      height: 32px !important;
      line-height: 32px !important;
      
      &:hover {
        background: ${colors.green}40 !important;
      }
    }
  }
  
  .custom-marker {
    background: none;
    border: none;
  }
`;

const MapHeader = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 1000;
  background: ${colors.lightNavy}f5;
  backdrop-filter: blur(10px);
  border: 1px solid ${colors.green}30;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px ${colors.shadowNavy};
  
  ${media.phone`
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  `};
`;

const MapTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MapIcon = styled.span`
  font-size: 24px;
`;

const MapTitleText = styled.div`
  font-size: ${fontSizes.md};
  color: ${colors.lightestSlate};
  font-weight: 600;
  font-family: ${fonts.SFMono};
`;

const LocationCounter = styled.div`
  font-size: ${fontSizes.sm};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  padding: 6px 12px;
  background: ${colors.navy}80;
  border-radius: 8px;
  border: 1px solid ${colors.lightestNavy}40;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.md};
`;

// Component to handle map view updates
const MapViewController = ({ activeLocation, data }) => {
  const map = useMap();
  
  useEffect(() => {
    if (activeLocation && activeLocation.coordinates) {
      // Fly to the active location
      const [lng, lat] = activeLocation.coordinates;
      map.flyTo([lat, lng], 6, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    } else {
      // Show all locations
      const bounds = data.map(loc => [loc.coordinates[1], loc.coordinates[0]]);
      if (bounds.length > 0) {
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 4,
          duration: 1,
        });
      }
    }
  }, [activeLocation, map, data]);
  
  return null;
};

// Create custom marker icon
const createMarkerIcon = (location, isActive) => {
  if (typeof window === 'undefined' || !L) return null;
  
  const iconSize = isActive ? 44 : 32;
  const iconHtml = `
    <div style="
      position: relative;
      width: ${iconSize}px;
      height: ${iconSize}px;
    ">
      <div style="
        width: 100%;
        height: 100%;
        border-radius: 50% 50% 50% 0;
        background: ${location.color || colors.green};
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: ${isActive ? '4px' : '3px'} solid white;
        box-shadow: ${isActive 
          ? `0 0 0 8px ${location.color || colors.green}40, 0 6px 20px rgba(0,0,0,0.5)` 
          : '0 4px 12px rgba(0,0,0,0.4)'};
        transition: all 0.3s ease;
      ">
        <div style="
          transform: rotate(45deg);
          font-size: ${isActive ? '22px' : '16px'};
          line-height: 1;
          transition: font-size 0.3s ease;
        ">
          ${location.icon}
        </div>
      </div>
      ${isActive ? `
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 4px;
          background: ${location.color || colors.green};
          border-radius: 2px;
          animation: pulse 2s infinite;
        "></div>
      ` : ''}
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize],
    popupAnchor: [0, -iconSize],
  });
};

const MiniMap = ({ data, activeLocation, onLocationClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Ensure map loads only on client side
    if (typeof window !== 'undefined') {
      setIsLoaded(true);
    }
  }, []);
  
  if (!isLoaded) {
    return (
      <MapContainer_Styled>
        <LoadingContainer>🗺️ Loading map...</LoadingContainer>
      </MapContainer_Styled>
    );
  }
  
  // Journey path coordinates [lat, lng]
  const pathCoordinates = data.map(loc => [loc.coordinates[1], loc.coordinates[0]]);
  
  const activeIndex = activeLocation 
    ? data.findIndex(loc => loc.id === activeLocation.id) + 1
    : 0;
  
  return (
    <MapContainer_Styled>
      <MapHeader>
        <MapTitle>
          <MapIcon>🗺️</MapIcon>
          <div>
            <MapTitleText>Journey Map</MapTitleText>
            {activeLocation && (
              <div style={{ 
                fontSize: fontSizes.xs, 
                color: colors.slate,
                marginTop: '2px',
              }}>
                {activeLocation.location}
              </div>
            )}
          </div>
        </MapTitle>
        <LocationCounter>
          {activeIndex > 0 ? `${activeIndex} / ${data.length}` : `${data.length} Locations`}
        </LocationCounter>
      </MapHeader>
      
      <MapContainer
        center={[20, 30]}
        zoom={2}
        zoomControl={true}
        scrollWheelZoom={false}
        doubleClickZoom={true}
        dragging={true}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Dark theme tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Journey path line */}
        <Polyline
          positions={pathCoordinates}
          pathOptions={{
            color: colors.green,
            weight: 3,
            opacity: 0.6,
            dashArray: '10, 10',
            dashOffset: '0',
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
        
        {/* Active path (progress line) */}
        {activeLocation && (
          <Polyline
            positions={pathCoordinates.slice(0, activeIndex)}
            pathOptions={{
              color: colors.purple,
              weight: 3,
              opacity: 0.8,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
        )}
        
        {/* Location markers */}
        {data.map((location, index) => {
          const isActive = activeLocation?.id === location.id;
          const isPast = activeLocation && index < activeIndex - 1;
          
          return (
            <Marker
              key={location.id}
              position={[location.coordinates[1], location.coordinates[0]]}
              icon={createMarkerIcon(location, isActive)}
              opacity={isPast ? 0.6 : 1}
              eventHandlers={{
                click: () => onLocationClick?.(location),
              }}
            />
          );
        })}
        
        <MapViewController activeLocation={activeLocation} data={data} />
      </MapContainer>
    </MapContainer_Styled>
  );
};

export default MiniMap;
