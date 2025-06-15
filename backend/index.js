const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Koneksi database
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "", // ganti sesuai password MySQL Anda
  database: "edutaskweb",
};

let pool;
let dbConnected = false;

(async () => {
  try {
    pool = await mysql.createPool(dbConfig);
    // Tes koneksi
    await pool.query("SELECT 1");
    dbConnected = true;
    console.log("Berhasil terhubung ke database MySQL!");
  } catch (err) {
    dbConnected = false;
    console.error("Gagal terhubung ke database MySQL:", err.message);
  }
})();

// Endpoint untuk cek status koneksi database
app.get("/api/db-status", (req, res) => {
  if (dbConnected) {
    res.json({ connected: true, message: "Database terhubung" });
  } else {
    res.status(500).json({ connected: false, message: "Database tidak terhubung" });
  }
});

// --- ENDPOINT AUTH ---
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  if (rows.length > 0) {
    res.json({ success: true, user: rows[0] });
  } else {
    res.status(401).json({ success: false, message: "Login gagal" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: "Username/email sudah terdaftar" });
  }
});

// --- ENDPOINT USER (PENGATURAN AKUN) ---
app.get("/api/user/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT id, username, email FROM users WHERE id = ?", [req.params.id]);
  if (rows.length > 0) res.json(rows[0]);
  else res.status(404).json({ message: "User tidak ditemukan" });
});

app.put("/api/user/:id", async (req, res) => {
  const { username, email, password } = req.body;
  await pool.query(
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
    [username, email, password, req.params.id]
  );
  res.json({ success: true });
});

// --- ENDPOINT TUGAS ---
app.get("/api/tugas", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM tugas");
  res.json(rows);
});

app.get("/api/tugas/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM tugas WHERE id = ?", [req.params.id]);
  if (rows.length > 0) res.json(rows[0]);
  else res.status(404).json({ message: "Tugas tidak ditemukan" });
});

app.post("/api/tugas", async (req, res) => {
  const {
    title,
    course,
    type,
    jenis,
    deadline,
    status,
    note,
    anggota,
    user_id,
  } = req.body;
  await pool.query(
    "INSERT INTO tugas (title, course, type, jenis, deadline, status, note, anggota, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [title, course, type, jenis, deadline, status, note, anggota || null, user_id]
  );
  res.json({ success: true });
});

app.put("/api/tugas/:id", async (req, res) => {
  const {
    title,
    course,
    type,
    jenis,
    deadline,
    status,
    note,
    anggota,
  } = req.body;
  await pool.query(
    "UPDATE tugas SET title=?, course=?, type=?, jenis=?, deadline=?, status=?, note=?, anggota=? WHERE id=?",
    [title, course, type, jenis, deadline, status, note, anggota || null, req.params.id]
  );
  res.json({ success: true });
});

app.delete("/api/tugas/:id", async (req, res) => {
  await pool.query("DELETE FROM tugas WHERE id = ?", [req.params.id]);
  res.json({ success: true });
});

// --- ENDPOINT RINGKASAN/STATISTIK ---
app.get("/api/summary/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const [[{ total }]] = await pool.query("SELECT COUNT(*) as total FROM tugas WHERE user_id = ?", [user_id]);
  const [[{ selesai }]] = await pool.query("SELECT COUNT(*) as selesai FROM tugas WHERE user_id = ? AND status = 'Selesai'", [user_id]);
  const [[{ mendekati }]] = await pool.query(
    "SELECT COUNT(*) as mendekati FROM tugas WHERE user_id = ? AND deadline BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 3 DAY) AND status != 'Selesai'",
    [user_id]
  );
  res.json({ total, selesai, mendekati });
});

// --- ENDPOINT CHART DISTRIBUSI ---
app.get("/api/distribusi/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const [[{ individu }]] = await pool.query("SELECT COUNT(*) as individu FROM tugas WHERE user_id = ? AND type = 'Individu'", [user_id]);
  const [[{ kelompok }]] = await pool.query("SELECT COUNT(*) as kelompok FROM tugas WHERE user_id = ? AND type = 'Kelompok'", [user_id]);
  res.json({ individu, kelompok });
});

// --- ENDPOINT KALENDER TUGAS ---
app.get("/api/kalender/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const [rows] = await pool.query("SELECT id, title, deadline, type FROM tugas WHERE user_id = ?", [user_id]);
  res.json(rows);
});

// --- SERVER LISTEN ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});