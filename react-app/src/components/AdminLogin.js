import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/admin/dashboard");
  };

  return (
    <>
      <div className="container mt-5 text-start">
        <h1>Admin login</h1>
        <form className="form-control justify-content-center align-items-center">
          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              Name:
            </label>
            <input className="form-control" type="text"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input className="form-control" type="password"></input>

            <button
              className="btn btn-primary btn-lg mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
