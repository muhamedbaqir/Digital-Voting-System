import { Link } from "react-router-dom";

export default function Success() {
  return (
    <>
      <h1>Vote successful!</h1>
      <Link to="/">go to Home</Link>
    </>
  );
}
