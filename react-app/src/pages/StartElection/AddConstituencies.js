import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";
import { useEffect, useState } from "react";

export default function AddConstituencies() {
  const navigate = useNavigate();
  const [constituencies, setConstituencies] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (constituencies.includes(searchResult) || searchResult == "") {
      alert("Input cannot be null or already exists");
      return;
    }
    setConstituencies([...constituencies, searchResult]);
    setSearchResult("");
  };
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
            navigate("/admin/AddConstituencyParties");
          },
          "Abort",
          "Next"
        )}
      </div>
    </>
  );
}
