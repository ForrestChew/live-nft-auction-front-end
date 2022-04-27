import CryptoLogin from './CryptoLogin';

const BidLoggedOut = () => {
  const parentContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    filter: 'blur(0)',
  };

  return (
    <>
      <div className='input-container' style={parentContainerStyles}>
        <h1 unselectable='on' style={{ filter: 'blur(.75rem)' }}>
          Place Bid
        </h1>
        <div style={{ marginTop: '.5rem' }}>
          <CryptoLogin />
        </div>
        <form className='form' style={{ filter: 'blur(.75rem)' }}>
          <label>
            <input className='input-box' placeholder='0.00 ETH' disabled />
          </label>
          <br></br>
          <div>
            <button
              className='btn'
              style={{
                marginBottom: '2.75rem',
                cursor: 'auto',
                backgroundColor: 'grey',
              }}
              disabled
            >
              Submit
            </button>
          </div>
        </form>
        <div className='table-container' style={{ filter: 'blur(.75rem)' }}>
          <table className='table'>
            <thead>
              <tr>
                <th width='30%'>Current Bid:</th>
                <th>{'0 ETH'}</th>
              </tr>
              <tr>
                <th>Highest Bidder</th>
                <th>{'0x'.padEnd(42, '0')}</th>
              </tr>
              <tr>
                <th>NFT Factory address</th>
                <th>{'0x'.padEnd(42, '0')}</th>
              </tr>
              <tr>
                <th>NFT Seller</th>
                <th>{'0x'.padEnd(42, '0')}</th>
              </tr>
              <tr>
                <th>To Be Decided</th>
                <th>{'Some random info'}</th>
              </tr>
              <tr>
                <th>To Be Decided</th>
                <th>{'Some random info'}</th>
              </tr>
              <tr>
                <th>To Be Decided</th>
                <th>{'Some random info'}</th>
              </tr>
              <tr>
                <th>To Be Decided</th>
                <th>{'Some random info'}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>
  );
};

export default BidLoggedOut;
