import { useState, useEffect } from 'react';
import { useMoralisQuery, useMoralisSubscription } from 'react-moralis';
import LiveAuction from './components/LiveAuction';
import OfflineAuction from './components/OfflineAuction';
import LoggedInComp from './components/LoggedInComp';
import BidStatus from './components/BidStatus';
import './styles/main.css';

const App = () => {
  const [isAuctionActive, setIsAuctionActive] = useState(false);

  // Listens for when a new auction state table is created in DB.
  // That table will ultimatly have been created when the AuctionStarted
  // event is emitted from the blockchain
  useMoralisSubscription(
    'AuctionStatus',
    (query) => query.descending('createdAt').limit(1),
    [],
    {
      live: true,
      onCreate: (data) => {
        const auctionState = data.attributes.started;
        setIsAuctionActive(auctionState);
      },
    }
  );

  // Fetches latest auction state for when app is initialized
  const { fetch } = useMoralisQuery(
    'AuctionStatus',
    (query) => query.descending('createdAt').limit(1),
    []
  );

  useEffect(() => {
    const getAuctionStatus = async () => {
      const results = await fetch();
      try {
        const auctionState = results[0].attributes.started;
        setIsAuctionActive(auctionState);
      } catch (error) {
        console.log(error);
      }
    };
    getAuctionStatus();
  }, [fetch]);

  return (
    <>
      <div className='main-container'>
        {isAuctionActive ? <LiveAuction /> : <OfflineAuction />}
        {isAuctionActive ? <BidStatus /> : <LoggedInComp />}
      </div>
    </>
  );
};

export default App;
