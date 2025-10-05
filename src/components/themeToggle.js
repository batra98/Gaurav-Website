import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themeList } from '../styles/themes';

const Container = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const ToggleButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradient};
  border: 2px solid ${props => props.theme.colors.lightestNavy}50;
  box-shadow: 0 8px 24px ${props => props.theme.colors.shadowNavy};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 24px;
  
  &:hover {
    transform: scale(1.1) rotate(15deg);
    box-shadow: 0 12px 32px ${props => props.theme.colors.green}40;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
`;

const ThemeMenu = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;
  background: ${props => `linear-gradient(135deg, ${props.theme.colors.lightNavy}98 0%, ${props.theme.colors.navy}95 100%)`};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.green}30;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 12px 40px ${props => props.theme.colors.shadowNavy};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transform: ${props => (props.isOpen ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  min-width: 200px;
  
  @media (max-width: 768px) {
    bottom: 60px;
  }
`;

const ThemeOption = styled.button`
  width: 100%;
  padding: 14px 16px;
  background: ${props => (props.isActive ? props.theme.colors.lightNavy : 'transparent')};
  border: 1px solid ${props => (props.isActive ? `${props.theme.colors.green}40` : 'transparent')};
  border-radius: 8px;
  color: ${props => (props.isActive ? props.theme.colors.green : props.theme.colors.lightSlate)};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-family: ${props => props.theme.fonts.Calibre};
  margin: 4px 0;
  
  &:hover {
    background: ${props => props.theme.colors.lightNavy};
    border-color: ${props => `${props.theme.colors.green}40`};
    color: ${props => props.theme.colors.green};
    transform: translateX(4px);
  }
`;

const ThemeIcon = styled.span`
  font-size: 20px;
  min-width: 24px;
  line-height: 1;
`;

const ThemeInfo = styled.div`
  flex: 1;
`;

const ThemeName = styled.div`
  font-weight: 500;
  margin-bottom: 2px;
`;

const ThemeDescription = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.slate};
  font-family: ${props => props.theme.fonts.SFMono};
`;

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('siteTheme') || 'dark';
      setCurrentTheme(savedTheme);
      
      // Apply theme immediately
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeName) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeName);
    }
  };

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('siteTheme', themeName);
    applyTheme(themeName);
    setIsMenuOpen(false);
    
    // Reload to apply theme globally
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const getCurrentThemeIcon = () => {
    const theme = themeList.find(t => t.id === currentTheme);
    return theme ? theme.icon : '🎨';
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('[data-theme-toggle]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <Container data-theme-toggle>
      <ToggleButton
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Change theme"
        title="Change theme">
        {getCurrentThemeIcon()}
      </ToggleButton>
      
      <ThemeMenu isOpen={isMenuOpen}>
        {themeList.map(themeOption => (
          <ThemeOption
            key={themeOption.id}
            isActive={currentTheme === themeOption.id}
            onClick={() => handleThemeChange(themeOption.id)}>
            <ThemeIcon>{themeOption.icon}</ThemeIcon>
            <ThemeInfo>
              <ThemeName>{themeOption.name}</ThemeName>
              <ThemeDescription>{themeOption.description}</ThemeDescription>
            </ThemeInfo>
          </ThemeOption>
        ))}
      </ThemeMenu>
    </Container>
  );
};

export default ThemeToggle;