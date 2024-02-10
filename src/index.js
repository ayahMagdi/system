import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from './context/stateProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <StateProvider>
           <App />
          </StateProvider>
        </BrowserRouter>
  </React.StrictMode>
);

