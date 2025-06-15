import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import BrandNavbar from "../components/navbar";
import Footer from "../components/footer";
import { Card, Form, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { FaBook, FaUsers, FaFileAlt, FaStickyNote, FaPlus, FaTrash } from "react-icons/fa";

const jenisTugasOptions = [
  { value: "Makalah", label: "Makalah" },
  { value: "PPT", label: "PPT" },
  { value: "Jurnal", label: "Jurnal" },
  { value: "Laporan Praktikum", label: "Laporan Praktikum" },
  { value: "Laporan Turun Lapang", label: "Laporan Turun Lapang" },
  { value: "Lainnya", label: "Lainnya" },
];

const statusOptions = [
  { value: "Selesai", label: "Selesai" },
  { value: "Progres", label: "Progres" },
  { value: "Belum Dikerjakan", label: "Belum Dikerjakan" },
];

const TambahTugas = () => {
  const [form, setForm] = useState({
    matakuliah: "",
    jenisKelompok: "Individu",
    jenisTugas: "Makalah",
    jenisTugasLain: "",
    status: "Belum Dikerjakan",
    note: "",
    anggota: [""],
    deadline: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAnggotaChange = (idx, value) => {
    const newAnggota = [...form.anggota];
    newAnggota[idx] = value;
    setForm({ ...form, anggota: newAnggota });
  };

  const handleAddAnggota = () => {
    setForm({ ...form, anggota: [...form.anggota, ""] });
  };

  const handleRemoveAnggota = (idx) => {
    const newAnggota = form.anggota.filter((_, i) => i !== idx);
    setForm({ ...form, anggota: newAnggota });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!user) {
      setError("Anda harus login terlebih dahulu.");
      return;
    }
    // Validasi anggota kelompok jika kelompok
    if (form.jenisKelompok === "Kelompok" && form.anggota.some((a) => !a.trim())) {
      setError("Nama anggota kelompok tidak boleh kosong.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/tugas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.jenisTugas === "Lainnya" ? form.jenisTugasLain : form.jenisTugas,
          course: form.matakuliah,
          type: form.jenisKelompok,
          jenis: form.jenisTugas,
          deadline: form.deadline,
          status: form.status,
          note: form.note,
          anggota: form.jenisKelompok === "Kelompok" ? form.anggota.join(", ") : null,
          user_id: user.id,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Tugas berhasil ditambahkan!");
        setForm({
          matakuliah: "",
          jenisKelompok: "Individu",
          jenisTugas: "Makalah",
          jenisTugasLain: "",
          status: "Belum Dikerjakan",
          note: "",
          anggota: [""],
          deadline: "",
        });
      } else {
        setError(data.message || "Gagal menambah tugas.");
      }
    } catch {
      setError("Gagal terhubung ke server.");
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        background: "#fffbe6",
        transition: "background 0.5s cubic-bezier(.4,0,.2,1)",
      }}
    >
      <BrandNavbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <div className="container">
            <h2 className="mb-3" style={{ color: "#ff8800", fontWeight: "bold" }}>
              <FaFileAlt className="me-2" />
              Tambah Tugas
            </h2>
            <Card style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <Card.Body>
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaBook className="me-2" />
                      Mata Kuliah
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="matakuliah"
                      value={form.matakuliah}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: Matematika"
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaUsers className="me-2" />
                          Jenis Tugas
                        </Form.Label>
                        <Form.Select
                          name="jenisKelompok"
                          value={form.jenisKelompok}
                          onChange={handleChange}
                        >
                          <option value="Individu">Individu</option>
                          <option value="Kelompok">Kelompok</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaFileAlt className="me-2" />
                          Jenis File Tugas
                        </Form.Label>
                        <Form.Select
                          name="jenisTugas"
                          value={form.jenisTugas}
                          onChange={handleChange}
                        >
                          {jenisTugasOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Form.Select>
                        {form.jenisTugas === "Lainnya" && (
                          <Form.Control
                            className="mt-2"
                            type="text"
                            name="jenisTugasLain"
                            value={form.jenisTugasLain}
                            onChange={handleChange}
                            placeholder="Isi jenis tugas lainnya"
                            required
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                      type="date"
                      name="deadline"
                      value={form.deadline}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  {form.jenisKelompok === "Kelompok" && (
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaUsers className="me-2" />
                        Anggota Kelompok
                      </Form.Label>
                      {form.anggota.map((nama, idx) => (
                        <InputGroup className="mb-2" key={idx}>
                          <Form.Control
                            type="text"
                            value={nama}
                            onChange={(e) => handleAnggotaChange(idx, e.target.value)}
                            placeholder={`Nama anggota ${idx + 1}`}
                            required
                          />
                          {form.anggota.length > 1 && (
                            <Button
                              variant="danger"
                              onClick={() => handleRemoveAnggota(idx)}
                              tabIndex={-1}
                            >
                              <FaTrash />
                            </Button>
                          )}
                        </InputGroup>
                      ))}
                      <Button
                        variant="info"
                        onClick={handleAddAnggota}
                        className="mt-1"
                        type="button"
                      >
                        <FaPlus className="me-1" /> Tambah Anggota
                      </Button>
                    </Form.Group>
                  )}
                  <Form.Group className="mb-3">
                    <Form.Label>Status Tugas</Form.Label>
                    <Form.Select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaStickyNote className="me-2" />
                      Note Tugas
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="note"
                      value={form.note}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Catatan tambahan (opsional)"
                    />
                  </Form.Group>
                  <Button variant="warning" type="submit">
                    Simpan Tugas
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TambahTugas;