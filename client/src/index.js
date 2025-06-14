import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { Provider } from './components/ui/provider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);