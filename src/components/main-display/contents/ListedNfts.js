import { NFTBalance } from "web3uikit";
import { contractAddress } from "../../../contract-info";
import "./ListedNfts.css";

const ListedNfts = () => {
  return (
    <div className="listed-nfts-container">
      <NFTBalance chain="mumbai" address={contractAddress} />
    </div>
  );
};

export default ListedNfts;
