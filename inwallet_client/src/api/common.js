const axios = require("axios");
axios.defaults.withCredentials = true;

// 로컬 서버용
const localURL = "http://localhost:4000";

// 주소로 거래내역 가져오기
export async function getTxByAddress(address, chain) {
  const getTransactionByAddress = await axios
    .get(`${localURL}/wallet/tx?address=${address}&chain=${chain}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return getTransactionByAddress;
}
