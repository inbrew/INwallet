const inProxy = artifacts.require("InProxy");
const inNFT = artifacts.require("InNFT");

const { makeInProxy } = require("../data/makeJson");

module.exports = async function (deployer) {
  await deployer.deploy(inNFT);
  const inNFTContract = await inNFT.deployed();

  await deployer.deploy(inProxy, inNFTContract.address, sha3);
  const inProxyContract = await inProxy.deployed();

  await inNFTContract.setContractAddress(inProxyContract.address);

  makeInProxy(inProxyContract.address);
};
