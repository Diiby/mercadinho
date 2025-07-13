import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { CssBaseline, ThemeProvider } from '@mui/material'; 
import theme from './theme'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ajuda a normalizar os estilos em diferentes navegadores */}
      <CartProvider>
          <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);