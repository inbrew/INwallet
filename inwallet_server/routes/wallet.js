const router = require("express").Router();
const { getTxByAddress } = require("../controllers/blockSDK");

router.get("/tx", getTxByAddress);

module.exports = router;
