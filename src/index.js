import React from 'react';
import ReactDOM from 'react-dom';
import Store from './components/Store';
import { MoralisProvider } from 'react-moralis';
import App from './App';

const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_ID;

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <Store>
        <App />
      </Store>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
