import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/reset.css';
import './styles/variables.css';

import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
