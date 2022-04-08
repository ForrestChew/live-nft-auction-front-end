import { useState } from 'react';
import { ethers } from 'ethers';
import contractAddress from '../nft-auction-contract-info/contract-address';
import abi from '../nft-auction-contract-info/abi';

const ListNftLoggedIn = () => {
  // Calls the listNftForAuction function within smart contract on form submission.
  // Auction owner fee will automatically be applied, and is reflected in MetaMask.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, abi, signer);
    let txOptions = {
      value: ethers.utils.parseEther('0.01'),
      gasLimit: 325000,
    };
    const txResponse = await contractInstance.listNftForAuction(
      listNftForm.tokenFactoryAddr,
      listNftForm.tokenId,
      ethers.utils.parseEther(listNftForm.startingPrice),
      txOptions
    );
    const txReceipt = await txResponse.wait();
    console.log(txReceipt);
  };

  const [listNftForm, setListNftForm] = useState({
    tokenFactoryAddr: '',
    tokenId: '',
    startingPrice: '',
  });

  const handleFormInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setListNftForm({ ...listNftForm, [inputName]: inputValue });
  };

  return (
    <>
      <div className='z-0 flex flex-col justify-center items-center'>
        <h1 className='text-4xl mt-10 text-center underline'>List NFT</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label className='block text-center mt-12'>
              <p className='text-2xl'>NFT Contract Address:</p>
              <input
                className='text-black text-lg mt-2 border-2 rounded-md'
                type='text'
                name='tokenFactoryAddr'
                value={listNftForm.tokenFactoryAddr}
                onChange={handleFormInputChange}
                size='30'
                maxLength='42'
                minLength='42'
                required
              />
            </label>
            <label className='block text-center mt-12'>
              <p className='text-2xl'>NFT ID</p>
              <input
                className='text-black text-lg w-full mt-2 border-2 rounded-md placeholder:text-sm'
                type='number'
                name='tokenId'
                value={listNftForm.tokenId}
                onChange={handleFormInputChange}
                required
              />
            </label>
            <label className='block text-center mt-12'>
              <p className='text-2xl'>Starting Price</p>
              <input
                className='text-black text-lg w-full mt-2 border-2 rounded-md placeholder:text-sm'
                type='number'
                name='startingPrice'
                value={listNftForm.startingPrice}
                onChange={handleFormInputChange}
                required
              />
            </label>
            <br></br>
            <div className='text-center mt-12'>
              <button
                className='border-2 rounded-lg mb-10 py-2 px-6 bg-red-500 border-red-500 '
                type='submit'
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

export default ListNftLoggedIn;
