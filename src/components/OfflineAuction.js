const OfflineAuction = () => {
  return (
    <>
      <div className='basis-10/12 border-2 bg-stone-700 ml-10 mt-10 mb-auto mr-12'>
        {/* There will be a video of the previous auction here */}
        <video autoPlay={true} width='100%' height='auto'></video>
        <p className='text-white text-4xl ml-20 mt-5 pb-5 self-end underline'>
          NFT Auction is currently offline
        </p>
      </div>
    </>
  );
};

export default OfflineAuction;
