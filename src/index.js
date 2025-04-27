import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './themes/ThemeProvider';
import theme from './themes/theme';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';


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

// Registra o Service Worker para o PWA
serviceWorkerRegistration.register();