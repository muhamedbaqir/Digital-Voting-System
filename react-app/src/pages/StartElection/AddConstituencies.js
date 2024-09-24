import { useNavigate } from "react-router-dom";

export default function AddConstituencies() {
  const navigate = useNavigate();

  return (
    <>
      AddConstituencies
      <button
        className="btn btn-primary btn-lg mt-3"
        type="submit"
        onClick={() => navigate("/admin/dashboard")}
      >
        Abort
      </button>
      <button
        className="btn btn-primary btn-lg mt-3"
        type="submit"
        onClick={() => navigate("/admin/AddConstituencyParties")}
      >
        Next
      </button>
    </>
  );
}
