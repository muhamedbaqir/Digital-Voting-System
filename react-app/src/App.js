import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Authenticate from "./components/Authenticate";
import Vote from "./components/Vote";
import Success from "./components/Success";
import Admin from "./components/Admin";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import TestingPage from "./components/TestingPage";

import AddConstituencies from "./components/StartElection/AddConstituencies";
import AddConstituencyCandidates from "./components/StartElection/AddConstituencyCandidates";
import AddConstituencyParties from "./components/StartElection/AddConstituencyParties";
import AddFederalParties from "./components/StartElection/AddFederalParties";
import ConfirmElectionStart from "./components/StartElection/ConfirmElectionStart";

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
