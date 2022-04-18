import { useState } from 'react';
import { ethers } from 'ethers';
import abi from '../nft-auction-contract-info/abi';
import contractAddress from '../nft-auction-contract-info/contract-address';

const Bid = () => {
  const [bidAmount, setBidAmount] = useState('0');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, abi, signer);
    let txOptions = {
      value: ethers.utils.parseEther(bidAmount),
      gasLimit: 325000,
    };
    await contractInstance.placeBid(txOptions);
  };

  const handleFormInputChange = (e) => {
    const inputValue = e.target.value;
    setBidAmount(inputValue);
  };
  return (
    <>
      <div
        className='input-container'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <form className='form' onSubmit={handleSubmit}>
          <label>
            <p>Place Bid</p>
            <input
              className='input-box'
              type='number'
              value={bidAmount}
              onChange={handleFormInputChange}
              placeholder='0.00 ETH'
              step='.01'
              min='0'
              required
            />
          </label>
          <br></br>
          <div>
            <button
              className='btn'
              style={{ marginBottom: '2.75rem' }}
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
        <div className='table-container'>
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

export default Bid;
