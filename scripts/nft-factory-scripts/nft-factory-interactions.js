const { ethers } = require("hardhat");
require("dotenv").config();

const tokenURIs = [
  "https://gateway.pinata.cloud/ipfs/Qmb9X8Q52mkruiPacEQMvJPZjv5WEym9ov3SqT9HwPYWrW",
  "https://gateway.pinata.cloud/ipfs/Qma2NZzL1XaZEaGK86kxt32TvPLD9tQ5ZPCFGRBJou4KHf",
  "https://gateway.pinata.cloud/ipfs/QmdryoExpgEQQQgJPoruwGJyZmz6SqV4FRTX1i73CT3iXn?filename=1-SHIBA_INU.json",
];

const liveAuctionAddress = process.env.LIVE_AUCTION_ADDR;
const nftFactoryAddress = process.env.NFT_FACTORY_ADDR;

const createCollectables = async () => {
  const factory = await ethers.getContractAt("NftFactory", nftFactoryAddress);
  let tokenIdx = 0;
  for (let i = 0; i < 5; i++) {
    const tx = await factory.createCollectable(
      tokenURIs[tokenIdx],
      liveAuctionAddress
    );
    tokenIdx++;
    const txReceipt = tx.wait();
    console.log(txReceipt, i + 1);
  }
};

createCollectables()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
