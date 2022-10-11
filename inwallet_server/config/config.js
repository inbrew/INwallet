const dotenv = require("dotenv");

dotenv.config();

// DB config
module.exports = {
  apikey: process.env.BLOCKSDK_API_KEY,
};
