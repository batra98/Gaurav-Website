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
  padding: 8px 14px;
  border-radius: 8px;
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fonts.SFMono};
  white-space: nowrap;
  opacity: ${props => (props.show ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.2s ease;
  box-shadow: 0 4px 12px ${colors.shadowNavy};
  border: 1px solid ${colors.green}30;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    right: 22px;
    width: 10px;
    height: 10px;
    background: ${colors.lightNavy};
    border-right: 1px solid ${colors.green}30;
    border-bottom: 1px solid ${colors.green}30;
    transform: rotate(45deg);
  }
`;

const ThemeToggle = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <ToggleButton
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => {
          // Open command palette
          const event = new KeyboardEvent('keydown', {
            key: 'k',
            code: 'KeyK',
            ctrlKey: true,
            metaKey: true,
            bubbles: true,
          });
          document.dispatchEvent(event);
        }}
        aria-label="Quick navigation (Cmd+K)"
        title="Quick search - Press Cmd/Ctrl+K">
        🚀
      </ToggleButton>
      <Tooltip show={showTooltip}>
        Quick Search (⌘K)
      </Tooltip>
    </div>
  );
};

export default ThemeToggle;