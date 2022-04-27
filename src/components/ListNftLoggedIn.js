import { useState } from 'react';
import { ethers } from 'ethers';
import contractAddress from '../nft-auction-contract-info/contract-address';
import abi from '../nft-auction-contract-info/abi';
import '../styles/list-nft-container.css';

const ListNftLoggedIn = () => {
  const [listNftForm, setListNftForm] = useState({
    tokenFactoryAddr: '',
    tokenId: '',
    startingPrice: '',
    nftSeller: '',
  });

  // Calls the listNftForAuction function within smart contract when form is submitted.
  // Auction owner fee of 0.01 ETH will automatically be applied, and is reflected in MetaMask.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      let txOptions = {
        value: ethers.utils.parseEther('0.01'),
        gasLimit: 1000000,
      };
      await contractInstance.listNftForAuction(
        listNftForm.tokenFactoryAddr,
        listNftForm.tokenId,
        ethers.utils.parseEther(listNftForm.startingPrice),
        txOptions
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormInputChange = async (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftSeller = await signer.getAddress();
    setListNftForm({
      ...listNftForm,
      [inputName]: inputValue,
      nftSeller,
    });
  };
  const placeHolderInputAddr = '0x0000'.padEnd(20, '.');
  return (
    <>
      <div className='input-container'>
        <h1 style={{ textDecoration: 'underline' }}>List NFT</h1>
        <form onSubmit={handleSubmit} className='form'>
          <label>
            <p>NFT Contract Address:</p>
            <input
              className='input-box'
              type='text'
              name='tokenFactoryAddr'
              value={listNftForm.tokenFactoryAddr}
              onChange={handleFormInputChange}
              placeholder={placeHolderInputAddr}
              size='30'
              maxLength='42'
              minLength='42'
              required
            />
          </label>
          <label>
            <p>NFT ID</p>
            <input
              className='input-box'
              type='number'
              name='tokenId'
              value={listNftForm.tokenId}
              onChange={handleFormInputChange}
              placeholder='NFT ID'
              min='0'
              required
            />
          </label>
          <label>
            <p>Starting Price</p>
            <input
              className='input-box'
              type='number'
              name='startingPrice'
              value={listNftForm.startingPrice}
              onChange={handleFormInputChange}
              placeholder='0.00 ETH'
              step='.01'
              min='0'
              required
            />
          </label>
          <br></br>
          <div>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ListNftLoggedIn;
