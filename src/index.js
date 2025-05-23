import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import './Frontend/Style/index.css';
import './Frontend/Style/Font.css'
import App from './App.js';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
