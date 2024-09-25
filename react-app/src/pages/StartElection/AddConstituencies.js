import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";
import { useEffect, useState } from "react";

async function postConstituencies(constituencies) {
  const url = "http://localhost:8000/constituencies"; // Endpoint to which we'll post the data

  for (const constituency of constituencies) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate we're sending JSON
        },
        body: JSON.stringify({ name: constituency }), // Sending constituency as JSON
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); // Assuming the server returns JSON
      console.log(`Successfully posted: ${constituency}`, data);
    } catch (error) {
      console.error(`Failed to post ${constituency}:`, error);
    }
  }
}

export default function AddConstituencies() {
  const navigate = useNavigate();
  const [constituencies, setConstituencies] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    let url = "http://localhost:8000/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (constituencies.includes(searchResult) || searchResult == "") {
      alert("Input cannot be null or already exists");
      return;
    }
    setConstituencies([...constituencies, searchResult]);
    setSearchResult("");
  };

  const handleNext = () => {};

  const handleDelete = (e) => {
    setConstituencies(constituencies.filter((it) => it != e));
  };

  useEffect(() => {}, [constituencies]);

  return (
    <>
      <h1 className="text-primary">Constituencies</h1>

      <form class="d-inline-flex" onSubmit={handleSubmit}>
        <input
          name="newEntry"
          class="form-control me-2"
          placeholder="Search"
          id="searchResult"
          value={searchResult}
          onChange={(e) => setSearchResult(e.target.value)}
        />
        <button class="btn btn-outline-success" type="submit">
          Add
        </button>
      </form>

      <ul class="list-group">
        {constituencies.map((it) => (
          <li class="list-group-item mt-3">
            <div className="row">
              <div className="col">{it}</div>
              <column className="col">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(it)}
                >
                  delete
                </button>
              </column>
            </div>
          </li>
        ))}
      </ul>
      <div className="fixed-bottom">
        {PrevNextButtonBar(
          () => {
            navigate("/admin/dashboard");
          },
          () => {
            postConstituencies(constituencies);
            navigate("/admin/AddConstituencyParties");
          },
          "Abort",
          "Next"
        )}
      </div>
    </>
  );
}
