import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import AuthenticateVoter from "./components/AuthenticateVoter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AuthenticateVoter" element={<AuthenticateVoter />} />
      </Routes>
    </Router>
  );
}

export default App;
