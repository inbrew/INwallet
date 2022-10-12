const axios = require("axios");
axios.defaults.withCredentials = true;

// 주소로 거래내역 가져오기
export async function getTxByAddress(address, chain) {
  const getTransactionByAddress = await axios
    .get(`http://localhost:4000/wallet/tx?address=${address}&chain=${chain}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return getTransactionByAddress;
}
