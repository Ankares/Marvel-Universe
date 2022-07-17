import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';

// https://developer.marvel.com - API
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
       <App/> 
  );

