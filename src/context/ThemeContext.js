import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes } from '../styles/themes';
import baseTheme from '../styles/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('siteTheme');
      if (savedTheme && themes[savedTheme]) {
        setCurrentThemeName(savedTheme);
      }
      setMounted(true);
    }
  }, []);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentThemeName(themeName);
      if (typeof window !== 'undefined') {
        localStorage.setItem('siteTheme', themeName);
      }
    }
  };

  // Merge selected theme colors with base theme
  const currentTheme = {
    ...baseTheme,
    colors: themes[currentThemeName].colors,
    themeName: currentThemeName,
  };

  return (
    <ThemeContext.Provider value={{ currentThemeName, switchTheme, mounted }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};