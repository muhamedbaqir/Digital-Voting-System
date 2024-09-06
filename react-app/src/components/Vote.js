import { Link } from "react-router-dom";

export default function Vote() {
  const candidates = ["tom", "alex", "bob"];
  const parties = ["spd", "csu", "afd"];

  return (
    <>
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
        <Link to="/success">
          <button type="submit" onSubmit={() => {}}>
            Foo
          </button>
        </Link>
      </div>
    </>
  );
}
