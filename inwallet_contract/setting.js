const {
  address,
  privateKey,
  polygonTestNetRpcURL,
} = require("./data/env-config");

const Web3 = require("web3");
const web3 = new Web3(polygonTestNetRpcURL);

module.exports = {
  sha3: () => {
    const sha3 = web3.utils.soliditySha3("initialize()").substring(0, 10);
    return sha3;
  },
};
