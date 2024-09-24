import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const electionRunningPage = (navigate) => {
  return (
    <div>
      <h1 className="text-primary">Election is running</h1>
      <br />
      <button className="btn btn-primary btn-lg mt-2">Stop Election</button>
    </div>
  );
};

const noElectionRunningPage = (navigate) => {
  return (
    <div>
      <h1 className="text-primary">No Election is running</h1>
      <br />
      <button
        className="btn btn-primary btn-lg mt-2"
        onClick={() => navigate("/admin/AddConstituencies")}
      >
        Start Election
      </button>
    </div>
  );
};

export default function AdminDashboard() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(true);
  const [electionIsRunning, setElectionIsRunning] = useState(false);
  const navigate = useNavigate();

  if (!adminLoggedIn) return <Navigate to="/admin/login" />;

  return (
    <>
      <div className="container text-center mt-5">
        <h1 className="text-primary">Admin dashboard</h1>
        {electionIsRunning
          ? electionRunningPage(navigate)
          : noElectionRunningPage(navigate)}
      </div>
    </>
  );
}
