const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 4000;

let corsOptions = {
  origin: ["https://inwallet.ml", "https://localhost:3000"],
  Credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// route
const wallet = require("./routes/wallet");
app.use("/wallet", wallet);

app.get("/", (req, res) => {
  res.send("This is IN server!");
});

app.listen(PORT, () => {
  console.log(`우리 서버 ${PORT}에서 도는 중, 화이팅!`);
});

module.exports = app;
