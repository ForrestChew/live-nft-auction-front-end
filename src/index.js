import React from 'react';
import ReactDOM from 'react-dom';
import Store from './components/Store';
import { MoralisProvider } from 'react-moralis';
import App from './App';

const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APP_ID;

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <MoralisProvider serverUrl={serverUrl} appId={appId}>
        <App />
      </MoralisProvider>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
