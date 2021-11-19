const MockNFT = artifacts.require("MockNFT");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MockNFT", function (/* accounts */) {
  it("should assert true", async function () {
    await MockNFT.deployed();
    return assert.isTrue(true);
  });
});
