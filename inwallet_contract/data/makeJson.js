const fs = require("fs");
const path = require("path");
const { basePath } = require("./basePath");

// json 만들어주는 함수(makeFile, makeData)
const makeFile = async (location, destination, address) => {
  const json = await fs.readFileSync(path.join(base, location), {
    encoding: "utf-8",
  });

  await fs.writeFileSync(path.join(base, destination), makeData(json, address));
};

const makeData = (json, address) => {
  const abi = JSON.parse(json).abi;

  return JSON.stringify({
    abi: abi,
    address: address,
  });
};

// const makeInProxy = async (address) => {
//   makeFile();
// };

// const makeInProxyData = async (address) => {
//   makeFile("");
// };

module.exports = {
  makeFile,
  makeData,
  // makeInProxy
};
