// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Find the root element in your HTML file
const container = document.getElementById('root');

// Create a root using createRoot
const root = ReactDOM.createRoot(container);

// Render your App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
