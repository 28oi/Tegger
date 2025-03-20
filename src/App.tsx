import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import HomePage from "./pages/HomePage";
import './styles.css';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;