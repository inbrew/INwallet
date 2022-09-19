import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

// component
import Header from "./component/Header";
import ChainSelector from "./component/ChainSelector";

// page
import Main from "./page/Main";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ChainSelector />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
