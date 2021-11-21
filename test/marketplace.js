const MockNFT = artifacts.require("MockNFT");
const Marketplace = artifacts.require("Marketplace");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Marketplace", function (accounts) {
  
  let mockNft;
  let marketplace;
  let [owner, alice, bob] = accounts;
  const toBN = web3.utils.toBN;

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  before(async () => {
    mockNft = await MockNFT.deployed();
    marketplace = await Marketplace.deployed();
  });

  it("mint tokens", async function () {
    await mockNft.safeMint(owner);
    await mockNft.safeMint(owner);
    await mockNft.safeMint(owner);
    await mockNft.safeMint(alice);
    await mockNft.safeMint(alice);
    await mockNft.safeMint(alice);
    await mockNft.safeMint(bob);
    await mockNft.safeMint(bob);
    await mockNft.safeMint(bob);

    assert.equal(await mockNft.balanceOf(owner), 3, `tokenBalance of owner should be 3`);
    assert.equal(await mockNft.balanceOf(alice), 3, `tokenBalance of alice should be 3`);
    assert.equal(await mockNft.balanceOf(bob), 3, `tokenBalance of bob should be 3`);
  });

  describe("Register Collection", () => {

    it("register collection", async function () {
    });

    it("only owner can register collection", async function () {
    });

    it("change registered collection fee", async function () {
    });

    it("only owner can change registered collection fee", async function () {
    });

    it("only registered collection can be assigned fee", async function () {
    });

    it("only some values of fee are allowed", async function () {
    });

  });

  describe("Set Flat Listing Fee", () => {

    it("initialized at 1000 wei", async function () {
    });

    it("change to a new value", async function () {
    });

    it("only owner can change to a new value", async function () {
    });

  });

  describe("Create and Cancel Auction", () => {

    it("token owner can create auction", async function () {
    });
  
    it("flat fee is paid when auction is created", async function () {
    });

    it("token is transfered to marketplace", async function () {
    });

    it("owner creator can cancel auction", async function () {
    });

    it("bidded auction cannot be canceled", async function () {
    });

    it("token is transfered back to auction creator", async function () {
    });

  });

  describe("Place Bids", () => {

    it("first bid cannot be lower than start price", async function () {
    });

    it("first bid at start price can be accepted", async function () {
    });

    it("second bid cannot be lower than existing bid + 10%", async function () {
    });

    it("second bid at price of existing bid + 10% can be accepted", async function () {
    });

    it("first bid is returned to bidder when second bid is placed", async function () {
    });

  });

  describe("Claim Reward", () => {

    it("reward cannot be claimed before auction ends", async function () {
    });

    it("only winner can claim the reward", async function () {
      await timeout(5000);
    });

    it("token is transfered to auction winner", async function () {
      await timeout(5000);
    });

    it("creators get their royalties, seller and marketplace their reward", async function () {
      await timeout(5000);
    });

  });

  it("register collection", async function () {
    await marketplace.registerCollection(mockNft.address, 100);

    const fee = await marketplace.getCollectionFee(mockNft.address);
    console.log(`fee: ${fee}`);

    await mockNft.setApprovalForAll(marketplace.address, true);
    console.log(`owner ${await mockNft.ownerOf(0)}, marketplaceBalance: ${await web3.eth.getBalance(marketplace.address)}`);
    
    await marketplace.openAuction(mockNft.address,0, 10000, 5, {value: 5000});
    console.log(`owner ${await mockNft.ownerOf(0)}, marketplaceBalance: ${await web3.eth.getBalance(marketplace.address)}`);
    
    await marketplace.placeBid(mockNft.address,0, {from:alice, value:12000});
    console.log(`owner ${await mockNft.ownerOf(0)}, marketplaceBalance: ${await web3.eth.getBalance(marketplace.address)}`);
    
    await marketplace.placeBid(mockNft.address,0, {from:bob, value:15000});
    console.log(`owner ${await mockNft.ownerOf(0)}, marketplaceBalance: ${await web3.eth.getBalance(marketplace.address)}`);

    await marketplace.placeBid(mockNft.address,0, {from:alice, value:20000});
    console.log(`owner ${await mockNft.ownerOf(0)}, marketplaceBalance: ${await web3.eth.getBalance(marketplace.address)}`);

    await timeout(5000);

    await marketplace.claimReward(mockNft.address,0, {from:alice});
    console.log(`owner ${await mockNft.ownerOf(0)}, marketplaceBalance: ${await web3.eth.getBalance(marketplace.address)}`);

  });

});
