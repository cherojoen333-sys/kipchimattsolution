import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept and swallow unhandled third-party or CORS-masked "Script error"s
window.onerror = function(message, source, lineno, colno, error) {
  const msg = typeof message === 'string' ? message : (message as any)?.message || '';
  const src = source || '';
  const isGoogleTranslate = src.includes('translate.google.com') || 
                            src.includes('translate.googleapis.com') || 
                            msg.toLowerCase().includes('translate');
  const isScriptError = msg === 'Script error.' || !src;
  
  if (isScriptError || isGoogleTranslate) {
    console.warn('Swallowed cross-origin script error:', msg, src);
    return true; // Prevents the firing of the default event handler and stops propagation
  }
  return false;
};

window.addEventListener('error', (event) => {
  const isScriptError = event.message === 'Script error.' || !event.filename;
  const isGoogleTranslate = event.filename?.includes('translate.google.com') || 
                            event.message?.toLowerCase().includes('translate') ||
                            event.error?.stack?.includes('translate');
  
  if (isScriptError || isGoogleTranslate) {
    console.warn('Swallowed third-party or CORS script error safely:', event.message, event.filename);
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const msg = reason?.message || '';
  if (msg.toLowerCase().includes('translate') || msg.includes('Script error.')) {
    console.warn('Swallowed unhandled rejection:', reason);
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
