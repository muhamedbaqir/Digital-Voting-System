import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  if (!adminLoggedIn) return <Navigate to="/admin/login" />;

  return (
    <>
      <h1>Admin dashboard</h1>
    </>
  );
}
