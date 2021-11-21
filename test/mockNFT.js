const MockNFT = artifacts.require("MockNFT");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MockNFT", function (accounts) {
  
  let mockNft;
  let [owner, alice, bob] = accounts;
  const toBN = web3.utils.toBN;

  before(async () => {
    mockNft = await MockNFT.deployed();
  });
  
  it("there are no tokens", async function () {
    assert.equal(await mockNft.balanceOf(owner), 0, `tokenBalance of owner should be 0`);
    assert.equal(await mockNft.balanceOf(alice), 0, `tokenBalance of alice should be 0`);
    assert.equal(await mockNft.balanceOf(bob), 0, `tokenBalance of bob should be 0`);
  });

  describe("Mint tokens", () => {

    it ("owner should mint token for himself", async () => {
        await mockNft.safeMint(owner);
        const tokenBalance = await mockNft.balanceOf(owner);
        assert.equal(tokenBalance, 1, `tokenBalance of owner should be 1 but is ${tokenBalance}`);
    });

    it ("owner should mint tokens for others", async () => {
      await mockNft.safeMint(alice);
      await mockNft.safeMint(bob);

      const tokenBalanceAlice = await mockNft.balanceOf(alice);
      assert.equal(tokenBalanceAlice, 1, `tokenBalance of Alice should be 1 but is ${tokenBalanceAlice}`);
      const tokenBalanceBob = await mockNft.balanceOf(bob);
      assert.equal(tokenBalanceBob, 1, `tokenBalance of Bob should be 1 but is ${tokenBalanceBob}`);
    });

    it ("non-owner shouldn't be able to mint tokens", async () => {
      try {
        await mockNft.safeMint(alice, {from: alice});
      } catch (err) {}
      const tokenBalance = await mockNft.balanceOf(alice);
      assert.equal(tokenBalance, 1, `tokenBalance of Alice should be 1 but is ${tokenBalance}`);
    });

  });


  describe("Set Roaylties", () => {

    it ("owner should set royalties", async () => {
      await mockNft.setRoyalties([owner, alice], [100, 50]);

      const ownerRoyalty = await mockNft.getRoyalty(owner);
      assert.equal(ownerRoyalty, 100, `royalty of owner should be 100 but is ${ownerRoyalty}`);
      const aliceRoyalty = await mockNft.getRoyalty(alice);
      assert.equal(aliceRoyalty, 50, `aliceRoyalty should be 50 but is ${aliceRoyalty}`);
      const bobRoyalty = await mockNft.getRoyalty(bob);
      assert.equal(bobRoyalty, 0, `bobRoyalty should be 0 but is ${bobRoyalty}`);
    });

    it ("non-owner shouldn't be able to set royalties", async () => {
      try {
        await mockNft.setRoyalties([owner, alice], [50, 100], {from: alice});
      } catch (err) {}
      const ownerRoyalty = await mockNft.getRoyalty(owner);
      assert.equal(ownerRoyalty, 100, `royalty of owner should be 100 but is ${ownerRoyalty}`);
    });

    it ("royalty cannot be bigger than 5%", async () => {
      try {
        await mockNft.setRoyalties([owner, alice], [500, 100]);
      } catch (err) {}
      const ownerRoyalty = await mockNft.getRoyalty(owner);
      assert.equal(ownerRoyalty, 100, `royalty of owner should be 100 but is ${ownerRoyalty}`);
    });

    it ("royalty cannot be set for more than 5 accounts", async () => {
      try {
        await mockNft.setRoyalties([owner, alice, bob, accounts[3], accounts[4], accounts[5]], [500, 50, 50, 50, 50, 50]);
      } catch (err) {}
      const ownerRoyalty = await mockNft.getRoyalty(owner);
      assert.equal(ownerRoyalty, 100, `royalty of owner should be 100 but is ${ownerRoyalty}`);
    });

    it ("input data missmatch", async () => {
      try {
        await mockNft.setRoyalties([owner, alice], [500, 50, 50]);
      } catch (err) {}
      const ownerRoyalty = await mockNft.getRoyalty(owner);
      assert.equal(ownerRoyalty, 100, `royalty of owner should be 100 but is ${ownerRoyalty}`);
    });

    it ("owner should update royalties", async () => {
      await mockNft.setRoyalties([owner, bob], [200, 100]);

      const ownerRoyalty = await mockNft.getRoyalty(owner);
      assert.equal(ownerRoyalty, 200, `royalty of owner should be 200 but is ${ownerRoyalty}`);
      const aliceRoyalty = await mockNft.getRoyalty(alice);
      assert.equal(aliceRoyalty, 0, `aliceRoyalty should be 0 but is ${aliceRoyalty}`);
      const bobRoyalty = await mockNft.getRoyalty(bob);
      assert.equal(bobRoyalty, 100, `bobRoyalty of bob should be 100 but is ${bobRoyalty}`);
    });

  });


  describe("Modify Offers", () => {
    
    it ("there are no offers", async () => {
      assert.equal(await mockNft.getOfferPrice(0), 0, `price for tokenId=0 should be 0`);
      assert.equal(await mockNft.getOfferPrice(1), 0, `price for tokenId=1 should be 0`);
      assert.equal(await mockNft.getOfferPrice(2), 0, `price for tokenId=2 should be 0`);
    });

    it ("token owner can create an offer", async () => {
      await mockNft.setOfferPrice(0, 10000);

      const token0OfferPrice = await mockNft.getOfferPrice(0);
      assert.equal(token0OfferPrice, 10000, `token0OfferPrice should be 10000 but is ${token0OfferPrice}`);
    });

    it ("token owner can modify an offer", async () => {
      await mockNft.setOfferPrice(0, 15000);

      const token0OfferPrice = await mockNft.getOfferPrice(0);
      assert.equal(token0OfferPrice, 15000, `token0OfferPrice should be 15000 but is ${token0OfferPrice}`);
    });

    it ("only token owner can create an offer", async () => {
      try {
        await mockNft.setOfferPrice(0, 5000, {from: alice});
      } catch (err) {}
      const token0OfferPrice = await mockNft.getOfferPrice(0);
      assert.equal(token0OfferPrice, 15000, `token0OfferPrice should be 15000 but is ${token0OfferPrice}`);
    });

    it ("only token owner can cancel an offer", async () => {
      try {
        await mockNft.cancelOffer(0, {from: alice});
      } catch (err) {}
      const token0OfferPrice = await mockNft.getOfferPrice(0);
      assert.equal(token0OfferPrice, 15000, `token0OfferPrice should be 15000 but is ${token0OfferPrice}`);
    });

    it ("token owner can cancel an offer", async () => {
      await mockNft.cancelOffer(0);

      const token0OfferPrice = await mockNft.getOfferPrice(0);
      assert.equal(token0OfferPrice, 0, `token0OfferPrice should be 0 but is ${token0OfferPrice}`);
    });

  });


  describe("Trade Tokens", () => {

    it ("token transfered", async () => {
      assert.equal(await mockNft.balanceOf(owner), 1, `tokenBalance of owner should be 1`);
      assert.equal(await mockNft.balanceOf(alice), 1, `tokenBalance of Alice should be 1`);
      
      await mockNft.setOfferPrice(0, 10000);
      await mockNft.acceptOffer(0, {from: alice, value: 10000});
      assert.equal(await mockNft.balanceOf(owner), 0, `tokenBalance of owner should be 0`);
      assert.equal(await mockNft.balanceOf(alice), 2, `tokenBalance of Alice should be 2`);
    });


    it ("offer cancelled", async () => {
      await mockNft.setOfferPrice(0, 10000, {from: alice});
      assert.equal(await mockNft.getOfferPrice(0), 10000, `offerPrice for token=0 should be 10000`);

      await mockNft.acceptOffer(0, {value: 10000});
      assert.equal(await mockNft.getOfferPrice(0), 0, `offerPrice for token=0 should be 0`);
    });

    it ("payments distributed", async () => {
      await mockNft.setOfferPrice(0, 10000);

      const ownerInitBalance = await web3.eth.getBalance(owner);
      const aliceInitBalance = await web3.eth.getBalance(alice);
      const bobInitBalance = await web3.eth.getBalance(bob);

      const receipt = await mockNft.acceptOffer(0, {from: alice, value: 10000});
      const gasUsed = receipt.receipt.gasUsed;
      const gasPrice = (await web3.eth.getTransaction(receipt.tx)).gasPrice;

      const ownerEndBalance = await web3.eth.getBalance(owner);
      const aliceEndBalance = await web3.eth.getBalance(alice);
      const bobEndBalance = await web3.eth.getBalance(bob);
      
      // owner: +200 from royalties, +9700 from selling NFT
      const ownerBalanceChange = toBN(ownerEndBalance).sub(toBN(ownerInitBalance));
      const ownerBalanceChangeExpected = toBN(9900);
      assert.isTrue(ownerBalanceChange.eq(ownerBalanceChangeExpected), `ownerBalanceChange should be ${ownerBalanceChangeExpected}, but is ${ownerBalanceChange}`);

      // alice: -10000 from buying NFT - gasPrice*gasUsed
      const aliceBalanceChange = toBN(aliceEndBalance).sub(toBN(aliceInitBalance));
      const aliceBalanceChangeExpected = toBN(-10000 - gasPrice * gasUsed);
      assert.isTrue(aliceBalanceChange.eq(aliceBalanceChangeExpected), `aliceBalanceChange should be ${aliceBalanceChangeExpected}, but is ${aliceBalanceChange}`);

      // bob: +100 from royalties
      const bobBalanceChange = toBN(bobEndBalance).sub(toBN(bobInitBalance));
      const bobBalanceChangeExpected = toBN(100);
      assert.isTrue(bobBalanceChange.eq(bobBalanceChangeExpected), `bobBalanceChange should be ${bobBalanceChangeExpected}, but is ${bobBalanceChange}`);
    });

    it ("payment for non-existing order does nothing", async () => {
      try {
        await mockNft.acceptOffer(5, {from: accounts[5], value: 1e18});
      } catch (err) {}
      const tokensOwned = await mockNft.balanceOf(accounts[5]);
      assert.equal(tokensOwned, 0, `accounts[5] should own 0 tokens`);
    });    

    it ("insufficient payment does nothing", async () => {
      await mockNft.setOfferPrice(0, 10000, {from: alice});
      try {
        await mockNft.acceptOffer(0, {value: 8000});
      } catch (err) {}
      const tokensOwned = await mockNft.balanceOf(owner);
      assert.equal(tokensOwned, 0, `owner should own 0 tokens`);
    });    

  });

});
