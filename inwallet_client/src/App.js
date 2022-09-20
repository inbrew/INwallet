import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

// component
import Header from "./component/Header";
import ChainSelector from "./component/ChainSelector";

// page
import Main from "./page/Main";
import Avalanche from "./page/Avalanche";
import Binance from "./page/Binance";
import Ethereum from "./page/Ethereum";
import Harmony from "./page/Harmony";
import Klaytn from "./page/Klaytn";
import Polygon from "./page/Polygon";
import Stacks from "./page/Stacks";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ChainSelector />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/AVAX" element={<Avalanche />} />
        <Route path="/BNB" element={<Binance />} />
        <Route path="/ETH" element={<Ethereum />} />
        <Route path="/ONE" element={<Harmony />} />
        <Route path="/KLAY" element={<Klaytn />} />
        <Route path="/MATIC" element={<Polygon />} />
        <Route path="/STX" element={<Stacks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
