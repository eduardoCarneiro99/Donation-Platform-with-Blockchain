//TEST SCRIPT FOR ETHEREUM TRANSACTIONS

const Web3 = require('web3');
//const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./build/contracts/TodoList.json');
const myAddress = '0x9B11d8dC9D2EE07877B6268b6694612904f48398';
const privateKey = '4a80242d7f621aa1c2e5ce05332a408af836438f62b1ed869c8f244f6ef75876';
const network = 'HTTP://127.0.0.1:7545';

const init3 = async () => {
    //const provider = new Provider(privateKey, network); 
    const web3 = new Web3(network);
    //const networkId = await web3.eth.net.getId();
    /*
    const myContract = new web3.eth.Contract(
      MyContract.abi,
      MyContract.networks[networkId].address
    );
    */
  
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x6dFacBa1582e5dFc1190508003791c34d3430016', // faucet address to return eth
     'value': 1000000000000000000,
     'gas': 30000,
     'nonce': nonce,
     //'data': field to execute smart contract
    };
   
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
    
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
  }

  init3();