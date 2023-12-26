import React from 'react';
import './App.css';

function App() {
  const getFormData = () => {
    // Get form data
    const producerCompany = document.getElementById('producer_company').value;
    const productName = document.getElementById('product_name').value;
    const salePrice = document.getElementById('sale_price').value;
    const taxRate = document.getElementById('tax_rate').value;
    const producerSalesRep = document.getElementById('producer_sales_rep').value;
    const profitRate = document.getElementById('profit_rate').value;
    const purchasingRep = document.getElementById('purchasing_representative').value;
    const quantity = document.getElementById('quantity').value;
  
    // Log form data to console
    alert(
      'Producer Company: ' + producerCompany +
      '\nProduct Name: ' + productName +
      '\nSale Price: ' + salePrice +
      '\nTax Rate: ' + taxRate +
      "\nProducer's Sales Representative: " + producerSalesRep +
      '\nProfit Rate: ' + profitRate +
      "\nRetailer's Purchasing Representative: " + purchasingRep +
      '\nQuantity: ' + quantity
    );
  
    console.log('Producer Company:', producerCompany);
    console.log('Product Name:', productName);
    console.log('Sale Price:', salePrice);
    console.log('Tax Rate:', taxRate);
    console.log("Producer's Sales Representative:", producerSalesRep);
    console.log('Profit Rate:', profitRate);
    console.log("Retailer's Purchasing Representative:", purchasingRep);
    console.log('Quantity:', quantity);
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
