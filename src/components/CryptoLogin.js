import { ethers } from 'ethers';
import { useContext } from 'react';
import { Context } from './Store';
import { getAuthState } from './Store';
import '../styles/list-nft-container.css';

const CryptoLogin = () => {
  // eslint-disable-next-line
  const [isAucthenticated, setIsAuthenticated] = useContext(Context);

  // Opens Metamask in browser
  const login = async () => {
    // Disables button after clicked once
    document.getElementById('login-btn').disabled = true;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    setIsAuthenticated(getAuthState());
  };

  return (
    <>
      <div className='login-btn-container'>
        <button className='login-btn' id='login-btn' onClick={() => login()}>
          Login
        </button>
      </div>
    </>
  );
};

export default CryptoLogin;
