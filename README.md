# Live NFT Auction Summary

The Live NFT Auction enables users to auction their NFTs off in an auction that is live streamed by the auction hosts. The project is comprised of four main parts.

1. Auction Smart Contract
   The immutable code that supports the NFT auction. The functions found within this smart contract are what ultamitley get called by the front-end. The contract has two state, `Inactive` and `Active`. The `Inactive` state exposes functionality related to listing NFTs for auction (for a small fee), and withrawing funds from the smart contract. There are two reasons a user may have funds to withdraw from the smart contract: <br>
   A) User A was the highest bidder on an NFT that User B had listed in a previous auction. User B can then withdraw those funds.
   B) User A bid but did NOT win an NFT. User A can then re-claim their bids.

2. Front-end
   Provides an interface for users to interact with the auction smart contract. While the auction is `Inactive`, users have the opportunity to list any number of their NFTs for auction. Additionally, they can view all NFTs that will be up for auction in it's next cycle. They are also able withdraw funds that are stored within the contract. While the auction is `Active`, users can bid on individual NFTs one at a time, and they are auctioned off in the order they were listed. The bidding period for each NFT is five minutes.

| Main Usage                         | Auction State |
| ---------------------------------- | ------------- |
| List NFTs for auction              | Inactive      |
| View all NFTs listed for auction   | Inactive      |
| Claim funds from sold NFTs         | Inactive      |
| Reclaim funds on losing NFT bids   | Inactive      |
| Watch a live stream of the auction | Active        |
| Bid on NFTs                        | Active        |

## Project Requirements

- Metamask - Documentation: https://docs.metamask.io/guide/#account-management
- Prvate key - (Can be obtained through Metamask)
- Moralis Server - Create a server: https://moralis.io/ - General Docs: https://docs.moralis.io/introduction/readme
- Provider Url - Alchemy documentation: https://docs.alchemy.com/alchemy/introduction/getting-started
- Polyscan API key - https://polygonscan.com/myapikey
- Docker - https://docs.docker.com/get-docker/
- Streaming software - OBS works well and is open source - https://obsproject.com/

## Project Setup and Deployment Steps
