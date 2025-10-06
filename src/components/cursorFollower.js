import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@styles';
const { colors } = theme;

const Cursor = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid ${colors.green};
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.15s ease;
  transform: translate(-50%, -50%);
  opacity: ${props => (props.visible ? 1 : 0)};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CursorDot = styled.div`
  width: 8px;
  height: 8px;
  background: ${colors.gradient};
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
  opacity: ${props => (props.visible ? 1 : 0)};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = e => {
      setVisible(true);
      setDotPosition({ x: e.clientX, y: e.clientY });
      
      // Delayed follower for smooth effect
      setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <Cursor 
        visible={visible}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
        }} 
      />
      <CursorDot 
        visible={visible}
        style={{ 
          left: `${dotPosition.x}px`, 
          top: `${dotPosition.y}px`, 
        }} 
      />
    </>
  );
};

export default CursorFollower;