export const contractAddress = "0x5EF2f0F364B50771D1FeFB09577896dA6CB00645";

export const contractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_auctionOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_listingFee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "started",
        type: "bool",
      },
    ],
    name: "AuctionStatus",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "URI",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "bidAmount",
        type: "uint256",
      },
    ],
    name: "NewBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "URI",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenFactoryAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "highestBidder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "NftForAuction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "URI",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenFactoryAddr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "NftSold",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "auctionListings",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timeStart",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "listedForAuction",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isAuctioning",
        type: "bool",
      },
      {
        internalType: "address",
        name: "tokenfactoryAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "bidLeader",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "auctionOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "auctionState",
    outputs: [
      {
        internalType: "enum LiveNftAuction.AuctionState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "auctionTokenIdxIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkNftStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "disableAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveNFT",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timeStart",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "listedForAuction",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isAuctioning",
            type: "bool",
          },
          {
            internalType: "address",
            name: "tokenfactoryAddr",
            type: "address",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "bidLeader",
            type: "address",
          },
        ],
        internalType: "struct LiveNftAuction.AuctionListing",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenFactoryAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startingPrice",
        type: "uint256",
      },
    ],
    name: "listNftForAuction",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "listingFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "placeBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setAuctionNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
