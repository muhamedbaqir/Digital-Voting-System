import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";
import { useState } from "react";

export default function AddConstituencyParties() {
  const navigate = useNavigate();
  const [constituencyParties, setConstituencyParties] = useState([
    { name: "berlin", parties: ["spd"] },
    { name: "münchen", parties: ["csu, afd"] },
  ]);
  const [searchResult, setSearchResult] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchResult);
    console.log(selectedConstituency);
  };

  return (
    <>
      <h1 className="text-primary">Constituency Parties</h1>
      <form
        class="d-inline-flex"
        onSubmit={handleSubmit}
        onChange={(e) => setSelectedConstituency(e.target.value)}
      >
        <select class="form-select" aria-label="Default select example">
          {constituencyParties.map((it) => (
            <option value={it.name}>{it.name}</option>
          ))}
        </select>
        <input
          name="newEntry"
          class="form-control me-2"
          placeholder="Party"
          id="searchResult"
          value={searchResult}
          onChange={(e) => setSearchResult(e.target.value)}
        />
        <button class="btn btn-outline-success" type="submit">
          Add
        </button>
      </form>

      <div className="fixed-bottom">
        {PrevNextButtonBar(
          () => {
            navigate("/admin/AddConstituencies");
          },
          () => {
            navigate("/admin/AddConstituencyCandidates");
          },
          "Previous",
          "Next"
        )}
      </div>
    </>
  );
}
