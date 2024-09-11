import { useEffect, useState } from "react";

export default function TestingPage() {
  const [healthData, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:9999/health")
        .then((res) => {
          if (!res.ok) throw new Error("failed to fetch data");
          return res.json();
        })
        .then((data) => console.log(data));
    }, 5000);
  });

  return <>test</>;
}
