const axios = require("axios");
axios.defaults.withCredentials = true;

// web3.js
const Web3 = require("web3");
const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const web3 = new Web3(rpcURL);
