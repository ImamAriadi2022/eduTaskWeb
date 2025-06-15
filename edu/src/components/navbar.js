import React from "react";
import { Navbar, Container } from "react-bootstrap";

const BrandNavbar = () => {
  return (
    <Navbar style={{ background: "#e9ecef" }} expand="lg">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src="/logo192.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <div>
            <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#ff8800" }}>
              NamaBrand
            </div>
            <div style={{ fontSize: "0.85rem", color: "#111" }}>
              Deskripsi singkat brand Anda di sini
            </div>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default BrandNavbar;