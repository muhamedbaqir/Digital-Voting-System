import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Authenticate from "./components/Authenticate";
import Vote from "./components/Vote";
import Success from "./components/Success";
import Admin from "./components/Admin";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin/" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
