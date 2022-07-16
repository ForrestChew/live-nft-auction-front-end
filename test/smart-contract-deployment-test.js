const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Deploy LiveNftAuction', () => {
  let liveNftAuction;
  let accountOne;
  let listingFee;
  beforeEach(async () => {
    [accountOne] = await ethers.getSigners();
    listingFee = ethers.utils.parseEther('0.01');
    const LiveNftAuction = await ethers.getContractFactory('LiveNftAuction');
    liveNftAuction = await LiveNftAuction.deploy(
      accountOne.address,
      listingFee
    );
  });
  it('Should deploy smart contract', async () => {
    expect(liveNftAuction.address.length).to.equal(42);
  });
  it('Should assign accouneOne address to be auction owner', async () => {
    expect(await liveNftAuction.auctionOwner()).to.equal(accountOne.address);
  });
  it('Should set the auction listing fee to 0.01 ETH', async () => {
    expect(await liveNftAuction.listingFee()).to.equal(listingFee);
  });
});
