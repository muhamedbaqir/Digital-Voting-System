import { useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Bar,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";

export default function Home() {
  const CHART_COLOR = "#82ca9d";

  // need to query backend instead
  const [electionIsRunning, setElectionIsRunning] = useState(true);

  const electionResults = [
    {
      name: "afd",
      percentage: 40,
      seats: 40,
      color: "#0000ff",
    },
    {
      name: "csu",
      percentage: 50,
      seats: 50,
      color: "#000000",
    },
    {
      name: "spd",
      percentage: 10,
      seats: 10,
      color: "#FF0000",
    },
  ];

  return (
    <>
      <button onClick={() => setElectionIsRunning(!electionIsRunning)}>
        Debug: Toggle Election State
      </button>
      <br />

      <div className="container text-center mt-5">
        <h1 className="display-1 text-primary">
          <b>German Federal Election</b>
        </h1>
      </div>
      {electionIsRunning ? (
        <div className="container text-center mt-5">
          <h1 className="text-secondary">The election is ongoing</h1>

          <Link to="/authenticate">
            <button className="btn btn-primary btn-lg mt-5">
              Cast your vote
            </button>
          </Link>

          <div className="container text-start mt-5">
            <p class="mb-3">
              In the German federal election, each voter has two votes, which
              together help shape the government.
            </p>
            <p class="mb-3">
              The first vote (Erststimme) is used to choose a candidate from
              your local constituency. Germany is divided into 299
              constituencies, and you vote for the candidate you want to
              represent your local area in the Bundestag (federal parliament).
              The candidate with the most votes in each constituency wins a seat
              in the Bundestag.
            </p>
            <p class="mb-3">
              The second vote (Zweitstimme) is for a political party. This vote
              determines the overall proportion of seats each party gets in the
              Bundestag. The seats are allocated based on the percentage of
              second votes each party receives, influencing which parties form
              the coalition government and who becomes the Chancellor.
            </p>
            <p>
              Your two votes work together to ensure both local representation
              and proportional party representation in the German federal
              government.
            </p>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <h1 className="text-center text-secondary">
            The elections results are:
          </h1>
          <br />
          <div className="row">
            <div className="col-6">
              <h2>Party distribution</h2>
              <PieChart width={600} height={600}>
                <Pie
                  data={electionResults}
                  nameKey="name"
                  dataKey="percentage"
                  cx="50%"
                  cy="50%"
                  outerRadius={200}
                  fill={CHART_COLOR}
                >
                  {electionResults.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>

            <div className="col-6">
              <h2>Seat Distribution</h2>
              <BarChart width={600} height={400} data={electionResults}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="seats" fill={CHART_COLOR}>
                  {electionResults.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
