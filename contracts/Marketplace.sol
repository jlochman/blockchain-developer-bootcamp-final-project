// SPDX-License-Identifier: MARKLAR
pragma solidity 0.8.10;

contract Marketplace {

    modifier onlyOwner {
        _;
    }

    modifier onlyERC721(address nftCollection) {
        _;
    }

    modifier onlyRegisteredCollections(address nftCollection) {
        _;
    }

    /** ============================
    * ===== NFT REGISTRY, FEES, ROYALTIES
    * ============================ */

    constructor() {}

    // register given NFT collection
    // nftCollection - address of ERC721 contract
    function registerNftCollection(address nftCollection) 
        external onlyOwner onlyERC721(nftCollection) {

    }

    // set flat fee for listing nft to a marketplace
    // fee - fee in wei
    function setNftListingFee(uint fee) 
        external onlyOwner {

    }

    // sets custom fee for every sale on given NFT collection
    // nftCollection - address of ERC721 contract
    // share - how much (in basis points) marketplace receives (share=200 means 2%)
    function setNftCollectionFee(address nftCollection, uint share) 
        external onlyOwner onlyRegisteredCollections(nftCollection) {

    }

    // sets royalty addresses for given NFT collection
    // nftCollection - address of ERC721 contract
    // beneficiaries[] - addresses who get a share
    // shares[] - sizes of shares in basis points
    function setNftRoyalties(address nftCollection, address[] calldata beneficiaries, uint[] calldata shares) 
        external onlyOwner onlyRegisteredCollections(nftCollection) {

    }




    /** ============================
    * ===== BUY NOW
    * ============================ */

    function offerForSale(address nftCollection, uint tokenId, uint price) 
        external payable  {
            // payable because there will be a listing fee
    }

    function cancelSale(address nftCollection, uint tokenId) 
        external onlyRegisteredCollections(nftCollection) {
    }

    function buyNow(address nftCollection, uint tokenId)
        external payable onlyRegisteredCollections(nftCollection) {
    }




    /** ============================
    * ===== AUCTION
    * ============================ */

    function offerForAuction(address nftCollection, uint tokenId, uint startPrice, uint auctionTimeSeconds) 
        external payable {
            // payable because there will be a listing fee
    }

    function cancelAuction(address nftCollection, uint tokenId) 
        external {

    }

    function placeBid(address nftCollection, uint tokenId, uint price) 
        external payable {
        // ETH is returned to the bidder, if higher bid is placed
    }

    function claimReward(address nftCollection, uint tokenId) 
        external {
        // this must be called by winner to claim his reward
    }



     

}