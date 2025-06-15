import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import AkunPage from "./pages/akunSaya";
import DaftarTugas from "./pages/daftarTugas";
import TambahTugas from "./pages/tambah";
import TentangPage from "./pages/tentangKami";

// Komponen proteksi route
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/akun"
        element={
          <RequireAuth>
            <AkunPage />
          </RequireAuth>
        }
      />
      <Route
        path="/tugas"
        element={
          <RequireAuth>
            <DaftarTugas />
          </RequireAuth>
        }
      />
      <Route
        path="/tugas/individu"
        element={
          <RequireAuth>
            <DaftarTugas />
          </RequireAuth>
        }
      />
      <Route
        path="/tugas/kelompok"
        element={
          <RequireAuth>
            <DaftarTugas />
          </RequireAuth>
        }
      />
      <Route
        path="/tambah-tugas"
        element={
          <RequireAuth>
            <TambahTugas />
          </RequireAuth>
        }
      />
      <Route
        path="/tentang"
        element={
          <RequireAuth>
            <TentangPage />
          </RequireAuth>
        }
      />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  </Router>
);

export default App;