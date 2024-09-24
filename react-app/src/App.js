import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Authenticate from "./pages/Authenticate";
import Vote from "./pages/Vote";
import Success from "./pages/Success";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import TestingPage from "./pages/TestingPage";

import AddConstituencies from "./pages/StartElection/AddConstituencies";
import AddConstituencyCandidates from "./pages/StartElection/AddConstituencyCandidates";
import AddConstituencyParties from "./pages/StartElection/AddConstituencyParties";
import AddFederalParties from "./pages/StartElection/AddFederalParties";
import ConfirmElectionStart from "./pages/StartElection/ConfirmElectionStart";

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
        <Route path="/test" element={<TestingPage />} />

        <Route
          path="/admin/AddConstituencies"
          element={<AddConstituencies />}
        />
        <Route
          path="/admin/AddConstituencyCandidates"
          element={<AddConstituencyCandidates />}
        />
        <Route
          path="/admin/AddConstituencyParties"
          element={<AddConstituencyParties />}
        />
        <Route
          path="/admin/AddFederalParties"
          element={<AddFederalParties />}
        />
        <Route
          path="/admin/ConfirmElectionStart"
          element={<ConfirmElectionStart />}
        />
      </Routes>
    </Router>
  );
}

export default App;
