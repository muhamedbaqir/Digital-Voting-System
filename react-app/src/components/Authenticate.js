import { useState } from "react";
import { Link } from "react-router-dom";

export default function Authenticate() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    streetNumber: "",
    city: "",
    postalCode: "",
    birthDate: null,
  });

  const handleSubmit = () => {};

  return (
    <>
      <div className="container center-text mt-5">
        <h1>Authenticate</h1>
        <form className="form-control justify-content-center align-items-center">
          <div className="mb-3">
            <label className="form-label" htmlFor="firstName">
              First Name
            </label>
            <input className="form-control" type="text" id="firstName" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="lastName">
              Last Name
            </label>
            <input className="form-control" type="text" id="lastName" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="street">
              Street
            </label>
            <input className="form-control" type="text" id="street" />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="streetNumber">
              Street Number
            </label>
            <input className="form-control" type="number" id="streetNumber" />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="postalCode">
              Postal Code
            </label>
            <input className="form-control" type="number" id="postalCode" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="birthday">
              Birthday
            </label>
            <input className="form-control" type="Date" id="birthday" />
          </div>

    <Link to="/vote">
            <button
              className="btn btn-primary"
              type="submit"
              onSubmit={handleSubmit()}
            >
              Submit
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}
