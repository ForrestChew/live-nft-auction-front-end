// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @notice - Gives the user an the ability to mint NFTs (ERC721 tokens).
 * @author - https://twitter.com/BossMcBara
 */
contract NftFactory is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    /**
     * @notice - Allows the user to give a name and symbol to their collection.
     * @param _collectionName - The name for the NFT collection.
     * @param _collectionSymbol - The symbol for the NFT collection.
     */
    constructor(string memory _collectionName, string memory _collectionSymbol)
        ERC721(_collectionName, _collectionSymbol)
    {}

    /**
     * @notice - Mints an NFT to the collection.
     * @param _tokenURI - The metadata to be associated with the NFT.
     * @param _nftMarketplace - The address of the marketplace to have
     * the rights to sell the NFT. Pass in the Ethereum zero address
     * if you would not like to give any address approval.
     */
    function createCollectable(
        string memory _tokenURI,
        // Add the eth zero address to not be approved by anyone
        address _nftMarketplace
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        _mint(msg.sender, _tokenIds.current());
        _setTokenURI(_tokenIds.current(), _tokenURI);
        _approve(_nftMarketplace, _tokenIds.current());
        return _tokenIds.current();
    }
}
