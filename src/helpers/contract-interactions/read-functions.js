import { getReadOnlyAuctionInstance } from "./utils";

export const getAuctionState = async () => {
  const auction = getReadOnlyAuctionInstance();
  return await auction.auctionState();
};

export const getActiveNft = async () => {
  const auction = getReadOnlyAuctionInstance();
  return await auction.getActiveNFT();
};

export const getUserBalInContract = async (authedUser) => {
  const auction = getReadOnlyAuctionInstance();
  return await auction.balances(authedUser);
};
