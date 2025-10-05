import { hex2rgba } from '@utils';

// Modern color palette with vibrant gradients
const ACCENT = '#00D9FF'; // Bright cyan
const ACCENT_SECONDARY = '#7C3AED'; // Purple
const DARK_BG = '#0A0E27';
const BG = '#0F1729';

const theme = {
  colors: {
    darkNavy: DARK_BG,
    navy: BG,
    lightNavy: '#1A1F3A',
    lightestNavy: '#2D3B5E',
    slate: '#94A3B8',
    lightSlate: '#C7D2E8',
    lightestSlate: '#E2E8F0',
    white: '#F8FAFC',
    green: ACCENT,
    purple: ACCENT_SECONDARY,
    transGreen: hex2rgba(ACCENT, 0.07),
    shadowNavy: hex2rgba(DARK_BG, 0.7),
    // Gradient colors for modern effects
    gradientStart: ACCENT,
    gradientEnd: ACCENT_SECONDARY,
    gradient: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_SECONDARY} 100%)`,
    gradientHover: `linear-gradient(135deg, ${ACCENT_SECONDARY} 0%, ${ACCENT} 100%)`,
  },

  fonts: {
    Calibre:
      'Calibre, San Francisco, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Roboto, Helvetica Neue, Segoe UI, Arial, sans-serif',
    SFMono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace',
  },

  fontSizes: {
    xs: '12px',
    smish: '13px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '22px',
    h3: '32px',
  },

  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

  borderRadius: '3px',
  navHeight: '100px',
  navScrollHeight: '70px',
  margin: '20px',

  tabHeight: 42,
  tabWidth: 120,
  radius: 3,

  hamburgerWidth: 30,
  hamBefore: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
  hamBeforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
  hamAfter: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
  hamAfterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,

  navDelay: 1000,
  loaderDelay: 2000,
};

export default theme;
