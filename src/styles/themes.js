import { hex2rgba } from '@utils';

// Dark Theme (Default - Current)
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
    darkNavy: '#FFFFFF',
    navy: '#F8FAFC',
    lightNavy: '#F1F5F9',
    lightestNavy: '#CBD5E1',
    slate: '#64748B',
    lightSlate: '#475569',
    lightestSlate: '#1E293B',
    white: '#0F172A',
    green: '#0EA5E9',
    purple: '#8B5CF6',
    transGreen: hex2rgba('#0EA5E9', 0.10),
    shadowNavy: hex2rgba('#1E293B', 0.15),
    gradientStart: '#0EA5E9',
    gradientEnd: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
    gradientHover: 'linear-gradient(135deg, #8B5CF6 0%, #0EA5E9 100%)',
  },
};

// Corporate Theme (Professional Blue)
export const corporateTheme = {
  name: 'corporate',
  colors: {
    darkNavy: '#0F172A',
    navy: '#1E293B',
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

// Cyberpunk Theme (Matrix/Neon)
export const cyberpunkTheme = {
  name: 'cyberpunk',
  colors: {
    darkNavy: '#000000',
    navy: '#0D0D0D',
    lightNavy: '#1A1A1A',
    lightestNavy: '#2D2D2D',
    slate: '#00FF41',
    lightSlate: '#39FF14',
    lightestSlate: '#00FF00',
    white: '#FFFFFF',
    green: '#FF006E',
    purple: '#00FFFF',
    transGreen: hex2rgba('#FF006E', 0.15),
    shadowNavy: hex2rgba('#000000', 0.9),
    gradientStart: '#FF006E',
    gradientEnd: '#00FFFF',
    gradient: 'linear-gradient(135deg, #FF006E 0%, #00FFFF 100%)',
    gradientHover: 'linear-gradient(135deg, #00FFFF 0%, #FF006E 100%)',
  },
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  corporate: corporateTheme,
  cyberpunk: cyberpunkTheme,
};

export const themeList = [
  { id: 'dark', name: 'Dark', icon: '🌙', description: 'Default theme' },
  { id: 'light', name: 'Light', icon: '☀️', description: 'Light mode' },
  { id: 'corporate', name: 'Corporate', icon: '💼', description: 'Professional blue' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '🌃', description: 'Matrix vibes' },
];

export default darkTheme;