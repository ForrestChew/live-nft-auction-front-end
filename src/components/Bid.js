import { useEffect, useState, useRef } from 'react';
import { ethers } from 'ethers';
import {
  useMoralisQuery,
  useMoralisSubscription,
  useMoralis,
} from 'react-moralis';
import abi from '../nft-auction-contract-info/abi';
import contractAddress from '../nft-auction-contract-info/contract-address';

const Bid = () => {
  const [activeNftSeller, setActiveNftSeller] = useState('');
  const [activeNftFactoryAddress, setActiveNftFactoryAddress] = useState('');
  const [activeNftPriceTokenId, setActiveNftTokenId] = useState(0);
  const [activeNftPrice, setActiveNftPrice] = useState(0);
  const [activeNftHighestBidder, setActiveNftHighestBidder] = useState('');
  const [bidAmount, setBidAmount] = useState(0);

  const hasFetchedData = useRef(false);

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

  // Emitted on NFT sale.
  useMoralisSubscription(
    'NftSale',
    (query) => query.ascending('createdAt').limit(1),
    [],
    {
      live: true,
      onCreate: () => {
        destroyOldAuctionNft();
      },
    }
  );

  const { Moralis } = useMoralis();
  const destroyOldAuctionNft = async () => {
    const ActiveNft = Moralis.Object.extend('NftForAuction');
    const query = new Moralis.Query(ActiveNft);
    const activeNftQuery = await query.find();
    const nftToDestroy = activeNftQuery[0];
    await nftToDestroy.destroy().then(() => {
      setAuctionNft();
    });
  };

  // Emitted on New bid placed on NFT
  useMoralisSubscription(
    'NewBids',
    (query) => query.descending('createdAt').limit(1),
    [],
    {
      live: true,
      onCreate: (data) => {
        // Destructres new bid object to update NFT info with
        const { bidAmount, bidder } = data.attributes;
        hasFetchedData.current = false;
        updateBidderAndPrice(bidAmount, bidder);
      },
    }
  );

  // Called upon Newbid event
  const updateBidderAndPrice = async (newPrice, highestBidder) => {
    const newPriceFromWei = ethers.utils.formatEther(newPrice);
    // Updates Auction NFT price and it's highest bidder in order to server new clients
    const ActiveNft = Moralis.Object.extend('NftForAuction');
    const query = new Moralis.Query(ActiveNft);
    const activeNftQuery = await query.find();
    const nftToUpdate = activeNftQuery[0];
    nftToUpdate.set('price', newPrice);
    nftToUpdate.set('highestBidder', highestBidder);
    nftToUpdate.save().then(() => {
      setActiveNftPrice(newPriceFromWei);
      setActiveNftHighestBidder(highestBidder);
    });
  };

  const { fetch } = useMoralisQuery(
    'NftForAuction',
    (query) => query.ascending('createdAt').limit(1),
    []
  );

  const setAuctionNft = async () => {
    await fetch().then((nft) => {
      const { seller, tokenFactoryAddr, tokenId, price, highestBidder } =
        nft[0].attributes;
      const formattedPrice = ethers.utils.formatEther(price);
      setActiveNftSeller(seller);
      setActiveNftFactoryAddress(tokenFactoryAddr);
      setActiveNftTokenId(tokenId);
      setActiveNftPrice(formattedPrice);
      setActiveNftHighestBidder(highestBidder);
    });
  };
  // Sets initial auction NFT info
  useEffect(() => {
    if (!hasFetchedData.current) {
      setAuctionNft();
      hasFetchedData.current = true;
    }
  }, []);

  return (
    <>
      <div
        className='input-container'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <form className='form' onSubmit={handleSubmit}>
          <label>
            <p style={{ textDecoration: 'underline' }}>Place Bid</p>
            <input
              className='input-box'
              type='number'
              value={bidAmount}
              onChange={handleFormInputChange}
              placeholder={`${activeNftPrice} ETH`}
              step='.01'
              min={activeNftPrice}
              required
            />
          </label>
          <br></br>
          <div>
            <button
              className='btn'
              style={{
                marginBottom: '2rem',
                padding: '.5rem 1rem .5rem 1rem',
              }}
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
                <th width='30%'>Current Price:</th>
                <th>{`${activeNftPrice} ETH`}</th>
              </tr>
              <tr>
                <th>Token ID</th>
                <th>{activeNftPriceTokenId}</th>
              </tr>
              <tr>
                <th>NFT Factory address</th>
                <th>{activeNftFactoryAddress}</th>
              </tr>
              <tr>
                <th>NFT Seller</th>
                <th>{activeNftSeller}</th>
              </tr>
              <tr>
                <th>Highest Bidder</th>
                <th>
                  {activeNftHighestBidder === '0x'.padEnd(42, '0')
                    ? 'No bids yet'
                    : activeNftHighestBidder}
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>
  );
};

export default Bid;
