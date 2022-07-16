import { useContext } from "react";
import { AuctionContext } from "../../AuctionProvider";
import LivePlayer from "./contents/LivePlayer";
import ListedNfts from "./contents/ListedNfts";
import "./MainDisplay.css";

const MainDisplay = () => {
  const [isAuctionActive] = useContext(AuctionContext);

  return (
    <div className="main-display">
      {/* {isAuctionActive ? <LivePlayer /> : <ListedNfts />} */}
      <LivePlayer />
    </div>
  );
};

export default MainDisplay;
