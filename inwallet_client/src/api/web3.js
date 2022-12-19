// config
const config = require("../config/config");

// web3.js
const Web3 = require("web3");
let rpcURL;
let web3 = new Web3(rpcURL);

// web3-js를 사용하는 체인만 스위칭
export function whichChain(chain) {
  switch (chain) {
    case "BNB":
      rpcURL = config.binance.rpcURL;
      web3 = new Web3(rpcURL);
      break;
    case "ETH":
      rpcURL = config.ethereum.rpcURL;
      web3 = new Web3(rpcURL);
      break;
    case "MATIC":
      rpcURL = config.polygon.rpcURL;
      web3 = new Web3(rpcURL);
      break;
  }
}

// 주소 생성
export function createAddress() {
  return web3.eth.accounts.create();
}

// 개인키로 주소가져오기
export function privateKeyToAccount(privateKey) {
  return web3.eth.accounts.privateKeyToAccount(privateKey).address;
}
// 잔액 조회
export async function getBalance(address) {
  if (rpcURL) {
    const balance = await web3.eth.getBalance(address).then((data) => {
      return data;
    });
    const convertBalance = await web3.utils.fromWei(`${balance}`, "ether");
    let floorBalance;
    let decimal;
    let sliceIndex = 0;
    const arrayBalance = convertBalance.split("");

    for (let i = 0; i < arrayBalance.length; i++) {
      if (arrayBalance[i] === ".") {
        sliceIndex = i;
        break;
      }
    }

    decimal = convertBalance.slice(sliceIndex + 1);

    if (decimal.length > 4) {
      floorBalance = Number(convertBalance).toFixed(4);
      return floorBalance;
    }
    return convertBalance;
  }
}

// 유효한 주소인지 확인
export function isAddress(address) {
  return web3.utils.isAddress(address);
}

// 현재 가스 가격 가져오기
export async function getGasPrice() {
  const gasPrice = await web3.eth
    .getGasPrice()
    .then((price) => {
      return price;
    })
    .catch((err) => {
      console.log(err);
    });
  return gasPrice;
}

// 바이낸스 보내기
export async function sendTransaction(transactionOBJ, privateKey) {
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
}

// 보내는(from) 주소의 트랜잭션 nonce 가져옴
export function getNonce(address) {
  return web3.eth.getTransactionCount(address);
}

// 가스 리밋
export async function gasLimit(obj) {
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
}

// 보낸 트랜잭션 거래내역 용으로 확인하기.
export async function getTransaction(tx) {
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
}
