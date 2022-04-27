import { useState, useEffect } from 'react';
import {
  useMoralisQuery,
  useMoralisSubscription,
  useMoralis,
} from 'react-moralis';
import LiveAuction from './components/LiveAuction';
import OfflineAuction from './components/OfflineAuction';
import LoggedInComp from './components/LoggedInComp';
import BidStatus from './components/BidStatus';
import './styles/main.css';

const App = () => {
  const [isAuctionActive, setIsAuctionActive] = useState(false);

  const { Moralis } = useMoralis();

  //   Creates a blank slate in DB in preparation for the next auction.
  const deleteAuctionStatusRows = async () => {
    // Removes all "AuctionStatus" rows
    const AuctionStatus = Moralis.Object.extend('AuctionStatus');
    const auctionStatusQuery = new Moralis.Query(AuctionStatus);
    const auctionStatus = await auctionStatusQuery.find();
    auctionStatus.forEach((row) => {
      row.destroy();
    });
  };

  // Removes all "NewBids" rows
  const deleteNewBidsRows = async () => {
    const NewBids = Moralis.Object.extend('NewBids');
    const newBidsQuery = new Moralis.Query(NewBids);
    const newBids = await newBidsQuery.find();
    newBids.forEach((row) => {
      row.destroy();
    });
  };

  // Removes all "NftForAuction" rows
  const deleteNftForAuctionRows = async () => {
    const NftForAuction = Moralis.Object.extend('NftForAuction');
    const nftForAuctionQuery = new Moralis.Query(NftForAuction);
    const nftForAuction = await nftForAuctionQuery.find();
    nftForAuction.forEach((row) => {
      row.destroy();
    });
  };

  // Removes all "NftSale" rows
  const deleteNftSaleRows = async () => {
    const NftSale = Moralis.Object.extend('NftSale');
    const nftSaleQuery = new Moralis.Query(NftSale);
    const nftSale = await nftSaleQuery.find();
    nftSale.forEach((row) => {
      row.destroy();
    });
  };

  // Listens for when a new auction state table is created in DB.
  // That table will ultimatly have been created when the AuctionStarted
  // event is emitted from the auction smart contract
  useMoralisSubscription(
    'AuctionStatus',
    (query) => query.descending('createdAt').limit(1),
    [],
    {
      live: true,
      onCreate: (data) => {
        const auctionState = data.attributes.started;
        setIsAuctionActive(auctionState);
        if (!auctionState) {
          deleteAuctionStatusRows();
          deleteNewBidsRows();
          deleteNftForAuctionRows();
          deleteNftSaleRows();
        }
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
