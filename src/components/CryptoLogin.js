import { ethers } from 'ethers';
import { useContext } from 'react';
import { Context } from './Store';
import { getAuthState } from './Store';

const CryptoLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(Context);

  // Opens Metamask in browser
  const login = async () => {
    // Disables button after clicked once
    document.getElementById('login-btn').disabled = true;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    setIsAuthenticated(getAuthState());
    console.log('Log in button: ', await signer.getAddress());
  };

  return (
    <>
      <div>
        <button
          id='login-btn'
          className='z-10 absolute border-2 border-dotted rounded-md m-24 my-44 
            px-12 py-4 hover:border-solid hover:scale-110 hover:bg-red-800 
            bg-red-700 active:bg-black'
          onClick={() => login()}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default CryptoLogin;
