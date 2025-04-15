import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './theme';

const ThemeProvider = ({ children }) => (
  <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
);

export default ThemeProvider;
