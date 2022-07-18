# Live NFT Auction Summary

The Live NFT Auction enables users to auction off their NFTs in a live streamed event, with the burden of responsibility to host the live stream falling upon the auction's maintainers.
<br>
<br>
The project is comprised of four parts:

1. **Auction Smart Contract** <br>
   Immutable code that supports the auction. The functions found within this contract are what ultamitley get called by the front-end. The contract has two states, `INACTIVE` and `ACTIVE`. The `INACTIVE` state exposes functionality related to listing NFTs and withrawing funds, while the `ACTIVE` state exposes functionality directly related to actually bidding on the NFT listings. <br>

   **Listing an NFT** <br>
   When an NFT is listed, the tokens ownership is transfered to the smart contract. This was done to prevent bad actors from listing their NFT, then selling it elsewhere. The user must also satisfy three requirements for their NFT to be successfully listed: <br>

   1. The auction's state is `INACTIVE`.
   2. The NFT being listed has not already been listed.
   3. A small listing fee is paid. This fee can be claimed by the auction owner.

   **Bidding on an NFT** <br>
   When the auction is `ACTIVE`, one NFT is auctioned off at a time in the fashion of a queue. The first NFT to be listed will be the first to be bid on. Each NFT will have a duration of time in which users can bid on it (this time can be set before the aucion contract is deployed). Like listing an NFT, three conditions have to be met to successfully place a bid: <br>

   1. The auction's state is `ACTIVE`.
   2. The NFT listing is the NFT currently auctioning.
   3. The bid cast is greater than the current bid price.

   **Claiming Funds** <br>
   There are two scenarios where a user may claim funds that are held within the auction smart contract. The contract must also be `INACTIVE`.

   1. User A was the highest bidder on an NFT that User B had listed in a previous auction. User B can then withdraw those funds.
   2. User A bid but did NOT win an NFT. User A can then re-claim their bids.

2. **Front-end** <br>
   Provides an interface to interact with the auction smart contract. While the auction is `INACTIVE`, users have the ability list their NFTs in addition to viewing all NFTs that have been listed. While the auction is `ACTIVE`, users can bid on the individual NFTs, while simultaneously watching a live stream of the auction, hosted by it's maintainers. The contents of the live stream are up to the maintainers.

3. **RTMP and HTTP Servers** <br>
   Allows a live stream from a third party streaming service such as OBS to be picked up by the auction front-end. Code for this portion can be found: `live-nft-auction/rtmp-server`.

4. **Script for Downloading NFT Images** <br>
   Enables the auction's proprietors/maintainers to download the image of each NFT that is listed for auction. The image found at the `image` field within each NFT's metadata is downloaded and saved within the `live-nft-auction/download_live_auction_listing_images/nft_images` directory. If they so choose, the downloaded images can then be used by the auction's propreitors to enhance their live stream.

## Project Requirements

- Metamask - Documentation: https://docs.metamask.io/guide/#account-management
- Prvate key - (Can be obtained through Metamask)
- Moralis Server - Create a server: https://moralis.io/ - General Docs: https://docs.moralis.io/introduction/readme
- Provider Url - Alchemy documentation: https://docs.alchemy.com/alchemy/introduction/getting-started
- Polyscan API key - https://polygonscan.com/myapikey
- Docker - https://docs.docker.com/get-docker/
- Streaming software - OBS works well and is open source - https://obsproject.com/

## Project Setup and Deployment Steps

This demonstration is done on the Mumbai network, but any EVM compatible blockchain will work.

1. **Install Dependencies** <br>

```
npm install
```

2. **Create .env Files** <br>
   Create a .env file in the root directory and add the following fields: <br>
   `REACT_APP_MORALIS_SERVER_URL=xxxxxxxxxxx.............` https://moralis.io/ <br>
   `REACT_APP_MORALIS_APP_ID=xxxxxxxxxxxx................` https://moralis.io/ <br>
   `WEB3_PROJECT_ID=https://polygon-mumbai.g.alchemy.com/v2/xxxxxxx.........` Provider API <br>
   `PRIVATE_KEY=0x0000.......` <br>
   `POLYGONSCAN_API_KEY=XXXXXXXXXXXXXXX..........` Used to verify contracts. <br>
   `AUCTION_OWNER_ADDR=0x0000......` The address you want to make the auction owner. <br>
   `LIVE_AUCTION_ADDR=` Once your auction contract is deployed, add it's address here. <br>
   `NFT_FACTORY_ADDR=` These setup steps assume you are familiar with NFTs, so if you would like to use the NFT contract provided in this repo, add it's address here after deplyment. If you are using your own NFT contract, make sure to approve the auction's contract address before listing an NFT. <br>
   Create a second .env file in the `live-nft-auction/download_live_auction_listing_images` directory and add: <br>
   `WEB3_PROJECT_ID=https://polygon-mumbai.g.alchemy.com/v2/xxxxxxx.........` <br>
   `LIVE_AUCTION_ADDR=` Once your auction contract is deployed, add it's address here. <br>

3. **Deploy and Verify Smart Contracts** <br>
   To Deploy the Auction smart contract, run:

```
npx hardhat run scripts/live-auction-scripts/deploy-auction.js --network mumbai
```

When the address appears in the terminal, don't forget to add it to the .env files. <br>
If you want to deploy the NFT factory contract, run:

```
npx hardhat run scripts/nft-factory-scripts/deploy-factory.js --network mumbai
```

To verify your auction smart contract, run:

```
npx hardhat verify <LIVE_AUCTION_ADDR> "<AUCTION_OWNER_ADDR>" "10000000000000000" --network mumbai
```

To verify your NFT factory contract if applicable, run:

```
npx hardhat verify <NFT_FACTORY_ADDR> "LiveAuct" "LA" --network mumbai
```

4. **Start front-end** <br>
   Add your auction smart contracts address to `live-nft-auction/src/contract-info.js`, then run:

```
npm start
```

Here is a simple video demonstration as that is more effective than screenshots and text: <br>
https://www.youtube.com/watch?v=oLpJQzVwIOI <br>

5. **Testing** <br>
   To test the auction smart contract, run:

```
npx hardhat test
```
