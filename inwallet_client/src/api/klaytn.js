// caver-js
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

const axios = require("axios");
axios.defaults.withCredentials = true;

// .env
const key = {
  apikey: process.env.REACT_APP_BLOCKSDK_API_KEY,
};

// BlockSDK
const BlockSdkApiKey = key.apikey;

module.exports = {
  // 계정 생성
  createAddress: async () => {
    const keyring = await caver.wallet.keyring.generate();

    await caver.wallet.add(keyring);
    return keyring;
  },

  // 잔액 조회
  getBalance: (address) => {
    return caver.rpc.klay.getBalance(address).then((data) => {
      const peb = caver.utils.hexToNumberString(data);
      return caver.utils.convertFromPeb(Number(peb));
    });
  },

  // 트랜잭션 실행에 필요한 가스
  estimateGas: async (address) => {
    return await caver.rpc.klay
      .estimateGas({ to: address })
      .then((data) => {
        return caver.utils.hexToNumberString(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // 주소로 트랜잭션 조회
  getTxByAddress: async (address) => {
    const getAddressInfoAPI = `/klay/address/${address}/info?api_token=${BlockSdkApiKey}&offset=0&limit=10&order_direction=desc`;
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

  // 주소 확인
  isAddress: (address) => {
    return caver.utils.isAddress(address);
  },

  // 비밀키로 주소가져오기
  privateKeyToAccount: (privateKey) => {
    return caver.klay.accounts.privateKeyToAccount(privateKey).address;
  },

  // 트랜잭션 영수증
  getTransactionReceipt: async (transactionHash) => {
    let result = [];
    for (let i = 0; i < transactionHash.length; i++) {
      result.push(
        await caver.rpc.klay
          .getTransactionReceipt(transactionHash[i])
          .then((data) => {
            const result = {
              ...data,
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
  },

  // 트랜잭션 실행
  sendRawTransaction: async (rawData, key) => {
    const setRawData = {
      ...rawData,
      value: caver.utils.convertToPeb(rawData.value, "KLAY"),
    };

    const vt = caver.transaction.valueTransfer.create(setRawData);

    const keyring = new caver.wallet.keyring.singleKeyring(rawData.from, key);
    caver.wallet.add(keyring);

    const signed = await caver.wallet.sign(keyring.address, vt);

    const receipt = await caver.rpc.klay.sendRawTransaction(signed);
    console.log("클레이튼api", receipt);
    return receipt;
  },
};
