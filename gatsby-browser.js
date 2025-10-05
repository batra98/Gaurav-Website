/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { initEasterEggs } from './src/utils/easterEggs';

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export const onServiceWorkerUpdateReady = () => window.location.reload();

// Initialize easter eggs when the app loads
export const onClientEntry = () => {
  // Wait for window to be fully loaded
  window.addEventListener('load', () => {
    initEasterEggs();
  });
};