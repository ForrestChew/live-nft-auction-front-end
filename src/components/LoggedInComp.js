import { useContext } from 'react';
import { Context } from './Store';
import ListNftLoggedIn from './ListNftLoggedIn';
import ListNftLoggedOut from './ListNftLoggedOut';

const LoggedInComp = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(Context);

  return (
    <>
      <div>
        {isAuthenticated && <ListNftLoggedIn />}
        {!isAuthenticated && <ListNftLoggedOut />}
      </div>
    </>
  );
};

export default LoggedInComp;
