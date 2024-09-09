import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(true);
  const [electionIsRunning, setElectionIsRunning] = useState(false);

  if (!adminLoggedIn) return <Navigate to="/admin/login" />;

  return (
    <>
      <h1>Admin dashboard</h1>
      {electionIsRunning ? (
        <div>
          <text>Election is running</text>
          <br />
          <button>Stop Election</button>
        </div>
      ) : (
        <div>
          <text>No election is running</text>
          <br />
          <button>Start Election</button>
        </div>
      )}
    </>
  );
}
