import { useEffect, useState } from 'react';
import Store from './components/Store';
import LiveAuction from './components/LiveAuction';
import OfflineAuction from './components/OfflineAuction';
import ChatBidSideBox from './components/ChatBidSideBox';
import LoggedInComp from './components/LoggedInComp';
import { ethers } from 'ethers';
import contractAddress from './nft-auction-contract-info/contract-address';
import abi from './nft-auction-contract-info/abi';

function App() {
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {
    // Listens for AuctionStatus event to be emitted. The boolean status will
    // determine which components to display.
    contractInstance.on('AuctionStatus', (status) => {
      console.log(status);
      setIsAuctionActive(status);
    });
    return () => contractInstance.off('AuctionStatus');
  }, []);

  return (
    <>
      <div className='flex'>
        <Store>
          {isAuctionActive ? <LiveAuction /> : <OfflineAuction />}
          {isAuctionActive ? <ChatBidSideBox /> : <LoggedInComp />}
        </Store>
      </div>
    </>
  );
}

export default App;
