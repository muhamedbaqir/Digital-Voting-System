import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(true);

  if (adminLoggedIn) return <Navigate to="/admin/dashboard" />;
  else return <Navigate to="/admin/login" />;
}
