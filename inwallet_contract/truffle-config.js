require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const address = process.env.ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
