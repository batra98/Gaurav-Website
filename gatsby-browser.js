/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export const onServiceWorkerUpdateReady = () => window.location.reload();