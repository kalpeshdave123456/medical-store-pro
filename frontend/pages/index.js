import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/reports")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Revenue: ₹{data.revenue}</p>
      <p>Profit: ₹{data.profit}</p>
    </div>
  );
}
