import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes } from '@styles/themes';
import originalTheme from '@styles/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('preferredTheme');
      const konamiUnlocked = localStorage.getItem('konamiUnlocked') === 'true';
      const secretUnlocked = localStorage.getItem('secretUnlocked') === 'true';
      
      if (savedTheme && themes[savedTheme]) {
        // Only allow cyberpunk if unlocked
        if (savedTheme === 'cyberpunk' && !(konamiUnlocked || secretUnlocked)) {
          setCurrentTheme('dark');
        } else {
          setCurrentTheme(savedTheme);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('preferredTheme', themeName);
    }
  };

  const toggleTheme = () => {
    const themeOrder = ['dark', 'light', 'corporate'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    switchTheme(nextTheme);
  };

  // Merge theme colors with original theme structure
  const mergedTheme = {
    ...originalTheme,
    colors: themes[currentTheme].colors,
    currentThemeName: currentTheme,
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme, toggleTheme, isLoaded }}>
      <StyledThemeProvider theme={mergedTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};