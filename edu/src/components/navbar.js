import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BrandNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Navbar style={{ background: "#e9ecef" }} expand="lg">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src="/img/logo.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <div>
            <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#ff8800" }}>
              Edu Task
            </div>
            <div style={{ fontSize: "0.85rem", color: "#111" }}>
              Sistem Informasi Manajemen Deadline & Tugas Kuliah
            </div>
          </div>
        </Navbar.Brand>
        {isLoggedIn && (
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default BrandNavbar;