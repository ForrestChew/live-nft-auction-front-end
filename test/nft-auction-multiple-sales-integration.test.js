const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
const { auctionFixture, factoryFixture } = require("./fixtures");
const { loadFixture } = require("ethereum-waffle");

const SAMPLE_NFT_URI =
  "https://gateway.pinata.cloud/ipfs/Qmb9X8Q52mkruiPacEQMvJPZjv5WEym9ov3SqT9HwPYWrW";

describe("Auction Multiple NFT's", () => {
  let liveNftAuction;
  let nftFactory;
  let accountOne;
  let accountTwo;
  let accountThree;
  let listingFee;
  let oneEther;
  let twoEther;
  let fiveMinutes;
  before(async () => {
    fiveMinutes = 300;
    [accountOne, accountTwo, accountThree, accountFour] =
      await ethers.getSigners();
    listingFee = ethers.utils.parseEther("0.01");
    oneEther = ethers.utils.parseEther("1");
    twoEther = ethers.utils.parseEther("2");
    threeEther = ethers.utils.parseEther("3");
    liveNftAuction = await loadFixture(auctionFixture);
    nftFactory = await loadFixture(factoryFixture);
    for (let i = 0; i <= 3; i++) {
      await nftFactory.createCollectable(
        SAMPLE_NFT_URI,
        liveNftAuction.address
      );
    }
  });
  it("List 3 NFT's for auction", async () => {
    let tokenId = 1;
    for (let i = 0; i <= 3; i++) {
      await liveNftAuction
        .connect(accountTwo)
        .listNftForAuction(nftFactory.address, tokenId, oneEther, {
          value: listingFee,
        });
      tokenId++;
    }
    const getAuctionListingOne = await liveNftAuction.auctionListings(
      nftFactory.address,
      1
    );

    // Confirms that listing struct fields are correct for NFT 1
    expect(getAuctionListingOne[0]).to.equal(1);
    expect(getAuctionListingOne[1]).to.equal(oneEther);
    expect(getAuctionListingOne[2]).to.equal(0);
    expect(getAuctionListingOne[3]).to.equal(true);
    expect(getAuctionListingOne[4]).to.equal(false);
    expect(getAuctionListingOne[5]).to.equal(nftFactory.address);
    expect(getAuctionListingOne[6]).to.equal(accountTwo.address);
    expect(getAuctionListingOne[7]).to.equal(liveNftAuction.address);
    expect(getAuctionListingOne[8]).to.equal("0x".padEnd(42, 0));

    const getAuctionListingTwo = await liveNftAuction.auctionListings(
      nftFactory.address,
      2
    );
    // Confirms that listing struct fields are correct for NFT 2
    expect(getAuctionListingTwo[0]).to.equal(2);
    expect(getAuctionListingTwo[1]).to.equal(oneEther);
    expect(getAuctionListingTwo[2]).to.equal(0);
    expect(getAuctionListingTwo[3]).to.equal(true);
    expect(getAuctionListingTwo[4]).to.equal(false);
    expect(getAuctionListingTwo[5]).to.equal(nftFactory.address);
    expect(getAuctionListingTwo[6]).to.equal(accountTwo.address);
    expect(getAuctionListingTwo[7]).to.equal(liveNftAuction.address);
    expect(getAuctionListingTwo[8]).to.equal("0x".padEnd(42, 0));

    const getAuctionListingThree = await liveNftAuction.auctionListings(
      nftFactory.address,
      3
    );
    // Confirms that listing struct fields are correct for NFT 3
    expect(getAuctionListingThree[0]).to.equal(3);
    expect(getAuctionListingThree[1]).to.equal(oneEther);
    expect(getAuctionListingThree[2]).to.equal(0);
    expect(getAuctionListingThree[3]).to.equal(true);
    expect(getAuctionListingThree[4]).to.equal(false);
    expect(getAuctionListingThree[5]).to.equal(nftFactory.address);
    expect(getAuctionListingThree[6]).to.equal(accountTwo.address);
    expect(getAuctionListingThree[7]).to.equal(liveNftAuction.address);
    expect(getAuctionListingThree[8]).to.equal("0x".padEnd(42, 0));
  });
  describe("Auction owner should start auction", () => {
    it("Auction in correct state", async () => {
      // Checks auction state before start auction function is called
      expect(await liveNftAuction.auctionState()).to.equal(0);
      await liveNftAuction.startAuction();
      // Checks auction state after start auction function is called
      expect(await liveNftAuction.auctionState()).to.equal(1);
    });
    it("Updates NFT (ID: 1) with isAuctioning info", async () => {
      const getAuctionListing = await liveNftAuction.auctionListings(
        nftFactory.address,
        1
      );
      const blockNumber = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNumber);
      // Checks struct fields that are updated on auction start
      expect(getAuctionListing[2]).to.equal(block.timestamp);
      expect(getAuctionListing[3]).to.equal(true);
      expect(getAuctionListing[4]).to.equal(true);
      expect(getAuctionListing[8]).to.equal("0x".padEnd(42, 0));
    });
  });
  describe("Bidding starts on NFT (ID: 1)", () => {
    it("accountThree bids on NFT (ID: 1)", async () => {
      await liveNftAuction.connect(accountThree).placeBid({
        value: twoEther,
      });
      const getAuctionListing = await liveNftAuction.auctionListings(
        nftFactory.address,
        1
      );
      expect(getAuctionListing[1]).to.equal(twoEther);
      expect(getAuctionListing[8]).to.equal(accountThree.address);
    });
    it("Tranfers NFT 1 to highest bidder (accountThree)", async () => {
      expect(await nftFactory.ownerOf(1)).to.equal(liveNftAuction.address);
      await ethers.provider.send("evm_increaseTime", [fiveMinutes]);
      await ethers.provider.send("evm_mine");
      await liveNftAuction.checkNftStatus();
      expect(await nftFactory.ownerOf(1)).to.equal(accountThree.address);
    });
    it("Updates balances of NFT seller and NFT buyer", async () => {
      const nftSellerBalance = await liveNftAuction.balances(
        accountTwo.address
      );
      const nftBuyerBalance = await liveNftAuction.balances(
        accountThree.address
      );
      expect(await nftSellerBalance).to.equal(twoEther);
      expect(await nftBuyerBalance).to.equal(0);
    });
    it("Should delete auction item struct and mapping", async () => {
      const ethereumZeroAddress = "0x".padEnd(42, "0");
      const getAuctionListing = await liveNftAuction.auctionListings(
        nftFactory.address,
        1
      );
      expect(getAuctionListing[0]).to.equal(0);
      expect(getAuctionListing[1]).to.equal(0);
      expect(getAuctionListing[2]).to.equal(0);
      expect(getAuctionListing[3]).to.equal(false);
      expect(getAuctionListing[4]).to.equal(false);
      expect(getAuctionListing[5]).to.equal(ethereumZeroAddress);
      expect(getAuctionListing[6]).to.equal(ethereumZeroAddress);
      expect(getAuctionListing[7]).to.equal(ethereumZeroAddress);
      expect(getAuctionListing[8]).to.equal(ethereumZeroAddress);
    });
  });
  describe("Sets new auction item", () => {
    it("NFT (ID: 2) isAuctioning", async () => {
      // Increments position
      await liveNftAuction.setAuctionNft();
      const getAuctionListingTwo = await liveNftAuction.auctionListings(
        nftFactory.address,
        2
      );
      const blockNumber = ethers.provider.getBlockNumber();
      const timestamp = (await ethers.provider.getBlock(blockNumber)).timestamp;
      // Confirms that new NFT is auctioning
      expect(getAuctionListingTwo[3]).to.equal(true);
      expect(getAuctionListingTwo[2]).to.equal(timestamp);
    });
    it("Updates NFT (ID: 2) with new bid info", async () => {
      await liveNftAuction.connect(accountThree).placeBid({
        value: twoEther,
      });
      const getAuctionListing = await liveNftAuction.auctionListings(
        nftFactory.address,
        2
      );
      expect(getAuctionListing[1]).to.equal(twoEther);
      expect(getAuctionListing[8]).to.equal(accountThree.address);
    });
    it("Tranfers NFT (ID: 2) to the bidLeader", async () => {
      expect(await nftFactory.ownerOf(2)).to.equal(liveNftAuction.address);
      await ethers.provider.send("evm_increaseTime", [fiveMinutes]);
      await ethers.provider.send("evm_mine");
      await liveNftAuction.checkNftStatus();
      expect(await nftFactory.ownerOf(2)).to.equal(accountThree.address);
    });
    it("NFT (ID: 3) isAuctioning", async () => {
      // Increments position
      await liveNftAuction.setAuctionNft();
      const getAuctionListingThree = await liveNftAuction.auctionListings(
        nftFactory.address,
        3
      );
      const blockNumber = ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNumber);
      expect(getAuctionListingThree[4]).to.equal(true);
      expect(getAuctionListingThree[2]).to.equal(block.timestamp);
    });
    it("Updates NFT (ID: 3) with new bid info", async () => {
      await liveNftAuction.connect(accountThree).placeBid({
        value: twoEther,
      });
      const getAuctionListing = await liveNftAuction.auctionListings(
        nftFactory.address,
        3
      );
      expect(getAuctionListing[1]).to.equal(twoEther);
      expect(getAuctionListing[8]).to.equal(accountThree.address);
    });
    it("Tranfers NFT (ID: 3) to highest bidder", async () => {
      expect(await nftFactory.ownerOf(3)).to.equal(liveNftAuction.address);
      await ethers.provider.send("evm_increaseTime", [fiveMinutes]);
      await ethers.provider.send("evm_mine");
      await liveNftAuction.checkNftStatus();
      expect(await nftFactory.ownerOf(3)).to.equal(accountThree.address);
    });
    // When all of the NFT's in current auction cycle have been sold
    // or returned to seller, the auction becomes inactive.
    it("Set auction state to inactive", async () => {
      await ethers.provider.send("evm_increaseTime", [fiveMinutes]);
      await ethers.provider.send("evm_mine");
      await liveNftAuction.checkNftStatus();
      expect(await liveNftAuction.auctionState()).to.equal(0);
    });
  });
  describe("Withdraw ETH balance from smart contract", () => {
    it("NFT seller has larger balance after withdrawing", async () => {
      const beforeWithdrawBal = await ethers.provider.getBalance(
        accountTwo.address
      );
      await liveNftAuction.connect(accountTwo).withdrawBalance();
      const afterWithdrawBal = await ethers.provider.getBalance(
        accountTwo.address
      );
      assert.isAbove(afterWithdrawBal, beforeWithdrawBal, "error");
    });
  });
});
