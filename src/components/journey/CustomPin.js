import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 currentColor;
  }
  70% {
    box-shadow: 0 0 0 15px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
`;

const PinContainer = styled.div`
  position: relative;
  cursor: pointer;
  transform: translate(-50%, -100%);
`;

const PinMarker = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50% 50% 50% 0;
  background: ${props => props.color || '#00D9FF'};
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  animation: ${props => (props.isActive ? pulse : 'none')} 2s infinite;
  color: ${props => props.color || '#00D9FF'};
  
  &:hover {
    transform: rotate(-45deg) scale(1.2);
    box-shadow: 0 8px 24px rgba(0, 217, 255, 0.6);
  }
`;

const PinIcon = styled.div`
  transform: rotate(45deg);
  font-size: 20px;
  line-height: 1;
`;

const PinLabel = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.theme.colors.lightNavy}ee;
  backdrop-filter: blur(10px);
  padding: 6px 12px;
  border-radius: 6px;
  white-space: nowrap;
  font-size: 13px;
  font-family: ${props => props.theme.fonts.SFMono};
  color: ${props => props.theme.colors.lightestSlate};
  opacity: ${props => (props.show ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.2s ease;
  border: 1px solid ${props => props.theme.colors.green}30;
  box-shadow: 0 4px 12px ${props => props.theme.colors.shadowNavy};
`;

const CustomPin = ({ data, isActive, onClick, showLabel }) => {
  return (
    <PinContainer onClick={onClick}>
      <PinMarker color={data.color} isActive={isActive}>
        <PinIcon>{data.icon}</PinIcon>
      </PinMarker>
      <PinLabel show={showLabel}>{data.title}</PinLabel>
    </PinContainer>
  );
};

export default CustomPin;