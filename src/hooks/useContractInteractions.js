import { useMoralis } from "react-moralis";
import { contractAddress, contractAbi } from "../contract-info";

export const useContractInteractions = () => {
  const { Moralis } = useMoralis();

  // Enables users to list an NFT for auction. This hook will call
  // the "listNftForAuction" function on the auction smart contract.
  const listNFTForAuction = async (nftListingObj) => {
    const { tokenFactoryAddr, tokenId, startingPrice } = nftListingObj;
    const startingPriceConversion = Moralis.Units.ETH(startingPrice);
    await Moralis.enableWeb3();
    const listNftOptions = {
      contractAddress,
      abi: contractAbi,
      functionName: "listNftForAuction",
      chain: 80001,
      msgValue: Moralis.Units.ETH("0.01"),
      params: {
        _tokenFactoryAddr: tokenFactoryAddr,
        _tokenId: tokenId,
        _startingPrice: startingPriceConversion,
      },
    };
    await Moralis.executeFunction(listNftOptions);
  };

  // Enables users to bid on the current auctioning NFT. This hook
  // will call the "placeBid" function on the auction smart contract.
  const placeBidOnNft = async (currentBidPrice) => {
    await Moralis.enableWeb3();
    const placeBidOptions = {
      contractAddress,
      abi: contractAbi,
      functionName: "placeBid",
      msgValue: Moralis.Units.ETH(currentBidPrice),
    };
    await Moralis.executeFunction(placeBidOptions);
  };

  // Enables users to withdraw any funds they may have held within
  // the auction smart contract. These funds could be from:
  // 1) - Bidding on an NFT that a user has unsuccessfuly won.
  // 2) - The winning bid on an NFT that the withdraw function caller has sold.
  const withdrawFunds = async () => {
    await Moralis.enableWeb3();
    const withdrawFundsOptions = {
      contractAddress,
      abi: contractAbi,
      functionName: "withdrawBalance",
    };
    try {
      await Moralis.executeFunction(withdrawFundsOptions);
    } catch (e) {
      alert("No funds to withdraw at this time.");
    }
  };

  // Gets the user balance that is stored within the smart contract.
  const getUserContractBalance = async (userAddress) => {
    await Moralis.enableWeb3();
    const getUserContractBalOptions = {
      contractAddress,
      abi: contractAbi,
      functionName: "balances",
      params: {
        // The key is an empty string since that is what the input name is
        // when defined in the ABI.
        "": userAddress,
      },
    };
    const tx = await Moralis.executeFunction(getUserContractBalOptions);
    return tx;
  };

  return {
    listNFTForAuction,
    placeBidOnNft,
    withdrawFunds,
    getUserContractBalance,
  };
};
