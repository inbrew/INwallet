const axios = require("axios");
axios.defaults.withCredentials = true;
// axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

module.exports = {
  getTxByAddress: async (req, res) => {
    const { apikey } = require("../config/config");
    const address = req.query.address;
    let chain = "";
    let status = 0;

    if (req.query.chain === "ETH") {
      chain = "eth";
    } else if (req.query.chain === "BNB") {
      chain = "bsc";
    } else if (req.query.chain === "KLAY") {
      chain = "klay";
    }

    const getAddressInfoAPI = `https://testnet-api.blocksdk.com/v3/${chain}/address/${address}/info?api_token=${apikey}&offset=0&limit=10&order_direction=desc`;
    const transactions = await axios
      .get(getAddressInfoAPI)
      .then((tx) => {
        status = tx.status;
        return tx.data.payload.transactions;
      })
      .catch((err) => {
        console.log("에러는?", err.response);
        status = err.response.status;
        return err;
      });

    // if (status === 200) {
    //   res.status(status).json(transactions);
    // }
    res.status(status).json(transactions);
  },
};
