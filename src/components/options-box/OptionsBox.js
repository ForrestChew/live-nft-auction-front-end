import { useContext } from "react";
import ReactLoading from "react-loading";
import { AuctionContext } from "../../AuctionProvider";
import Bid from "./contents/Bid";
import ListNfts from "./contents/ListNfts";
import "./OptionsBox.css";

const OptionsBox = ({ isLoading }) => {
  const [isAuctionActive] = useContext(AuctionContext);

  return (
    <div className="options-box">
      {isLoading ? (
        <div className="loading">
          <ReactLoading type="cylon" color="white" width="10rem" />
        </div>
      ) : isAuctionActive ? (
        <Bid />
      ) : (
        <ListNfts />
      )}
    </div>
  );
};

export default OptionsBox;
