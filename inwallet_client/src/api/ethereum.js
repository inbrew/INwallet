// const axios = require("axios");

// web3.js
const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/fa408e18052a47b18c82a59f8b54c1c6";
const web3 = new Web3(rpcURL);

module.exports = {
  // 이더리움 주소 생성
  createAddress: () => {
    return web3.eth.accounts.create();
  },

  // 개인키로 주소가져오기
  privateKeyToAccount: (privateKey) => {
    return web3.eth.accounts.privateKeyToAccount(privateKey).address;
  },

  // 잔액 조회
  getBalance: async (address) => {
    const balance = await web3.eth.getBalance(address).then((data) => {
      return data;
    });

    const convertBalance = await web3.utils.fromWei(`${balance}`, "ether");

    return convertBalance;
  },

  // 유효한 주소인지 확인
  isAddress: (address) => {
    return web3.utils.isAddress(address);
  },

  // 현재 가스 가격 가져오기
  getGasPrice: async () => {
    const gasPrice = await web3.eth
      .getGasPrice()
      .then((price) => {
        return price;
      })
      .catch((err) => {
        console.log(err);
      });
    return gasPrice;
  },

  sendTransaction: (transactionOBJ) => {
    // const convertBalance = web3.utils.toWei(`${transactionOBJ.value}`, "ether");
    transactionOBJ.value = web3.utils.toWei(`${transactionOBJ.value}`, "ether");
    // console.log(transactionOBJ);
    web3.eth.sendTransaction(transactionOBJ).then((data) => {
      console.log("여기가 문제야?", data);
    });
  },
};
