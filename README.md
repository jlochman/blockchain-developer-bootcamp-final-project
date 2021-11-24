# blockchain-developer-bootcamp-final-project
With the booming popularity of NFTs, I'd like to create a simple NFT marketplace.

Marketplace will come with a single ERC-721 contract whose address will be hardcoded in the marketplace (addresses of its tokens may be needed to hardcode as well).

After connecting a wallet to the marketplace, the user (owner) will see his NFTs and will be allowed to offer them for trade.

There will be two types of trades 

1. **Buy Now** allowing the owner to offer his NFT for a fixed price. The offer is either fulfilled or cancelled by the owner.  
2. **Auction** allowing the owner to set starting price and the end time of the auction.

I'd like to implement marketplace fee and royalties distribution so if the NFT is sold for 1 ETH, then 0.02 ETH goes to an address of the marketplace, 0.03 ETH to an address of the creator and 0.95 ETH to the seller.

## Update
I think the suggested model gives too much power to NFT marketplace (despite the fact it copies how NFT marketplaces work today). These concerns have been discussed among Callisto community and lead to a proposal to extend ERC721 contract to have some marketplace features implemented in NFT contract directly.

The extended contract is called [CallistoNFT](https://callisto.network/callistonft-advanced-standard/) and tries to deal with following

> - **Built-in “trades”** — there is no need to rely on third-party marketplaces for NFTs now, you can express your willingness to sell / buy a specific NFT right through the token contract!
> - **Monetization for NFT creators**, not third party marketplaces — NFT developers / creators can now earn % fee on these built-in trades instead of the marketplaces that traditionally did this.
> - **Communication model for smart-contracts** — “events” are a very standard practice in programming and the key feature for programm-to-programm communication models. However ERC721 lacks this feature. New standard addresses this to open up wider automatisation opportunities.
> - **Standardized properties** — NFTs typically represent some unique objects and store their properties (for example bitmap for a picture or website link). This unique properties are implementaiton-specific in ERC721. CallistoNFT makes a step towards standardizing this features.

In this project, I deal with suggestions 1 and 2 because they directly address features, I want to implemennt.

## Update 2
Smart contracts deals with both, *buy now* and *auction*. *Buy now* is handled in `MockNFT.sol` and *auction* in `Marketplace.sol`. Both of these contracts are tested extensively. Frontend is connected to *buy now* funcitonality only so the only cotract it interacts with is `MockNFT.sol`.

## Project Structure
the structure has been created by Truffle. Only thing added is `web` directory.

- `/contracts` solidity files of smart contracts
- `/migrations` contract deployments
- `/test` truffle test files
- `/web` sources for web frontend
- `manual.pdf` one page manual how to interact with frontend

## Project Dependencies
- Node.js >= v14
- Truffle, Ganache
- `npm install truffle-hdwallet-provider`
- `npm install truffle-privatekey-provider`
- To run tests in Truffle: `truffle test`

To deploy

- place your private key in `.secret` file
- Development (port: 8545, networkId: 5777), run `truffle deploy --network dev`
- Ropsten `truffle deploy --network ropsten`

## Project Frontend
- Hosted on [netlify](https://mock-nft-marketplace.netlify.app/)
- How to interact explained in `manual.pdf`

## My Ethereum Account
to receive NFT certificate (in case of success): `0x6666669FCFb97a246fd7Bcc8feC689828E3F6666`