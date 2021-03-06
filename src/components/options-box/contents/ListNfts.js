import { useState, useContext } from "react";
import { UserContext } from "../../../UserProvider";
import { listNftForAuction } from "../../../helpers/write-functions";
import "./contents.css";

const ListNfts = () => {
  const [authedUser] = useContext(UserContext);
  const [nftListing, setNftListing] = useState({
    tokenFactoryAddr: "",
    tokenId: "",
    startingPrice: "",
  });

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setNftListing({
      ...nftListing,
      [inputName]: inputValue,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (authedUser.isAuthed) {
      listNftForAuction(
        nftListing.tokenFactoryAddr,
        nftListing.tokenId,
        nftListing.startingPrice
      );
    } else {
      alert("Please sign in with Metamask");
    }
  };

  return (
    <>
      <div>
        <h1 className="form-title">List NFT</h1>
        <form className="form" onSubmit={submitForm}>
          <label>
            <p>NFT Contract Address</p>
            <input
              className="input-box"
              type="text"
              name="tokenFactoryAddr"
              onChange={handleInputChange}
              value={nftListing.tokenFactoryAddr}
              placeholder="Address"
              maxLength="42"
              minLength="42"
              required
            />
          </label>
          <label>
            <p>NFT ID</p>
            <input
              className="input-box"
              type="number"
              name="tokenId"
              onChange={handleInputChange}
              value={nftListing.tokenId}
              placeholder="NFT ID"
              min="1"
              required
            />
          </label>
          <label>
            <p>Starting Price</p>
            <input
              className="input-box"
              type="number"
              name="startingPrice"
              onChange={handleInputChange}
              value={nftListing.startingPrice}
              placeholder="0.00 Matic"
              step=".01"
              min="0"
              required
            />
          </label>
          <br></br>
          <br></br>
          <br></br>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ListNfts;
