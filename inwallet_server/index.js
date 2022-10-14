const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { application } = require("express");
const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: [
      "https://localhost:3000",
      "http://inwallet.ml.s3-website.ap-northeast-2.amazonaws.com/",
      "https://inwallet.ml",
      "*",
    ],
    credentials: true,
    SameSite: "none",
    Secure: true,
  })
);
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
