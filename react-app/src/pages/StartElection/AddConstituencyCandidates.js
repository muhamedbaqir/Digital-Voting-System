import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";
import { useEffect, useState } from "react";

class Candidate {
  constructor(firstName, lastName, party) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.party = party;
  }
}

const displayConstituencyCandidates = (
  constituencyCandidates,
  handleDelete
) => {
  return (
    <div>
      {constituencyCandidates.map((c) => (
        <div>
          <h2 className="text-secondary">{c.name}</h2>
          <ul className="list-group">
            {c.candidates.map((p) => (
              <li class="list-group-item mt-3">
                <div className="row">
                  <div className="col">
                    {p.firstName} {p.lastName}
                  </div>
                  <div className="col">{p.party}</div>
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

export default function AddConstituencyCandidates() {
  const navigate = useNavigate();
  const [constituencyCandidates, setConstituencyCandidates] = useState([
    {
      constituency: "berlin",
      candidates: [
        new Candidate("tom", "schmitz", "afd"),
        new Candidate("lisa", "friede", "csu"),
      ],
    },
    {
      constituency: "münchen",
      candidates: [
        new Candidate("Anton", "Maier", "spd"),
        new Candidate("Luisa", "Mair", "csu"),
      ],
    },
    ,
  ]);
  const [parties, setParties] = useState(["csu", "afd"]);

  useEffect(() => {}, [constituencyCandidates]);

  const [candidateFirstName, setCandidateFirstName] = useState("");
  const [candidateLastName, setCandidateLastName] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState(
    constituencyCandidates[0].constituency
  );
  const [selectedParty, setSelectedParty] = useState(parties[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let index = constituencyCandidates.findIndex(
      (it) => it.constituency == selectedConstituency
    );
    let tempCandidates = constituencyCandidates[index].candidates;
    if (
      tempCandidates.includes(candidateFirstName) ||
      candidateFirstName == "" ||
      candidateLastName == ""
    ) {
      alert("Candidate is null or already exists");
      return;
    }

    tempCandidates = [...tempCandidates, candidateFirstName];
    let tempConstituencies = [...constituencyCandidates];
    tempConstituencies[index].candidates = tempCandidates;
    setConstituencyCandidates(tempConstituencies);
    setCandidateFirstName("");
    setCandidateLastName("");
  };

  const handleDelete = (constituencyName, party) => {
    let constituencyIndex = constituencyCandidates.findIndex(
      (it) => it.constituency == constituencyName
    );
    let tempParties = [...constituencyCandidates[constituencyIndex].candidates];
    tempParties = tempParties.filter((it) => it != party);

    let tempConstituencies = [...constituencyCandidates];
    tempConstituencies[constituencyIndex].candidates = [...tempParties];
    setConstituencyCandidates([...tempConstituencies]);
  };

  return (
    <>
      <h1 className="text-primary">Constituency Candidates</h1>
      <form class="d-inline-flex" onSubmit={handleSubmit}>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => setSelectedConstituency(e.target.value)}
        >
          {constituencyCandidates.map((it) => (
            <option value={it.constituency}>{it.constituency}</option>
          ))}
        </select>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => setSelectedConstituency(e.target.value)}
        >
          {parties.map((it) => (
            <option value={it}>{it}</option>
          ))}
        </select>

        <input
          name="newEntry"
          class="form-control me-2"
          placeholder="First Name"
          id="searchResult"
          value={candidateFirstName}
          onChange={(e) => setCandidateFirstName(e.target.value)}
        />
        <input
          name="newEntry"
          class="form-control me-2"
          placeholder="Last Name"
          id="searchResult"
          value={candidateLastName}
          onChange={(e) => setCandidateLastName(e.target.value)}
        />
        <button class="btn btn-outline-success" type="submit">
          Add
        </button>
      </form>
      {displayConstituencyCandidates(constituencyCandidates, handleDelete)}

      <div className="fixed-bottom">
        {" "}
        {PrevNextButtonBar(
          () => {
            navigate("/admin/AddConstituencyParties");
          },
          () => {
            navigate("/admin/AddFederalParties");
          },
          "Previous",
          "Next"
        )}
      </div>
    </>
  );
}
