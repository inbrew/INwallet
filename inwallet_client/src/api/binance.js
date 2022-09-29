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

  // 주소로 트랜잭션 조회
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

  // 바이낸스 보내기
  sendTransaction: async (transactionOBJ, privateKey) => {
    transactionOBJ.value = await web3.utils.toWei(
      `${transactionOBJ.value}`,
      "ether"
    );

    const signedTx = await web3.eth.accounts.signTransaction(
      transactionOBJ,
      privateKey
    );

    const resultTx = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (error, hash) {
        if (!error) {
          console.log(
            "🎉 거래가 성사되었습니다. 해시는: ",
            hash,
            "\n Check Alchemy's Mempool to view the status of your transaction!"
          );
          return hash;
        } else {
          console.log("❗거래중 문제가 발생했습니다.:", error);
        }
      }
    );

    return resultTx;
  },

  // 보내는(from) 주소의 트랜잭션 nonce 가져옴
  getNonce: (address) => {
    return web3.eth.getTransactionCount(address);
  },

  // 가스 리밋
  gasLimit: async (obj) => {
    const result = await web3.eth
      .estimateGas(obj)
      .then((data) => {
        data = web3.utils.toHex(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    return result;
  },

  // 보낸 트랜잭션 거래내역 용으로 확인하기.
  getTransaction: async (tx) => {
    let result = [];

    for (let i = 0; i < tx.length; i++) {
      result.push(
        await web3.eth.getTransaction(tx[i]).then((data) => {
          const result = {
            ...data,
            gas: web3.utils.fromWei(`${data.gas}`, "ether"),
            gasPrice: web3.utils.fromWei(`${data.gasPrice}`, "ether"),
            value: web3.utils.fromWei(`${data.value}`, "ether"),
          };
          return result;
        })
      );
    }

    return result;
  },
};
