const express = require("express");
const cors = require("cors");
const { application } = require("express");
const app = express();
const PORT = 4000;

// route
const wallet = require("./routes/wallet");

app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/wallet", wallet);

app.listen(PORT, () => {
  console.log(`우리 서버 ${PORT}에서 도는 중, 화이팅!`);
});
