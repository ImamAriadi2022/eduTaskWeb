import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Registrasi chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const TaskDistributionChart = () => {
  const [data, setData] = useState({
    labels: ["Individu", "Kelompok"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#0d6efd", "#198754"],
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setLoading(false);
      return;
    }
    fetch(`https://edu-backend-mocha.vercel.app/api/distribusi/${user.id}`)
      .then((res) => res.json())
      .then((dist) => {
        setData({
          labels: ["Individu", "Kelompok"],
          datasets: [
            {
              data: [dist.individu || 0, dist.kelompok || 0],
              backgroundColor: ["#0d6efd", "#198754"],
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Distribusi Tugas</Card.Title>
        <div style={{ width: 220, height: 220, margin: "0 auto" }}>
          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : (
            <Pie data={data} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "bottom" } },
            }} />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskDistributionChart;