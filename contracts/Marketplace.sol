// SPDX-License-Identifier: MARKLAR
pragma solidity 0.8.10;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "./MockNFT.sol";

contract Marketplace is Ownable {

    mapping(address => CollectionInfo) private _collections;
    uint256 private _flatFee = 1000 wei;

    struct CollectionInfo {
        MockNFT collection;
        uint256 fee;
        mapping(uint256 => AuctionInfo) auctions;
    }

    struct AuctionInfo {
        uint256 tokenId;
        address tokenOwner;
        uint256 started;
        uint256 ends;
        uint256 startPrice;
        address bidder;
        uint256 bidderValue;
    }

    event CollectionRegistered(MockNFT collection);
    event CollectionFeeSet(MockNFT collection, uint256 fee);
    event FlatFeeSet(uint256 flatFee);
    event AuctionCreated(MockNFT collection, uint256 tokenId, uint256 startPrice, uint256 auctionTimeSeconds, address creator);
    event AuctionCancelled(MockNFT collection, uint256 tokenId, address creator);
    event AuctionWon(MockNFT collection, uint256 tokenId, address winner, uint256 winningBid);
    event BidReturned(MockNFT collection, uint256 tokenId, address bidder, uint256 bid);
    event BidPlaced(MockNFT collection, uint256 tokenId, address bidder, uint256 bid);
    event OwnerPaid(MockNFT collection, uint256 tokenId, address owner, uint256 payout);
    event FlatFeePaid(MockNFT collection, uint256 tokenId, uint256 flatFee, address payer);

    
    modifier onlyRegisteredCollections(MockNFT collection) {
        require(_collections[address(collection)].fee > 0, "collection is not registered");
        _;
    }

    modifier validFee(uint256 fee) {
        require(fee > 0 && fee < 500, "fee must be > 0 & < 500");
        _;
    }

    modifier validCollection(MockNFT collection) {
        // TODO: validate address is MockNFT contract
        _;
    }

    // fee - fee in basis points paid for each auction (fee=100 means 1%)
    function registerCollection(MockNFT collection, uint256 fee) public onlyOwner validFee(fee) validCollection(collection) {
        CollectionInfo storage collectionInfo = _collections[address(collection)];
        collectionInfo.collection = collection;
        collectionInfo.fee = fee;

        emit CollectionRegistered(collection);
        emit CollectionFeeSet(collection, fee);
    }

    function setCollectionFee(MockNFT collection, uint256 fee) public onlyOwner validFee(fee) onlyRegisteredCollections(collection) {
        if (_collections[address(collection)].fee != fee) {
            _collections[address(collection)].fee=fee;
            emit CollectionFeeSet(collection, fee);
       }
    }

    function getCollectionFee(MockNFT collection) public view onlyRegisteredCollections(collection) returns (uint256)  {
        return _collections[address(collection)].fee;
    }

    // flatFee - fee in wei paid for each listing
    function setFlatListingFee(uint256 flatFee) public onlyOwner {
        _flatFee = flatFee;
        emit FlatFeeSet(flatFee);
    }

    function getFlatListngFee() public view returns (uint256) {
        return _flatFee;
    }

    /** ============================
    * ===== AUCTION
    * ============================ */
    function openAuction(MockNFT collection, uint256 tokenId, uint256 startPrice, uint256 auctionTimeSeconds) public payable onlyRegisteredCollections(collection) {
        require(collection.ownerOf(tokenId) == msg.sender, "sender is not token owner");
        require(collection.isApprovedForAll(msg.sender, address(this)), "collection is not approved for marketplace");
        require(msg.value >= _flatFee, "sender is not paying enough listing fee");

        _collections[address(collection)].auctions[tokenId] = AuctionInfo({
            tokenId: tokenId,
            tokenOwner: msg.sender,
            started: block.timestamp,
            ends: block.timestamp + auctionTimeSeconds,
            startPrice: startPrice,
            bidder: address(0),
            bidderValue: 0
        });
        
        (bool flatFeePaid, /* bytes memory data */) = payable(msg.sender).call{value: msg.value - _flatFee}("");
        require(flatFeePaid, "FlatFee hasn't be paid");
        emit FlatFeePaid(collection, tokenId, _flatFee, msg.sender);

        collection.transferFrom(msg.sender, address(this), tokenId);
        emit AuctionCreated(collection, tokenId, startPrice, auctionTimeSeconds, msg.sender);
    }

    function cancelAuction(MockNFT collection, uint256 tokenId) public onlyRegisteredCollections(collection) {
        AuctionInfo memory auctionInfo = _collections[address(collection)].auctions[tokenId];
        require(auctionInfo.tokenOwner == msg.sender, "only auction creator can cancel it");
        require(auctionInfo.bidderValue == 0, "auction with bid cannot be cancelled");

        delete _collections[address(collection)].auctions[tokenId];

        collection.transferFrom(address(this), msg.sender, tokenId);
        emit AuctionCancelled(collection, tokenId, msg.sender);
    }

    function placeBid(MockNFT collection, uint256 tokenId) public payable onlyRegisteredCollections(collection) {
        AuctionInfo memory auctionInfo = _collections[address(collection)].auctions[tokenId];
        require(auctionInfo.started > 0 && block.timestamp < auctionInfo.ends, "auction is not active");

        uint256 minBid = auctionInfo.startPrice;
        if (auctionInfo.bidderValue > 0) {
            minBid = 11 * auctionInfo.bidderValue / 10;
        }
        require(msg.value >= minBid, "bid value not sufficient");

        if (auctionInfo.bidder != address(0)) {
            (bool bidReturned, /* bytes memory data */) = payable(auctionInfo.bidder).call{value: auctionInfo.bidderValue}("");
            require(bidReturned, "Bid hasn't be returned");
            emit BidReturned(collection, tokenId, auctionInfo.bidder, auctionInfo.bidderValue);
        }
        _collections[address(collection)].auctions[tokenId].bidder = msg.sender;
        _collections[address(collection)].auctions[tokenId].bidderValue= msg.value;
        emit BidPlaced(collection, tokenId, msg.sender, msg.value);
    }

    function claimReward(MockNFT collection, uint256 tokenId) public payable {
        AuctionInfo memory auctionInfo = _collections[address(collection)].auctions[tokenId];
        require(block.timestamp > auctionInfo.ends, "auction hasn't ended yet");
        require(msg.sender == auctionInfo.bidder, "only auction winner can claim reward");

        uint256 paidToCreators = collection.rewardCreators(auctionInfo.bidderValue);
        uint256 paidToMarketplace = auctionInfo.bidderValue * _collections[address(collection)].fee / 1000;
        uint256 payToOwner = auctionInfo.bidderValue - paidToCreators - paidToMarketplace;

        (bool ownerPaid, /* bytes memory data */) = payable(auctionInfo.tokenOwner).call{value: payToOwner}("");
        require(ownerPaid, "owner hasn't been paid");
        emit OwnerPaid(collection, tokenId, auctionInfo.tokenOwner, payToOwner);

        delete _collections[address(collection)].auctions[tokenId];

        collection.transferFrom(address(this), msg.sender, tokenId);
        emit AuctionWon(collection, tokenId, msg.sender, auctionInfo.bidderValue);
    }     

}