import React, { useEffect, useState } from "react";
import { Table, Badge, Card, Spinner } from "react-bootstrap";

const TaskDeadlineTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User dari localStorage:", user); // Tambahkan log ini
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const url = `https://edu-backend-mocha.vercel.app/api/tugas?user_id=${user.id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data tugas dari API:", data); // Tambahkan log ini
        if (data.success && Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          setTasks([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error saat fetch data:", err); // Tambahkan log ini
        setTasks([]);
        setLoading(false);
      });
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Daftar Deadline Tugas</Card.Title>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
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
                  <td>
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                  <td>
                    <Badge bg={task.status === "Selesai" ? "success" : "warning"}>
                      {task.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default TaskDeadlineTable;