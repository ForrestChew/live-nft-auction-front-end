const { ethers } = require("hardhat");
require("dotenv").config();

const liveAuctionAddress = process.env.LIVE_AUCTION_ADDR;
const nftFactoryAddr = process.env.NFT_FACTORY_ADDR;

const getAuctionContractInstance = async () => {
  const auction = await ethers.getContractAt(
    "LiveNftAuction",
    liveAuctionAddress
  );
  return auction;
};

const listNftsOnAuction = async () => {
  const fee = ethers.utils.parseEther("0.01");
  const auction = await getAuctionContractInstance();
  let tokenId = 1;
  let startingPrice = 1;
  for (let i = 1; i <= 6; i++) {
    const tx = await auction.listNftForAuction(
      nftFactoryAddr,
      tokenId,
      startingPrice,
      { value: fee, gasLimit: 1000000 }
    );
    tokenId++;
    startingPrice++;
    const txReceipt = tx.wait();
    console.log(txReceipt + i);
  }
};

const startAuction = async () => {
  const auction = await getAuctionContractInstance();
  const startAuctionTx = await auction.startAuction();
  const txReceipt = await startAuctionTx.wait();
  console.log(txReceipt);
};

const endAuction = async () => {
  const auction = await getAuctionContractInstance();
  const endAuctionTx = await auction.disableAuction({ gasLimit: 1000000 });
  const txReceipt = await endAuctionTx.wait();
  console.log(txReceipt);
};

const getAuctionOwner = async () => {
  const auction = await getAuctionContractInstance();
  console.log(await auction.owner());
};

const checkActiveNftStatus = async () => {
  const auction = await getAuctionContractInstance();
  const txReceipt = await auction.checkNftStatus({ gasLimit: 1000000 });
  await txReceipt.wait(3);
  console.log(txReceipt);
};
listNftsOnAuction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
