require("dotenv").config();

const address = process.env.ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const polygonTestNetRpcURL = process.env.RPC_URL;

module.exports = {
  address,
  privateKey,
  polygonTestNetRpcURL,
};
