import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

const App = () => {
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<DetailPage />} />
    </Routes>

  </Router>
};

export default App;
