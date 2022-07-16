const { ethers } = require("hardhat");

const deployAuctionContract = async () => {
  const auctionOwnerAddr = "0x42A7b811d096Cba5b3bbf346361106bDe275C8d7";
  const listingFee = ethers.utils.parseEther("0.01");
  const Auction = await ethers.getContractFactory("LiveNftAuction");
  const auction = await Auction.deploy(auctionOwnerAddr, listingFee);
  await auction.deployed();
  console.log("Auction Contract deployed to: ", auction.address);
};

deployAuctionContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
