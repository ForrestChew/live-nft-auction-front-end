import { useState, useEffect, useContext } from "react";
import { useMoralisQuery } from "react-moralis";
import ReactLoading from "react-loading";
import { useContractInteractions } from "../../../hooks/useContractInteractions";
import { UserContext } from "../../../UserProvider";
import "./contents.css";

const Bid = () => {
  const [bid, setBid] = useState(0);

  const [activeNft, setActiveNft] = useState({
    nftFactoryAddr: "",
    bidAmount: 0,
    nftId: "",
    highestBidderAddr: "",
    nftSeller: "",
  });

  const [authedUser] = useContext(UserContext);

  // Gets info on the NFT listing that was listed first to the auction smart contract.
  const { data, fetch, isLoading } = useMoralisQuery(
    "listedNfts",
    (query) => query.ascending("createdAt").limit(1),
    [],
    { live: true }
  );

  useEffect(() => {
    try {
      const { tokenFactoryAddr, price, tokenId, highestBidder, seller } =
        data[0].attributes;
      setActiveNft({
        nftFactoryAddr: tokenFactoryAddr,
        bidAmount: price,
        nftId: tokenId,
        highestBidderAddr: highestBidder,
        nftSeller: seller,
      });
    } catch (e) {
      console.log(e);
    }
  }, [data]);

  // Sets the amount stored in a state variable that a user wants to place
  // on an NFT.
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setBid(inputValue);
  };

  // Updates both the listing price and highest bidder address.
  const updateListing = async () => {
    await fetch({
      onSuccess: (listing) => {
        listing[0].set("price", bid);
        listing[0].set("highestBidder", authedUser.userAddr);
        listing[0].save().then(() => console.log("New Bid Success"));
      },
    });
  };

  const { placeBidOnNft } = useContractInteractions();

  // Updates NFT listing with new bid info.
  const submitForm = (e) => {
    e.preventDefault();
    placeBidOnNft(bid).then(() => {
      updateListing();
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <ReactLoading type="cylon" color="white" width="10rem" />
        </div>
      ) : (
        <div>
          <form className="form" onSubmit={submitForm}>
            <label>
              <p className="form-title">Place Bid</p>
              <input
                className="input-box"
                type="number"
                value={bid}
                onChange={handleInputChange}
                placeholder={`${activeNft.bidAmount} Matic`}
                step=".01"
                min={activeNft.bidAmount}
                required
              />
            </label>
            <br></br>
            <div>
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th>Current Price:</th>
                <th>{`${activeNft.bidAmount} Matic`}</th>
              </tr>
              <tr>
                <th>Token ID</th>
                <th>{activeNft.nftId}</th>
              </tr>
              <tr>
                <th>NFT Factory address</th>
                <th>{activeNft.nftFactoryAddr}</th>
              </tr>
              <tr>
                <th>NFT Seller</th>
                <th>{activeNft.nftSeller}</th>
              </tr>
              <tr>
                <th>Highest Bidder</th>
                <th>
                  {activeNft.highestBidderAddr === "0x".padEnd(42, "0")
                    ? "No bids yet"
                    : activeNft.highestBidderAddr}
                </th>
              </tr>
            </thead>
          </table>
        </div>
      )}
    </>
  );
};

export default Bid;
