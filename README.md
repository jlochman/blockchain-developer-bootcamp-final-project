# blockchain-developer-bootcamp-final-project

With the booming popularity of NFTs, I'd like to create a simple NFT marketplace.

Marketplace will come with a single ERC-721 contract whose address will be hardcoded in the marketplace (addresses of its tokens may be needed to hardcode as well).

After connecting a wallet to the marketplace, the user (owner) will see his NFTs and will be allowed to offer them for trade.

There will be two types of trades 

1. **Buy Now** allowing the owner to offer his NFT for a fixed price. The offer is either fulfilled or cancelled by the owner.  
2. **Auction** allowing the owner to set starting price and the end time of the auction.

I'd like to implement marketplace fee and royalties distribution so if the NFT is sold for 1 ETH, then 0.02 ETH goes to an address of the marketplace, 0.03 ETH to an address of the creator and 0.95 ETH to the seller.
