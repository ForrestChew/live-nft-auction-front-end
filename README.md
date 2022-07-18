# Live NFT Auction Summary

The Live NFT Auction enables users to auction their NFTs off in an auction that is live streamed by the auction hosts. The project is comprised of four main parts.

1. **Auction Smart Contract** <br>
   The immutable code that supports the auction. The functions found within this smart contract are what ultamitley get called by the front-end. The contract has two states, `INACTIVE` and `ACTIVE`. The `INACTIVE` state exposes functionality related to listing NFTs and withrawing funds while the `ACTIVE` state exposes functionality directly related to bidding on the NFTs. <br>
   **Listing an NFT** <br>
   When an NFT is listed, the ownership of it is transfered to the smart contract. This was done to prevent bad actors from listing their NFT, then selling it elsewhere. The user must also satisfy three requirements for their NFT to be successfully listed: <br>

   1. The auction's state is `INACTIVE`. <br>
   2. The NFT being listed has not already been listed. <br>
   3. A small listing fee is paid. This fee can then be withdrawn by the auction smart contract owner address. <br>

   **Bidding on an NFT** <br>
   When the auction starts (it's state becomes `ACTIVE`), one NFT is auctioned off at a time in the fashion of a queue. The first NFT to be listed will be the first to be bid on. Each NFT will have a period of time in which users can bid on it (this time can be set before the aucion contract is deployed). Like listing an NFT, three conditions have to be met to succesfully place a bid: <br>

   1. The auction's state is `ACTIVE`.
   2. The NFT listing is the NFT currently auctioning.
   3. The bid cast is greater then the current bid price.

   **A)** User A was the highest bidder on an NFT that User B had listed in a previous auction. User B can then withdraw those funds. <br>
   **B)** User A bid but did NOT win an NFT. User A can then re-claim their bids. <br>

2. **Front-end** <br>
   Provides an interface for users to interact with the auction smart contract. While the auction is `Inactive`, users have the opportunity to list any number of their NFTs for auction. Additionally, they can view all NFTs that will be up for auction in it's next cycle. They are also able withdraw funds that are stored within the contract. While the auction is `Active`, users can bid on individual NFTs one at a time, and they are auctioned off in the order they were listed. The bidding period for each NFT is five minutes.

| Main Usage                         | Auction State |
| ---------------------------------- | ------------- |
| List NFTs for auction              | INACTIVE      |
| View all NFTs listed for auction   | INACTIVE      |
| Claim funds from sold NFTs         | INACTIVE      |
| Reclaim funds on losing NFT bids   | INACTIVE      |
| Watch a live stream of the auction | ACTIVE        |
| Bid on NFTs                        | ACTIVE        |

## Project Requirements

- Metamask - Documentation: https://docs.metamask.io/guide/#account-management
- Prvate key - (Can be obtained through Metamask)
- Moralis Server - Create a server: https://moralis.io/ - General Docs: https://docs.moralis.io/introduction/readme
- Provider Url - Alchemy documentation: https://docs.alchemy.com/alchemy/introduction/getting-started
- Polyscan API key - https://polygonscan.com/myapikey
- Docker - https://docs.docker.com/get-docker/
- Streaming software - OBS works well and is open source - https://obsproject.com/

## Project Setup and Deployment Steps
