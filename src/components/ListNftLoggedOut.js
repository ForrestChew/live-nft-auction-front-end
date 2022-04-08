import CryptoLogin from './CryptoLogin';

const ListNftLoggedOut = () => {
  return (
    <>
      <div className='z-0 flex flex-col justify-center items-center'>
        <h1 className='text-4xl mt-10 text-center underline blur-lg select-none'>
          List NFT
        </h1>
        <div>
          <CryptoLogin />
          <form className='blur-lg select-none'>
            <label className='block text-center mt-12'>
              <p className='text-2xl'>NFT Contract Address:</p>
              <input
                className='text-black text-lg mt-2 border-2 rounded-md'
                size='30'
                disabled
              />
            </label>
            <label className='block text-center mt-12'>
              <p className='text-2xl'>NFT ID</p>
              <input
                className='text-black text-lg mt-2 border-2 rounded-md placeholder:text-sm'
                size='30'
                disabled
              />
            </label>
            <label className='block text-center mt-12'>
              <p className='text-2xl'>Starting Price:</p>
              <input
                className='text-black text-lg mt-2 border-2 rounded-md placeholder:text-sm'
                size='30'
                disabled
              />
            </label>
            <br></br>
            <div className='text-center mt-12'>
              <button className='border-2 rounded-lg mb-10 py-2 px-6' disabled>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ListNftLoggedOut;
