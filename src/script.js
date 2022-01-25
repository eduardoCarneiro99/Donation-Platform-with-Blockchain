//TEST SCRIPT FOR ETHEREUM TRANSACTIONS

const Web3 = require('web3');
//const Provider = require('@truffle/hdwallet-provider');
//const MyContract = require('./build/contracts/TodoList.json');
const myAddress = '0xa1d5498e14bc0260A8eB431581738615C2102e98';
const privateKey = '62017f9279ab2a59e824389077b10612697870adbb3000ae85de6ecfd70e66f7';
const network = 'HTTP://127.0.0.1:7545';
const web3 = new Web3(network);

const sendTransactionAdmin = async (toAddress) => {
  //const provider = new Provider(privateKey, network); 

  //const networkId = await web3.eth.net.getId();
  /*
  const myContract = new web3.eth.Contract(
    MyContract.abi,
    MyContract.networks[networkId].address
  );
  */

  const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

  const transaction = {
    'to': toAddress, //TODO: use variable
    'value': 5000000000000000000,
    'gas': 30000,
    'nonce': nonce,
    //'data': field to execute smart contract
  };

  const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

  web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
  });
}

const sendTransactionUser = async (from, toAddress, password) => {
  const nonce = await web3.eth.getTransactionCount(from, 'latest'); // nonce starts counting from 0
  await web3.eth.personal.unlockAccount(from, password);

  const transaction = {
    'from': from,
    'to': toAddress,
    'value': 1000000000000000000,//TODO: variable
    'gas': 30000,
    'nonce': nonce,
    //'data': field to execute smart contract
  };

  await web3.eth.sendTransaction(transaction, function (error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
  });
  await web3.eth.personal.lockAccount(from);
}

const checkLastTransactions = async () => {
  let block = await web3.eth.getBlock('latest');
  let numberOfDays = 30; //TODO: use variable
  let currentDate = Math.round(new Date().getTime() / 1000);
  let pastTimeStamp = currentDate - (numberOfDays * 24 * 60 * 60);



  while (block != null && block.transactions != null && block.timestamp > pastTimeStamp) {
    let number = block.number;
    
    for (let txHash of block.transactions) {
      let tx = await web3.eth.getTransaction(txHash);
      //console.log(tx);
      if (myAddress == tx.from || myAddress == tx.to) {
        console.log('Transaction found on block: ' + number);
        console.log({ address: tx.from, value: web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
      }
    }
    block = await web3.eth.getBlock(number - 1);
    if (number == block.number){
      break;
    }
  }
}

const createAccount = async () => {
  pass = "passwordXPTO7";
  const account = await web3.eth.personal.newAccount(pass);
  console.log(pass)
}

const checkAccounts = async() => {
  var accounts = await web3.eth.getAccounts();
  console.log(accounts)
}

//sendTransaction();
//checkLastTransactions();
//createAccount();
//checkAccounts();

