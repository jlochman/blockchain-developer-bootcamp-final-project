const mockNftABI =
  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "CancelOfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "OfferAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "sellPrice",
          "type": "uint256"
        }
      ],
      "name": "OfferCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "sellPrice",
          "type": "uint256"
        }
      ],
      "name": "OfferUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "OwnerPayment",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "roaylty",
          "type": "uint256"
        }
      ],
      "name": "RyoaltyPayment",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "share",
          "type": "uint16"
        }
      ],
      "name": "SetRoyalty",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "msg",
          "type": "uint256"
        }
      ],
      "name": "Test",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "safeMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "creators",
          "type": "address[]"
        },
        {
          "internalType": "uint16[]",
          "name": "royalties",
          "type": "uint16[]"
        }
      ],
      "name": "setRoyalties",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "name": "getRoyalty",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getRoyalties",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "sellPrice",
          "type": "uint256"
        }
      ],
      "name": "setOfferPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getOfferPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "cancelOffer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "acceptOffer",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "rewardCreators",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    }
  ];
const mockNftAddress = '0x816f93C8f9a5258F0a732D74de3E579E4611354D';

window.addEventListener('load', function () {
  let mmDetected = document.getElementById('mm-detected')
  if (typeof window.ethereum !== 'undefined') {
    if (window.ethereum.isMetaMask === true) {
      mmDetected.innerHTML += 'MetaMask Is Available!'
    } else {
      mmDetected.innerHTML += 'MetaMask Not Available!'
    }
  } else {
    mmDetected.innerHTML += 'MetaMask Not Available!'
  }
})

async function buy(tokenId, tokenPrice) {
  console.log(`buy tokenId: ${tokenId}, tokenPrice: ${tokenPrice}`);

  ethereum.request({ method: 'eth_requestAccounts' })
  var web3 = new Web3(window.ethereum);
  const mockNft = new web3.eth.Contract(mockNftABI, mockNftAddress);
  mockNft.setProvider(window.ethereum);

  try {
    const txResponse = await mockNft.methods.acceptOffer(tokenId).send({ from: ethereum.selectedAddress, value: web3.utils.toWei(String(tokenPrice), 'ether') });
    setLastTxMsg("SUCCESS, txHash: " + txResponse.transactionHash);
    refreshOffers();
  } catch (err) {
    setLastTxMsg("ERROR, " + err.message);
  }
}

async function cancelListing(tokenId) {
  console.log(`cancelListing tokenId: ${tokenId}`);

  ethereum.request({ method: 'eth_requestAccounts' })
  var web3 = new Web3(window.ethereum);
  const mockNft = new web3.eth.Contract(mockNftABI, mockNftAddress);
  mockNft.setProvider(window.ethereum);

  try {
    const txResponse = await mockNft.methods.cancelOffer(tokenId).send({ from: etherem.selectedAddress });
    setLastTxMsg("SUCCESS, txHash: " + txResponse.transactionHash);
    refreshOffers();
  } catch (err) {
    setLastTxMsg("ERROR, " + err.message);
  }
}

async function createListing(tokenId) {
  const price = document.getElementById(`createListing-price-${tokenId}`).value;
  console.log(`createListing tokenId: ${tokenId}, price: ${price}`);

  ethereum.request({ method: 'eth_requestAccounts' })
  var web3 = new Web3(window.ethereum);
  const mockNft = new web3.eth.Contract(mockNftABI, mockNftAddress);
  mockNft.setProvider(window.ethereum);

  try {
    const txResponse = await mockNft.methods.setOfferPrice(tokenId, web3.utils.toWei(price, 'ether')).send({ from: ethereum.selectedAddress });
    setLastTxMsg("SUCCESS, txHash: " + txResponse.transactionHash);
    refreshOffers();
  } catch (err) {
    setLastTxMsg("ERROR, " + err.message);
  }
}

const mmEnable = document.getElementById('mm-connect');
mmEnable.onclick = async () => {
  refreshOffers();
}

