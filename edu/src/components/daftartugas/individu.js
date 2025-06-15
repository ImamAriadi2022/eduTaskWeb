import React, { useState } from "react";
import { Card, Table, Badge, Button, Modal, Form } from "react-bootstrap";

const initialTasks = [
  {
    id: 1,
    title: "Makalah Matematika",
    course: "Matematika",
    jenis: "Makalah",
    deadline: "2025-06-20",
    status: "Belum Selesai",
    note: "Kerjakan bab 1-3",
  },
  {
    id: 2,
    title: "Jurnal Fisika",
    course: "Fisika",
    jenis: "Jurnal",
    deadline: "2025-06-22",
    status: "Selesai",
    note: "",
  },
];

const TugasIndividu = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleEdit = (task) => {
    setEditTask({ ...task });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setTasks(tasks.map((t) => (t.id === editTask.id ? editTask : t)));
    setShowModal(false);
  };

  return (
    <div
      className="d-flex flex-column min-vh-100 justify-content-center align-items-center"
      style={{
        background: "#fffbe6",
        transition: "background 0.5s cubic-bezier(.4,0,.2,1)",
        padding: "40px 0",
      }}
    >
      <div className="container">
        <h2 className="mb-3" style={{ color: "#ff8800", fontWeight: "bold" }}>
          Daftar Tugas Individu
        </h2>
        <Card style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Tugas</th>
                  <th>Mata Kuliah</th>
                  <th>Jenis</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Note</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => (
                  <tr key={task.id}>
                    <td>{idx + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.course}</td>
                    <td>{task.jenis}</td>
                    <td>{new Date(task.deadline).toLocaleDateString("id-ID")}</td>
                    <td>
                      <Badge bg={task.status === "Selesai" ? "success" : "warning"}>
                        {task.status}
                      </Badge>
                    </td>
                    <td>{task.note}</td>
                    <td>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Modal Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Form onSubmit={handleSave}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Tugas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Tugas</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={editTask?.title || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mata Kuliah</Form.Label>
                    <Form.Control
                      type="text"
                      name="course"
                      value={editTask?.course || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Jenis</Form.Label>
                    <Form.Control
                      type="text"
                      name="jenis"
                      value={editTask?.jenis || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                      type="date"
                      name="deadline"
                      value={editTask?.deadline || ""}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={editTask?.status || ""}
                      onChange={handleChange}
                    >
                      <option value="Selesai">Selesai</option>
                      <option value="Belum Selesai">Belum Selesai</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="note"
                      value={editTask?.note || ""}
                      onChange={handleChange}
                      rows={2}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Batal
                  </Button>
                  <Button variant="warning" type="submit">
                    Simpan
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default TugasIndividu;