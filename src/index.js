import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './themes/ThemeProvider';
import theme from './themes/theme';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
