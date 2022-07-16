import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../contract-info";

export const getReadOnlyAuctionInstance = () => {
  const provider = getProvider();
  const readOnlyAuction = new ethers.Contract(
    contractAddress,
    contractAbi,
    provider
  );
  return readOnlyAuction;
};

export const getAuctionInstance = () => {
  const signer = getSigner();
  const auction = new ethers.Contract(contractAddress, contractAbi, signer);
  return auction;
};

export const getProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
};

export const getSigner = () => {
  const signer = getProvider().getSigner();
  return signer;
};
