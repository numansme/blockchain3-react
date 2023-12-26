//import React from 'react';
import './App.css';
import axios from 'axios';

import React, { useEffect } from 'react';
import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
function App() {

  var receiptHsCd = "";
  var recordHsCd = "";

    // IPFS'e dosya yükleyen fonksiyon
    async function uploadToIPFS(data, fileName, contentType) {
      try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
          headers: {
            'Content-Type': contentType,
            'pinata_api_key': '28e311560adb816173b6',
            'pinata_secret_api_key': 'ee097c6edba8bbf7fed84e1f4fb9c4c6a65eaf82f38918114ed6700c7aabd4bb',
          },
        });
        return response.data.IpfsHash;
      } catch (error) {
        console.error('IPFS Upload Error:', error);
        return null;
      }
    }
    
    useEffect(() => {
      const addStringToContract = async (receiptHash) => {
        // Infura API key
        const INFURA_API_KEY = '1a8d93a97135483a9ca99abf0ef73117';
  
        // MetaMask mnemonic phrase (12 words)
        const MNEMONIC = 'rib convince tonight enhance hobby remove prefer dynamic expect harsh smoke curve';
  
        // Contract ABI
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
  
        // Contract address
        const contractAddress = '0x3a2dD5bcE331b261429BA25897F53190a6b9dc18';
  
        // Network to connect to (e.g., 'mainnet', 'ropsten', 'rinkeby')
        const network = 'sepolia';
  
        // Create a Web3Provider instance
        const provider = new HDWalletProvider(
          MNEMONIC,
          `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
        );
  
        // Create a Web3 instance from the provider
        const web3 = new Web3(provider);
  
        // Create a contract instance
        const contract = new web3.eth.Contract(abi, contractAddress);
  
        // Get the first account from MetaMask
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
  
        // Call the addString function with the receiptHash
        await contract.methods.addString(receiptHash).send({ from: account });
  
        console.log('Receipt Hash added to the contract successfully!');
      };
  
      // Örnek receipt hash, gerekirse gerçek bir veri ile değiştirilebilir
      const exampleReceiptHash = '0x1234567890abcdef';
  
      // addStringToContract fonksiyonunu çağır
      //addStringToContract(receiptHsCd);
    }, []);





  const getFormData = () => {
    
    // Get form data
    var producerCompany = document.getElementById('producer_company').value;
    var productName = document.getElementById('product_name').value;
    var salePrice = document.getElementById('sale_price').value;
    var taxRate = parseInt(document.getElementById('tax_rate').value, 10);
    var producerSalesRep = document.getElementById('producer_sales_rep').value;

    var profitRate = parseInt(document.getElementById('profit_rate').value, 10);
    var purchasingRep = document.getElementById('purchasing_representative').value;
    var quantity = parseInt(document.getElementById('quantity').value, 10);

    if (isNaN(taxRate) || isNaN(profitRate) || isNaN(quantity) || taxRate < 0 || profitRate < 0 || quantity < 0) {
        alert("Invalid input. Please make sure all numeric values are positive.");
        return;
    }
    var receiptInfo = `## This is a receipt that proves following financial transaction ##\n\n` +
                `${quantity} kg ${productName} has been sold by ${producerCompany} with price ${salePrice} TL/kilogram.\n\n` +
                `${taxRate}% Tax rate has been applied to this financial transaction.\n\n` +
                `Related product was sold by ${producerSalesRep} on behalf of related Producer Company.\n` +
                `Related product was purchased by ${purchasingRep} on behalf of Retailer Company.\n\n` +
                `## End of the Receipt ##`;

            var recordInfo = `------Producer Information------\n\n` +
                `Producer Company: ${producerCompany}\n` +
                `Product Name: ${productName}\n` +
                `Sale Price: ${salePrice}\n` +
                `Tax Rate: ${taxRate}\n` +
                `Producer's Sales Representative: ${producerSalesRep}\n\n` +
                `------Retailer Information------\n\n` +
                `Profit Rate: ${profitRate}\n` +
                `Retailer's Purchasing Representative ${purchasingRep}\n` +
                `Quantity: ${quantity}\n`;

            console.log(receiptInfo);
            console.log("\n**************************\n");
            console.log(recordInfo);

             // Dosyaları txt olarak kaydet
             var receiptBlob = new Blob([receiptInfo], { type: 'text/plain' });
             var recordBlob = new Blob([recordInfo], { type: 'text/plain' });
 
             var receiptFormData = new FormData();
             receiptFormData.append('file', receiptBlob, 'receipt.txt');
 
             var recordFormData = new FormData();
             recordFormData.append('file', recordBlob, 'record.txt');

             // IPFS'e yükle ve hash'i al
            uploadToIPFS(receiptFormData, 'receipt.txt', 'multipart/form-data')
            .then(receiptHash => {
                uploadToIPFS(recordFormData, 'record.txt', 'multipart/form-data')
                    .then(recordHash => {
                        // Hash'leri consola yazdır
                         receiptHsCd = receiptHash;
                         recordHsCd = recordHash;
    
                       // console.log('Receipt Hash:', receiptHash);
                       // console.log('Record Hash:', recordHash);
                         console.log("****ddd: "+receiptHsCd);
                         console.log("****ddd: "+recordHsCd);

                         addStringToContract(receiptHsCd);
                    });
                    
            });
    
  };
  
  

  return (
    <div id="general">
      <form>
        <div id="general">
          <form>
            <div id="baslik">
              <h1>Retailer System Program</h1>
            </div>

            <div id="producer">
              <h2>Producer Information</h2>
            </div>
            <div id="general_producter_info">
              <div id="producter_information">
                <label htmlFor="producer_company">Producer Company :</label>
                <input type="text" id="producer_company" placeholder="Enter Producer Company" /><br />
                <label htmlFor="product_name">Product Name :</label>
                <input type="text" id="product_name" placeholder="Enter Name" /><br />
                <label htmlFor="sale_price">Sale Price :</label>
                <input type="number" id="sale_price" placeholder="Enter Sale Price" step="0.01" /><br />
                <label htmlFor="tax_rate">Tax Rate : </label>
                <input type="number" id="tax_rate" placeholder="Enter Tax Rate" /><br />
                <label htmlFor="producer_sales_rep">Producer's Sales Representative :</label>
                <input type="text" id="producer_sales_rep" placeholder="Enter Sales Representative" /><br />
              </div>
            </div>

            <h2>Retailer Information</h2>
            <div id="general_retailer_info">
              <div id="retailer_information">
                <label htmlFor="profit_rate">Profit Rate :</label>
                <input type="number" id="profit_rate" placeholder="Enter Rate" /><br />
                <label htmlFor="purchasing_representative">Retailer's Purchasing Representative :</label>
                <input type="text" id="purchasing_representative" placeholder="Representative" /><br />
                <label htmlFor="quantity">Quantity :</label>
                <input type="number" id="quantity" placeholder="Enter Quantity" /><br />
              </div>
            </div>
            <p id="p1">
              After making sure that you have entered the correct information, press send !
            </p>
            <div id="general_button">
              <button type="button" id="button" onClick={getFormData}>Send</button>
            </div>
          </form>
        </div>
      </form>
    </div>
  );
}

export default App;
