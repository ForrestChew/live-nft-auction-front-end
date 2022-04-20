import CryptoLogin from './CryptoLogin';
import '../styles/list-nft-container.css';

const ListNftLoggedOut = () => {
  return (
    <>
      <div className='input-container' style={{ filter: 'blur(0)' }}>
        <h1 style={{ filter: 'blur(.75rem)' }}>List NFT</h1>
        <CryptoLogin />
        <div>
          <form className='form' style={{ filter: 'blur(.75rem)' }}>
            <label>
              <p>NFT Contract Address:</p>
              <input className='input-box' size='30' disabled />
            </label>
            <label>
              <p>NFT ID</p>
              <input className='input-box' size='30' disabled />
            </label>
            <label className='block text-center mt-12'>
              <p className='text-2xl'>Starting Price:</p>
              <input className='input-box' size='30' disabled />
            </label>
            <br></br>
            <div>
              <button
                style={{ backgroundColor: 'grey' }}
                className='btn'
                disabled
              >
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
