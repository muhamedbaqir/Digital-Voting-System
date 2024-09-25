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

async function postConstituencyParties(constituencyParty) {
  const url = "http://localhost:8000/constituency_parties"; // Replace with your endpoint

  // Extract the necessary properties from the constituency party object
  const {
    id: constituencyPartyId,
    constituency_id,
    parties,
  } = constituencyParty;

  for (const party of parties) {
    // Construct the object to be posted for each party
    const partyData = {
      constituency_party_id: constituencyPartyId,
      constituency_id: constituency_id,
      name: party,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify(partyData), // Convert to JSON string
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json(); // Assuming the server returns JSON
      console.log(`Successfully posted:`, responseData);
    } catch (error) {
      console.error(`Failed to post ${party}:`, error);
    }
  }
}

export default function AddConstituencyParties() {
  const navigate = useNavigate();
  const [constituencyParties, setConstituencyParties] = useState([
    //{ name: "berlin", parties: ["spd"] },
    //{ name: "münchen", parties: ["csu", "afd"] },
  ]);
  const [constituencies, setConstituencies] = useState();
  const [searchResult, setSearchResult] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");

  useEffect(() => {
    if (constituencies == undefined) {
      let url = "http://localhost:8000/constituencies";
      fetch(url)
        .then((res) => res.json())
        .then((data) => setConstituencies(data))
        .catch((error) => console.log(error));
    }
  }, [constituencies]);

  useEffect(() => {
    if (constituencies != undefined) {
      console.log(constituencies);
      let newConstituencyParties = [];
      for (const c of constituencies) {
        newConstituencyParties.push({
          constituency_id: c.constituency_id,
          name: c.name,
          parties: [],
        });
      }
      setConstituencyParties(newConstituencyParties);
      if (newConstituencyParties.length != 0) {
        setSelectedConstituency(newConstituencyParties[0]);
      }
    }
  }, [constituencies]);

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
            for (const party of constituencyParties) {
              postConstituencyParties(party);
            }
            //navigate("/admin/AddConstituencyCandidates");
          },
          "Previous",
          "Next"
        )}
      </div>
    </>
  );
}
