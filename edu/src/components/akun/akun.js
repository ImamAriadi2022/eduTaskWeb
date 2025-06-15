import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

const PengaturanAkun = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Kata sandi baru dan konfirmasi tidak sama.");
      return;
    }
    // Simulasi update akun
    setSuccess("Perubahan akun berhasil disimpan!");
    setForm({ ...form, password: "", confirmPassword: "" });
  };

  return (
    <Card style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: 500, margin: "0 auto" }}>
      <Card.Body>
        <h4 className="mb-3" style={{ color: "#ff8800", fontWeight: "bold" }}>Pengaturan Akun</h4>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Pengguna</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Masukkan nama pengguna"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Kata Sandi Baru</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Kata sandi baru"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Konfirmasi Kata Sandi Baru</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Konfirmasi kata sandi baru"
            />
          </Form.Group>
          <Button variant="warning" type="submit">
            Simpan Perubahan
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PengaturanAkun;