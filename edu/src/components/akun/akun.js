import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PengaturanAkun = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Ambil data user dari backend saat komponen mount
  useEffect(() => {
    if (user && user.id) {
      fetch(`https://edu-backend-mocha.vercel.app/api/user/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm((prev) => ({
            ...prev,
            username: data.username || "",
            email: data.email || "",
          }));
        })
        .catch(() => setError("Gagal mengambil data akun"));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (form.password && form.password !== form.confirmPassword) {
      setError("Kata sandi baru dan konfirmasi tidak sama.");
      return;
    }
    try {
      const res = await fetch(`https://edu-backend-mocha.vercel.app/api/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password ? form.password : user.password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Perubahan akun berhasil disimpan!");
        setForm({ ...form, password: "", confirmPassword: "" });
        // Update localStorage user info
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            username: form.username,
            email: form.email,
            password: form.password ? form.password : user.password,
          })
        );
      } else {
        setError(data.message || "Gagal menyimpan perubahan.");
      }
    } catch {
      setError("Gagal terhubung ke server!");
    }
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
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Kata sandi baru"
                autoComplete="new-password"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Konfirmasi Kata Sandi Baru</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Konfirmasi kata sandi baru"
                autoComplete="new-password"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
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