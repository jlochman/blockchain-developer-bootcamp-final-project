const MockNFT = artifacts.require("MockNFT");

module.exports = function (deployer) {
  deployer.deploy(MockNFT);
};
