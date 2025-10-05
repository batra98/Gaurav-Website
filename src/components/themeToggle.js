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
  transition: all 0.3s ease;
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

const ThemeMenu = styled.div`
  position: fixed;
  bottom: 95px;
  right: 30px;
  background: linear-gradient(135deg, ${colors.lightNavy}95 0%, ${colors.lightNavy}85 100%);
  backdrop-filter: blur(20px);
  border: 1px solid ${colors.lightestNavy}50;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 12px 40px ${colors.shadowNavy};
  z-index: 998;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateY(10px)')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transition: all 0.3s ease;
  min-width: 180px;
  
  @media (max-width: 768px) {
    bottom: 75px;
    right: 20px;
  }
`;

const ThemeOption = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: ${props => (props.isActive ? colors.lightNavy : 'transparent')};
  border: none;
  border-radius: 8px;
  color: ${props => (props.isActive ? colors.green : colors.lightSlate)};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-family: inherit;
  
  &:hover {
    background: ${colors.lightNavy};
    color: ${colors.green};
    transform: translateX(4px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ThemeIcon = styled.span`
  font-size: 18px;
  min-width: 20px;
`;

const LockIcon = styled.span`
  margin-left: auto;
  font-size: 14px;
  opacity: 0.5;
`;

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('preferredTheme') || 'dark';
      setCurrentTheme(savedTheme);
      
      const unlocked = localStorage.getItem('konamiUnlocked') === 'true' || 
                       localStorage.getItem('secretUnlocked') === 'true';
      setIsUnlocked(unlocked);
      
      // Listen for konami code unlock
      const handleKonami = () => {
        setIsUnlocked(true);
      };
      window.addEventListener('konamiActivated', handleKonami);
      
      return () => window.removeEventListener('konamiActivated', handleKonami);
    }
  }, []);

  const themes = [
    { id: 'dark', name: 'Dark', icon: '🌙', locked: false },
    { id: 'light', name: 'Light', icon: '☀️', locked: false },
    { id: 'corporate', name: 'Corporate', icon: '💼', locked: false },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🌃', locked: !isUnlocked },
  ];

  const handleThemeChange = (themeId) => {
    if (themeId === 'cyberpunk' && !isUnlocked) {
      console.log('%c🔒 Cyberpunk theme is locked!', 'color: #FF006E; font-size: 16px; font-weight: bold;');
      console.log('%cUnlock it by typing secret() or entering the Konami code!', 'color: #00FF41; font-size: 14px;');
      return;
    }
    
    setCurrentTheme(themeId);
    localStorage.setItem('preferredTheme', themeId);
    window.location.reload();
  };

  const getThemeIcon = () => {
    const themeIcons = {
      dark: '🌙',
      light: '☀️',
      corporate: '💼',
      cyberpunk: '🌃',
    };
    return themeIcons[currentTheme] || '🎨';
  };

  return (
    <>
      <ToggleButton
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle theme"
        title="Change theme (or press Ctrl+K)">
        {getThemeIcon()}
      </ToggleButton>
      
      <ThemeMenu isOpen={isMenuOpen}>
        {themes.map(themeOption => (
          <ThemeOption
            key={themeOption.id}
            isActive={currentTheme === themeOption.id}
            disabled={themeOption.locked}
            onClick={() => handleThemeChange(themeOption.id)}>
            <ThemeIcon>{themeOption.icon}</ThemeIcon>
            <span>{themeOption.name}</span>
            {themeOption.locked && <LockIcon>🔒</LockIcon>}
          </ThemeOption>
        ))}
      </ThemeMenu>
    </>
  );
};

export default ThemeToggle;