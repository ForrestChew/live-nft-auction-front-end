// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface ItokenURI {
    function tokenURI(uint256 tokenId) external view returns (string memory);
}

/**
 * @title - NFT auction
 * @author - https://twitter.com/BossMcBara
 * @notice - Auction meant to used in tandem with hosts
 * who are live streaming the auction. Users could
 * use the auction front-end as an interface for this
 * contract.
 * @dev - This repo is to be used in tandem with:
 * 1) https://github.com/ForrestChew/live-nft-auction-front-end
 * 2) https://github.com/ForrestChew/download_live_auction_listing_images
 * 3) https://github.com/ForrestChew/rtmp-server
 */
contract LiveNftAuction is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter tokenIdPosition;
    address public auctionOwner;
    uint256 public listingFee;
    enum AuctionState {
        INACTIVE,
        ACTIVE
    }
    AuctionState public auctionState;
    uint256[] public auctionTokenIdxIds;
    struct AuctionListing {
        uint256 tokenId;
        uint256 currentPrice;
        uint256 timeStart;
        bool listedForAuction;
        bool isAuctioning;
        address tokenfactoryAddr;
        address seller;
        address owner;
        address bidLeader;
    }
    /// @dev - Maps an NFT to an auction listing
    mapping(address => mapping(uint256 => AuctionListing))
        public auctionListings;
    /// @dev - Maps NFT queue ID to it's address
    mapping(uint256 => address) tokenFactoryAddrByListingId;
    /// @dev - Maps how much an account has stored within contract
    mapping(address => uint256) public balances;

    event AuctionStatus(bool indexed started);

    event NftForAuction(
        string URI,
        address indexed seller,
        address indexed tokenFactoryAddr,
        address highestBidder,
        uint256 indexed price,
        uint256 tokenId
    );

    event NewBid(address bidder, string indexed URI, uint256 indexed bidAmount);

    event NftSold(
        address buyer,
        address seller,
        string URI,
        address indexed tokenFactoryAddr,
        uint256 indexed price
    );

    /**
     * @notice - Initializes state on contract deployment.
     * @param _auctionOwner - The address to be made auction owner.
     * @param _listingFee - The fee users will have to pay to list
     * their NFTs for auction.
     */
    constructor(address _auctionOwner, uint256 _listingFee) {
        auctionOwner = _auctionOwner;
        listingFee = _listingFee;
        auctionState = AuctionState.INACTIVE;
    }

    /**
     * @notice - Begins the auctions. Can only be called by
     * the auction owner address.
     */
    function startAuction() public onlyOwner {
        require(
            auctionState == AuctionState.INACTIVE,
            "startAuction: Auction in wrong state"
        );
        auctionState = AuctionState.ACTIVE;
        setAuctionNft();
        emit AuctionStatus(true);
    }

    /**
     * @notice - Allows users to list an NFT for auction.
     * @param _tokenFactoryAddr - The smart contract to which the NFT
     * a user wants to list belongs.
     * @param _tokenId - The ID of the NFT.
     * @param _startingPrice - The price that a user would like to start
     * the bidding on their NFT.
     */
    function listNftForAuction(
        address _tokenFactoryAddr,
        uint256 _tokenId,
        uint256 _startingPrice
    ) public payable nonReentrant {
        require(
            auctionState == AuctionState.INACTIVE,
            "listNftForAuction: Auction's state must be INACTIVE"
        );
        require(
            !auctionListings[_tokenFactoryAddr][_tokenId].listedForAuction,
            "listNftForAuction: Cannot list NFT twice"
        );
        require(
            msg.value == listingFee,
            "listNftForAuction: Listing fee needs to be paid"
        );
        /**
         * @dev - Transfers the NFT to the auction smart contract to prevent
         * a user from listing an NFT for auction but then selling it elsewhere.
         */
        IERC721(_tokenFactoryAddr).transferFrom(
            msg.sender,
            address(this),
            _tokenId
        );
        tokenFactoryAddrByListingId[_tokenId] = _tokenFactoryAddr;
        /// @dev - Creates auction listing.
        auctionListings[_tokenFactoryAddr][_tokenId] = AuctionListing({
            tokenId: _tokenId,
            currentPrice: _startingPrice,
            timeStart: 0,
            listedForAuction: true,
            isAuctioning: false,
            tokenfactoryAddr: _tokenFactoryAddr,
            seller: msg.sender,
            owner: address(this),
            bidLeader: address(0)
        });
        auctionTokenIdxIds.push(_tokenId);
        /// @dev - Transfers listing fee to auction owner.
        (bool sendListingFee, ) = payable(auctionOwner).call{value: listingFee}(
            ""
        );
        require(
            sendListingFee,
            "listNftForAuction: Listing Fee failed to transfer"
        );
        address bidLeader = auctionListings[_tokenFactoryAddr][_tokenId]
            .bidLeader;
        ItokenURI tokenURI = ItokenURI(_tokenFactoryAddr);
        emit NftForAuction(
            tokenURI.tokenURI(_tokenId),
            msg.sender,
            _tokenFactoryAddr,
            bidLeader,
            _startingPrice,
            _tokenId
        );
    }

    /**
     * @notice - Determins whether the current NFT's auction
     * period has ended. Can only be called by the auction
     * owner's address.
     */
    function checkNftStatus() external onlyOwner {
        address tokenFactoryAddr = tokenFactoryAddrByListingId[
            auctionTokenIdxIds[tokenIdPosition.current()]
        ];
        /// @dev - Gets token position id from array.
        uint256 tokenIdxIds = auctionTokenIdxIds[tokenIdPosition.current()];
        require(
            auctionListings[tokenFactoryAddr][tokenIdxIds].timeStart +
                1 minutes <=
                block.timestamp,
            "checkNftStatus: Not enough time has ellapsed"
        );
        if (tokenIdPosition.current() == auctionTokenIdxIds.length - 1) {
            _winNft(tokenFactoryAddr, tokenIdxIds);
            tokenIdPosition.reset();
            delete auctionTokenIdxIds;
            auctionState = AuctionState.INACTIVE;
            emit AuctionStatus(false);
        } else {
            _winNft(tokenFactoryAddr, tokenIdxIds);
            tokenIdPosition.increment();
            setAuctionNft();
        }
    }

    /**
     * @notice - Allows users to place bids on the current auctioning NFT.
     * A user will become the bid leader if they have the highest bid.
     */
    function placeBid() public payable nonReentrant {
        /// @dev - Gets address from mapping.
        address tokenFactoryAddr = tokenFactoryAddrByListingId[
            auctionTokenIdxIds[tokenIdPosition.current()]
        ];
        /// @dev - Gets token position ID from array.
        uint256 tokenIdxIds = auctionTokenIdxIds[tokenIdPosition.current()];
        require(
            auctionState == AuctionState.ACTIVE,
            "placeBid: Auction should be ACTIVE"
        );
        require(
            auctionListings[tokenFactoryAddr][tokenIdxIds].isAuctioning,
            "placeBid: Cannot bid on NFT"
        );
        require(
            msg.value >
                auctionListings[tokenFactoryAddr][tokenIdxIds].currentPrice,
            "placeBid: Bid needs to be greater than current price"
        );
        auctionListings[tokenFactoryAddr][tokenIdxIds].bidLeader = msg.sender;
        auctionListings[tokenFactoryAddr][tokenIdxIds].currentPrice = msg.value;
        balances[msg.sender] += msg.value;
        ItokenURI tokenURI = ItokenURI(tokenFactoryAddr);
        emit NewBid(msg.sender, tokenURI.tokenURI(tokenIdxIds), msg.value);
    }

    /**
     * @notice - Allows a user to withdraw all of their funds from the
     * smart contract. These funds are made up of:
     * 1) Bids on an NFT that you have unsuccessffuly won.
     * 2) Winning bid amount to buy an NFT that YOU have listed.
     */
    function withdrawBalance() public {
        require(
            auctionState == AuctionState.INACTIVE,
            "withdrawBalance: Auction not inactive"
        );
        require(
            balances[msg.sender] > 0,
            "withdrawLostBids: Nothing to withdraw"
        );
        (bool withdrawTx, ) = payable(msg.sender).call{
            value: balances[msg.sender]
        }("");
        require(withdrawTx, "withdrawLostBids: Withdrawl failed");
        delete balances[msg.sender];
    }

    /**
     * @notice - Sets the current NFT for auction by adjusting relevant
     * values within it's auction items struct.
     */
    function setAuctionNft() public onlyOwner {
        /// @dev - Utilizes helper function to find the next NFT for auction.
        (address _tokenFactoryAddr, uint256 _tokenId) = _getNextAuctionNft();
        auctionListings[_tokenFactoryAddr][_tokenId].isAuctioning = true;
        auctionListings[_tokenFactoryAddr][_tokenId].timeStart = block
            .timestamp;
        uint256 startingPrice = auctionListings[_tokenFactoryAddr][_tokenId]
            .currentPrice;
        address bidLeader = auctionListings[_tokenFactoryAddr][_tokenId]
            .bidLeader;
        ItokenURI tokenURI = ItokenURI(_tokenFactoryAddr);
        emit NftForAuction(
            tokenURI.tokenURI(_tokenId),
            msg.sender,
            _tokenFactoryAddr,
            bidLeader,
            startingPrice,
            _tokenId
        );
    }

    /// @notice - Halts the auction. Can only be called by the auction owner.
    function disableAuction() public onlyOwner {
        auctionState = AuctionState.INACTIVE;
        emit AuctionStatus(false);
    }

    /// @notice - Gets the current auctioning NFT listing.
    /// @return - The auctioning NFT listing.
    function getActiveNFT() public view returns (AuctionListing memory) {
        address tokenFactoryAddr = tokenFactoryAddrByListingId[
            auctionTokenIdxIds[tokenIdPosition.current()]
        ];
        uint256 tokenIdxIds = auctionTokenIdxIds[tokenIdPosition.current()];
        return auctionListings[tokenFactoryAddr][tokenIdxIds];
    }

    /**
     * @notice - Helper function that transfers the NFT to the highest bidder.
     * If no one has bid on the NFT, then the NFT is returned to the seller.
     * @param _tokenFactoryAddr - The address to which the NFT for auction belongs.
     * @param _tokenId - The ID of the NFT.
     */
    function _winNft(address _tokenFactoryAddr, uint256 _tokenId) private {
        address bidLeader = auctionListings[_tokenFactoryAddr][_tokenId]
            .bidLeader;
        address nftSeller = auctionListings[_tokenFactoryAddr][_tokenId].seller;
        uint256 nftFinalPrice = auctionListings[_tokenFactoryAddr][_tokenId]
            .currentPrice;
        if (bidLeader == address(0)) {
            _noBidsOnNft(_tokenFactoryAddr, nftSeller, _tokenId);
            _deleteListing(_tokenFactoryAddr, _tokenId);
        } else {
            IERC721(_tokenFactoryAddr).transferFrom(
                address(this),
                bidLeader,
                _tokenId
            );
            /// @dev - Subtracts amount bid from NFT winner.
            balances[bidLeader] -= nftFinalPrice;
            /// @dev - Adds amount bid from NFT winner to the seller.
            balances[nftSeller] += nftFinalPrice;
            _deleteListing(_tokenFactoryAddr, _tokenId);
            ItokenURI tokenURI = ItokenURI(_tokenFactoryAddr);
            emit NftSold(
                bidLeader,
                auctionListings[_tokenFactoryAddr][_tokenId].seller,
                tokenURI.tokenURI(_tokenId),
                _tokenFactoryAddr,
                nftFinalPrice
            );
        }
    }

    /**
     * @notice - Deletes an auction item listing. Called when an NFT
     * has completed auctioning.
     * @param _tokenFactoryAddr - The address to which the NFT for auction belongs.
     * @param _tokenId - The ID of the NFT.
     */
    function _deleteListing(address _tokenFactoryAddr, uint256 _tokenId)
        private
    {
        delete auctionListings[_tokenFactoryAddr][_tokenId];
        delete tokenFactoryAddrByListingId[_tokenId];
        delete auctionTokenIdxIds[tokenIdPosition.current()];
    }

    /**
     * @notice - Returns an NFT to the seller if no one has bid on it.
     * @param _tokenFactoryAddr - The address to which the NFT for auction belongs.
     * @param _nftSeller - The seller of the NFT.
     * @param _tokenId - The ID of the NFT.
     */
    function _noBidsOnNft(
        address _tokenFactoryAddr,
        address _nftSeller,
        uint256 _tokenId
    ) private {
        address bidLeader = auctionListings[_tokenFactoryAddr][_tokenId]
            .bidLeader;
        uint256 nftFinalPrice = auctionListings[_tokenFactoryAddr][_tokenId]
            .currentPrice;
        IERC721(_tokenFactoryAddr).transferFrom(
            address(this),
            _nftSeller,
            _tokenId
        );
        ItokenURI tokenURI = ItokenURI(_tokenFactoryAddr);
        emit NftSold(
            bidLeader,
            auctionListings[_tokenFactoryAddr][_tokenId].seller,
            tokenURI.tokenURI(_tokenId),
            _tokenFactoryAddr,
            nftFinalPrice
        );
    }

    /**
     * @notice - Gets the next NFT in the auction queue.
     * @return - Returns the factory address of the NFT for auction (address)
     * as well as the NFTs ID (uint256).
     */
    function _getNextAuctionNft() private view returns (address, uint256) {
        address tokenFactoryAddr = tokenFactoryAddrByListingId[
            auctionTokenIdxIds[tokenIdPosition.current()]
        ];
        uint256 tokenIdxIds = auctionTokenIdxIds[tokenIdPosition.current()];
        return (tokenFactoryAddr, tokenIdxIds);
    }

    /// @notice - Prevents a user from sending funds directly to the contract.
    receive() external payable {
        revert("Cannot directly send ETH to this contract");
    }
}
