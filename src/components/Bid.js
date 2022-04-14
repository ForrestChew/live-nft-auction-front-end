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
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
          <label className='block text-center mt-6'>
            <p className='text-2xl mt-10'>Place Bid</p>
            <input
              className='text-black text-lg w-full mt-6 border-2 rounded-md'
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
          <div className='text-center'>
            <button
              className='border-2 rounded-lg mb-10 py-1 px-4 bg-red-500 border-red-500 '
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Bid;
