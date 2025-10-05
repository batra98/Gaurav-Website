import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@styles';
const { colors } = theme;

const StyledProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 1000;
  transform-origin: 0%;
`;

const StyledProgressFill = styled.div`
  height: 100%;
  background: ${colors.gradient};
  transform-origin: 0%;
  transition: transform 0.1s ease-out;
  transform: scaleX(${props => props.progress});
  box-shadow: 0 0 10px ${colors.green}80;
`;

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const scrolled = scrollTop / trackLength;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <StyledProgressBar>
      <StyledProgressFill progress={progress} />
    </StyledProgressBar>
  );
};

export default ScrollProgress;