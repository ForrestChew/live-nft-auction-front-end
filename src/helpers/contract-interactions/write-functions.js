import { ethers } from "ethers";
import { getAuctionInstance } from "./utils";

export const listNftForAuction = async (
  tokenFactoryAddr,
  tokenId,
  startingPrice
) => {
  const auction = getAuctionInstance();
  await auction.listNftForAuction(tokenFactoryAddr, tokenId, startingPrice, {
    value: ethers.utils.parseEther("0.01"),
    gasLimit: 1000000,
  });
};

export const placeBidOnNft = async (bidAmount) => {
  const auction = getAuctionInstance();
  await auction.placeBid({
    value: ethers.utils.parseEther(bidAmount),
    gasLimit: 1000000,
  });
};

export const withdrawFunds = async () => {
  const auction = getAuctionInstance();
  await auction.withdrawBalance();
};
