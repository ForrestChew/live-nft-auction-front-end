import { useContext } from "react";
import ReactLoading from "react-loading";
import { AuctionContext } from "../../AuctionProvider";
import LivePlayer from "./contents/LivePlayer";
import ListedNfts from "./contents/ListedNfts";
import "./MainDisplay.css";

const MainDisplay = ({ isLoading }) => {
  const [isAuctionActive, setIsAuctionActive] = useContext(AuctionContext);

  return (
    <div className="main-display">
      {isLoading ? (
        <div className="loading">
          <ReactLoading type="cylon" color="white" width="10rem" />
        </div>
      ) : isAuctionActive ? (
        <LivePlayer />
      ) : (
        <ListedNfts />
      )}
    </div>
  );
};

export default MainDisplay;
