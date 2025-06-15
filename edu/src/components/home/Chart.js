import React from "react";
import { Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Registrasi chart.js components
Chart.register(ArcElement, Tooltip, Legend);

// Data dummy distribusi tugas
const dummyData = [
  { type: "Individu", count: 7 },
  { type: "Kelompok", count: 5 },
];

const data = {
  labels: dummyData.map((d) => d.type),
  datasets: [
    {
      data: dummyData.map((d) => d.count),
      backgroundColor: ["#0d6efd", "#198754"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const TaskDistributionChart = () => (
  <Card>
    <Card.Body>
      <Card.Title>Distribusi Tugas</Card.Title>
      <div style={{ width: 220, height: 220, margin: "0 auto" }}>
        <Pie data={data} options={options} />
      </div>
    </Card.Body>
  </Card>
);

export default TaskDistributionChart;