import React from "react";
import { Table, Badge, Card } from "react-bootstrap";

// Data dummy tugas
const tasks = [
  {
    id: 1,
    title: "Tugas Matematika",
    course: "Matematika",
    type: "Individu",
    deadline: "2025-06-17",
    status: "Belum Selesai",
  },
  {
    id: 2,
    title: "Proyek Kelompok Fisika",
    course: "Fisika",
    type: "Kelompok",
    deadline: "2025-06-19",
    status: "Belum Selesai",
  },
  {
    id: 3,
    title: "Makalah Sejarah",
    course: "Sejarah",
    type: "Individu",
    deadline: "2025-06-19",
    status: "Selesai",
  },
  {
    id: 4,
    title: "Presentasi Kimia",
    course: "Kimia",
    type: "Kelompok",
    deadline: "2025-06-22",
    status: "Belum Selesai",
  },
];

const TaskDeadlineTable = () => (
  <Card>
    <Card.Body>
      <Card.Title>Daftar Deadline Tugas</Card.Title>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Tugas</th>
            <th>Mata Kuliah</th>
            <th>Jenis</th>
            <th>Deadline</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={task.id}>
              <td>{idx + 1}</td>
              <td>{task.title}</td>
              <td>{task.course}</td>
              <td>
                <Badge bg={task.type === "Individu" ? "info" : "success"}>
                  {task.type}
                </Badge>
              </td>
              <td>{new Date(task.deadline).toLocaleDateString("id-ID")}</td>
              <td>
                <Badge bg={task.status === "Selesai" ? "success" : "warning"}>
                  {task.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
    </Card>
);
export default TaskDeadlineTable;