import ReactHlsPlayer from '@panelist/react-hls-player';

const LiveAuction = () => {
  return (
    <>
      <div className='basis-10/12 border-2 bg-stone-700 ml-10 mt-10 mb-auto mr-12'>
        <ReactHlsPlayer
          //   src='http://192.168.0.18:8080/hls/stream.m3u8'
          autoPlay={false}
          controls={true}
          width='100%'
          height='auto'
        />
        <p className='text-white text-4xl ml-20 mt-5 pb-5 self-end underline'>
          Live NFT Auction
        </p>
      </div>
    </>
  );
};

export default LiveAuction;
