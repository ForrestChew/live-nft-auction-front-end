import ReactHlsPlayer from '@panelist/react-hls-player';
import '../styles/video-player-container.css';

const LiveAuction = () => {
  return (
    <>
      <div className='video-player-container'>
        <ReactHlsPlayer
          //   src='http://192.168.0.18:8080/hls/stream.m3u8'
          autoPlay={false}
          controls={true}
          width='100%'
          height='auto'
        />
        <p className='video-player-paragraph'>Live NFT Auction</p>
      </div>
    </>
  );
};

export default LiveAuction;
