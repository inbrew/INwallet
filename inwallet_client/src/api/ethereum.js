const axios = require("axios");
axios.defaults.withCredentials = true;

// .env
const key = {
  apikey: process.env.REACT_APP_BLOCKSDK_API_KEY,
};

// BlockSDK
const BlockSdkApiKey = key.apikey;

// web3.js
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/fa408e18052a47b18c82a59f8b54c1c6";
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

  // 이더 보내기
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

  getTxByAddress: async (address) => {
    // const getChainID = `/info?api_token=${BlockSdkApiKey}`;
    const getAddressInfoAPI = `/address/${address}/info?api_token=${BlockSdkApiKey}&offset=0&limit=10&order_direction=desc`;
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
    // console.log("getTransaction 함수에 들어온 result", result);
    return result;
    // return await web3.eth.getTransaction(tx).then((data) => {
    //   const result = {
    //     ...data,
    //     gas: web3.utils.fromWei(`${data.gas}`, "ether"),
    //     gasPrice: web3.utils.fromWei(`${data.gasPrice}`, "ether"),
    //     value: web3.utils.fromWei(`${data.value}`, "ether"),
    //   };
    //   return result;
    // });
  },
};
