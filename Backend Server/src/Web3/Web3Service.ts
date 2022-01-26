//TEST SCRIPT FOR ETHEREUM TRANSACTIONS
export class Web3Service {
  private web3;
  private platformPublicAddress;
  private platformPrivateKey;
  private gasPrice;

  constructor() {
    const Web3 = require("web3");
    const config = require("config");
    //const Provider = require('@truffle/hdwallet-provider');
    //const MyContract = require('./build/contracts/TodoList.json');
    this.platformPublicAddress = config.get("platformPublicAddress");
    this.platformPrivateKey = config.get("platformPrivateKey");
    this.gasPrice = config.get("gasPrice"); 
    const network = config.get("web3NetworkID");
    this.web3 = new Web3(network);
  }

  async sendTransactionFromAdmin(toAddress: string, value: string): Promise<boolean>{
    //const provider = new Provider(privateKey, network);

    //const networkId = await web3.eth.net.getId();
    /*
  const myContract = new web3.eth.Contract(
    MyContract.abi,
    MyContract.networks[networkId].address
  );
  */

    const nonce = await this.web3.eth.getTransactionCount(
      this.platformPublicAddress,
      "latest"
    ); // nonce starts counting from 0

    const transaction = {
      to: toAddress,
      value: this.web3.utils.toWei(value, "ether"),
      gas: this.gasPrice,
      nonce: nonce,
      //'data': field to execute smart contract
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(
      transaction,
      this.platformPrivateKey
    );

    let result;
    await this.web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (error, hash) {
        if (!error) {
          result = true;
        } else {
          result = false;
        }
      }
    );
    return result;
  }

  async sendTransactionFromUser(from: string, to: string, password: string, value: string): Promise<string> {

    const nonce = await this.web3.eth.getTransactionCount(from, "latest"); // nonce starts counting from 0
    await this.web3.eth.personal.unlockAccount(from, password);

    const transaction = {
      from: from,
      to: to,
      value: this.web3.utils.toWei(value, "ether"),
      gas: this.gasPrice,
      nonce: nonce,
      //'data': field to execute smart contract
    };
    var transactionHash;
    var txError;
    await this.web3.eth.sendTransaction(transaction, function (error, hash) {
      if (!error) {
        transactionHash = hash;
      } else {
        txError = error;
      }
    });
    await this.web3.eth.personal.lockAccount(from);
    if (txError){
      throw new txError;
    }
    return transactionHash;
  };

  async sendTransactionFromUserToAdmin(from: string, password: string, value: string): Promise<string> {
    return await this.sendTransactionFromUser(from, this.platformPublicAddress, password, value);
  };

  async checkLastTransactionsFromAccount(days: number, from: string): Promise<Array<any>> {
    let block = await this.web3.eth.getBlock("latest");
    let numberOfDays = days;
    let currentDate = Math.round(new Date().getTime() / 1000);
    let pastTimeStamp = currentDate - numberOfDays * 24 * 60 * 60;
    let transactions: Array<any>;
    while (
      block != null &&
      block.transactions != null &&
      block.timestamp > pastTimeStamp
    ) {
      let number = block.number;

      for (let txHash of block.transactions) {
        let tx = await this.web3.eth.getTransaction(txHash);
        if (from == tx.from) {
          transactions.push({
            from: tx.from,
            to: tx.to,
            value: this.web3.utils.fromWei(tx.value, "ether"),
            timestamp: new Date(),
          });
        }
      }
      block = await this.web3.eth.getBlock(number - 1);
      if (number == block.number) {
        break;
      }
    }
    return transactions;
  };

  async createAccount(password: string): Promise<string> {
    const account = await this.web3.eth.personal.newAccount(password);
    return account;
  };

  async checkAccounts() {
    var accounts = await this.web3.eth.getAccounts();
    console.log(accounts);
  };
  //sendTransaction();
  //checkLastTransactions();
  //createAccount();
  //checkAccounts();
}
