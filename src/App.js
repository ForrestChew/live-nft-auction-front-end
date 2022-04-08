import { useState } from 'react';
import Store from './components/Store';
import LiveAuction from './components/LiveAuction';
import ChatBidSideBox from './components/ChatBidSideBox';
import LoggedInComp from './components/LoggedInComp';

function App() {
  const [isAuctionActive, setIsAuctionActive] = useState(false);

  return (
    <>
      <div className='flex'>
        <Store>
          <LiveAuction />
          {isAuctionActive ? <ChatBidSideBox /> : <LoggedInComp />}
        </Store>
      </div>
    </>
  );
}

export default App;
