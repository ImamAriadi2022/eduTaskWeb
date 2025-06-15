import React, { useState } from "react";
import { Nav, Collapse } from "react-bootstrap";
import { FaHome, FaUser, FaTasks, FaChevronDown, FaChevronUp, FaInfoCircle, FaBars, FaTimes, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SIDEBAR_WIDTH = 220;

const Sidebar = () => {
  const [openTugas, setOpenTugas] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setShowSidebar(true)}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 1100,
          background: "#333",
          border: "none",
          color: "#fff",
          borderRadius: "4px",
          padding: "8px 10px",
          display: showSidebar ? "none" : "block",
          transition: "background 0.2s",
        }}
        aria-label="Buka Sidebar"
      >
        <FaBars size={22} />
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: SIDEBAR_WIDTH,
          minHeight: "100vh",
          background: "#333",
          padding: "1rem 0",
          borderRight: "1px solid #222",
          zIndex: 1200,
          boxShadow: showSidebar ? "2px 0 8px rgba(0,0,0,0.1)" : "none",
          transform: showSidebar ? "translateX(0)" : `translateX(-${SIDEBAR_WIDTH}px)`,
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowSidebar(false)}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: 22,
            zIndex: 1300,
          }}
          aria-label="Tutup Sidebar"
        >
          <FaTimes />
        </button>
        <Nav className="flex-column mt-4">
          <Nav.Link href="/" style={{ color: "#fff" }}>
            <FaHome className="me-2" />
            Home
          </Nav.Link>
          <Nav.Link href="/akun" style={{ color: "#fff" }}>
            <FaUser className="me-2" />
            Akun Saya
          </Nav.Link>
          <Nav.Item>
            <Nav.Link
              onClick={() => setOpenTugas(!openTugas)}
              aria-controls="tugas-dropdown"
              aria-expanded={openTugas}
              style={{ color: "#fff" }}
            >
              <FaTasks className="me-2" />
              Daftar Tugas{" "}
              {openTugas ? <FaChevronUp className="ms-1" /> : <FaChevronDown className="ms-1" />}
            </Nav.Link>
            <Collapse in={openTugas}>
              <div id="tugas-dropdown" style={{ paddingLeft: "2rem" }}>
                <Nav.Link href="/tugas/individu" style={{ color: "#fff" }}>
                  Individu
                </Nav.Link>
                <Nav.Link href="/tugas/kelompok" style={{ color: "#fff" }}>
                  Kelompok
                </Nav.Link>
              </div>
            </Collapse>
          </Nav.Item>
          <Nav.Link href="/tentang" style={{ color: "#fff" }}>
            <FaInfoCircle className="me-2" />
            Tentang Kami
          </Nav.Link>
          <Nav.Link
            as="button"
            style={{
              color: "#fff",
              background: "none",
              border: "none",
              textAlign: "left",
              marginTop: "1rem",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/tambah-tugas")}
          >
            <FaPlus className="me-2" />
            Tambah Tugas
          </Nav.Link>
        </Nav>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setShowSidebar(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: showSidebar ? "rgba(0,0,0,0.2)" : "transparent",
          zIndex: 1100,
          pointerEvents: showSidebar ? "auto" : "none",
          transition: "background 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </>
  );
};

export default Sidebar;