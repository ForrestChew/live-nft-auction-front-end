import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getActiveNft } from "../../../helpers/contract-interactions/read-functions";
import { placeBidOnNft } from "../../../helpers/contract-interactions/write-functions";
import ReactLoading from "react-loading";
import "./contents.css";

const Bid = () => {
  const [isTableLoading, setIsTableLoading] = useState(true);

  const [bidAmount, setBidAmount] = useState(0);

  const [activeNft, setActiveNft] = useState(new Array(9).fill(0));

  useEffect(() => {
    const setActiveNftData = async () => {
      setActiveNft(await getActiveNft());
    };
    setActiveNftData();
    setTimeout(() => {
      setIsTableLoading(false);
    }, 250);
  }, []);

  const submitBidForm = (e) => {
    e.preventDefault();
    placeBidOnNft(bidAmount);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setBidAmount(inputValue);
  };

  return (
    <>
      {isTableLoading ? (
        <div className="loading">
          <ReactLoading type="cylon" color="white" width="10rem" />
        </div>
      ) : (
        <div>
          <form className="form" onSubmit={submitBidForm}>
            <label>
              <p className="form-title">Place Bid</p>
              <input
                className="input-box"
                type="number"
                value={bidAmount}
                onChange={handleInputChange}
                placeholder={`${parseInt(
                  ethers.utils.formatEther(activeNft[1])
                )} Matic`}
                step=".01"
                min={parseInt(activeNft[1])}
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
                <th>{`${ethers.utils.formatEther(activeNft[1])} Matic`}</th>
              </tr>
              <tr>
                <th>Token ID</th>
                <th>{parseInt(activeNft[0])}</th>
              </tr>
              <tr>
                <th>NFT Factory address</th>
                <th>{activeNft[5]}</th>
              </tr>
              <tr>
                <th>NFT Seller</th>
                <th>{activeNft[6]}</th>
              </tr>
              <tr>
                <th>Highest Bidder</th>
                <th>
                  {activeNft[8] === "0x".padEnd(42, "0")
                    ? "No bids yet"
                    : activeNft[8]}
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
