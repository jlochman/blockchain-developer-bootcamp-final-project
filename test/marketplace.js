const Marketplace = artifacts.require("Marketplace");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Marketplace", function (accounts) {
  it("should assert true", async function () {
    await Marketplace.deployed();
    return assert.isTrue(true);
  });

  it("has an initial value of 0", async () => {
    const marketplaceContract = await Marketplace.deployed();
    const storedData = await marketplaceContract.getStoredData.call();
    return assert.equal(storedData, 0, `Initial state should be zero`);
  });

  describe("Functionality", () => {
      it("owner should change sotredData", async () => {
        const marketplaceContract = await Marketplace.deployed();
        await marketplaceContract.setStoredData(42, {from: accounts[0]});
        const storedData = await marketplaceContract.getStoredData.call();
        return assert.equal(storedData, 42, `storedData should be 42 but is ${storedData}`);
      });

      it("non-owner shouldn't be able to change storedData", async () => {
        const marketplaceContract = await Marketplace.deployed();
        try {
          await marketplaceContract.setStoredData(22, {from: accounts[1]});
        } catch (err) {}
        const storedData = await marketplaceContract.getStoredData.call();
        return assert.equal(storedData, 42, `storedData should be 42 but is ${storedData}`);
      });
  });

});
