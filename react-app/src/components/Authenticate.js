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
      <h1>Authenticate</h1>
      <form>
        <div id="personalInfo">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" />
          <br />
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" />
          <br />

          <label htmlFor="street"> Street:</label>
          <input type="text" id="street" />
          <br />

          <label htmlFor="streetNumber">Street Number:</label>
          <input type="number" id="streetNumber" />
          <br />

          <label htmlFor="postalCode">Postal Code:</label>
          <input type="number" id="postalCode" />
          <br />

          <label htmlFor="birthday">Birthday:</label>
          <input type="Date" id="birthday" />

          <br />
          <Link to="/vote">
            <button type="submit" onSubmit={handleSubmit()}>
              Foo
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}
