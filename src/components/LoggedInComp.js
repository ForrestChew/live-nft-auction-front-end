import { useContext, useEffect } from 'react';
import { Context, getAuthState } from './Store';
import { ethers } from 'ethers';
import ListNftLoggedIn from './ListNftLoggedIn';
import ListNftLoggedOut from './ListNftLoggedOut';

const LoggedInComp = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(Context);

  return (
    <>
      <div className='flex border-2 basis-6/12 justify-center h-max-content mr-20 mt-10 bg-stone-700 text-white'>
        {isAuthenticated && <ListNftLoggedIn />}
        {!isAuthenticated && <ListNftLoggedOut />}
      </div>
    </>
  );
};

export default LoggedInComp;
