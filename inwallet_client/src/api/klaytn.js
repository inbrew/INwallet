// caver-js
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

const axios = require("axios");
axios.defaults.withCredentials = true;

// 계정 생성
export async function createAddress() {
  const keyring = await caver.wallet.keyring.generate();

  await caver.wallet.add(keyring);
  return keyring;
}

// 잔액 조회
export function getBalance(address) {
  return caver.rpc.klay.getBalance(address).then((data) => {
    const peb = caver.utils.hexToNumberString(data);
    return caver.utils.convertFromPeb(Number(peb));
  });
}

// 트랜잭션 실행에 필요한 가스
export async function estimateGas(address) {
  return await caver.rpc.klay
    .estimateGas({ to: address })
    .then((data) => {
      return caver.utils.hexToNumberString(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 주소 확인
export function isAddress(address) {
  return caver.utils.isAddress(address);
}

// 비밀키로 주소가져오기
export function privateKeyToAccount(privateKey) {
  return caver.klay.accounts.privateKeyToAccount(privateKey).address;
}

// 트랜잭션 영수증
export async function getTransactionReceipt(transactionHash) {
  let result = [];
  for (let i = 0; i < transactionHash.length; i++) {
    result.push(
      await caver.rpc.klay
        .getTransactionReceipt(transactionHash[i])
        .then((data) => {
          const result = {
            ...data,
            blockNumber: Number(caver.utils.hexToNumberString(data.gas)),
            gas: caver.utils.convertFromPeb(
              Number(caver.utils.hexToNumberString(data.gas))
            ),
            gasPrice: caver.utils.convertFromPeb(
              Number(caver.utils.hexToNumberString(data.gasPrice))
            ),
            transactionIndex: caver.utils.convertFromPeb(
              Number(caver.utils.hexToNumberString(data.transactionIndex))
            ),
            value: caver.utils.convertFromPeb(
              Number(caver.utils.hexToNumberString(data.value))
            ),
          };
          return result;
        })
    );
  }
  return result;
}

// 트랜잭션 실행
export async function sendRawTransaction(rawData, key) {
  const setRawData = {
    ...rawData,
    value: caver.utils.convertToPeb(rawData.value, "KLAY"),
  };

  const vt = caver.transaction.valueTransfer.create(setRawData);

  const keyring = new caver.wallet.keyring.singleKeyring(rawData.from, key);
  caver.wallet.add(keyring);

  const signed = await caver.wallet.sign(keyring.address, vt);

  const receipt = await caver.rpc.klay.sendRawTransaction(signed);
  // console.log("클레이튼api", receipt);
  return receipt;
}
