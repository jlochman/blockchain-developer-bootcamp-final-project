// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";

contract MockNFT is ERC721, Ownable {
    
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // creators obtaining shares, key: creator address, value: share in basis points (100=1%)
    mapping(address => uint16) private _royalties;
    address[] private _creators;
    uint16 private _royaltiesSum;

    // token offers, key: tokenId, value: price for which the token is offered
    mapping(uint256 => uint256) private _tokenOffers;

    event SetRoyalty(address creator, uint16 share);
    event OfferCreated(uint256 tokenId, uint256 sellPrice);
    event OfferUpdated(uint256 tokenId, uint256 sellPrice);
    event CancelOfer(uint256 tokenId);
    event OfferAccepted(uint256 tokenId, uint256 price, address buyer, address seller);
    event RyoaltyPayment(address creator, uint256 roaylty);
    event OwnerPayment(address owner, uint256 amount);

    event Test(uint256 msg);

    modifier onlyTokenOwner(uint256 tokenId) {
        require(msg.sender == ownerOf(tokenId), "Sender is not owner of the token");
        _;
    }

    modifier offerExists(uint256 tokenId) {
        require(_tokenOffers[tokenId] > 0, "offer does not exist");
        _;
    }

    constructor() ERC721("MockNFT", "MOCK") {}

    receive() external payable {
        if (_royaltiesSum == 0) {
            (bool ownerPaid, /* bytes memory data */) = payable(owner()).call{value: msg.value}("");
            require(ownerPaid, "problem paying the owner");
        } else {
            rewardCreators(msg.value);
        }
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function setRoyalties(address[] memory creators, uint16[] memory royalties) public onlyOwner {
        require(creators.length == royalties.length, "Incorrect length");
        require(creators.length< 5, "Max 5 creators allowed");
        for (uint8 i =0; i < royalties.length; i++) {
            require(royalties[i] < 500, "Single creator can get max 5%");
        }

        // remove current shares
        for (uint8 i=0; i < _creators.length; i++) {
            delete _royalties[_creators[i]];
        }

        // create new shares
        _royaltiesSum = 0;
        for (uint8 i=0; i < creators.length; i++) {
            _royalties[creators[i]] = royalties[i];
            _royaltiesSum += royalties[i];
            emit SetRoyalty(creators[i], royalties[i]);
        }
        _creators = creators;
    }

    function getRoyalty(address creator) public view returns (uint16) {
        return _royalties[creator];
    }

    function getRoyalties() public view returns (uint16) {
        return _royaltiesSum;
    }

    function setOfferPrice(uint256 tokenId, uint256 sellPrice) public onlyTokenOwner(tokenId) {
        require(sellPrice > 0, "sellPrice must be > 0");
            _tokenOffers[tokenId]=sellPrice;
            emit OfferCreated(tokenId, sellPrice);
    }

    function getOfferPrice(uint256 tokenId) public view returns(uint256) {
        return _tokenOffers[tokenId];
    }

    function cancelOffer(uint tokenId) public onlyTokenOwner(tokenId) offerExists(tokenId) {
        delete _tokenOffers[tokenId];
    }

    function acceptOffer(uint256 tokenId) public payable offerExists(tokenId) {
        require(msg.value >= _tokenOffers[tokenId], "not enough assets paid");
        require(msg.sender != ownerOf(tokenId), "buyer and seller must be different");
        emit OfferAccepted(tokenId, _tokenOffers[tokenId], msg.sender, ownerOf(tokenId));

        // pay creators
        uint256 payToCreators = _tokenOffers[tokenId] * _royaltiesSum / 10000;
        rewardCreators(payToCreators);
        
        // pay owners
        (bool ownerPaid, /* bytes memory data */) = payable(ownerOf(tokenId)).call{value: _tokenOffers[tokenId] - payToCreators}("");
        require(ownerPaid, "Owner rejected ETH sell transfer");
        emit OwnerPayment(ownerOf(tokenId), _tokenOffers[tokenId] - payToCreators);

        // return overpaid value
        if (msg.value - _tokenOffers[tokenId] > 0) {
            (bool buyerReturned, /* bytes memory data */) = payable(msg.sender).call{value: msg.value - _tokenOffers[tokenId]}("");
            require(buyerReturned, "Buyer rejected ETH return transfer");
        }

        // transfer token
        _transfer(ownerOf(tokenId), msg.sender, tokenId);
    }

    function rewardCreators(uint256 reward) public payable {
        require(_royaltiesSum != 0, "no creators set");

        uint256 paid = 0;
        for (uint8 i = 1; i < _creators.length; i++) { //
            uint256 toPay = reward * _royalties[_creators[i]] / _royaltiesSum;
            (bool creatorPaid, /* bytes memory data */) = payable(_creators[i]).call{value: toPay}("");
            require(creatorPaid, "Creator rejected ETH royalty transfer");
            emit RyoaltyPayment(_creators[i], toPay);
            paid += toPay;
        }

        (bool firstCreatorPaid, /* bytes memory data */) = payable(_creators[0]).call{value: reward - paid}("");
        require(firstCreatorPaid, "First Creator rejected ETH royalty transfer");
        emit RyoaltyPayment(_creators[0], reward - paid);
    }

    function _transfer(address from,address to,uint256 tokenId) internal override {
        super._transfer(from, to, tokenId);
        delete _tokenOffers[tokenId];
    } 

}