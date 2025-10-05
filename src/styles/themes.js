import { hex2rgba } from '@utils';

// Dark Theme (Default)
export const darkTheme = {
  name: 'dark',
  colors: {
    darkNavy: '#0A0E27',
    navy: '#0F1729',
    lightNavy: '#1A1F3A',
    lightestNavy: '#2D3B5E',
    slate: '#94A3B8',
    lightSlate: '#C7D2E8',
    lightestSlate: '#E2E8F0',
    white: '#F8FAFC',
    green: '#00D9FF',
    purple: '#7C3AED',
    transGreen: hex2rgba('#00D9FF', 0.07),
    shadowNavy: hex2rgba('#0A0E27', 0.7),
    gradientStart: '#00D9FF',
    gradientEnd: '#7C3AED',
    gradient: 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 100%)',
    gradientHover: 'linear-gradient(135deg, #7C3AED 0%, #00D9FF 100%)',
  },
};

// Light Theme
export const lightTheme = {
  name: 'light',
  colors: {
    darkNavy: '#F8FAFC',
    navy: '#FFFFFF',
    lightNavy: '#F1F5F9',
    lightestNavy: '#E2E8F0',
    slate: '#475569',
    lightSlate: '#334155',
    lightestSlate: '#0F172A',
    white: '#020617',
    green: '#0EA5E9',
    purple: '#8B5CF6',
    transGreen: hex2rgba('#0EA5E9', 0.10),
    shadowNavy: hex2rgba('#0F172A', 0.15),
    gradientStart: '#0EA5E9',
    gradientEnd: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
    gradientHover: 'linear-gradient(135deg, #8B5CF6 0%, #0EA5E9 100%)',
  },
};

// Cyberpunk Theme (Secret/Unlockable)
export const cyberpunkTheme = {
  name: 'cyberpunk',
  colors: {
    darkNavy: '#000000',
    navy: '#0A0A0A',
    lightNavy: '#1A1A1A',
    lightestNavy: '#2D2D2D',
    slate: '#00FF41',
    lightSlate: '#39FF14',
    lightestSlate: '#00FF00',
    white: '#FFFFFF',
    green: '#FF006E',
    purple: '#00FF41',
    transGreen: hex2rgba('#FF006E', 0.10),
    shadowNavy: hex2rgba('#000000', 0.9),
    gradientStart: '#FF006E',
    gradientEnd: '#00FF41',
    gradient: 'linear-gradient(135deg, #FF006E 0%, #00FF41 100%)',
    gradientHover: 'linear-gradient(135deg, #00FF41 0%, #FF006E 100%)',
  },
};

// Corporate Theme (Professional/Conservative)
export const corporateTheme = {
  name: 'corporate',
  colors: {
    darkNavy: '#1E293B',
    navy: '#0F172A',
    lightNavy: '#334155',
    lightestNavy: '#475569',
    slate: '#94A3B8',
    lightSlate: '#CBD5E1',
    lightestSlate: '#F1F5F9',
    white: '#FFFFFF',
    green: '#3B82F6',
    purple: '#6366F1',
    transGreen: hex2rgba('#3B82F6', 0.10),
    shadowNavy: hex2rgba('#0F172A', 0.7),
    gradientStart: '#3B82F6',
    gradientEnd: '#6366F1',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
    gradientHover: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)',
  },
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  cyberpunk: cyberpunkTheme,
  corporate: corporateTheme,
};

export default darkTheme;