import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { Provider } from './components/ui/provider';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
  </Provider>
);