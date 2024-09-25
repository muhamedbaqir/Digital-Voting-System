import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";
import { useEffect, useState } from "react";

const displayConstituencyParties = (constituencyParties, handleDelete) => {
  console.log(constituencyParties);
  return (
    <div>
      {constituencyParties.map((c) => (
        <div>
          <h2 className="text-secondary">{c.name}</h2>
          <ul className="list-group">
            {c.parties.map((p) => (
              <li class="list-group-item mt-3">
                <div className="row">
                  <div className="col">{p}</div>
                  <column className="col">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(c.name, p)}
                    >
                      delete
                    </button>
                  </column>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default function AddConstituencyParties() {
  const navigate = useNavigate();
  const [constituencyParties, setConstituencyParties] = useState([
    { name: "berlin", parties: ["spd"] },
    { name: "münchen", parties: ["csu", "afd"] },
  ]);

  useEffect(() => {}, [constituencyParties]);

  const [searchResult, setSearchResult] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState(
    constituencyParties[0].name
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    let index = constituencyParties.findIndex(
      (it) => it.name == selectedConstituency
    );
    let tempParties = constituencyParties[index].parties;
    if (tempParties.includes(searchResult) || searchResult == "") {
      alert("Party is null or already exists");
      return;
    }
    tempParties = [...tempParties, searchResult];
    let tempConstituencies = [...constituencyParties];
    tempConstituencies[index].parties = tempParties;
    setConstituencyParties(tempConstituencies);
    setSearchResult("");
  };

  const handleDelete = (constituencyName, party) => {
    let constituencyIndex = constituencyParties.findIndex(
      (it) => it.name == constituencyName
    );
    let tempParties = [...constituencyParties[constituencyIndex].parties];
    tempParties = tempParties.filter((it) => it != party);

    let tempConstituencies = [...constituencyParties];
    tempConstituencies[constituencyIndex].parties = [...tempParties];
    setConstituencyParties([...tempConstituencies]);
  };

  return (
    <>
      <h1 className="text-primary">Constituency Parties</h1>
      <form class="d-inline-flex" onSubmit={handleSubmit}>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => setSelectedConstituency(e.target.value)}
        >
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
      {displayConstituencyParties(constituencyParties, handleDelete)}

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
