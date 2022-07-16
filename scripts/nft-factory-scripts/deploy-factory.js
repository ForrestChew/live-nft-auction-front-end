const { ethers } = require("hardhat");

// Deploy NFT factory smart contract
const deployNftFactory = async () => {
  const Factory = await ethers.getContractFactory("NftFactory");
  const factory = await Factory.deploy("LiveAuct", "LA");
  await factory.deployed();
  console.log("Factory Contract deployed to:", factory.address);
};

deployNftFactory()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
