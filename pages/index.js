import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header/header";
import Landing from "../components/landing/landing";
import Mint from "../components/mint/mint";

export default function App() {

  return (
    < div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/mint" element={<Mint />}></Route>
        </Routes>
      </Router>
    </div >
  );
}
