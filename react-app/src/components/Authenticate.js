import { useState } from "react";
import { Link } from "react-router-dom";

export default function Authenticate() {
  // maybe break apart into two pages and transition using session storage
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
      <h1>Authenticate</h1>
      <form className="form-control justify-content-center align-items-center">
        <div className="mb-3">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" />
        </div>

        <div className="mb-3">
          <label htmlFor="street"> Street:</label>
          <input type="text" id="street" />
        </div>
        <div className="mb-3">
          <label htmlFor="streetNumber">Street Number:</label>
          <input type="number" id="streetNumber" />
        </div>
        <div className="mb-3">
          <label htmlFor="postalCode">Postal Code:</label>
          <input type="number" id="postalCode" />
        </div>

        <div className="mb-3">
          <label htmlFor="birthday">Birthday:</label>
          <input type="Date" id="birthday" />
        </div>

        <Link to="/vote">
          <button type="submit" onSubmit={handleSubmit()}>
            Foo
          </button>
        </Link>
      </form>
    </>
  );
}