async function refreshOffers() {
  await ethereum.request({ method: 'eth_requestAccounts' })
  var web3 = new Web3(window.ethereum)

  var mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Account: ' + ethereum.selectedAddress;
  var mmCurrentAccountBalance = document.getElementById('mm-current-account-balance');
  mmCurrentAccountBalance.innerHTML = 'Balance: ' + ((await web3.eth.getBalance(ethereum.selectedAddress)) * 1e-18) + ' ETH';

  let buyNowContainer = document.getElementById('buy-now-container');
  buyNowContainer.innerHTML = "<h2>Buy now</h2>";
  let myItemsContainer = document.getElementById('items-container');
  myItemsContainer.innerHTML = "<h2>My Items</h2>";

  var web3 = new Web3(window.ethereum);
  const mockNft = new web3.eth.Contract(mockNftABI, mockNftAddress);
  mockNft.setProvider(window.ethereum)

  for (let i = 0; i < 8; i++) {
    try {
      var owner = await mockNft.methods.ownerOf(i).call();
      var priceWei = await mockNft.methods.getOfferPrice(i).call();
      var priceEth = priceWei * 1e-18;
      if (priceWei == 0) {
        if (owner.toUpperCase() == ethereum.selectedAddress.toUpperCase()) {
          myItemsContainer.innerHTML += getMyItemDiv(i);
        }
      } else {
        if (owner.toUpperCase() == ethereum.selectedAddress.toUpperCase()) {
          buyNowContainer.innerHTML += getCancelListingDiv(i, priceEth);
        } else {
          buyNowContainer.innerHTML += getBuyDiv(i, priceEth);
        }
      }
    } catch (err) { return }
  }
}

function getBuyDiv(tokenId, tokenPrice) {
  return `
  <div class="col-4-item">
    <h3>mockNFT #${tokenId}</h3>
    <div>Price: ${tokenPrice} ETH</div>
    </br>
    <button id="buy-${tokenId}" onClick="buy(${tokenId}, ${tokenPrice})">BUY</button>
  </div>`;
}

function getCancelListingDiv(tokenId, tokenPrice) {
  return `
  <div class="col-4-item">
    <h3>mockNFT #${tokenId}</h3>
    <div>Price: ${tokenPrice} ETH</div>
    </br>
    <button id="cancelListing-${tokenId}" onClick="cancelListing(${tokenId})">CANCEL LISTING</button>
  </div>`;
}

function getMyItemDiv(tokenId) {
  return `
  <div class="col-4-item">
    <h3>mockNFT #${tokenId}</h3>
    <div>
      Price: <input id="createListing-price-${tokenId}"" type="number" placeholder="Price" />
    </div>
    <button id="createListing-${tokenId}" onClick="createListing(${tokenId})">Place</button>
  </div>`;
}

const mmMint = document.getElementById('mm-mint');
mmMint.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts' })

  var web3 = new Web3(window.ethereum);
  const mockNft = new web3.eth.Contract(mockNftABI, mockNftAddress);
  mockNft.setProvider(window.ethereum);

  try {
    const txResponse = await mockNft.methods.safeMint(ethereum.selectedAddress).send({ from: ethereum.selectedAddress });
    setLastTxMsg("SUCCESS, txHash: " + txResponse.transactionHash);
    refreshOffers();
  } catch (err) {
    setLastTxMsg("ERROR, " + err.message);
  }
}

const mmRoyalties = document.getElementById('mm-royalties');
mmRoyalties.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts' })

  var web3 = new Web3(window.ethereum);
  const mockNft = new web3.eth.Contract(mockNftABI, mockNftAddress);
  mockNft.setProvider(window.ethereum);

  await mockNft.methods.setRoyalties([ethereum.selectedAddress], [400]).send({ from: ethereum.selectedAddress });
}

function setLastTxMsg(msg) {
  var mmCurrentAccount = document.getElementById('mm-lastTxMsg');
  mmCurrentAccount.innerHTML = msg;
}