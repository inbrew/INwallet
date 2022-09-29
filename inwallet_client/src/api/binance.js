const axios = require("axios");
axios.defaults.withCredentials = true;

// web3.js
const Web3 = require("web3");
const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const web3 = new Web3(rpcURL);

// .env
const key = {
  apikey: process.env.REACT_APP_BLOCKSDK_API_KEY,
};

// BlockSDK
const BlockSdkApiKey = key.apikey;

module.exports = {
  // 바이낸스 주소 생성
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

  getTxByAddress: async (address) => {
    const getAddressInfoAPI = `/bsc/address/${address}/info?api_token=${BlockSdkApiKey}&offset=0&limit=10&order_direction=desc`;
    const getTransactionByAddress = await axios
      .get(getAddressInfoAPI)
      .then((res) => {
        return res.data.payload.transactions;
      })
      .catch((err) => {
        console.log("getTxByAddress에러", err);
      });
    return getTransactionByAddress;
  },
};
