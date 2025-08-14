import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createContext } from 'react';

// Create OrderContext
export const OrderContext = createContext();

document.documentElement.setAttribute('data-bs-theme', 'light');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);