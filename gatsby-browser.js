/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export const onServiceWorkerUpdateReady = () => window.location.reload();

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);