import { NFTBalance } from "web3uikit";
import "./ListedNfts.css";

const ListedNfts = () => {
  return (
    <div className="listed-nfts-container">
      <NFTBalance
        chain="mumbai"
        address="0x7df88493fBeB6cAE40A400AD2F06673a10f61d14"
      />
    </div>
  );
};

export default ListedNfts;
