import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme, media } from '@styles';

const { colors, fontSizes, fonts } = theme;

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

const MiniMap = ({ data, activeLocation, onLocationClick }) => {
  const [LeafletRenderer, setLeafletRenderer] = useState(null);
  
  useEffect(() => {
    // Dynamically import the Leaflet renderer component only on client side
    if (typeof window !== 'undefined') {
      import('./LeafletMapRenderer')
        .then((module) => {
          setLeafletRenderer(() => module.default);
        })
        .catch((err) => {
          console.error('Failed to load map:', err);
        });
    }
  }, []);
  
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
      
      {LeafletRenderer ? (
        <LeafletRenderer
          data={data}
          activeLocation={activeLocation}
          onLocationClick={onLocationClick}
          pathCoordinates={pathCoordinates}
          activeIndex={activeIndex}
        />
      ) : (
        <LoadingContainer>🗺️ Loading map...</LoadingContainer>
      )}
    </MapContainer_Styled>
  );
};

export default MiniMap;
