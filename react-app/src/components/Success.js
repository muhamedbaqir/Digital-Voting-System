import { Link } from "react-router-dom";

export default function Success() {
  return (
    <>
      <div className="container mt-5 text-center">
        <h1 className="display-1">Vote successful!</h1>
        <Link to="/">
          <h2>go to Home</h2>
        </Link>
      </div>
    </>
  );
}
