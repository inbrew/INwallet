// const axios = require("axios");

// web3.js
const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/fa408e18052a47b18c82a59f8b54c1c6";
const web3 = new Web3(rpcURL);

module.exports = {
  createAddress: () => {
    return web3.eth.accounts.create();
  },

  privateKeyToAccount: (privateKey) => {
    return web3.eth.accounts.privateKeyToAccount(privateKey).address;
  },

  getBalance: async (address) => {
    const balance = await web3.eth.getBalance(address).then((data) => {
      return data;
    });

    const convertBalance = await web3.utils.fromWei(`${balance}`, "ether");

    return convertBalance;
  },
};
