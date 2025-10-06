import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { theme } from '@styles';

const { colors } = theme;

// Component to handle map view updates
function MapViewController({ activeLocation, data }) {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
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
}

// Create custom marker icon
const createMarkerIcon = (location, isActive) => {
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

const LeafletMapRenderer = ({ data, activeLocation, onLocationClick, pathCoordinates, activeIndex }) => {
  return (
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
  );
};

export default LeafletMapRenderer;
