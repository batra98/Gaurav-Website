/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

// Prevent flash of unstyled content
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      key="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var savedTheme = localStorage.getItem('siteTheme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
          })();
        `,
      }}
    />,
  ]);
};