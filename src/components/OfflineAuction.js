import '../styles/video-player-container.css';

const OfflineAuction = () => {
  return (
    <>
      <div className='video-player-container'>
        {/* There will be a video of the previous auction here */}
        <video autoPlay={true} width='100%' height='auto'></video>
        <p className='video-player-paragraph'>
          NFT Auction is currently offline
        </p>
      </div>
    </>
  );
};

export default OfflineAuction;
