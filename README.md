Live Nft Auction front-end
This repo contains the NFT auction front-end to be used in tandem with three other repos. Together, the repositories make up a virtual live auction for NFTs. A user of this project could utilize third party streaming software and stream to an RTMP server found: https://github.com/ForrestChew/rtmp-server. They could then connect the front-end to the smart contract found:https://github.com/ForrestChew/live-nft-auction. Lastly, when a user wanted to download the images from listed NFTs, they could do so with a script found: https://github.com/ForrestChew/download_live_auction_listing_images.

Note: The remaining contents of this readme will focus soley on this repositoy.
<br>
## Auction Summary
UNDER CONSTRUCTION
<br>
### Project requirements: 
1. MetaMask - https://metamask.io/faqs/ <br>
2. Moralis Server - https://admin.moralis.io/servers <br>
# Setup steps <br>
*Note:
This setup is done using the Rinkeby Testnet, but any EVM compatible blockchain will work*
<br>
### 1) Clone repository <br>
```
git clone https://github.com/ForrestChew/live-nft-auction-front-end.git
```
### 2) Create .env file <br>
In the root of your project directory, create a `.env` file and add your Moralis server url and application ID.
### 3) Install project dependencies
```
npm install
```
### 4) Add auction contract address
In the `nft-auction-contract-info` directory, add your deployed nft auction smart contract address. If you have changed the initial smart contract, you will also have to paste the new contracts ABI into the abi file fond within the same directory.
### 5) Use Moralis event syncs
You will have to prompt your Moralis server to listen for emitted smart contract events. Doc: https://docs.moralis.io/moralis-dapp/automatic-transaction-sync/smart-contract-events. <br>
smart contract name --> Moralis event name: <br>
AuctionStatus --> AuctionStatus <br>
NewBid        --> NewBids
NftSold       --> NftSale
NftForAuction --> NftForAuction

