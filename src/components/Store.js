import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const Context = React.createContext();

// Gets the authentication status - true or false
export const getAuthState = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  try {
    const signerAddress = await signer.getAddress();
    return { authed: true, userAddress: signerAddress };
  } catch (error) {
    return false;
  }
};

// Creates global conexts for if a user is authenticated
const Store = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthState());

  // Detects if there is a change in accounts or if user locks wallet
  window.ethereum.on('accountsChanged', async (accounts) => {
    if (!accounts.length) {
      setIsAuthenticated(await getAuthState());
    }
  });

  // Sets user authentication on render
  useEffect(() => {
    const initailStateResponse = async () => {
      setIsAuthenticated(await getAuthState());
    };
    initailStateResponse();
  }, []);

  return (
    <>
      <Context.Provider value={[isAuthenticated, setIsAuthenticated]}>
        {children}
      </Context.Provider>
    </>
  );
};

export default Store;
