import { NFTBalance } from "web3uikit";
import "./ListedNfts.css";

const ListedNfts = () => {
  return (
    <div className="listed-nfts-container">
      <NFTBalance
        chain="mumbai"
        address="0xDccd679d62BF9B35c4c72DD91754e7CE486AE7Bb"
      />
    </div>
  );
};

export default ListedNfts;
