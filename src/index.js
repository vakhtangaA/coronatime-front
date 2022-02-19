import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<>loading..</>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
