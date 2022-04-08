import { Routes, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import ListNftLoggedIn from './ListNftLoggedIn';
import Chat from './Chat';
import Bid from './Bid';

const ChatBidSideBox = () => {
  return (
    <div className='text-4xl border-2 basis-6/12 mr-20 mt-10 h-4/5'>
      <NavigationBar />
      <Routes>
        <Route path='/bid' element={<Bid />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/list-nft' element={<ListNftLoggedIn />} />
      </Routes>
    </div>
  );
};

export default ChatBidSideBox;
