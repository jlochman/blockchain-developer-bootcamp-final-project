# Design Pattern Decisions

## Inheritance and Interfaces
- MockNFT contract inherits OpenZeppelin's ERC721 and Ownable
- Marketplace contract inherits OpenZeppelin's Ownable

The reason for inheriting Ownable is simple - I want some access control so only some functionalities (like setting royalties, registering collections) are accessible to owner only.

The reason MockNFT inherits from ERC721 is that it is ERC721 with some additional funcitonality.

## Access Control Design Patterns
Both MockNFT and Marketplace contracts are Ownable - only contract creator can set some of their properties.
