const inProxy = artifacts.require("InProxy");

module.exports = async function (deployer) {
  await deployer.deploy(inProxy);

  const inProxyContract = await inProxy.deployed();

  // makeData 해야함
  // make...
};
