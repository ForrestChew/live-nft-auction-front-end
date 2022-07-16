const { ethers } = require("hardhat");
require("dotenv").config();

const tokenURI =
  "https://gateway.pinata.cloud/ipfs/Qmb9X8Q52mkruiPacEQMvJPZjv5WEym9ov3SqT9HwPYWrW";

const liveAuctionAddress = process.env.LIVE_AUCTION_ADDR;
const nftFactoryAddress = process.env.NFT_FACTORY_ADDR;

const createCollectables = async () => {
  const factory = await ethers.getContractAt("NftFactory", nftFactoryAddress);
  for (let i = 0; i < 5; i++) {
    const tx = await factory.createCollectable(tokenURI, liveAuctionAddress);
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
