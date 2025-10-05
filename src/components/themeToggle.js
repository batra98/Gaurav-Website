import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@styles';
const { colors } = theme;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${colors.gradient};
  border: 2px solid ${colors.lightestNavy}50;
  box-shadow: 0 8px 24px ${colors.shadowNavy};
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 24px;
  
  &:hover {
    transform: scale(1.1) rotate(15deg);
    box-shadow: 0 12px 32px ${colors.green}40;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;
  background: ${colors.lightNavy};
  color: ${colors.lightestSlate};
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-family: ${colors.SFMono};
  white-space: nowrap;
  opacity: ${props => (props.show ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.2s ease;
  box-shadow: 0 4px 12px ${colors.shadowNavy};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    right: 20px;
    width: 8px;
    height: 8px;
    background: ${colors.lightNavy};
    transform: rotate(45deg);
  }
`;

const ThemeToggle = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    // For now, just show a message in console
    // Full theme switching will come in next phase
    if (typeof window !== 'undefined') {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', nextTheme);
      
      // Show notification that this is coming soon
      alert('🎨 Multiple themes coming soon!\n\nFor now, use Cmd/Ctrl+K to navigate quickly!');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <ToggleButton
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Quick navigation"
        title="Press Cmd/Ctrl+K for quick navigation">
        🚀
      </ToggleButton>
      <Tooltip show={showTooltip}>
        Press Cmd/Ctrl+K
      </Tooltip>
    </div>
  );
};

export default ThemeToggle;