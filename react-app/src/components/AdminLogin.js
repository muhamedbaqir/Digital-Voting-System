import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/admin/dashboard");
  };

  return (
    <>
      <h1>Admin login</h1>
      <form>
        <label htmlFor="username">Name: </label>
        <input type="text"></input>
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password"></input>
        <br />

        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  );
}
