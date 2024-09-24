import { Link } from "react-router-dom";

export default function Success() {
  return (
    <>
      <div className="container mt-5 text-center">
        <h1 className="display-1 text-primary ">
          <b>Vote successful!</b>
        </h1>

        <Link to="/">
          <button type="button" className="btn btn-secondary mt-5">
            <h2>go to Home</h2>
          </button>
        </Link>
      </div>
    </>
  );
}
