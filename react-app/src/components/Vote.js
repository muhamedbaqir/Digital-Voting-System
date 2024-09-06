import { useState } from "react";

export default function Vote() {
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

  const candidates = ["tom", "alex", "bob"];
  const parties = ["spd", "csu", "afd"];

  const handleSubmit = () => {};

  return (
    <>
      <h1>Vote</h1>
      <form>
        <div id="personalInfo">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" />
          <br />
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" />
          <br />

          <label for="street"> Street:</label>
          <input type="text" id="street" />
          <br />

          <label for="streetNumber">Street Number:</label>
          <input type="number" id="streetNumber" />
          <br />

          <label for="postalCode">Postal Code:</label>
          <input type="number" id="postalCode" />
          <br />

          <label for="birthday">Birthday:</label>
          <input type="Date" id="birthday" />

          <br />
          <button type="submit" onSubmit={handleSubmit()}>
            Foo
          </button>
        </div>
        <div id="votes">
          <label for="firstVote">first Vote:</label>
          <select>
            {candidates.map((candidate) => (
              <option value={candidate}>{candidate} </option>
            ))}
          </select>
          <br />

          <label for="secondVote">second Vote:</label>
          <select>
            {parties.map((party) => (
              <option value={party}>{party} </option>
            ))}
          </select>
          <br />
        </div>
      </form>
    </>
  );
}
