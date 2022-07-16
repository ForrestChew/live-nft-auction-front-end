const { ethers, waffle } = require("hardhat");
const { deployContract } = waffle;
const AuctionABI = require("../artifacts/contracts/LiveNftAuction.sol/LiveNftAuction.json");
const FactoryABI = require("../artifacts/contracts/NftFactory.sol/NftFactory.json");

const listingFee = ethers.utils.parseEther("0.01");

exports.auctionFixture = async () => {
  const signers = await ethers.getSigners();
  const LiveNftAuction = await deployContract(signers[0], AuctionABI, [
    signers[0].address,
    listingFee,
  ]);
  return LiveNftAuction;
};

exports.factoryFixture = async () => {
  const signers = await ethers.getSigners();
  const NftFactory = await deployContract(signers[1], FactoryABI, [
    signers[1].address,
    listingFee,
  ]);
  return NftFactory;
};
