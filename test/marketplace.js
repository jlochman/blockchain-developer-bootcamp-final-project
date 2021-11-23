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
  let [owner, alice, bob, creator] = accounts;
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

  it("set token royalties", async function () {
    await mockNft.setRoyalties([creator], [300]);
    assert.equal(await mockNft.getRoyalty(creator), 300, `creator royalty should be 300`);
  });


  describe("Register Collection", () => {

    it("register collection", async function () {
      await marketplace.registerCollection(mockNft.address, 100);
      const collectionFee = await marketplace.getCollectionFee(mockNft.address);
      assert.isTrue(await marketplace.collectionRegistered(mockNft.address));
      assert.equal(collectionFee, 100, `collectionFee should be 100 but is ${collectionFee}`);
    });

    it("only owner can register collection", async function () {
      try {
        await marketplace.registerCollection(marketplace.address, 200, { from: alice });
      } catch (err) { }
      assert.isFalse(await marketplace.collectionRegistered(marketplace.address));
    });

    it("change registered collection fee", async function () {
      await marketplace.setCollectionFee(mockNft.address, 300);
      const collectionFee = await marketplace.getCollectionFee(mockNft.address);
      assert.equal(collectionFee, 300, `collectionFee should be 300 but is ${collectionFee}`);
    });

    it("only owner can change registered collection fee", async function () {
      var error = false;
      try {
        await marketplace.setCollectionFee(mockNft.address, 50, { from: alice });
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

    it("only registered collection can be assigned fee", async function () {
      var error = false;
      try {
        await marketplace.setCollectionFee(accounts[10], 100);
      } catch (err) { error = true }

    });

    it("only some values of fee are allowed", async function () {
      var error = false;
      try {
        await marketplace.setCollectionFee(mockNft.address, 1000);
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

  });



  describe("Set Flat Listing Fee", () => {

    it("initialized at 1000 wei", async function () {
      const flatFee = await marketplace.getFlatListngFee();
      assert.equal(flatFee, 1000, `flatFee must be 1000, but is ${flatFee}`);
    });

    it("change to a new value", async function () {
      await marketplace.setFlatListingFee(50000);
      const flatFee = await marketplace.getFlatListngFee();
      assert.equal(flatFee, 50000, `flatFee must be 50000, but is ${flatFee}`);
    });

    it("only owner can change to a new value", async function () {
      var error = false;
      try {
        await marketplace.setFlatListingFee(50000, { from: alice });
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

  });




  describe("Create and Cancel Auction", () => {

    it("marketplace must be approved", async function () {
      var error = false;
      try {
        await marketplace.openAuction(mockNft.address, 0, 10000, 60);
      } catch (err) { error = true; }
      assert.isTrue(error);

      await mockNft.setApprovalForAll(marketplace.address, true);
      await marketplace.openAuction(mockNft.address, 0, 10000, 60, { value: 50000 });
      assert.isTrue(await marketplace.auctionOpened(mockNft.address, 0));
    });

    it("auction creator must send enough for listing fee", async function () {
      var error = false;
      try {
        await marketplace.openAuction(mockNft.address, 1, 10000, 60, { value: 100 });
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

    it("auction cannot be for a longer period than 30 days", async function () {
      var error = false;
      try {
        await marketplace.openAuction(mockNft.address, 0, 60 * 60 * 24 * 31, 60, { value: 50000 });
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

    it("only token owner can create auction", async function () {
      var error = false;
      try {
        await marketplace.openAuction(mockNft.address, 1, 10000, 60, { from: alice, value: 50000 });
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

    it("flat fee is paid when auction is created", async function () {
      const marketBalance = await web3.eth.getBalance(marketplace.address);
      await marketplace.openAuction(mockNft.address, 1, 10000, 60, { value: 50000 });
      const marketBalanceNew = await web3.eth.getBalance(marketplace.address);
      const marketBalanceChange = toBN(marketBalanceNew).sub(toBN(marketBalance));
      assert.equal(marketBalanceChange, 50000, `marketBalanceChange should be 500 but is ${marketBalanceChange}`);
    });

    it("token is transfered to marketplace", async function () {
      await mockNft.setApprovalForAll(marketplace.address, true, { from: bob });

      assert.equal(await mockNft.ownerOf(6), bob, "owner of token=6 is bob")
      await marketplace.openAuction(mockNft.address, 6, 10000, 60, { from: bob, value: 50000 });
      assert.equal(await mockNft.ownerOf(6), marketplace.address, "owner of token=6 is marketplace")
    });

    it("creator can cancel auction", async function () {
      assert.isTrue(await marketplace.auctionOpened(mockNft.address, 0));
      await marketplace.cancelAuction(mockNft.address, 0);
      assert.isFalse(await marketplace.auctionOpened(mockNft.address, 0));
    });

    it("bidded auction cannot be canceled", async function () {
      assert.isTrue(await marketplace.auctionOpened(mockNft.address, 1));
      await marketplace.placeBid(mockNft.address, 1, { from: alice, value: 100000 });

      var error = false;
      try {
        await marketplace.cancelAuction(mockNft.address, 1);
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

    it("token is transfered back to auction creator", async function () {
      assert.equal(await mockNft.ownerOf(6), marketplace.address, "owner of token=6 is marketplace")
      assert.isTrue(await marketplace.auctionOpened(mockNft.address, 6));
      await marketplace.cancelAuction(mockNft.address, 6, { from: bob });
      assert.equal(await mockNft.ownerOf(6), bob, "owner of token=6 is bob")
    });

  });



  describe("Place Bids", () => {
    it("first bid cannot be lower than start price", async function () {
      await mockNft.setApprovalForAll(marketplace.address, true, { from: alice });

      await marketplace.openAuction(mockNft.address, 3, 10000, 60, { from: alice, value: 50000 });
      assert.isTrue(await marketplace.auctionOpened(mockNft.address, 3));

      var error = false;
      try {
        await marketplace.placeBid(mockNft.address, 3, { from: bob, value: 9999 });
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

    it("first bid at start price can be accepted", async function () {
      assert.equal(await marketplace.getCurrentBid(mockNft.address, 3), 0);
      await marketplace.placeBid(mockNft.address, 3, { from: bob, value: 10000 });
      assert.equal(await marketplace.getCurrentBid(mockNft.address, 3), 10000);
    });

    it("second bid cannot be lower than existing bid + 10%", async function () {
      assert.equal(await marketplace.getCurrentBid(mockNft.address, 3), 10000);

      var error = false;
      try {
        await marketplace.placeBid(mockNft.address, 3, { from: bob, value: 10100 });
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

    it("second bid at price of existing bid + 10% can be accepted", async function () {
      assert.equal(await marketplace.getCurrentBid(mockNft.address, 3), 10000);
      await marketplace.placeBid(mockNft.address, 3, { from: bob, value: 11000 });
      assert.equal(await marketplace.getCurrentBid(mockNft.address, 3), 11000);
    });

    it("first bid is returned to bidder when second bid is placed", async function () {
      await marketplace.openAuction(mockNft.address, 4, 10000, 60, { from: alice, value: 50000 });
      await marketplace.placeBid(mockNft.address, 4, { from: bob, value: 20000 });
      const bobBalance = await web3.eth.getBalance(bob);

      await marketplace.placeBid(mockNft.address, 4, { from: alice, value: 30000 });
      const updatedBobBalance = await web3.eth.getBalance(bob);

      const bobBalanceChange = toBN(updatedBobBalance).sub(toBN(bobBalance));
      assert.equal(bobBalanceChange, 20000, "bob should received 20000 wei from overbid");
    });

  });


  describe("Claim Reward", () => {

    it("reward cannot be claimed before auction ends", async function () {
      await marketplace.openAuction(mockNft.address, 7, 10000, 60, { from: bob, value: 50000 });
      await marketplace.placeBid(mockNft.address, 7, { from: alice, value: 100000 });

      var error = false;
      try {
        await marketplace.claimReward(mockNft.address, 7, { from: alice });
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

    it("only winner can claim the reward", async function () {
      assert.equal(await mockNft.ownerOf(8), bob, "token8 owner: bob");
      await marketplace.openAuction(mockNft.address, 8, 10000, 2, { from: bob, value: 50000 });
      await marketplace.placeBid(mockNft.address, 8, { from: alice, value: 100000 });

      await timeout(3000);
      var error = false;
      try {
        await marketplace.claimReward(mockNft.address, 8, { from: bob });
      } catch (err) { error = true; }
      assert.isTrue(error);
    });

    it("token is transfered to auction winner", async function () {
      await marketplace.claimReward(mockNft.address, 8, { from: alice });
      assert.equal(await mockNft.ownerOf(8), alice, "token8 owner: alice");
    });

    it("creators get their royalties, seller, buyer and marketplace their reward", async function () {
      const initMarketplaceBalance = await web3.eth.getBalance(marketplace.address);
      const initAliceBalance = await web3.eth.getBalance(alice);
      const initBobBalance = await web3.eth.getBalance(bob);
      const initCreatorBalance = await web3.eth.getBalance(creator);

      const receipt1 = await marketplace.openAuction(mockNft.address, 5, 100000, 2, { from: alice, value: 50000 });
      const tx1Fee = receipt1.receipt.gasUsed * (await web3.eth.getTransaction(receipt1.tx)).gasPrice;

      const receipt2 = await marketplace.placeBid(mockNft.address, 5, { from: bob, value: 300000 });
      const tx2Fee = receipt2.receipt.gasUsed * (await web3.eth.getTransaction(receipt2.tx)).gasPrice;

      await timeout(5000);

      const receipt3 = await marketplace.claimReward(mockNft.address, 5, { from: bob });
      const tx3Fee = receipt3.receipt.gasUsed * (await web3.eth.getTransaction(receipt3.tx)).gasPrice;

      const flatFee = await marketplace.getFlatListngFee();
      const royaltiesFee = await mockNft.getRoyalties();
      const marketplaceFee = await marketplace.getCollectionFee(mockNft.address);
      const creatorFee = await mockNft.getRoyalty(creator);

      // marketplace: flatFee from auction listing + fee from sale
      const marketplaceBalanceChange = toBN(await web3.eth.getBalance(marketplace.address)).sub(toBN(initMarketplaceBalance));
      const marketplaceBalanceChangeExpected = toBN(flatFee).add(toBN(300000 * marketplaceFee / 10000));
      assert.isTrue(
        marketplaceBalanceChange.eq(marketplaceBalanceChangeExpected),
        `marketplaceBalanceChange should be ${marketplaceBalanceChangeExpected}, but is ${marketplaceBalanceChangeExpected}`
      );

      // alice: reward from auction sell (minus what goes to royalties and marketplace), minus fee for tx1, minus flatFee for opening auction
      const aliceBalanceChange = toBN(await web3.eth.getBalance(alice)).sub(toBN(initAliceBalance));
      const aliceBalanceChangeExpected = toBN(300000).sub(toBN(300000 * (Number(marketplaceFee) + Number(royaltiesFee)) / 10000)).sub(toBN(tx1Fee)).sub(toBN(flatFee));
      assert.isTrue(
        aliceBalanceChange.eq(aliceBalanceChangeExpected),
        `aliceBalanceChange should be ${aliceBalanceChangeExpected}, but is ${aliceBalanceChange}`
      );

      // bob: fees for tx2 and tx3 and payment for winning the auction
      const bobBalanceChange = toBN(await web3.eth.getBalance(bob)).sub(toBN(initBobBalance));
      const bobBalanceChangeExpected = toBN(0).sub(toBN(tx2Fee)).sub(toBN(tx3Fee)).sub(toBN(300000));
      assert.isTrue(
        bobBalanceChange.eq(bobBalanceChangeExpected),
        `bobBalanceChange should be ${bobBalanceChangeExpected}, but is ${bobBalanceChange}`
      );

      // creator: gets royalty
      const creatorBalanceChange = toBN(await web3.eth.getBalance(creator)).sub(toBN(initCreatorBalance));
      const creatorBalanceChangeExpected = toBN(300000 * creatorFee / 10000);
      assert.isTrue(
        creatorBalanceChange.eq(creatorBalanceChangeExpected),
        `creatorBalanceChange should be ${creatorBalanceChangeExpected}, but is ${creatorBalanceChange}`
      );
    });

  });

});
