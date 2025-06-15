import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import AkunPage from "./pages/akunSaya";
import DaftarTugas from "./pages/daftarTugas";
import TambahTugas from "./pages/tambah";
import TentangPage from "./pages/tentangKami";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/akun" element={<AkunPage />} />
      <Route path="/tugas" element={<DaftarTugas />} />
      <Route path="/tugas/individu" element={<DaftarTugas />} />
      <Route path="/tugas/kelompok" element={<DaftarTugas />} />
      <Route path="/tambah-tugas" element={<TambahTugas />} />
      <Route path="/tentang" element={<TentangPage />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  </Router>
);

export default App;