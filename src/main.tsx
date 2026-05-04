import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global styles and fonts
import './index.css';                  // Tailwind directives + custom styles
import 'aos/dist/aos.css';             // AOS animations CSS
import '@fontsource/inter/index.css'; // Inter font CSS

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
