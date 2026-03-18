import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { keyframesCSS, baseCSS } from './theme';

/* Global reset + animations + mobile polish for this sub-app */
const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { overflow-x: hidden; }
  button { font-family: inherit; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(179, 117, 160, 0.3); border-radius: 3px; }
  ${baseCSS}
  ${keyframesCSS}
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
