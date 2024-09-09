import { Link } from "react-router-dom";

export default function Vote() {
  const candidates = ["tom", "alex", "bob"];
  const parties = ["spd", "csu", "afd"];

  return (
    <>
      <div className="container mt-5">
        <h1 className=" text-primary">
          <b>Vote</b>
        </h1>

        <form>
          <label className="form-label" for="firstVote">
            first Vote:
          </label>
          <select className="form-select form-select-lg mb-3">
            {candidates.map((candidate) => (
              <option value={candidate}>{candidate} </option>
            ))}
          </select>
          <label className="form-label" for="secondVote">
            second Vote:
          </label>
          <select className="form-select form-select-lg mb-3">
            {parties.map((party) => (
              <option value={party}>{party} </option>
            ))}
          </select>
          <br />
          <Link to="/success">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              onSubmit={() => {}}
            >
              Vote
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}
