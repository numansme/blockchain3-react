import Web3 from 'web3';
import React, { useEffect } from 'react';

console.clear();

const web3 = new Web3(Web3.givenProvider);

async function interactWithContract() {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  const address = "0x3a2dD5bcE331b261429BA25897F53190a6b9dc18";
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newString",
          "type": "string"
        }
      ],
      "name": "addString",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getStringAtIndex",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getStringCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contract = new web3.eth.Contract(abi, address);

  // 'ytyty' string'ini smart contract koleksiyonuna ekleyin
  await contract.methods.addString('ytyty').send({ from: accounts[0] });
  console.log('String added successfully!');
}

function App() {
  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          await interactWithContract();
        } else {
          alert("Install MetaMask extension!!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    init();
  }, []);

  return (
    <div className="App">
      Look at the console! (F12)
    </div>
  );
}

export default App;
