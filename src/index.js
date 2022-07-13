import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import UserProvider from "./UserProvider";
import AuctionProvider from "./AuctionProvider";
import App from "./App";

const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APP_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <BrowserRouter>
        <AuctionProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AuctionProvider>
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>
);
