# Live NFT Auction Summary

The Live NFT Auction enables users to auction their NFTs off in an auction that is live streamed by the auction hosts. The project is comprised of four main parts.

1. Front-end
   Provides an interface for users to interact with the auction smart contract. While the auction is `inactive`, users have the opportunity to list any number of their NFTs for auction. Additionally, they can view all NFTs that will be up for auction in it's next cycle. They are also able withdraw funds that are stored within the contract. While the auction is `active`, users can bid on individual NFTs one at a time. The NFTs are auctioned off in the order they were listed.

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
