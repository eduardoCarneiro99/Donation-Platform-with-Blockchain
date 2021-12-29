//TEST SCRIPT FOR ETHEREUM TRANSACTIONS

const Web3 = require('web3');
//const Provider = require('@truffle/hdwallet-provider');
//const MyContract = require('./build/contracts/TodoList.json');
const myAddress = '0x2357828683b56F492b5Cf857E96F512Be2b28C76';
const privateKey = '6ea66d370f3fc44e237eebe53404dad480fa0b11c95c1cc37b4867102d89b2a5';
const network = 'HTTP://127.0.0.1:7545';
const web3 = new Web3(network);

const sendTransaction = async () => {
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
    'to': '0xc7C195366c25bCf315D328Cd5e4A67aC75Ae793F', //TODO: use variable
    'value': 1000000000000000000,
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

//sendTransaction();
checkLastTransactions();