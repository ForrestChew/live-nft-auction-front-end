import { useContext } from 'react';
import { Context } from './Store';
import Bid from './Bid';
import BidLoggedOut from './BidLoggedOut';

const BidStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(Context);

  return (
    <div>
      {isAuthenticated && <Bid />}
      {!isAuthenticated && <BidLoggedOut />}
    </div>
  );
};

export default BidStatus;
