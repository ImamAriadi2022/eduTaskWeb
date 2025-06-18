import React, { useState, useEffect } from "react";
import { Card, Table, Badge, Button, Modal, Form, Spinner } from "react-bootstrap";

const TugasKelompok = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // Ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Ambil data tugas kelompok dari backend
  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    // Ambil tugas berdasarkan user_id dan type=Kelompok
    fetch(`https://edu-backend-mocha.vercel.app/api/tugas?user_id=${user.id}&type=Kelompok`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.tasks)) {
          setTasks(data.tasks); // Pastikan hanya mengambil tugas milik user
        } else {
          setTasks([]); // Jika respons tidak valid, kosongkan tugas
        }
        setLoading(false);
      })
      .catch(() => {
        setTasks([]);
        setLoading(false);
      });
  }, [user]);

  const handleEdit = (task) => {
    setEditTask({ ...task });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://edu-backend-mocha.vercel.app/api/tugas/${editTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTask.title,
          course: editTask.course,
          type: "Kelompok",
          jenis: editTask.jenis,
          deadline: editTask.deadline.slice(0, 10), // Format YYYY-MM-DD
          status: editTask.status,
          note: editTask.note,
          anggota: editTask.anggota || null,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setTasks(tasks.map((t) => (t.id === editTask.id ? result.updated : t)));
        setShowModal(false);
      } else {
        alert("Gagal menyimpan perubahan.");
      }
    } catch {
      alert("Gagal menyimpan perubahan.");
    }
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
          Daftar Tugas Kelompok
        </h2>
        <Card style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <Card.Body>
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" variant="warning" />
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center text-muted my-4">Tidak ada tugas.</div>
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
                      <td>
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString("id-ID")
                          : "-"}
                      </td>
                      <td>
                        <Badge
                          bg={
                            task.status === "Selesai"
                              ? "success"
                              : task.status === "Progres"
                              ? "info"
                              : "warning"
                          }
                        >
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
            )}
            {/* Modal Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Form onSubmit={handleSave}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Tugas Kelompok</Modal.Title>
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
                      value={editTask?.deadline ? editTask.deadline.slice(0, 10) : ""}
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
                      <option value="Progres">Progres</option>
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

export default TugasKelompok;