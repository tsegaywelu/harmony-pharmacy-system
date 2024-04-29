import React from 'react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import store from "./redux/store";

// Import createRoot from "react-dom/client"
import { createRoot } from 'react-dom/client';

// Use createRoot from react-dom/client
const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            '@colorPrimary': '#72119B',
            '@colorPrimaryHover': '#72119B',
            '@borderRadius': '2px',
            '@boxShadow': 'none',
          },
        },
        token: {
          '@borderRadius': "2px",
          '@colorPrimary': "#72119B",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
reportWebVitals();
