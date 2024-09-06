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
      {electionIsRunning ? (
        <div>
          <h1>the election is still running</h1>
          <li>
            <Link to="/vote">go vote</Link>
          </li>
        </div>
      ) : (
        <div id="election-results">
          <h1>The Election is over</h1>
          <h2>Election Results</h2>
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
      )}
    </>
  );
}
